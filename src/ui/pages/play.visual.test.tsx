import { renderToString } from "hono/jsx/dom/server";
import { describe, expect, it } from "vitest";
import type { SentencePack } from "../../domain/sentences/parse-sentence-pack.js";
import { PlayPage } from "./play.js";

describe("PlayPage visual", () => {
  it("matches the default layout", async () => {
    const pack: SentencePack = {
      id: "test-pack",
      label: "Test Pack",
      language: "en",
      sentences: [
        { id: "test-001", text: "This is a sample sentence." },
        { id: "test-002", text: "Typing sessions should feel calm." },
        { id: "test-003", text: "Keep going and stay focused." },
      ],
    };

    const markup = renderToString(<PlayPage startedAt={1} pack={pack} />);
    const parsed = new DOMParser().parseFromString(markup, "text/html");

    document.documentElement.innerHTML = parsed.documentElement.innerHTML;

    await expect(document.body).toMatchScreenshot();
  });
});
