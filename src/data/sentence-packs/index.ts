import dailyConversationEnRaw from "./daily-conversation-en.json" assert { type: "json" };
import dailyConversationJaRaw from "./daily-conversation-ja.json" assert { type: "json" };
import type { SentencePack } from "../../domain/sentences/parse-sentence-pack.js";
import { parseSentencePack } from "../../domain/sentences/parse-sentence-pack.js";

type JapaneseSentencePack = Extract<SentencePack, { language: "ja" }>;
type EnglishSentencePack = Extract<SentencePack, { language: "en" }>;

const assertJapanesePack = (pack: SentencePack): JapaneseSentencePack => {
  if (pack.language !== "ja") {
    throw new Error("Expected a Japanese sentence pack.");
  }
  return pack;
};

const assertEnglishPack = (pack: SentencePack): EnglishSentencePack => {
  if (pack.language !== "en") {
    throw new Error("Expected an English sentence pack.");
  }
  return pack;
};

const dailyConversationJa = assertJapanesePack(parseSentencePack(dailyConversationJaRaw));
const dailyConversationEn = assertEnglishPack(parseSentencePack(dailyConversationEnRaw));

const sentencePacks = {
  dailyConversationEn,
  dailyConversationJa,
} as const;

export { dailyConversationEn, dailyConversationJa, sentencePacks };
