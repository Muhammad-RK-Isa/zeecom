import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}), react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    }
  },
  "server": {
    proxy: {
      "/api/admin": {
        target: process.env.SERVER_URL ?? "http://localhost:8000",
      }
    }
  }
})