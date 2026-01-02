import type { FC } from "hono/jsx";
import type { Translate } from "../../i18n/createI18n.js";
import type { Locale } from "../../i18n/locales.js";
import type { PageMeta } from "../../i18n/page-meta.js";
import type { TypingSentence } from "../../i18n/messages/en.js";
import { localizedPath } from "../../i18n/paths.js";
import { BaseLayout } from "../layouts/base.js";

type PlayPageProps = {
  startedAt: number;
  locale: Locale;
  t: Translate;
  meta: PageMeta;
  sentences: TypingSentence[];
};

export const PlayPage: FC<PlayPageProps> = ({ startedAt, locale, t, meta, sentences }) => {
  const sentencePayload = JSON.stringify(sentences);

  return (
    <BaseLayout title={t("meta.playTitle")} locale={locale} meta={meta} t={t} scene="typing">
      <div class="space-y-8">
        <header class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-400 dark:text-secondary-300">
            {t("play.eyebrow")}
          </p>
          <h1 class="text-2xl font-semibold tracking-tight text-secondary-900 dark:text-secondary-100">
            {t("play.title")}
          </h1>
          <p class="text-sm text-secondary-600 dark:text-secondary-300">{t("play.description")}</p>
        </header>

        <form method="post" action={localizedPath(locale, "/result")} class="space-y-6">
          <input type="hidden" name="startedAt" value={String(startedAt)} />
          <typing-session
            data-locale={locale}
            data-sentences={sentencePayload}
            data-label-sentence={t("typingSession.sentenceLabel")}
            data-label-type-here={t("typingSession.typeHereLabel")}
            data-placeholder={t("typingSession.placeholder")}
            data-helper={t("typingSession.helper")}
            data-status-missed={t("typingSession.statusMissed")}
            data-status-complete={t("typingSession.statusComplete")}
            data-status-redirect={t("typingSession.statusRedirect")}
          ></typing-session>
        </form>

        <a
          href={localizedPath(locale, "/")}
          class="text-sm font-medium text-secondary-500 hover:text-secondary-700 dark:text-secondary-300 dark:hover:text-secondary-100"
        >
          {t("play.backLink")}
        </a>

        <script type="module" src="/client-components/typing-session.js"></script>
      </div>
    </BaseLayout>
  );
};
