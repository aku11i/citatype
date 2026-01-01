import type { MiddlewareHandler } from "hono";
import type { Bindings } from "../bindings.js";

export const applyNoindexForNonProduction: MiddlewareHandler<{
  Bindings: Bindings;
}> = async (c, next) => {
  await next();

  const environment = c.env.ENVIRONMENT;
  switch (environment) {
    case "production":
      break;
    case "preview":
    case "local":
      c.res.headers.set("X-Robots-Tag", "noindex");
      break;
    default:
      throw new Error(`Unexpected ENVIRONMENT: ${environment satisfies never}`);
  }
};
