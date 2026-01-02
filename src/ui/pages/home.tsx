import type { FC } from "hono/jsx";
import type { Translate } from "../../i18n/createI18n.js";
import type { Locale } from "../../i18n/locales.js";
import type { PageMeta } from "../../i18n/page-meta.js";
import { localizedPath } from "../../i18n/paths.js";
import { Button } from "../components/button.js";
import { BaseLayout } from "../layouts/base.js";

type HomePageProps = {
  locale: Locale;
  t: Translate;
  meta: PageMeta;
};

export const HomePage: FC<HomePageProps> = ({ locale, t, meta }) => {
  return (
    <BaseLayout title={t("meta.homeTitle")} locale={locale} meta={meta} t={t} scene="calm">
      <section>
        <div class="relative flex min-h-[60vh] flex-col justify-center gap-10 py-8">
          <header class="max-w-xl space-y-4">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-secondary-400">
              {t("home.eyebrow")}
            </p>
            <h1 class="text-3xl font-semibold tracking-tight text-secondary-900 sm:text-4xl">
              {t("home.title")}
            </h1>
            <p class="text-base text-secondary-600">{t("home.description")}</p>
          </header>

          <div class="space-y-3">
            <Button as="a" href={localizedPath(locale, "/play")} class="px-7">
              {t("home.cta")}
            </Button>
            <p class="text-xs text-secondary-500">{t("home.helper")}</p>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};
