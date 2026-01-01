import type { FC } from 'hono/jsx'
import { BaseLayout } from '../layouts/base.js'

type PlayPageProps = {
  startedAt: number
}

export const PlayPage: FC<PlayPageProps> = ({ startedAt }) => {
  return (
    <BaseLayout title="Play | DakenMania">
      <div class="space-y-8">
        <header class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Session
          </p>
          <h1 class="text-2xl font-semibold tracking-tight">Play</h1>
          <p class="text-sm text-slate-600">
            Type three sentences in order. When you finish, the result page will
            open automatically.
          </p>
        </header>

        <form method="post" action="/result" class="space-y-6">
          <input type="hidden" name="startedAt" value={String(startedAt)} />
          <typing-session></typing-session>
        </form>

        <a href="/" class="text-sm font-medium text-slate-500 hover:text-slate-700">
          Back to home
        </a>

        <script type="module" src="/client-components/typing-session.js"></script>
      </div>
    </BaseLayout>
  )
}
