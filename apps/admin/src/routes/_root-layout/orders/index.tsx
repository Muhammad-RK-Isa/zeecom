import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root-layout/orders/')({
  component: () => <div>Hello /_root-layout/orders/!</div>,
})
