import {createRootRoute, Outlet} from '@tanstack/react-router'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '../lib/root100.css'
import {initializeSocket} from '@splcode/state-client'

export const Route = createRootRoute({
    component: RootComponent,
})

initializeSocket('http://192.168.20.166:4000');

function RootComponent() {

    return (
        <>
            <Outlet />
        </>
    )
}