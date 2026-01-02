import type { MiddlewareHandler } from "hono";
import type { Messages } from "../i18n/messages/en.js";
import type { Translate } from "../i18n/createI18n.js";
import type { Locale } from "../i18n/locales.js";
import { createI18n } from "../i18n/createI18n.js";
import { getMessages } from "../i18n/getMessages.js";
import { normalizeLocale } from "../i18n/locales.js";

export type LocaleVariables = {
  locale: Locale;
  t: Translate;
  messages: Messages;
};

export const applyLocale: MiddlewareHandler<{ Variables: LocaleVariables }> = async (c, next) => {
  const param = c.req.param("lang");
  const locale = param ? normalizeLocale(param) : null;

  if (!locale) {
    return c.notFound();
  }

  const messages = getMessages(locale);
  const { t } = createI18n({ locale, messages });

  c.set("locale", locale);
  c.set("t", t);
  c.set("messages", messages);

  await next();
};
