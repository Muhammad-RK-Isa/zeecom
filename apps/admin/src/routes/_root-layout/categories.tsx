import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root-layout/categories')({
  component: () => <div>Hello /_root-layout/categories!</div>,
})
