import { languageDetector } from "hono/language";
import { createRoute } from "honox/factory";
import { fallbackLocale, locales, normalizeLocale } from "../i18n/locales.js";
import { localizedPath } from "../i18n/paths.js";

export default createRoute(
  languageDetector({
    supportedLanguages: [...locales],
    fallbackLanguage: fallbackLocale,
    order: ["querystring", "cookie", "header"],
    caches: ["cookie"],
    lookupCookie: "lang",
    lookupQueryString: "lang",
    cookieOptions: {
      path: "/",
      sameSite: "Lax",
    },
    convertDetectedLanguage: (lang) => lang.split("-")[0] ?? lang,
  }),
  (c) => {
    const detected = c.get("language");
    const locale = typeof detected === "string" ? normalizeLocale(detected) : null;

    c.header("Vary", "Accept-Language, Cookie");

    return c.redirect(localizedPath(locale ?? fallbackLocale, "/"), 302);
  },
);
