import { renderToString } from "hono/jsx/dom/server";
import { describe, expect, it } from "vitest";
import { HomePage } from "./home.js";

describe("HomePage visual", () => {
  it("matches the default layout", async () => {
    const markup = renderToString(<HomePage />);
    const parsed = new DOMParser().parseFromString(markup, "text/html");

    document.documentElement.innerHTML = parsed.documentElement.innerHTML;

    await expect(document.body).toMatchScreenshot();
  });
});
