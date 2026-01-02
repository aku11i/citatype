import { Hono } from "hono";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Translate } from "../i18n/createI18n.js";
import { getMessages } from "../i18n/getMessages.js";
import type { Messages } from "../i18n/messages/en.js";
import { handleGetHome } from "./home.js";

const { HomePageMock } = vi.hoisted(() => {
  return {
    HomePageMock: vi.fn(() => <div data-testid="home" />),
  };
});

vi.mock("../ui/pages/home.js", () => {
  return {
    HomePage: HomePageMock,
  };
});

describe("GET /:lang", () => {
  beforeEach(() => {
    HomePageMock.mockClear();
  });

  it("returns 200 and calls HomePage with expected props", async () => {
    const app = new Hono<{ Variables: { locale: string; t: Translate; messages: Messages } }>();
    const t: Translate = (key) => key;
    const messages = getMessages("en");

    app.use("/:lang", async (c, next) => {
      c.set("locale", "en");
      c.set("t", t);
      c.set("messages", messages);
      await next();
    });
    app.get("/:lang", handleGetHome);

    const res = await app.request("/en");

    expect(res.status).toBe(200);
    expect(HomePageMock).toHaveBeenCalledWith({
      locale: "en",
      t,
      meta: expect.objectContaining({
        path: "/",
      }),
    });
  });
});
