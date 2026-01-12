import { renderToString } from "hono/jsx/dom/server";
import { describe, expect, it } from "vitest";
import { createI18n } from "../../i18n/createI18n.js";
import { getMessages } from "../../i18n/getMessages.js";
import { createPageMeta } from "../../i18n/page-meta.js";
import { ResultPage } from "./result.js";

describe("ResultPage visual", () => {
  it("matches the default layout", async () => {
    const messages = getMessages("en");
    const { t } = createI18n({ locale: "en", messages });
    const meta = createPageMeta({
      locale: "en",
      path: "/result",
      requestUrl: "https://example.com/en/result",
    });

    const markup = renderToString(<ResultPage elapsedMs={12345} locale="en" t={t} meta={meta} />);
    const parsed = new DOMParser().parseFromString(markup, "text/html");

    document.documentElement.innerHTML = parsed.documentElement.innerHTML;

    await expect(document.body).toMatchScreenshot();
  });
});
