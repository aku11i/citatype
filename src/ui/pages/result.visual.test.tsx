import { renderToString } from "hono/jsx/dom/server";
import { describe, expect, it } from "vitest";
import { ResultPage } from "./result.js";

describe("ResultPage visual", () => {
  it("matches the default layout", async () => {
    const markup = renderToString(<ResultPage elapsedMs={12345} />);
    const parsed = new DOMParser().parseFromString(markup, "text/html");

    document.documentElement.innerHTML = parsed.documentElement.innerHTML;

    await expect(document.body).toMatchScreenshot();
  });
});
