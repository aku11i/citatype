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
        <header class="space-y-4">
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-text-secondary">
            {t("result.eyebrow")}
          </p>
          <h1 class="text-[32px] font-semibold tracking-tight text-text-primary">
            {t("result.title")}
          </h1>
          <p class="text-base text-text-secondary">{t("result.description")}</p>
        </header>

        <section class="rounded-[20px] bg-bg-surface p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-text-secondary">
            {t("result.cardLabel")}
          </p>
          <p class="mt-4 text-[56px] font-semibold leading-none text-text-primary">
            {formatElapsed(elapsedMs, t)}
          </p>
        </section>

        <div class="flex flex-wrap gap-4">
          <Button as="a" href={localizedPath(locale, "/play")}>
            {t("result.primaryCta")}
          </Button>
          <Button as="a" href={localizedPath(locale, "/")} variant="outline" color="secondary">
            {t("result.secondaryCta")}
          </Button>
        </div>
      </div>
    </BaseLayout>
  );
};
