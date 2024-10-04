import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/control/controls/video')({
  component: () => <div>Hello /control/controls/video!</div>,
})
