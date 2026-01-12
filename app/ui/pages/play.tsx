import type { FC } from "hono/jsx";
import type { Translate } from "../../i18n/createI18n.js";
import type { Locale } from "../../i18n/locales.js";
import type { PageMeta } from "../../i18n/page-meta.js";
import { localizedPath } from "../../i18n/paths.js";
import type { SentencePack } from "../../domain/sentences/parse-sentence-pack.js";
import { BaseLayout } from "../layouts/base.js";
import { WebComponentData } from "../components/web-component-data.js";
import type { TypingSessionData } from "../client-components/typing-session.js";

type PlayPageProps = {
  startedAt: number;
  locale: Locale;
  t: Translate;
  meta: PageMeta;
  pack: SentencePack;
};

export const PlayPage: FC<PlayPageProps> = ({ startedAt, locale, t, meta, pack }) => {
  const typingSessionData: TypingSessionData = {
    pack,
    messages: {
      sentenceLabel: t("typingSession.sentenceLabel"),
      typeHereLabel: t("typingSession.typeHereLabel"),
      placeholder: t("typingSession.placeholder"),
      helper: t("typingSession.helper"),
      focusHint: t("typingSession.focusHint"),
      statusMissed: t("typingSession.statusMissed"),
      statusComplete: t("typingSession.statusComplete"),
      statusRedirect: t("typingSession.statusRedirect"),
    },
  };

  return (
    <BaseLayout title={t("meta.playTitle")} locale={locale} meta={meta} t={t} scene="typing">
      <div class="space-y-8">
        <header class="space-y-4">
          <h1 class="text-[32px] font-semibold tracking-tight text-text-primary">
            {t("play.title")}
          </h1>
        </header>

        <form method="post" action={localizedPath(locale, "/result")} class="space-y-8">
          <input type="hidden" name="startedAt" value={String(startedAt)} />
          <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:items-start">
            <typing-session id="typing-session"></typing-session>
            <section class="space-y-2 text-text-secondary">
              <p class="text-[32px] font-semibold leading-none tabular-nums">
                <elapsed-timer data-started-at={String(startedAt)}>0:00</elapsed-timer>
              </p>
              <p class="text-xs font-medium">{t("play.statsElapsedLabel")}</p>
            </section>
          </div>
        </form>

        <WebComponentData targetId="typing-session" data={typingSessionData} />

        <a
          href={localizedPath(locale, "/")}
          class="text-sm font-medium text-text-secondary hover:text-accent-primary"
        >
          {t("play.backLink")}
        </a>
      </div>
    </BaseLayout>
  );
};
