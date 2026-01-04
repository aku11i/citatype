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
  const helperText = t("home.helper");
  const showHelper = helperText.trim().length > 0;

  return (
    <BaseLayout title={t("meta.homeTitle")} locale={locale} meta={meta} t={t} scene="calm">
      <section>
        <div class="relative flex min-h-[60vh] flex-col justify-center gap-12 py-8">
          <header class="max-w-xl space-y-4">
            <h1 class="text-[40px] font-semibold leading-snug tracking-tight text-text-primary sm:text-[56px]">
              <span class="block">{t("home.titleLine1")}</span>{" "}
              <span class="block whitespace-nowrap">{t("home.titleLine2")}</span>
            </h1>
            <p class="text-base text-text-secondary">{t("home.description")}</p>
          </header>

          <div class="space-y-4">
            <Button as="a" href={localizedPath(locale, "/play")}>
              {t("home.cta")}
            </Button>
            {showHelper ? <p class="text-sm text-text-secondary">{helperText}</p> : null}
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};
