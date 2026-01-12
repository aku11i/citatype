import { Hono } from "hono";
import { describe, expect, it } from "vitest";
import type { Bindings } from "../../bindings.js";
import { parseBindings } from "../../bindings.js";
import { validateBindings } from "../../middleware/bindings.js";
import route from "../../routes/robots.txt.js";

describe("GET /robots.txt", () => {
  it("allows crawling in production", async () => {
    const app = new Hono<{ Bindings: Bindings }>();
    app.use("*", validateBindings);
    app.get("/robots.txt", ...route);
    const res = await app.request("/robots.txt", {}, parseBindings({ ENVIRONMENT: "production" }));

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("User-agent: *\nAllow: /");
  });

  it("disallows crawling in non-production", async () => {
    const app = new Hono<{ Bindings: Bindings }>();
    app.use("*", validateBindings);
    app.get("/robots.txt", ...route);
    const res = await app.request("/robots.txt", {}, parseBindings({ ENVIRONMENT: "preview" }));

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("User-agent: *\nDisallow: /");
  });
});
