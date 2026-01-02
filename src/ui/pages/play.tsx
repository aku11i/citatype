import type { FC } from "hono/jsx";
import { BaseLayout } from "../layouts/base.js";

type PlayPageProps = {
  startedAt: number;
};

export const PlayPage: FC<PlayPageProps> = ({ startedAt }) => {
  return (
    <BaseLayout title="Play | Citatype" scene="typing">
      <div class="space-y-8">
        <header class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-400 dark:text-secondary-300">
            Session
          </p>
          <h1 class="text-2xl font-semibold tracking-tight text-secondary-900 dark:text-secondary-100">
            Play
          </h1>
          <p class="text-sm text-secondary-600 dark:text-secondary-300">
            Type three sentences in order. When you finish, the result page will open automatically.
          </p>
        </header>

        <form method="post" action="/result" class="space-y-6">
          <input type="hidden" name="startedAt" value={String(startedAt)} />
          <typing-session></typing-session>
        </form>

        <a
          href="/"
          class="text-sm font-medium text-secondary-500 hover:text-secondary-700 dark:text-secondary-300 dark:hover:text-secondary-100"
        >
          Back to home
        </a>

        <script type="module" src="/client-components/typing-session.js"></script>
      </div>
    </BaseLayout>
  );
};
