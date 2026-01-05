import type { Context } from "hono";
import type { LocaleVariables } from "../middleware/locale.js";
import { createPageMeta } from "../i18n/page-meta.js";
import { PalettePage } from "../ui/pages/palette.js";

export const handleGetPalette = (c: Context<{ Variables: LocaleVariables }>) => {
  const locale = c.get("locale");
  const t = c.get("t");
  const meta = createPageMeta({
    locale,
    path: "/palette",
    requestUrl: c.req.url,
  });

  return c.html(<PalettePage locale={locale} t={t} meta={meta} />);
};
