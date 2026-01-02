import type { Context } from "hono";
import { fallbackLocale, normalizeLocale } from "../i18n/locales.js";
import { localizedPath } from "../i18n/paths.js";

export const handleGetRoot = (c: Context) => {
  const detected = c.get("language");
  const locale = typeof detected === "string" ? normalizeLocale(detected) : null;

  c.header("Vary", "Accept-Language, Cookie");

  return c.redirect(localizedPath(locale ?? fallbackLocale, "/"), 302);
};
