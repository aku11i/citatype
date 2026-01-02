import type { Context, Env } from "hono";
import { sValidator } from "@hono/standard-validator";
import * as v from "valibot";
import { dailyConversationJa } from "../data/sentence-packs/index.js";
import { pickRandomSentences } from "../domain/sentences/pick-random-sentences.js";
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

export const handleGetPlay = (c: Context<Env, "/play", PlayQueryInput>) => {
  const startedAt = Date.now();
  const { count = 3 } = c.req.valid("query");
  const sentences = pickRandomSentences(dailyConversationJa.sentences, count);
  const pack = { ...dailyConversationJa, sentences };

  return c.html(<PlayPage startedAt={startedAt} pack={pack} />);
};
