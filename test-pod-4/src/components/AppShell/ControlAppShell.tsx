import {ActionIcon, AppShell, Burger, Center, Grid, Group, Divider, Paper, rem, Tabs, Space} from '@mantine/core';
import classes from './ControlAppShell.module.css';
import {Outlet, useNavigate, useParams} from "@tanstack/react-router";
import './ControlAppShell.css'
import {
  IconAdjustmentsFilled,
  IconGridDots,
  IconPlayerRecord, IconPlayerRecordFilled,
} from "@tabler/icons-react";
import {useDisclosure, useTimeout, useToggle} from "@mantine/hooks";
import {useEffect, useState} from "react";

export function ControlAppShell() {

  const [opened, { toggle }] = useDisclosure();

  const [recording, toggleRecording ] = useToggle();

  const [waitRecording , setWaitRecording] = useState(false);

  const { start } = useTimeout(() => recordingDoesToggle(), 1000);

  const navigate = useNavigate()
  const { tabValue } = useParams({});

  function recordingTryToggle() {
    setWaitRecording(true);
    start()
  }

  function recordingDoesToggle() {
    setWaitRecording(false);
    toggleRecording();
  }

  useEffect(() => {
    console.log(recording);
  }, [recording]);

  return (
      <>
        <AppShell
            header={{ height: 90 }}
            h={'100%'}
        >

          <AppShell.Header>
            <Group h="100%" px="md">
              <Group justify="space-between" style={{ flex: 1 }}>

                <Space/>


                <ActionIcon
                    variant={recording ? "filled" : "outline"}
                    color={recording ? 'var(--mantine-color-red-9)' : undefined }
                    size="xl"
                    radius="xl"
                    loading={waitRecording}
                    loaderProps={{ type: 'oval' }}
                    onClick={() => recordingTryToggle()}
                >
                  { recording ? <IconPlayerRecordFilled /> : <IconPlayerRecord />}
                </ActionIcon>


                <Paper  pb={'md'}  w={350} h={70} bg={'var(--mantine-color-dark-9)'}>
                  <Grid>
                    <Grid.Col span={12}  h={40} style={{ borderBottom: 1, borderColor: 'white'}} >
                      <Center h={34}>
                        HI
                      </Center>
                      <Divider />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Center >
                        HI
                      </Center>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Center>
                        HI
                      </Center>
                    </Grid.Col>
                  </Grid>
                </Paper>
                <Tabs
                    variant="unstyled"
                    defaultValue="mixer"
                    classNames={classes}
                    value={tabValue}
                    onChange={(value) => navigate({to: `/control/${value}`})}
                >
                  <Tabs.List grow>
                    <Tabs.Tab
                        value="mixer"
                        leftSection={<IconAdjustmentsFilled style={{ width: rem(16), height: rem(16) }} />}
                    >
                      Mixer
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="controls"
                        leftSection={<IconGridDots style={{ width: rem(16), height: rem(16) }} />}
                    >
                      Controls
                    </Tabs.Tab>

                  </Tabs.List>
                </Tabs>

                <Burger size="lg" opened={opened} onClick={toggle} aria-label="Toggle navigation" />

              </Group>
            </Group>
          </AppShell.Header>


          <AppShell.Main h={'100%'}>
            <Outlet />
          </AppShell.Main>

        </AppShell>

      </>
  )
}