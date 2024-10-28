import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root-layout/settings/')({
  component: () => <div>Hello /_root-layout/settings/!</div>,
})
