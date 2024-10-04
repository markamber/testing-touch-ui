import { createFileRoute } from '@tanstack/react-router'
import { ControlAppShell } from '../components/AppShell/ControlAppShell.tsx'

export const Route = createFileRoute('/control')({
  component: ControlAppLayout,
})

function ControlAppLayout() {
  return <ControlAppShell />
}
