import { createFileRoute } from '@tanstack/react-router'
import {Stack, AppShell, ScrollArea} from '@mantine/core'
import { useFaderMeterContext } from '../../lib/StateProvider.tsx'
import { FaderTrack } from '../../components/FaderTrack/FaderTrack.tsx' // Assuming the context is defined as FaderMeterContext.tsx

export const Route = createFileRoute('/control/mixer')({
  component: Mixer,
})

function Mixer() {
  const faderMeterContext = useFaderMeterContext()

  const setValue = (number: number, newValue: number) => {
    if (faderMeterContext?.sendFaderValues) {
      const updatedFaders = faderMeterContext.faders.map((fader, index) =>
        index === number - 1 ? newValue : fader,
      )
      faderMeterContext.sendFaderValues(updatedFaders)
    }
  }

  if (!faderMeterContext) {
    return <div>Loading...</div>
  }

  return (
    <AppShell.Main h={'100vh'}>
      <ScrollArea h={'100%'} type={'auto'} offsetScrollbars>
        <Stack align="stretch" justify="flex-end" h={'100%'} gap={0}>
          {faderMeterContext.faders.map((faderValue, index) => (
            <FaderTrack
              key={index}
              fader={{
                number: index + 1,
                value: faderValue,
                meter: faderMeterContext.meters[index],
              }}
              onChange={(newValue: number) => setValue(index + 1, newValue)}
            />
          ))}
        </Stack>
      </ScrollArea>
    </AppShell.Main>
  )
}
