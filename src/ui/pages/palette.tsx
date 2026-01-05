import type { FC } from "hono/jsx";
import type { Translate } from "../../i18n/createI18n.js";
import type { Locale } from "../../i18n/locales.js";
import type { PageMeta } from "../../i18n/page-meta.js";
import { BaseLayout } from "../layouts/base.js";

type PalettePageProps = {
  locale: Locale;
  t: Translate;
  meta: PageMeta;
};

type ColorCandidate = {
  name: string;
  hex: string;
  note: string;
};

const currentAccent: ColorCandidate = {
  name: "Current Accent (Orange)",
  hex: "#AC442A",
  note: "Baseline accent for comparison.",
};

const primaryCandidates: ColorCandidate[] = [
  { name: "Deep Teal", hex: "#2F6F6B", note: "Cool and precise without feeling cold." },
  { name: "Slate Blue", hex: "#2E4A6F", note: "Steady and technical with high clarity." },
  { name: "Graphite Green", hex: "#3F5E4B", note: "Muted with a grounded, industrial tone." },
  { name: "Steel Cyan", hex: "#2E6170", note: "Crisp and structured, slightly futuristic." },
  { name: "Muted Berry", hex: "#6B2F3A", note: "Quiet warmth while staying restrained." },
  { name: "Ink Olive", hex: "#5B5D3A", note: "Subtle contrast with a material feel." },
];

export const PalettePage: FC<PalettePageProps> = ({ locale, t, meta }) => {
  const buttonClass =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-text-inverse transition";

  return (
    <BaseLayout title={t("meta.paletteTitle")} locale={locale} meta={meta} t={t} scene="calm">
      <div class="space-y-8">
        <header class="space-y-4">
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-text-secondary">
            {t("palette.eyebrow")}
          </p>
          <h1 class="text-[32px] font-semibold tracking-tight text-text-primary">
            {t("palette.title")}
          </h1>
          <p class="text-base text-text-secondary">{t("palette.description")}</p>
        </header>

        <section class="rounded-[24px] bg-bg-surface p-8">
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-text-secondary">
            {t("palette.sectionLabel")}
          </p>

          <div class="mt-6 grid gap-6 sm:grid-cols-2">
            {[currentAccent, ...primaryCandidates].map((candidate) => (
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold text-text-primary">{candidate.name}</p>
                  <span class="text-xs font-semibold text-text-secondary">{candidate.hex}</span>
                </div>
                <button
                  type="button"
                  class={buttonClass}
                  style={`background-color: ${candidate.hex};`}
                >
                  {t("palette.buttonLabel")}
                </button>
                <p class="text-xs text-text-secondary">{candidate.note}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </BaseLayout>
  );
};
