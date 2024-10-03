import {createRootRoute, Outlet} from '@tanstack/react-router'
import '@mantine/core/styles.css';
import {TanStackRouterDevtools} from "@tanstack/router-devtools";

export const Route = createRootRoute({
    component: RootComponent,
})


function RootComponent() {

    return (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    )
}