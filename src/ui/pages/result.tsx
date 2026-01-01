import type { FC } from 'hono/jsx'
import { BaseLayout } from '../layouts/base.js'

type ResultPageProps = {
  elapsedMs: number | null
}

const formatElapsed = (elapsedMs: number | null) => {
  if (elapsedMs == null || !Number.isFinite(elapsedMs) || elapsedMs < 0) {
    return '--'
  }

  return `${(elapsedMs / 1000).toFixed(2)} s`
}

export const ResultPage: FC<ResultPageProps> = ({ elapsedMs }) => {
  return (
    <BaseLayout title="Result | DakenMania">
      <div class="space-y-8">
        <header class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Result
          </p>
          <h1 class="text-2xl font-semibold tracking-tight">Session Time</h1>
          <p class="text-sm text-slate-600">Time measured for this session.</p>
        </header>

        <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Time
          </p>
          <p class="mt-3 text-4xl font-semibold text-slate-900">
            {formatElapsed(elapsedMs)}
          </p>
        </section>

        <div class="flex flex-wrap gap-3">
          <a
            href="/play"
            class="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Play again
          </a>
          <a
            href="/"
            class="inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
          >
            Home
          </a>
        </div>
      </div>
    </BaseLayout>
  )
}
