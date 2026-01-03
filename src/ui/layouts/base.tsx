import type { FC, PropsWithChildren } from "hono/jsx";
import type { Translate } from "../../i18n/createI18n.js";
import type { Locale } from "../../i18n/locales.js";
import type { PageMeta } from "../../i18n/page-meta.js";
import { LanguageSwitcher } from "../components/language-switcher.js";

type BaseLayoutProps = PropsWithChildren<{
  title: string;
  locale: Locale;
  meta: PageMeta;
  t: Translate;
  scene?: "typing" | "calm";
}>;

export const BaseLayout: FC<BaseLayoutProps> = ({ title, locale, meta, t, scene, children }) => {
  const bodyClass = "min-h-screen font-sans text-text-primary";

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/tailwind.css" />
        <link rel="canonical" href={meta.canonicalUrl} />
        {meta.alternates.map((alternate) => (
          <link rel="alternate" hreflang={alternate.locale} href={alternate.href} />
        ))}
        <title>{title}</title>
      </head>
      <body class={bodyClass} data-scene={scene}>
        <main class="mx-auto max-w-3xl px-8 py-12">
          <div class="mb-8 flex justify-end">
            <LanguageSwitcher
              locale={locale}
              path={meta.path}
              label={t("languageSwitcher.label")}
              options={[
                { locale: "ja", label: t("languageSwitcher.ja") },
                { locale: "en", label: t("languageSwitcher.en") },
              ]}
            />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
};
