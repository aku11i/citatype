import { renderToString } from "hono/jsx/dom/server";
import { beforeEach, describe, expect, it } from "vitest";
import { ResultPage } from "./result.js";

describe("ResultPage visual", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = "<head></head><body></body>";
  });

  it("matches the default layout", async () => {
    const markup = renderToString(<ResultPage elapsedMs={12345} />);
    const parsed = new DOMParser().parseFromString(markup, "text/html");

    document.documentElement.innerHTML = parsed.documentElement.innerHTML;

    const viewportLabel = `${window.innerWidth}x${window.innerHeight}`;
    await expect(document.body).toMatchScreenshot(`result-${viewportLabel}.png`);
  });
});
