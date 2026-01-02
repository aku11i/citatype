import { renderToString } from "hono/jsx/dom/server";
import { beforeEach, describe, expect, it } from "vitest";
import { HomePage } from "./home.js";

describe("HomePage visual", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = "<head></head><body></body>";
  });

  it("matches the default layout", async () => {
    const markup = renderToString(<HomePage />);
    const parsed = new DOMParser().parseFromString(markup, "text/html");

    document.documentElement.innerHTML = parsed.documentElement.innerHTML;

    const viewportLabel = `${window.innerWidth}x${window.innerHeight}`;
    await expect(document.body).toMatchScreenshot(`home-${viewportLabel}.png`);
  });
});
