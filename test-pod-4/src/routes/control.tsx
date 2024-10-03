import { createFileRoute } from '@tanstack/react-router'
import { ControlAppShell } from '../components/AppShell/ControlAppShell.tsx'
import '@mantine/core/styles.css'

export const Route = createFileRoute('/control')({
  component: ControlAppLayout,
})

function ControlAppLayout() {
  return <ControlAppShell />
}
