import type { FC } from "hono/jsx";
import { Button } from "../components/button.js";
import { BaseLayout } from "../layouts/base.js";

type ResultPageProps = {
  elapsedMs: number | null;
};

const formatElapsed = (elapsedMs: number | null) => {
  if (elapsedMs == null || !Number.isFinite(elapsedMs) || elapsedMs < 0) {
    return "--";
  }

  return `${(elapsedMs / 1000).toFixed(2)} s`;
};

export const ResultPage: FC<ResultPageProps> = ({ elapsedMs }) => {
  return (
    <BaseLayout title="Result | Citatype">
      <div class="space-y-8">
        <header class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-400">Result</p>
          <h1 class="text-2xl font-semibold tracking-tight text-secondary-900">Session Time</h1>
          <p class="text-sm text-secondary-600">Time measured for this session.</p>
        </header>

        <section class="rounded-2xl border border-secondary-200 bg-white p-6 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-400">Time</p>
          <p class="mt-3 text-4xl font-semibold text-secondary-900">{formatElapsed(elapsedMs)}</p>
        </section>

        <div class="flex flex-wrap gap-3">
          <form method="get" action="/play">
            <Button type="submit" class="px-6">
              Play again
            </Button>
          </form>
          <form method="get" action="/">
            <Button type="submit" variant="outline" color="secondary" class="px-6">
              Home
            </Button>
          </form>
        </div>
      </div>
    </BaseLayout>
  );
};
