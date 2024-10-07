import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/control/controls/room')({
  component: () => <div>Hello /control/controls/room!</div>,
})
