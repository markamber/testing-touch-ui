import classes from './FaderTrack.module.css'
import {AudioMeter} from "../AudioMeter/AudioMeter";
import {Flex, Image, Paper, Space, Switch} from "@mantine/core";
import {AudioSliderHorizontal} from "../AudioSlider/AudioSliderHorizontal.tsx";
import myImage from '../../lib/waveform.png'


interface IFaderStackProps {
    fader: { number: number, value: number, meter: number}; // Value in dB
    onChange: (newValue: number) => void; // Function to handle dB change
}

export function FaderTrack({ fader, onChange }: IFaderStackProps) {

    return (
        <Paper withBorder>
            <Flex align="center"  h={100} justify="flex-start" direction="row" gap="md" >

                <AudioMeter
                    width={2}
                    height={100}
                    bars={7}
                    soundValue={fader.meter}
                />

                <Switch/>

                <AudioSliderHorizontal
                    value={fader.value}
                    onChange={onChange}
                />

                <Space h={1}/>

                <Paper bg={'black'} style={{flexGrow:1}}>
                    <Image
                        src={myImage}
                        h={100}
                        w={'auto'}
                        style={{ filter: 'invert(100%)' }}

                    />
                </Paper>

            </Flex>
        </Paper>
    )
}