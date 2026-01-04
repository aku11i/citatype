export type TypingSentence = {
  text: string;
  reading?: string;
};

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
  },
  home: {
    titleLine1: "Just type.",
    titleLine2: "Feel the keys.",
    description: "A pure typing experience for keyboard nerds.",
    cta: "START",
    helper: "",
  },
  play: {
    eyebrow: "Session",
    title: "Play",
    description:
      "Type {count} {label} in order. When you finish, the result page will open automatically.",
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
};

export type Messages = typeof messages;
