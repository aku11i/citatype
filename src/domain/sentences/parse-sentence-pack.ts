import * as v from "valibot";

const nonEmptyString = v.pipe(v.string(), v.minLength(1));

const japaneseSentenceSchema = v.object({
  id: nonEmptyString,
  text: nonEmptyString,
  reading: nonEmptyString,
});

const englishSentenceSchema = v.object({
  id: nonEmptyString,
  text: nonEmptyString,
});

const packBaseSchema = {
  id: nonEmptyString,
  label: nonEmptyString,
  description: v.optional(nonEmptyString),
};

const japanesePackSchema = v.object({
  ...packBaseSchema,
  language: v.literal("ja"),
  sentences: v.pipe(v.array(japaneseSentenceSchema), v.minLength(1)),
});

const englishPackSchema = v.object({
  ...packBaseSchema,
  language: v.literal("en"),
  sentences: v.pipe(v.array(englishSentenceSchema), v.minLength(1)),
});

const sentencePackSchema = v.variant("language", [japanesePackSchema, englishPackSchema]);

type SentencePack = v.InferOutput<typeof sentencePackSchema>;
type SentenceEntry = SentencePack["sentences"][number];
type SentencePackLanguage = SentencePack["language"];

const parseSentencePack = (input: unknown): SentencePack => v.parse(sentencePackSchema, input);

export { parseSentencePack };
export type { SentenceEntry, SentencePack, SentencePackLanguage };
