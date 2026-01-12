import type { FC } from "hono/jsx";
import { cva } from "class-variance-authority";
import type { Locale } from "../../i18n/locales.js";
import { localizedPath } from "../../i18n/paths.js";

export type LanguageSwitcherProps = {
  locale: Locale;
  path: string;
  label: string;
  options: Array<{ locale: Locale; label: string }>;
};

const switcherRoot = cva("flex items-center gap-4");

const switcherLabel = cva("text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary");

const switcherContainer = cva(
  "inline-flex items-center rounded-full bg-bg-disabled p-1 text-text-secondary",
);

const switcherOption = cva(
  "rounded-full px-3 py-1 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted",
  {
    variants: {
      tone: {
        active: "bg-bg-selected text-text-inverse",
        inactive: "text-text-secondary hover:text-text-primary",
      },
    },
    defaultVariants: {
      tone: "inactive",
    },
  },
);

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ locale, path, label, options }) => {
  return (
    <nav aria-label={label} class={switcherRoot()}>
      <span class={switcherLabel()}>{label}</span>
      <div class={switcherContainer()}>
        {options.map((option) => {
          const isActive = option.locale === locale;

          return (
            <a
              href={localizedPath(option.locale, path)}
              aria-current={isActive ? "page" : undefined}
              class={switcherOption({ tone: isActive ? "active" : "inactive" })}
            >
              {option.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};
