import type { FC } from 'hono/jsx'
import { BaseLayout } from '../layouts/base.js'

export const HomePage: FC = () => {
  return (
    <BaseLayout title="DakenMania">
      <div class="space-y-4">
        <h1 class="text-3xl font-semibold tracking-tight">DakenMania</h1>
        <p class="text-base text-slate-700">
          Hono + TypeScript Go + tsx ready.
        </p>
      </div>
    </BaseLayout>
  )
}
