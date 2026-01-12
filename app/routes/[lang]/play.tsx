import type { Context } from "hono";
import { sValidator } from "@hono/standard-validator";
import { createRoute } from "honox/factory";
import * as v from "valibot";
import { dailyConversationEn, dailyConversationJa } from "../../data/sentence-packs/index.js";
import type { SentencePack } from "../../domain/sentences/parse-sentence-pack.js";
import { pickRandomSentences } from "../../domain/sentences/pick-random-sentences.js";
import { createPageMeta } from "../../i18n/page-meta.js";
import type { LocaleVariables } from "../../middleware/locale.js";
import { PlayPage } from "../../ui/pages/play.js";

const playQuerySchema = v.object({
  count: v.optional(v.pipe(v.string(), v.toNumber())),
});

type PlayQueryInput = {
  in: {
    query: v.InferInput<typeof playQuerySchema>;
  };
  out: {
    query: v.InferOutput<typeof playQuerySchema>;
  };
};

const validateGetPlayQuery = sValidator("query", playQuerySchema);

export default createRoute(
  validateGetPlayQuery,
  (c: Context<{ Variables: LocaleVariables }, "/play", PlayQueryInput>) => {
    const startedAt = Date.now();
    const { count = 3 } = c.req.valid("query");
    const locale = c.get("locale");
    const t = c.get("t");
    const meta = createPageMeta({
      locale,
      path: "/play",
      requestUrl: c.req.url,
    });

    if (locale === "ja") {
      const pack: SentencePack = {
        ...dailyConversationJa,
        sentences: pickRandomSentences(dailyConversationJa.sentences, count),
      };

      return c.html(
        <PlayPage startedAt={startedAt} locale={locale} t={t} meta={meta} pack={pack} />,
      );
    }

    const pack: SentencePack = {
      ...dailyConversationEn,
      sentences: pickRandomSentences(dailyConversationEn.sentences, count),
    };

    return c.html(<PlayPage startedAt={startedAt} locale={locale} t={t} meta={meta} pack={pack} />);
  },
);
