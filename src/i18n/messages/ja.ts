import type { Messages } from "./en.js";

export const messages: Messages = {
  meta: {
    homeTitle: "Citatype",
    playTitle: "プレイ | Citatype",
    resultTitle: "結果 | Citatype",
  },
  home: {
    titleLine1: "Just type.",
    titleLine2: "Feel the keys.",
    description: "キーボード愛好家のための純粋な打鍵体験。",
    cta: "開始",
    helper: "",
  },
  play: {
    eyebrow: "セッション",
    title: "プレイ",
    description: "{count} {label} を順に入力します。完了すると結果ページが自動で開きます。",
    sentenceLabel: "文",
    sentencesLabel: "文",
    backLink: "ホームに戻る",
  },
  result: {
    eyebrow: "結果",
    title: "セッション時間",
    description: "このセッションで計測した時間です。",
    cardLabel: "時間",
    primaryCta: "もう一度プレイ",
    secondaryCta: "ホーム",
    elapsed: "{seconds} 秒",
  },
  typingSession: {
    packLabel: "デイリー",
    packDescription: "短い日本語のフレーズで落ち着いて入力。",
    sentenceLabel: "文",
    typeHereLabel: "ここに入力",
    placeholder: "入力を開始...",
    helper: "表示された通りに入力してください。バックスペースは使えません。",
    statusMissed: "入力が違います。続けてください。",
    statusComplete: "セッション完了。",
    statusRedirect: "セッション完了。結果ページへ移動します...",
    statusUnavailable: "表示できる文がありません。",
    sentences: [
      { text: "たいぴんぐはたのしい", reading: "たいぴんぐはたのしい" },
      { text: "みっつのぶんをうちます", reading: "みっつのぶんをうちます" },
      { text: "おちついてゆっくりうとう", reading: "おちついてゆっくりうとう" },
    ],
  },
  languageSwitcher: {
    label: "言語",
    ja: "日本語",
    en: "English",
  },
};
