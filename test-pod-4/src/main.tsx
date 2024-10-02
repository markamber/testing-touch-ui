// @ts-ignore
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { FaderMeterProvider } from "./lib/StateProvider.tsx";


// Import the generated route tree
import { routeTree } from './routeTree.gen'
import {MantineProvider} from "@mantine/core";
import {theme} from "./theme.ts";

// Create a new router instance
const router = createRouter({ routeTree })


// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}



// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <FaderMeterProvider>
                <MantineProvider theme={theme}>
                    <RouterProvider router={router} />
                </MantineProvider>
            </FaderMeterProvider>
        </StrictMode>,
    )
}