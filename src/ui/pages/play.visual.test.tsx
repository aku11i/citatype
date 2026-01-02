import { renderToString } from "hono/jsx/dom/server";
import { describe, expect, it } from "vitest";
import { createI18n } from "../../i18n/createI18n.js";
import { getMessages } from "../../i18n/getMessages.js";
import { createPageMeta } from "../../i18n/page-meta.js";
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

    const markup = renderToString(
      <PlayPage
        startedAt={1}
        locale="en"
        t={t}
        meta={meta}
        sentences={messages.typingSession.sentences}
      />,
    );
    const parsed = new DOMParser().parseFromString(markup, "text/html");

    document.documentElement.innerHTML = parsed.documentElement.innerHTML;

    await expect(document.body).toMatchScreenshot();
  });
});
