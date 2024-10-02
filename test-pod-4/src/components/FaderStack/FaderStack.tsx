import classes from './FaderStack.module.css'
import {AudioMeter} from "../AudioMeter/AudioMeter";
import {AudioSlider} from "../AudioSlider/AudioSlider.tsx";
import { Stack, Switch} from "@mantine/core";


interface IFaderStackProps {
    fader: { number: number, value: number, meter: number}; // Value in dB
    onChange: (newValue: number) => void; // Function to handle dB change
}

export function FaderStack({ fader, onChange }: IFaderStackProps) {

    return (
    <Stack
        w={80}
        align={"center"}
        mb={90}
    >
        <AudioMeter
            width={2}
            height={30}
            bars={7}
            soundValue={fader.meter}
        />

        <AudioSlider
            value={fader.value}
            onChange={onChange}
        />

        <Switch
            classNames={{root : classes.root}}
            mt={10}
        />

    </Stack>
    )
}