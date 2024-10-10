import {CCTSlider} from "./CCTSlider.tsx";
import {useState} from "react";
import { Group, Slider, Stack, Text} from "@mantine/core";
import classes from './LightBoard.module.css'

export function LightBoard() {

    const [cct, setCct] = useState(4000);
    return (
        <Stack
            align="flex-start"
            justify="flex-start"
            gap="md"
        >
            <Text className={classes.title}>Lighting Control</Text>

            <Group>
                <Text w={100}>Fixture 1</Text>
                <Slider w={400}/>
            </Group>

            <Group>
                <Text w={100}>Fixture 2</Text>
                <Slider w={400}/>
            </Group>

            <Group>
                <Text w={100}>Fixture 3</Text>
                <Slider w={400}/>
            </Group>

            <Group>
                <Text w={100}>Fixture 4</Text>
                <Slider w={400}/>
            </Group>

            <Group>
                <Text w={100}>Fixture 4</Text>
                <CCTSlider value={cct} onChange={setCct} highCCT={6000} lowCCT={2800}/>
            </Group>

            <Group>
                <Text w={100}>Master Level</Text>
                <Slider w={400}/>
            </Group>




        </Stack>
    )
}