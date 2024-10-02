import { createLazyFileRoute } from '@tanstack/react-router';
import { Group, Stack } from "@mantine/core";
import { FaderStack } from "../components/FaderStack/FaderStack.tsx";
import { useFaderMeterContext } from '../lib/StateProvider'; // Assuming the context is defined as FaderMeterContext.tsx

export const Route = createLazyFileRoute('/mixer')({
    component: Mixer,
});

function Mixer() {

    const faderMeterContext = useFaderMeterContext();

    const setValue = (number: number, newValue: number) => {
        if (faderMeterContext?.sendFaderValues) {
            const updatedFaders = faderMeterContext.faders.map((fader, index) =>
                index === number - 1 ? newValue : fader
            );
            faderMeterContext.sendFaderValues(updatedFaders);
        }
    };

    if (!faderMeterContext) {
        return <div>Loading...</div>;
    }

    return (
        <Stack
            align="stretch"
            bg="var(--mantine-color-body)"
            justify="flex-end"
            h={'100%'}
        >
            <Group>
                {faderMeterContext.faders.map((faderValue, index) => (

                    <FaderStack
                        key={index}
                        fader={{
                            number: index + 1,
                            value: faderValue,
                            meter: faderMeterContext.meters[index],
                        }}
                        onChange={(newValue: number) => setValue(index + 1, newValue)}
                    />

                ))}
            </Group>
        </Stack>
    );
}
