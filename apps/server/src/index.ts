import { trpcServer } from '@hono/trpc-server'
import { adminRouter, createAdminContext } from '@zeecom/api/admin'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(cors())

app.get('/', (c) => {
  return c.text('Hello 🔥 Hono!')
})

app.basePath("/api")

app.use(
  "/admin/trpc/*",
  trpcServer({
    router: adminRouter,
    createContext: createAdminContext,
    endpoint: "/api/admin/trpc",
  }),
);

Bun.serve({
  fetch: app.fetch,
  port: 8000,
})

console.log('⚡️ Hono server is running at http://localhost:8000')

