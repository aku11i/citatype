import { renderToString } from "hono/jsx/dom/server";
import { describe, expect, it } from "vitest";
import type { SentencePack } from "../../domain/sentences/parse-sentence-pack.js";
import { dailyConversationJa } from "../../data/sentence-packs/index.js";
import { createI18n } from "../../i18n/createI18n.js";
import { getMessages } from "../../i18n/getMessages.js";
import { createPageMeta } from "../../i18n/page-meta.js";
import { PlayPage } from "./play.js";

describe("PlayPage browser", () => {
  it("parses typing session JSON from script textContent", () => {
    const messages = getMessages("ja");
    const { t } = createI18n({ locale: "ja", messages });
    const meta = createPageMeta({
      locale: "ja",
      path: "/play",
      requestUrl: "https://example.com/ja/play",
    });

    const pack: SentencePack = {
      ...dailyConversationJa,
      sentences: dailyConversationJa.sentences.slice(0, 3),
    };

    const markup = renderToString(
      <PlayPage startedAt={1} locale="ja" t={t} meta={meta} pack={pack} />,
    );
    const parsed = new DOMParser().parseFromString(markup, "text/html");
    document.documentElement.innerHTML = parsed.documentElement.innerHTML;

    const script = document.getElementById("typing-session-data");
    if (!script) {
      throw new Error("Missing typing-session-data script tag.");
    }

    const textContent = script.textContent;
    if (!textContent) {
      throw new Error("Missing typing-session-data text content.");
    }

    const data = JSON.parse(textContent);

    expect(data.pack).toEqual(pack);
    expect(data.messages).toEqual({
      sentenceLabel: t("typingSession.sentenceLabel"),
      typeHereLabel: t("typingSession.typeHereLabel"),
      placeholder: t("typingSession.placeholder"),
      helper: t("typingSession.helper"),
      focusHint: t("typingSession.focusHint"),
      statusMissed: t("typingSession.statusMissed"),
      statusComplete: t("typingSession.statusComplete"),
      statusRedirect: t("typingSession.statusRedirect"),
    });
  });
});
