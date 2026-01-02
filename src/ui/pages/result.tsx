import type { FC } from "hono/jsx";
import type { Translate } from "../../i18n/createI18n.js";
import type { Locale } from "../../i18n/locales.js";
import type { PageMeta } from "../../i18n/page-meta.js";
import { localizedPath } from "../../i18n/paths.js";
import { Button } from "../components/button.js";
import { BaseLayout } from "../layouts/base.js";

type ResultPageProps = {
  elapsedMs: number | null;
  locale: Locale;
  t: Translate;
  meta: PageMeta;
};

const formatElapsed = (elapsedMs: number | null, t: Translate) => {
  if (elapsedMs == null || !Number.isFinite(elapsedMs) || elapsedMs < 0) {
    return "--";
  }

  const seconds = (elapsedMs / 1000).toFixed(2);
  return t("result.elapsed", { seconds });
};

export const ResultPage: FC<ResultPageProps> = ({ elapsedMs, locale, t, meta }) => {
  return (
    <BaseLayout title={t("meta.resultTitle")} locale={locale} meta={meta} t={t}>
      <div class="space-y-8">
        <header class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-400">
            {t("result.eyebrow")}
          </p>
          <h1 class="text-2xl font-semibold tracking-tight text-secondary-900">
            {t("result.title")}
          </h1>
          <p class="text-sm text-secondary-600">{t("result.description")}</p>
        </header>

        <section class="rounded-2xl border border-secondary-200 bg-white p-6 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-400">
            {t("result.cardLabel")}
          </p>
          <p class="mt-3 text-4xl font-semibold text-secondary-900">
            {formatElapsed(elapsedMs, t)}
          </p>
        </section>

        <div class="flex flex-wrap gap-3">
          <Button as="a" href={localizedPath(locale, "/play")} class="px-6">
            {t("result.primaryCta")}
          </Button>
          <Button
            as="a"
            href={localizedPath(locale, "/")}
            variant="outline"
            color="secondary"
            class="px-6"
          >
            {t("result.secondaryCta")}
          </Button>
        </div>
      </div>
    </BaseLayout>
  );
};
