import {createFileRoute, Link, Outlet} from '@tanstack/react-router'
import {AppShell, Box, NavLink} from "@mantine/core";
import {IconHome2} from "@tabler/icons-react";

export const Route = createFileRoute('/control/controls')({
  component: () => (
      <>
      <Box component={'nav'} className={AppShell.classes.navbar} w={256}>
          <NavLink
              href="#required-for-focus"
              label="With icon"
              leftSection={<IconHome2 size="1rem" stroke={1.5} />}
              variant="filled"
              component={Link}
              to={'/control/controls/audio'}
          />
          <NavLink
              href="#required-for-focus"
              label="With icon"
              leftSection={<IconHome2 size="1rem" stroke={1.5} />}
              variant="filled"
              component={Link}
              to={'/control/controls/video'}
          />

      </Box>
      <AppShell.Main bg={'var(--mantine-color-dark-9)'} ps={'calc(16rem + var(--app-shell-padding))'} >
          <Outlet/>
      </AppShell.Main>
        </>
  ),
})
