import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById('__zecom')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<RouterProvider router={router} />)
}