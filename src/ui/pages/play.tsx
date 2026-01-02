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
  const sentenceCount = pack.sentences.length;
  const sentenceLabel = sentenceCount === 1 ? t("play.sentenceLabel") : t("play.sentencesLabel");

  const typingSessionData: TypingSessionData = {
    pack,
    messages: {
      sentenceLabel: t("typingSession.sentenceLabel"),
      typeHereLabel: t("typingSession.typeHereLabel"),
      placeholder: t("typingSession.placeholder"),
      helper: t("typingSession.helper"),
      statusMissed: t("typingSession.statusMissed"),
      statusComplete: t("typingSession.statusComplete"),
      statusRedirect: t("typingSession.statusRedirect"),
      statusUnavailable: t("typingSession.statusUnavailable"),
    },
  };

  return (
    <BaseLayout title={t("meta.playTitle")} locale={locale} meta={meta} t={t} scene="typing">
      <div class="space-y-8">
        <header class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-400">
            {t("play.eyebrow")}
          </p>
          <h1 class="text-2xl font-semibold tracking-tight text-secondary-900">
            {t("play.title")}
          </h1>
          <p class="text-sm text-secondary-600">
            {t("play.description", { count: sentenceCount, label: sentenceLabel })}
          </p>
        </header>

        <form method="post" action={localizedPath(locale, "/result")} class="space-y-6">
          <input type="hidden" name="startedAt" value={String(startedAt)} />
          <typing-session id="typing-session"></typing-session>
        </form>

        <WebComponentData targetId="typing-session" data={typingSessionData} />

        <a
          href={localizedPath(locale, "/")}
          class="text-sm font-medium text-secondary-500 hover:text-secondary-700"
        >
          {t("play.backLink")}
        </a>

        <script type="module" src="/client-components/typing-session.js"></script>
      </div>
    </BaseLayout>
  );
};
