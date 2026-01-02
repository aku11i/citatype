import { renderToString } from "hono/jsx/dom/server";
import { describe, expect, it } from "vitest";
import { PlayPage } from "./play.js";

describe("PlayPage visual", () => {
  it("matches the default layout", async () => {
    const markup = renderToString(<PlayPage startedAt={1} />);
    const parsed = new DOMParser().parseFromString(markup, "text/html");

    document.documentElement.innerHTML = parsed.documentElement.innerHTML;

    await expect(document.body).toMatchScreenshot();
  });
});
