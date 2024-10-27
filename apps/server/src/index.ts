import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello 🔥 Hono!')
})

Bun.serve({
  fetch: app.fetch,
  port: 8000,
})

console.log('⚡️ Hono server is running at http://localhost:8000')

