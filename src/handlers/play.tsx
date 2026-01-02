import type { Context, Env } from "hono";
import { sValidator } from "@hono/standard-validator";
import * as v from "valibot";
import { dailyConversationJa } from "../data/sentence-packs/index.js";
import { pickRandomSentences } from "../domain/sentences/pick-random-sentences.js";
import { PlayPage } from "../ui/pages/play.js";

const numberFromString = v.pipe(v.string(), v.toNumber());

const playQuerySchema = v.object({
  count: v.optional(numberFromString),
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

export const handleGetPlay = (c: Context<Env, "/play", PlayQueryInput>) => {
  const startedAt = Date.now();
  const { count } = c.req.valid("query");
  const sentenceCount = typeof count === "number" && Number.isFinite(count) ? count : 3;
  const sentences = pickRandomSentences(dailyConversationJa.sentences, sentenceCount);
  const pack = { ...dailyConversationJa, sentences };

  return c.html(<PlayPage startedAt={startedAt} pack={pack} />);
};
