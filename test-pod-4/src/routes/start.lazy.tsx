import { createLazyFileRoute } from '@tanstack/react-router'
import {SessionStarter} from "../components/SessionStarter/SessionStarter.tsx";

export const Route = createLazyFileRoute('/start')({
    component: SessionStarter,
})