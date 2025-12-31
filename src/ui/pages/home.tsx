import type { FC } from 'hono/jsx'
import { BaseLayout } from '../layouts/base.js'

export const HomePage: FC = () => {
  return (
    <BaseLayout title="DakenMania">
      <div class="space-y-8">
        <header class="space-y-2">
          <h1 class="text-3xl font-semibold tracking-tight">DakenMania</h1>
          <p class="text-base text-slate-700">
            Web Components are wired for client-side interactions.
          </p>
        </header>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-slate-900">Counter Demo</h2>
          <dm-counter></dm-counter>
          <p class="text-xs text-slate-500">
            Loaded from /client-components/counter.js
          </p>
        </section>

        <script type="module" src="/client-components/counter.js"></script>
      </div>
    </BaseLayout>
  )
}
