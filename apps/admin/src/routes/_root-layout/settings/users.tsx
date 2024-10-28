import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root-layout/settings/users')({
  component: () => <div>Hello /_root-layout/settings/users!</div>,
})
