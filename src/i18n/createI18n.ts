import type { MessageKey, Messages } from "./messages/en.js";
import type { Locale } from "./locales.js";

export type Translate = (key: MessageKey, vars?: Record<string, string | number>) => string;

const interpolate = (template: string, vars?: Record<string, string | number>) => {
  if (!vars) return template;

  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(vars, key)) {
      return String(vars[key]);
    }
    return match;
  });
};

const getMessageValue = (messages: Messages, key: MessageKey): string | null => {
  const parts = key.split(".");
  let current: unknown = messages;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return null;
    }
  }

  return typeof current === "string" ? current : null;
};

export const createI18n = (params: { locale: Locale; messages: Messages }) => {
  const { locale, messages } = params;

  const t: Translate = (key, vars) => {
    const value = getMessageValue(messages, key);
    if (value === null) return "";

    return interpolate(value, vars);
  };

  return {
    locale,
    t,
  };
};
