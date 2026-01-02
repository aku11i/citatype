import { Hono } from "hono";
import { languageDetector, type LanguageVariables } from "hono/language";
import type { Bindings } from "./bindings.js";
import { handleGetHome } from "./handlers/home.js";
import { handleGetPlay } from "./handlers/play.js";
import {
  handleGetResult,
  handlePostResult,
  validateGetResultQuery,
  validatePostResultForm,
} from "./handlers/result.js";
import { handleGetRobots } from "./handlers/robots.js";
import { handleGetRoot } from "./handlers/root.js";
import { fallbackLocale, locales } from "./i18n/locales.js";
import { validateBindings } from "./middleware/bindings.js";
import { applyLocale, type LocaleVariables } from "./middleware/locale.js";
import { applyNoindexForNonProduction } from "./middleware/noindex.js";

type AppVariables = LocaleVariables & LanguageVariables;

type AppEnv = {
  Bindings: Bindings;
  Variables: AppVariables;
};

const app = new Hono<AppEnv>();
app.use("*", validateBindings);
app.use("*", applyNoindexForNonProduction);

app.get(
  "/",
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

app.get("/robots.txt", handleGetRobots);

const localized = new Hono<AppEnv>();
localized.use("*", applyLocale);

localized.get("/", handleGetHome);
localized.get("/play", handleGetPlay);
localized.get("/result", validateGetResultQuery, handleGetResult);
localized.post("/result", validatePostResultForm, handlePostResult);

app.route("/:lang", localized);

export { app };
