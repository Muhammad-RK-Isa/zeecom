import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root-layout/inventory/$id')({
  component: () => <div>Hello /_root-layout/inventory/$id!</div>,
})
