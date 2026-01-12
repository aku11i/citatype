import type { Locale } from "./locales.js";

export const localizedPath = (locale: Locale, path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (normalized === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalized}`;
};
