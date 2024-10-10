import {PtzArrow} from "./PtzArrow.tsx";
import { Card, Group, Stack, Switch} from "@mantine/core";
import {PtzRocker} from "./PtzRocker.tsx";
import {useToggle} from "@mantine/hooks";
import {useConnectedState} from "@splcode/state-client";

function LinkedPtzArrow() {
    const [pt, , setPt] = useConnectedState('cam1/pt');

    return (
        <PtzArrow
            // value={{x: (pan+1)/2, y: (tilt+1)/2}}
            value={{x: (pt.x+1)/2, y: (pt.y+1)/2}}
            setValue={(value) => {
                setPt({x:(value.x * 2) - 1, y:(value.y * 2) - 1})
            }}
        />
    )

}

export function PtzControl() {

    const [af, toggleAf] = useToggle([true, false]);

    return (
        <div>
            <Card w={400} withBorder>
                <Stack align={'center'}>
                    <LinkedPtzArrow/>
                    <Group>
                        <PtzRocker description='Zoom'/>
                        <PtzRocker description='Focus'/>
                    </Group>
                    <Group>
                        <Switch
                            checked={af}
                            onChange={() => toggleAf()}
                            label='Auto Focus'
                            mt="md"
                        />
                    </Group>
                </Stack>
            </Card>
        </div>
    );
}
