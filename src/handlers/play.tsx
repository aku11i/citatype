import type { Context } from "hono";
import { sValidator } from "@hono/standard-validator";
import * as v from "valibot";
import { dailyConversationJa } from "../data/sentence-packs/index.js";
import type { Translate } from "../i18n/createI18n.js";
import { createPageMeta } from "../i18n/page-meta.js";
import type { Messages } from "../i18n/messages/en.js";
import type { SentencePack } from "../domain/sentences/parse-sentence-pack.js";
import { pickRandomSentences } from "../domain/sentences/pick-random-sentences.js";
import type { LocaleVariables } from "../middleware/locale.js";
import { PlayPage } from "../ui/pages/play.js";

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

export const validateGetPlayQuery = sValidator("query", playQuerySchema);

type JapanesePack = Extract<SentencePack, { language: "ja" }>;
type EnglishPack = Extract<SentencePack, { language: "en" }>;

const buildEnglishPack = (messages: Messages, t: Translate): EnglishPack => {
  return {
    id: "daily-english",
    label: t("typingSession.packLabel"),
    description: t("typingSession.packDescription"),
    language: "en",
    sentences: messages.typingSession.sentences.map((sentence, index) => ({
      id: `en-${String(index + 1).padStart(3, "0")}`,
      text: sentence.text,
    })),
  };
};

export const handleGetPlay = (
  c: Context<{ Variables: LocaleVariables }, "/play", PlayQueryInput>,
) => {
  const startedAt = Date.now();
  const { count = 3 } = c.req.valid("query");
  const locale = c.get("locale");
  const t = c.get("t");
  const messages = c.get("messages");

  const japanesePack: JapanesePack = dailyConversationJa;

  const pack: SentencePack =
    locale === "ja"
      ? {
          ...japanesePack,
          sentences: pickRandomSentences(japanesePack.sentences, count),
        }
      : (() => {
          const englishPack = buildEnglishPack(messages, t);
          return {
            ...englishPack,
            sentences: pickRandomSentences(englishPack.sentences, count),
          };
        })();

  const meta = createPageMeta({
    locale,
    path: "/play",
    requestUrl: c.req.url,
  });

  return c.html(<PlayPage startedAt={startedAt} locale={locale} t={t} meta={meta} pack={pack} />);
};
