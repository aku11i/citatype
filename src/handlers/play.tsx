import type { Context } from "hono";
import { dailyConversationJa } from "../data/sentence-packs/index.js";
import { pickRandomSentences } from "../domain/sentences/pick-random-sentences.js";
import { PlayPage } from "../ui/pages/play.js";

export const handleGetPlay = (c: Context) => {
  const startedAt = Date.now();
  const countParam = c.req.query("count");
  const requestedCount = countParam ? Number.parseInt(countParam, 10) : 3;
  const sentenceCount = Number.isFinite(requestedCount) ? requestedCount : 3;
  const sentences = pickRandomSentences(dailyConversationJa.sentences, sentenceCount);
  const pack = { ...dailyConversationJa, sentences };

  return c.html(<PlayPage startedAt={startedAt} pack={pack} />);
};
