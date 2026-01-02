import { renderToString } from "hono/jsx/dom/server";
import { describe, expect, it } from "vitest";
import { createI18n } from "../../i18n/createI18n.js";
import { getMessages } from "../../i18n/getMessages.js";
import { createPageMeta } from "../../i18n/page-meta.js";
import type { SentencePack } from "../../domain/sentences/parse-sentence-pack.js";
import { PlayPage } from "./play.js";

describe("PlayPage visual", () => {
  it("matches the default layout", async () => {
    const messages = getMessages("en");
    const { t } = createI18n({ locale: "en", messages });
    const meta = createPageMeta({
      locale: "en",
      path: "/play",
      requestUrl: "https://example.com/en/play",
    });

    const pack: SentencePack = {
      id: "test-pack",
      label: t("typingSession.packLabel"),
      description: t("typingSession.packDescription"),
      language: "en",
      sentences: messages.typingSession.sentences.map((sentence, index) => ({
        id: `test-${String(index + 1).padStart(3, "0")}`,
        text: sentence.text,
      })),
    };

    const markup = renderToString(
      <PlayPage startedAt={1} locale="en" t={t} meta={meta} pack={pack} />,
    );
    const parsed = new DOMParser().parseFromString(markup, "text/html");

    document.documentElement.innerHTML = parsed.documentElement.innerHTML;

    await expect(document.body).toMatchScreenshot();
  });
});
