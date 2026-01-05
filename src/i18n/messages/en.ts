export type TypingSentence = {
  text: string;
  reading?: string;
};

type StringLeafPaths<T> = T extends string
  ? never
  : T extends readonly unknown[]
    ? never
    : T extends Record<string, unknown>
      ? {
          [K in Extract<keyof T, string>]: T[K] extends string
            ? K
            : T[K] extends readonly unknown[]
              ? never
              : T[K] extends Record<string, unknown>
                ? `${K}.${StringLeafPaths<T[K]>}`
                : never;
        }[Extract<keyof T, string>]
      : never;

const typingSentences: TypingSentence[] = [
  { text: "citatype is a simple typing app" },
  { text: "type three sentences to finish" },
  { text: "stay calm and keep typing" },
];

export const messages = {
  meta: {
    homeTitle: "Citatype",
    playTitle: "Play | Citatype",
    resultTitle: "Result | Citatype",
    paletteTitle: "Primary Colors | Citatype",
  },
  home: {
    titleLine1: "Just type.",
    titleLine2: "Feel the keys.",
    description: "A pure typing experience for keyboard nerds.",
    cta: "START",
  },
  play: {
    eyebrow: "Session",
    title: "Play",
    description:
      "Type {count} {label} in order. When you finish, the result page will open automatically.",
    statsElapsedLabel: "Elapsed",
    statsSentencesLabel: "Sentences",
    statsPackLabel: "Pack",
    sentenceLabel: "sentence",
    sentencesLabel: "sentences",
    backLink: "Back to home",
  },
  result: {
    eyebrow: "Result",
    title: "Session Time",
    description: "Time measured for this session.",
    cardLabel: "Time",
    primaryCta: "Play again",
    secondaryCta: "Home",
    elapsed: "{seconds} s",
  },
  typingSession: {
    packLabel: "Daily Focus",
    packDescription: "Short English prompts for steady typing.",
    sentenceLabel: "Sentence",
    typeHereLabel: "Type here",
    placeholder: "Start typing...",
    helper: "Type exactly as shown. Backspace is not supported.",
    focusHint: "Focus lost. Click here to resume typing.",
    statusMissed: "Missed key. Keep going.",
    statusComplete: "Session complete.",
    statusRedirect: "Session complete. Redirecting to result...",
    statusUnavailable: "No sentences available.",
    sentences: typingSentences,
  },
  languageSwitcher: {
    label: "Language",
    ja: "日本語",
    en: "English",
  },
  palette: {
    eyebrow: "Design Lab",
    title: "Primary Color Review",
    description:
      "Temporary page to compare primary button colors against the light neutral background and white card.",
    sectionLabel: "Primary Button",
    buttonLabel: "Primary Button",
    groupWarm: "Warm + Earth",
    groupCool: "Cool + Technical",
  },
};

export type Messages = typeof messages;
export type MessageKey = StringLeafPaths<Messages>;
