import type { Context } from "hono";
import { createRoute } from "honox/factory";
import { createPageMeta } from "../../i18n/page-meta.js";
import type { LocaleVariables } from "../../middleware/locale.js";
import { HomePage } from "../../ui/pages/home.js";

export default createRoute((c: Context<{ Variables: LocaleVariables }>) => {
  const locale = c.get("locale");
  const t = c.get("t");
  const meta = createPageMeta({
    locale,
    path: "/",
    requestUrl: c.req.url,
  });

  return c.html(<HomePage locale={locale} t={t} meta={meta} />);
});
