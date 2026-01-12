import type { SentenceEntry } from "./parse-sentence-pack.js";

const getRandomInt = (maxExclusive: number) => {
  if (!Number.isFinite(maxExclusive) || maxExclusive <= 0) {
    throw new Error("maxExclusive must be a positive number.");
  }

  const max = Math.floor(maxExclusive);
  const range = 0x100000000;
  const limit = Math.floor(range / max) * max;
  const buffer = new Uint32Array(1);
  let value = 0;

  do {
    crypto.getRandomValues(buffer);
    value = buffer[0];
  } while (value >= limit);

  return value % max;
};

const pickRandomSentences = <T extends SentenceEntry>(sentences: T[], count: number): T[] => {
  if (sentences.length === 0) return [];

  const normalizedCount = Math.min(
    sentences.length,
    Math.max(1, Math.floor(Number.isFinite(count) ? count : 1)),
  );

  const pool = sentences.slice();
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const target = getRandomInt(index + 1);
    [pool[index], pool[target]] = [pool[target], pool[index]];
  }

  return pool.slice(0, normalizedCount);
};

export { pickRandomSentences };
