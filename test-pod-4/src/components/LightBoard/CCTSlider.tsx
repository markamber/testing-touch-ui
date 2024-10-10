import {useEffect, useState} from 'react';
import { Group, Text, rem } from '@mantine/core';
import { useMove } from '@mantine/hooks';

function scaleValueFrom(high:number, low:number, val:number) {
    const range = high-low;
    return ( val - low ) / range
}

function scaleValueTo(high: number, low: number, val: number) {
    const range = high - low;
    return val * range + low;  // Multiply by range first, then add low
}


interface ICCTSliderProps {
    highCCT: number,
    lowCCT: number,
    value: number; // Value in dB
    onChange: (newValue: number) => void; // Function to handle dB change
}

export function CCTSlider({ value, onChange, highCCT, lowCCT }: ICCTSliderProps) {

    const [sliderValue, setSliderValue] = useState(0.2);

    const { ref } = useMove(({ x }) => {
        onChange(scaleValueTo(highCCT, lowCCT, x))
        setSliderValue(x)
    });

    useEffect(() => {
        setSliderValue(scaleValueFrom(highCCT, lowCCT, value))
    }, [value]);

    return (
        <>
            <Group justify="center">
                <div
                    ref={ref}
                    style={{
                        width: rem(400),
                        height: rem(32),
                        backgroundColor: 'white',
                        position: 'relative',
                    }}
                >
                    {/* Filled bar */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: 'linear-gradient(90deg, rgb(255,214,170), rgb(255,255,255))',
                        }}
                    />

                    {/* Thumb */}
                    <div
                        style={{
                            position: 'absolute',
                            left: `calc(${sliderValue * 100}% - ${rem(8)})`,
                            top: 0,
                            width: rem(32),
                            height: rem(32),
                            backgroundColor: 'var(--mantine-color-blue-7)',
                        }}
                    />
                </div>
            </Group>

            <Text ta="center" mt="sm">
                Value: {Math.round(value)}
            </Text>
        </>
    );
}