import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root-layout/collections')({
  component: () => <div>Hello /_root-layout/collections!</div>,
})
