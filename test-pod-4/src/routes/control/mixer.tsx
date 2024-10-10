import { createFileRoute } from '@tanstack/react-router'
import {Stack, AppShell, ScrollArea} from '@mantine/core'
import { FaderTrack } from '../../components/FaderTrack/FaderTrack.tsx'

export const Route = createFileRoute('/control/mixer')({
  component: Mixer,
})

const states = [1,2,3,4,5,6].map( e => ({
  number: e,
  fader: `cart/mixer.fader${e}`,
  meter: `cart/mixer/meter${e}`
}))

function Mixer() {


  return (
    <AppShell.Main h={'100vh'}>
      <ScrollArea h={'100%'} type={'auto'} offsetScrollbars>
        <Stack align="stretch" justify="flex-end" h={'100%'} gap={0}>
          {states.map((faderValue) => (
            <FaderTrack
                key={faderValue.number}
                number={faderValue.number}
                fader={faderValue.fader}
                meter={faderValue.meter}
            />
          ))}
        </Stack>
      </ScrollArea>
    </AppShell.Main>
  )
}
