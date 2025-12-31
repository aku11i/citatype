import { Hono } from 'hono'
import { handleHome } from './handlers/home.js'

const app = new Hono()

app.get('/', handleHome)

export { app }
