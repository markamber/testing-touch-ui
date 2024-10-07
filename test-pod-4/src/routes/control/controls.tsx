import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { AppShell, Box, NavLink } from "@mantine/core";
import { IconBulb, IconDeviceCctv, IconDeviceSpeaker, IconDeviceTv } from "@tabler/icons-react";

const navItems = [
    {
        label: "Audio",
        icon: <IconDeviceSpeaker size="1rem" stroke={1.5} />,
        to: '/control/controls/audio'
    },
    {
        label: "Cameras",
        icon: <IconDeviceCctv size="1rem" stroke={1.5} />,
        to: '/control/controls/camera'
    },
    {
        label: "Video",
        icon: <IconDeviceTv size="1rem" stroke={1.5} />,
        to: '/control/controls/video'
    },
    {
        label: "Room",
        icon: <IconBulb size="1rem" stroke={1.5} />,
        to: '/control/controls/room'
    }
];

export const Route = createFileRoute('/control/controls')({
    component: () => (
        <>
            <Box component={'nav'} className={AppShell.classes.navbar} w={256}>
                {navItems.map(({ label, icon, to }) => (
                    <NavLink
                        key={to}
                        href="#required-for-focus"
                        label={label}
                        leftSection={icon}
                        variant="filled"
                        component={Link}
                        to={to}
                    />
                ))}
            </Box>
            <AppShell.Main bg={'var(--mantine-color-dark-9)'} ps={'calc(16rem + var(--app-shell-padding))'}>
                <Outlet/>
            </AppShell.Main>
        </>
    ),
})