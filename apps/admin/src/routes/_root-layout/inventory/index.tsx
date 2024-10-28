import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root-layout/inventory/')({
  component: () => <div>Hello /_root-layout/inventory/!</div>,
})
