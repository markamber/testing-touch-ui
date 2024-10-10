import {Divider, Flex, Group, Image, Paper, Space, Stack, Switch, Text} from "@mantine/core";
import { AudioSliderHorizontal } from "../AudioSlider/AudioSliderHorizontal.tsx";
import myImage from '../../lib/waveform.png';
import { useConnectedState } from "@splcode/state-client";
import {AudioMeter} from "../AudioMeter/AudioMeter.tsx";

function DynamicFader(props :{fader: string}) {
    const [fdr, _, setFader] = useConnectedState(props.fader);
    return <AudioSliderHorizontal
        value={fdr}
        onChange={(e) => setFader(e)}
    />
}

interface IFaderStackProps {
    number: number;
    fader: string;
    meter: string;
}

export const FaderTrack = ({ fader, meter }: IFaderStackProps) => {

    return (
        <Paper withBorder>
            <Stack>
                <Flex align="center" h={100} justify="flex-start" direction="row">
                    {/* Only AudioMeter re-renders when meterValue changes */}
                    {/*<MemoizedAudioMeter meterValue={meterValue} />*/}
                    <AudioMeter width={2} height={100} bars={7} meter={meter} />
                    {/*<DynamicMeter meter={meter}/>*/}
                    <Stack>
                        <Group>
                            <Text>Hi there</Text>
                        </Group>

                        <Divider />

                        <Group>
                            <Space h={1} />

                            <Switch />

                            <DynamicFader fader={fader}/>


                            <Space h={1} />
                        </Group>
                    </Stack>

                    <Paper bg={'black'} style={{ flexGrow: 1 }}>
                        <Image
                            src={myImage}
                            h={100}
                            w={'auto'}
                            style={{ filter: 'invert(100%)' }}
                        />

                    </Paper>
                </Flex>
            </Stack>
        </Paper>
    );
};
