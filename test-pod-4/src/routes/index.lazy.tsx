import { createLazyFileRoute } from '@tanstack/react-router'
import {Welcome} from "../components/Welcome/Welcome.tsx";

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {

    return (
        <>
            <Welcome />
        </>
    )
}