export type TypingSentence = {
  text: string;
  reading?: string;
};

export type Messages = {
  meta: {
    homeTitle: string;
    playTitle: string;
    resultTitle: string;
  };
  home: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    helper: string;
  };
  play: {
    eyebrow: string;
    title: string;
    description: string;
    sentenceLabel: string;
    sentencesLabel: string;
    backLink: string;
  };
  result: {
    eyebrow: string;
    title: string;
    description: string;
    cardLabel: string;
    primaryCta: string;
    secondaryCta: string;
    elapsed: string;
  };
  typingSession: {
    packLabel: string;
    packDescription: string;
    sentenceLabel: string;
    typeHereLabel: string;
    placeholder: string;
    helper: string;
    statusMissed: string;
    statusComplete: string;
    statusRedirect: string;
    statusUnavailable: string;
    sentences: TypingSentence[];
  };
  languageSwitcher: {
    label: string;
    ja: string;
    en: string;
  };
  exampleCounter: {
    label: string;
    increment: string;
  };
};

export const messages: Messages = {
  meta: {
    homeTitle: "Citatype",
    playTitle: "Play | Citatype",
    resultTitle: "Result | Citatype",
  },
  home: {
    eyebrow: "Calm Typing",
    title: "Citatype",
    description: "A quiet typing session for relaxation, not practice.",
    cta: "START",
    helper: "No setup. Just begin.",
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
    sentences: [
      { text: "citatype is a simple typing app" },
      { text: "type three sentences to finish" },
      { text: "stay calm and keep typing" },
    ],
  },
  languageSwitcher: {
    label: "Language",
    ja: "日本語",
    en: "English",
  },
  exampleCounter: {
    label: "Counter",
    increment: "+1",
  },
};
