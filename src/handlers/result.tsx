import type { Context } from "hono";
import { sValidator } from "@hono/standard-validator";
import * as v from "valibot";
import type { LocaleVariables } from "../middleware/locale.js";
import { createPageMeta } from "../i18n/page-meta.js";
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

export const handlePostResult = (
  c: Context<{ Variables: LocaleVariables }, string, ResultFormInput>,
) => {
  let elapsedMs: number | null = null;

  const { startedAt } = c.req.valid("form");
  if (typeof startedAt === "number" && Number.isFinite(startedAt)) {
    elapsedMs = Math.max(0, Date.now() - startedAt);
  }

  const locale = c.get("locale");
  const t = c.get("t");
  const meta = createPageMeta({
    locale,
    path: "/result",
    requestUrl: c.req.url,
  });

  return c.html(<ResultPage elapsedMs={elapsedMs} locale={locale} t={t} meta={meta} />);
};

export const handleGetResult = (
  c: Context<{ Variables: LocaleVariables }, string, ResultQueryInput>,
) => {
  let elapsedMs: number | null = null;

  const { elapsedMs: queryElapsed } = c.req.valid("query");
  if (typeof queryElapsed === "number" && Number.isFinite(queryElapsed)) {
    elapsedMs = queryElapsed;
  }

  const locale = c.get("locale");
  const t = c.get("t");
  const meta = createPageMeta({
    locale,
    path: "/result",
    requestUrl: c.req.url,
  });

  return c.html(<ResultPage elapsedMs={elapsedMs} locale={locale} t={t} meta={meta} />);
};
