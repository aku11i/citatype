import type { FC } from "hono/jsx";
import type { Locale } from "../../i18n/locales.js";
import { localizedPath } from "../../i18n/paths.js";

export type LanguageSwitcherProps = {
  locale: Locale;
  path: string;
  label: string;
  options: Array<{ locale: Locale; label: string }>;
  class?: string;
};

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  locale,
  path,
  label,
  options,
  class: className,
}) => {
  return (
    <nav
      aria-label={label}
      class={"flex items-center gap-3 text-xs" + (className ? ` ${className}` : "")}
    >
      <span class="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary-400 dark:text-secondary-400">
        {label}
      </span>
      <div class="inline-flex items-center rounded-full border border-secondary-200 bg-white/80 p-1 text-secondary-600 shadow-sm backdrop-blur dark:border-secondary-700/70 dark:bg-secondary-900/60 dark:text-secondary-300">
        {options.map((option) => {
          const isActive = option.locale === locale;
          const baseClass =
            "rounded-full px-3 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 dark:focus-visible:ring-primary-500/40";
          const activeClass =
            "bg-secondary-900 text-white shadow-sm dark:bg-secondary-100 dark:text-secondary-900";
          const inactiveClass =
            "text-secondary-500 hover:text-secondary-700 dark:text-secondary-300 dark:hover:text-secondary-100";

          return (
            <a
              href={localizedPath(option.locale, path)}
              aria-current={isActive ? "page" : undefined}
              class={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
            >
              {option.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};
