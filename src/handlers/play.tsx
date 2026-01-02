import type { Context } from "hono";
import type { LocaleVariables } from "../middleware/locale.js";
import { createPageMeta } from "../i18n/page-meta.js";
import { PlayPage } from "../ui/pages/play.js";

export const handleGetPlay = (c: Context<{ Variables: LocaleVariables }>) => {
  const startedAt = Date.now();
  const locale = c.get("locale");
  const t = c.get("t");
  const messages = c.get("messages");
  const meta = createPageMeta({
    locale,
    path: "/play",
    requestUrl: c.req.url,
  });

  return c.html(
    <PlayPage
      startedAt={startedAt}
      locale={locale}
      t={t}
      meta={meta}
      sentences={messages.typingSession.sentences}
    />,
  );
};
