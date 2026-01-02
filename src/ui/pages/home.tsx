import type { FC } from "hono/jsx";
import { BaseLayout } from "../layouts/base.js";

export const HomePage: FC = () => {
  return (
    <BaseLayout title="Citatype">
      <div class="space-y-10">
        <header class="space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-400">
            Typing Practice
          </p>
          <h1 class="text-3xl font-semibold tracking-tight text-secondary-900">Citatype</h1>
          <p class="text-base text-secondary-600">
            A simple typing session with no modes or extra settings.
          </p>
        </header>

        <div class="space-y-3">
          <a
            href="/play"
            class="inline-flex items-center justify-center rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-secondary-900 shadow-sm transition hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
          >
            PLAY
          </a>
          <p class="text-xs text-secondary-500">Press play to start immediately.</p>
        </div>
      </div>
    </BaseLayout>
  );
};
