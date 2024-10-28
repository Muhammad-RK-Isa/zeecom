import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root-layout/customers/')({
  component: () => <div>Hello /_root-layout/customers/!</div>,
})
