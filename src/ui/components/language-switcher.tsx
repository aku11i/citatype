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

const switcherRoot = cva("flex items-center gap-3 text-xs");

const switcherLabel = cva(
  "text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary-400",
);

const switcherContainer = cva(
  "inline-flex items-center rounded-full border border-secondary-200 bg-white/80 p-1 text-secondary-600 shadow-sm backdrop-blur",
);

const switcherOption = cva(
  "rounded-full px-3 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200",
  {
    variants: {
      tone: {
        active: "bg-secondary-900 text-white shadow-sm",
        inactive: "text-secondary-500 hover:text-secondary-700",
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
