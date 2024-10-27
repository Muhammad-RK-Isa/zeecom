import { trpcServer } from '@hono/trpc-server'
import { adminRouter, createAdminContext } from '@zeecom/api/admin'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { handlers } from "@zeecom/uploader";

const app = new Hono()

app.use(cors())

app.use(
  "/api/admin/trpc/*",
  trpcServer({
    router: adminRouter,
    createContext: createAdminContext,
    endpoint: "/api/admin/trpc",
  }),
);

app.all("/api/uploader", (context) => handlers(context.req.raw));

Bun.serve({
  fetch: app.fetch,
  port: 8000,
  hostname: "0.0.0.0",
})

console.log('⚡️ Hono server is running at http://localhost:8000')

