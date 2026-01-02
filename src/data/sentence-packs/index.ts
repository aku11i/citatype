import dailyConversationJaRaw from "./daily-conversation-ja.json" assert { type: "json" };
import type { SentencePack } from "../../domain/sentences/parse-sentence-pack.js";
import { parseSentencePack } from "../../domain/sentences/parse-sentence-pack.js";

type JapaneseSentencePack = Extract<SentencePack, { language: "ja" }>;

const assertJapanesePack = (pack: SentencePack): JapaneseSentencePack => {
  if (pack.language !== "ja") {
    throw new Error("Expected a Japanese sentence pack.");
  }
  return pack;
};

const dailyConversationJa = assertJapanesePack(parseSentencePack(dailyConversationJaRaw));

const sentencePacks = {
  dailyConversationJa,
} as const;

export { dailyConversationJa, sentencePacks };
