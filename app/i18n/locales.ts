export const locales = ["ja", "en"] as const;

export type Locale = (typeof locales)[number];

export const fallbackLocale: Locale = "en";

export const normalizeLocale = (value: string): Locale | null => {
  const normalized = value.trim().toLowerCase();
  return (locales as readonly string[]).includes(normalized) ? (normalized as Locale) : null;
};
