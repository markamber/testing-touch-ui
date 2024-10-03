import './SessionStarter.css'
import {StarterStepper} from "./StarterStepper.tsx";
import {Center, Paper} from "@mantine/core";

export function SessionStarter() {


    return (
        <Center h={'100%'}>
            <Paper w={'1000'} p={'xl'}>
                <StarterStepper />
            </Paper>
        </Center>
    );
}