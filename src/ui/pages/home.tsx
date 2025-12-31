import type { FC } from 'hono/jsx'
import { BaseLayout } from '../layouts/base.js'

export const HomePage: FC = () => {
  return (
    <BaseLayout title="DakenMania">
      <h1>DakenMania</h1>
      <p>Hono + TypeScript Go + tsx ready.</p>
    </BaseLayout>
  )
}
