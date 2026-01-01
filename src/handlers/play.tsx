import type { Context } from 'hono'
import { PlayPage } from '../ui/pages/play.js'

export const handleGetPlay = (c: Context) => {
  const startedAt = Date.now()
  return c.html(<PlayPage startedAt={startedAt} />)
}
