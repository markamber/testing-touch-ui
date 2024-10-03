import { createLazyFileRoute } from '@tanstack/react-router'
import {Grid, Group, Paper, Stack, rem, Flex, Space, Text} from '@mantine/core'
import { FaderStack } from '../../components/FaderStack/FaderStack.tsx'
import { useFaderMeterContext } from '../../lib/StateProvider.tsx' // Assuming the context is defined as FaderMeterContext.tsx

export const Route = createLazyFileRoute('/control/mixer')({
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
      <>
        <Grid h={"25%"} align="stretch" styles={{inner: {height: '100%'}}} >
          <Grid.Col span={6}>
              <Paper radius={"sm"} h={'100%'} p={"sm"}>
                HI
              </Paper>
          </Grid.Col>
          <Grid.Col span={6} >
            <Paper radius={"sm"} h={'100%'} p={"sm"}>
              <Stack>
                <Text>hi</Text>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
        <Space h={'1%'}/>
        <Paper h={'74%'} p={"sm"} radius={"sm"}>
          <Stack
              align="stretch"
              justify="flex-end"
              h={'100%'}
          >
            <Group>
              {faderMeterContext.faders.map((faderValue, index) => (
                  <FaderStack
                      key={index}
                      fader={{
                        number: index + 1,
                        value: faderValue,
                        meter: faderMeterContext.meters[index],
                      }}
                      onChange={(newValue: number) => setValue(index + 1, newValue)}
                  />
              ))}
            </Group>
          </Stack>
        </Paper>
      </>
  )
}
