import { renderToString } from "hono/jsx/dom/server";
import { describe, expect, it } from "vitest";
import { createI18n } from "../../i18n/createI18n.js";
import { getMessages } from "../../i18n/getMessages.js";
import { createPageMeta } from "../../i18n/page-meta.js";
import { HomePage } from "./home.js";

describe("HomePage visual", () => {
  it("matches the default layout", async () => {
    const messages = getMessages("en");
    const { t } = createI18n({ locale: "en", messages });
    const meta = createPageMeta({
      locale: "en",
      path: "/",
      requestUrl: "https://example.com/en",
    });

    const markup = renderToString(<HomePage locale="en" t={t} meta={meta} />);
    const parsed = new DOMParser().parseFromString(markup, "text/html");

    document.documentElement.innerHTML = parsed.documentElement.innerHTML;

    await expect(document.body).toMatchScreenshot();
  });
});
