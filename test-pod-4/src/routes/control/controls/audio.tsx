import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/control/controls/audio')({
  component: () => <div>Hello /control/controls/audio!</div>,
})
