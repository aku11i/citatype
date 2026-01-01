import type { Context, Env } from "hono";
import { sValidator } from "@hono/standard-validator";
import * as v from "valibot";
import { ResultPage } from "../ui/pages/result.js";

const numberFromString = v.pipe(v.string(), v.toNumber());

const resultFormSchema = v.object({
  startedAt: v.optional(numberFromString),
});

const resultQuerySchema = v.object({
  elapsedMs: v.optional(numberFromString),
});

type ResultFormInput = {
  in: {
    form: v.InferInput<typeof resultFormSchema>;
  };
  out: {
    form: v.InferOutput<typeof resultFormSchema>;
  };
};

type ResultQueryInput = {
  in: {
    query: v.InferInput<typeof resultQuerySchema>;
  };
  out: {
    query: v.InferOutput<typeof resultQuerySchema>;
  };
};

export const validatePostResultForm = sValidator("form", resultFormSchema);
export const validateGetResultQuery = sValidator("query", resultQuerySchema);

export const handlePostResult = (c: Context<Env, "/result", ResultFormInput>) => {
  let elapsedMs: number | null = null;

  const { startedAt } = c.req.valid("form");
  if (typeof startedAt === "number" && Number.isFinite(startedAt)) {
    elapsedMs = Math.max(0, Date.now() - startedAt);
  }

  return c.html(<ResultPage elapsedMs={elapsedMs} />);
};

export const handleGetResult = (c: Context<Env, "/result", ResultQueryInput>) => {
  let elapsedMs: number | null = null;

  const { elapsedMs: queryElapsed } = c.req.valid("query");
  if (typeof queryElapsed === "number" && Number.isFinite(queryElapsed)) {
    elapsedMs = queryElapsed;
  }

  return c.html(<ResultPage elapsedMs={elapsedMs} />);
};
