import type { MiddlewareHandler } from "hono";
import type { Bindings } from "../bindings.js";
import { parseBindings } from "../bindings.js";

export const validateBindings: MiddlewareHandler<{
  Bindings: Bindings;
}> = async (c, next) => {
  try {
    parseBindings(c.env);
  } catch {
    return c.text("Invalid bindings", 500);
  }

  await next();
};
