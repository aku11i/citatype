import type { Context } from "hono";
import type { LocaleVariables } from "../middleware/locale.js";
import { createPageMeta } from "../i18n/page-meta.js";
import { HomePage } from "../ui/pages/home.js";

export const handleGetHome = (c: Context<{ Variables: LocaleVariables }>) => {
  const locale = c.get("locale");
  const t = c.get("t");
  const meta = createPageMeta({
    locale,
    path: "/",
    requestUrl: c.req.url,
  });

  return c.html(<HomePage locale={locale} t={t} meta={meta} />);
};
