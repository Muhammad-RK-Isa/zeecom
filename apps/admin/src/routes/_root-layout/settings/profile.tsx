import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root-layout/settings/profile')({
  component: () => <div>Hello /_root-layout/settings/profile!</div>,
})
