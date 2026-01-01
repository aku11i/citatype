import type { Context } from "hono";
import type { Bindings } from "../bindings.js";

const productionRobots = `
User-agent: *
Allow: /
`.trim();

const nonProductionRobots = `
User-agent: *
Disallow: /
`.trim();

export const handleGetRobots = (c: Context<{ Bindings: Bindings }>) => {
  const { ENVIRONMENT: environment } = c.env;
  switch (environment) {
    case "production":
      return c.text(productionRobots);
    case "preview":
    case "local":
      return c.text(nonProductionRobots);
    default:
      throw new Error(`Unexpected ENVIRONMENT: ${environment satisfies never}`);
  }
};
