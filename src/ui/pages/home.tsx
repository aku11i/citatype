import type { FC } from "hono/jsx";
import { Button } from "../components/button.js";
import { BaseLayout } from "../layouts/base.js";

export const HomePage: FC = () => {
  return (
    <BaseLayout title="Citatype">
      <section class="relative overflow-hidden">
        <div
          aria-hidden="true"
          class="pointer-events-none absolute -left-16 -top-24 h-56 w-56 rounded-full bg-primary-100/70 blur-3xl"
        ></div>
        <div
          aria-hidden="true"
          class="pointer-events-none absolute left-24 top-24 h-72 w-72 rounded-full bg-primary-200/50 blur-3xl"
        ></div>

        <div class="relative flex min-h-[60vh] flex-col justify-center gap-10 py-8">
          <header class="max-w-xl space-y-4">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-secondary-400">
              Calm Typing
            </p>
            <h1 class="text-3xl font-semibold tracking-tight text-secondary-900 sm:text-4xl">
              Citatype
            </h1>
            <p class="text-base text-secondary-600">
              A quiet typing session for relaxation, not practice.
            </p>
          </header>

          <div class="space-y-3">
            <Button as="a" href="/play" class="px-7">
              START
            </Button>
            <p class="text-xs text-secondary-500">No setup. Just begin.</p>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};
