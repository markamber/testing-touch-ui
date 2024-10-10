import {  IconCircle, IconMinus, IconPlus,} from '@tabler/icons-react';
import {Box, rem, Stack, Text} from '@mantine/core';
import classes from './PtzWidget.module.css';
import {useMove} from "@mantine/hooks";
import { useState} from "react";

export function PtzRocker(props: { description: string  }) {

    const [value, setValue] = useState({ y: 0.5 });
    const { ref, active } = useMove(setValue, {onScrubEnd: setCenter});

    function setCenter() {
        setValue({y: 0.5})
    }

    return (
        <Stack align='center'>
            <div className={classes.root} dir="ltr" ref={ref}>
                <div className={classes.controlsGroup}>
                    <Box className={classes.control}>
                        <IconPlus size={26} stroke={1.5} />
                    </Box>
                </div>
                <div className={classes.controlsGroup}>
                    <Box className={classes.control}>
                        <IconCircle size={26} stroke={1.5} />
                    </Box>
                </div>
                <div className={classes.controlsGroup}>
                    <Box className={classes.control}>
                        <IconMinus size={26} stroke={1.5} />
                    </Box>
                </div>
                <Box
                    className={classes.control}
                    style={{
                        position: 'absolute',
                        left: `calc(${.5 * 100}% - ${rem(8)})`,
                        top: `calc(${value.y * 100}% - ${rem(8)})`,
                        width: rem(16),
                        height: rem(16),
                        backgroundColor: active ? 'var(--mantine-color-teal-7)' : 'var(--mantine-color-blue-7)',
                    }}
                />
            </div>
            <Text>{props.description}</Text>
        </Stack>
    );
}
