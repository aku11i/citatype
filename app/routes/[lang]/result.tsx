import type { Context } from "hono";
import { sValidator } from "@hono/standard-validator";
import { createRoute } from "honox/factory";
import * as v from "valibot";
import { createPageMeta } from "../../i18n/page-meta.js";
import type { LocaleVariables } from "../../middleware/locale.js";
import { ResultPage } from "../../ui/pages/result.js";

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

const validatePostResultForm = sValidator("form", resultFormSchema);
const validateGetResultQuery = sValidator("query", resultQuerySchema);

const renderResult = (c: Context<{ Variables: LocaleVariables }>, elapsedMs: number | null) => {
  const locale = c.get("locale");
  const t = c.get("t");
  const meta = createPageMeta({
    locale,
    path: "/result",
    requestUrl: c.req.url,
  });

  return c.html(<ResultPage elapsedMs={elapsedMs} locale={locale} t={t} meta={meta} />);
};

export const POST = createRoute(
  validatePostResultForm,
  (c: Context<{ Variables: LocaleVariables }, string, ResultFormInput>) => {
    let elapsedMs: number | null = null;

    const { startedAt } = c.req.valid("form");
    if (typeof startedAt === "number" && Number.isFinite(startedAt)) {
      elapsedMs = Math.max(0, Date.now() - startedAt);
    }

    return renderResult(c, elapsedMs);
  },
);

export default createRoute(
  validateGetResultQuery,
  (c: Context<{ Variables: LocaleVariables }, string, ResultQueryInput>) => {
    let elapsedMs: number | null = null;

    const { elapsedMs: queryElapsed } = c.req.valid("query");
    if (typeof queryElapsed === "number" && Number.isFinite(queryElapsed)) {
      elapsedMs = queryElapsed;
    }

    return renderResult(c, elapsedMs);
  },
);
