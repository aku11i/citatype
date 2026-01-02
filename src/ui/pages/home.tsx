import type { FC } from "hono/jsx";
import { Button } from "../components/button.js";
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
          <form method="get" action="/play">
            <Button type="submit" class="px-6">
              PLAY
            </Button>
          </form>
          <p class="text-xs text-secondary-500">Press play to start immediately.</p>
        </div>
      </div>
    </BaseLayout>
  );
};
