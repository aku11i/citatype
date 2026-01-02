import type { Context } from "hono";
import { sValidator } from "@hono/standard-validator";
import * as v from "valibot";
import { HomePage } from "../ui/pages/home.js";

const homeQuerySchema = v.object({});

export const validateGetHomeQuery = sValidator("query", homeQuerySchema);

export const handleGetHome = (c: Context) => {
  return c.html(<HomePage />);
};
