import { Hono } from "hono";
import { describe, expect, it } from "vitest";
import type { Bindings } from "../bindings.js";
import { validateBindings } from "./bindings.js";

const createApp = () => {
  const app = new Hono<{ Bindings: Bindings }>();

  app.use("*", validateBindings);
  app.get("/", (c) => c.text(c.env.ENVIRONMENT));

  return app;
};

describe("validateBindings", () => {
  it("accepts normalized ENVIRONMENT values", async () => {
    const app = createApp();

    const res = await app.request("/", {}, { ENVIRONMENT: "  PreView " });

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("  PreView ");
  });

  it("returns an error when ENVIRONMENT is missing", async () => {
    const app = createApp();

    const res = await app.request("/");

    expect(res.status).toBe(500);
    expect(await res.text()).toBe("Invalid bindings");
  });
});
