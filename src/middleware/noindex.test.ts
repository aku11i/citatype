import { Hono } from "hono";
import { describe, expect, it } from "vitest";
import type { Bindings } from "../bindings.js";
import { parseBindings } from "../bindings.js";
import { applyNoindexForNonProduction } from "./noindex.js";

const createApp = () => {
  const app = new Hono<{ Bindings: Bindings }>();

  app.use("*", applyNoindexForNonProduction);
  app.get("/", (c) => c.text("ok"));

  return app;
};

describe("applyNoindexForNonProduction", () => {
  it("adds X-Robots-Tag for non-production environments", async () => {
    const app = createApp();

    const res = await app.request("/", {}, parseBindings({ ENVIRONMENT: "preview" }));

    expect(res.headers.get("X-Robots-Tag")).toBe("noindex");
  });

  it("does not add X-Robots-Tag for production environment", async () => {
    const app = createApp();

    const res = await app.request("/", {}, parseBindings({ ENVIRONMENT: "production" }));

    expect(res.headers.get("X-Robots-Tag")).toBeNull();
  });
});
