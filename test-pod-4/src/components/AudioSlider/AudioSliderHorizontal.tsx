import { Group, rem, Transition } from '@mantine/core';
import { useMove } from '@mantine/hooks';
import { useEffect, useState } from 'react';

function valueTodB(mm: number): number {
    let db: number;

    mm = 100. - mm;

    if (mm <= 0.) {
        db = 10.;
    } else if (mm < 48.) {
        db = 10. - 5. / 12. * mm;
    } else if (mm < 84.) {
        db = -10. - 10. / 12. * (mm - 48.);
    } else if (mm < 96.) {
        db = -40. - 20. / 12. * (mm - 84.);
    } else if (mm < 100.) {
        db = -60. - 35. * (mm - 96.);
    } else db = -200.;
    return db;
}

function dBtoValue(db: number): number {
    let mm: number;
    if (db >= 10.) {
        mm = 0.;
    } else if (db > -10.) {
        mm = -12. / 5. * (db - 10.);
    } else if (db > -40.) {
        mm = 48. - 12. / 10. * (db + 10.);
    } else if (db > -60.) {
        mm = 84. - 12. / 20. * (db + 40.);
    } else if (db > -200.) {
        mm = 96. - 1. / 35. * (db + 60.);
    } else mm = 100.;

    mm = 100. - mm;

    return mm;
}

interface IAudioSliderProps {
    value: number; // Value in dB
    onChange: (newValue: number) => void; // Function to handle dB change
}

export function AudioSliderHorizontal ({ value, onChange }: IAudioSliderProps) {
    // Convert dB to 0-100 value for UI
    const [sliderValue, setSliderValue] = useState(dBtoValue(value) / 100);

    // Update slider position if the value prop changes
    useEffect(() => {
        setSliderValue(dBtoValue(value)/100);
    }, [value]);

    const { ref } = useMove(({ x }) => {
        const newValue = x; // Convert y position to value between 0 and 1
        const newDbValue = valueTodB(newValue * 100); // Convert value to dB
        onChange(newDbValue); // Send dB value to parent only if it has changed
        setSliderValue(newValue); // Update UI with 0-100 range value
    });

    const [hover, setHover] = useState(false);

    return (
        <Group justify="center">
            <div
                ref={ref}
                style={{
                    width: rem(400),
                    height: rem(16),
                    backgroundColor: 'var(--mantine-color-blue-light)',
                    position: 'relative',
                    borderRadius: rem(10),
                }}
            >
                {/* Filled bar */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        height: rem(16),
                        width: `${sliderValue * 100}%`,
                        backgroundColor: 'var(--mantine-color-blue-filled)',
                        opacity: 0.7,
                        borderRadius: rem(10),
                    }}
                />

                {/* Thumb */}
                <div
                    style={{
                        position: 'absolute',
                        left: `calc(${sliderValue * 100}% - ${rem(16)})`,
                        top: -8,
                        width: rem(32),
                        height: rem(32),
                        backgroundColor: 'var(--mantine-color-blue-2)',
                        borderRadius: rem(16),
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <Transition
                        mounted={hover}
                        transition="fade"
                        duration={400}
                        timingFunction="ease"
                    >
                        {(styles) => (
                            <div style={styles}>
                                {/* Display dB value on hover */}
                                {value.toFixed(1)} dB
                            </div>
                        )}
                    </Transition>
                </div>
            </div>
        </Group>
    );
}
