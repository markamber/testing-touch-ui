import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/control/controls/camera')({
  component: () => (
      <div>Hello /control/controls/camera!</div>
  )
})
