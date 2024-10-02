import { createRootRoute } from '@tanstack/react-router'
import {ControlAppShell} from "../components/AppShell/ControlAppShell.tsx";
import '@mantine/core/styles.css';
import {TanStackRouterDevtools} from "@tanstack/router-devtools";

export const Route = createRootRoute({
    component: RootComponent,
})


function RootComponent() {

    return (
        <>
            <ControlAppShell />
            <TanStackRouterDevtools />
        </>
    )
}