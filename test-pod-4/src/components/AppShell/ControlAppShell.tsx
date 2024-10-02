import { AppShell, Burger, Group } from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
import classes from './ControlAppShell.module.css';
import {Link, Outlet} from "@tanstack/react-router";

export function ControlAppShell() {
  const [opened, { toggle }] = useDisclosure();

  return (
      <>
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
            padding="md"
            h={'100%'}
        >

          <AppShell.Header>
            <Group h="100%" px="md">
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Group justify="space-between" style={{ flex: 1 }}>
                <Group ml="xl" gap={0} visibleFrom="sm">
                  <Link to="/" className={classes.control}>
                    Home
                  </Link>{' '}
                  <Link to="/mixer" className={classes.control}>
                    Mixer
                  </Link>
                </Group>
              </Group>
            </Group>
          </AppShell.Header>

          <AppShell.Navbar py="md" px={4}>

          </AppShell.Navbar>

          <AppShell.Main
          h={'100%'}>
            <Outlet />
          </AppShell.Main>

        </AppShell>

      </>
  )
}