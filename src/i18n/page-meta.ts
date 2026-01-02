import type { Locale } from "./locales.js";
import { locales } from "./locales.js";
import { localizedPath } from "./paths.js";

export type PageMeta = {
  path: string;
  canonicalUrl: string;
  alternates: Array<{ locale: Locale; href: string }>;
};

export const createPageMeta = (params: {
  locale: Locale;
  path: string;
  requestUrl: string;
}): PageMeta => {
  const { locale, path, requestUrl } = params;
  const canonicalPath = localizedPath(locale, path);
  const canonicalUrl = new URL(canonicalPath, requestUrl).toString();
  const alternates = locales.map((alternateLocale) => {
    const href = new URL(localizedPath(alternateLocale, path), requestUrl).toString();
    return { locale: alternateLocale, href };
  });

  return {
    path,
    canonicalUrl,
    alternates,
  };
};
