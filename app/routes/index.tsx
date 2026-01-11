import { languageDetector } from "hono/language";
import { createRoute } from "honox/factory";
import { handleGetRoot } from "../../src/handlers/root.js";
import { fallbackLocale, locales } from "../../src/i18n/locales.js";

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
  handleGetRoot,
);
