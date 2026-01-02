import type { Messages } from "./en.js";

export const messages: Messages = {
  meta: {
    homeTitle: "Citatype",
    playTitle: "プレイ | Citatype",
    resultTitle: "結果 | Citatype",
  },
  home: {
    eyebrow: "タイピング練習",
    title: "Citatype",
    description: "モードや追加設定のない、シンプルなタイピングセッション。",
    cta: "プレイ",
    helper: "プレイを押すとすぐに開始します。",
  },
  play: {
    eyebrow: "セッション",
    title: "プレイ",
    description: "3つの文を順に入力します。完了すると結果ページが自動で開きます。",
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
    sentenceLabel: "文",
    typeHereLabel: "ここに入力",
    placeholder: "入力を開始...",
    helper: "表示された通りに入力してください。バックスペースは使えません。",
    statusMissed: "入力が違います。続けてください。",
    statusComplete: "セッション完了。",
    statusRedirect: "セッション完了。結果ページへ移動します...",
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
  exampleCounter: {
    label: "カウンター",
    increment: "+1",
  },
};
