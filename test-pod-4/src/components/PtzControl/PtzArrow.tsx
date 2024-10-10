import {
    IconArrowDown,
    IconArrowDownLeft,
    IconArrowDownRight,
    IconArrowLeft,
    IconArrowRight,
    IconArrowUp,
    IconArrowUpLeft,
    IconArrowUpRight,
    IconCircle,
} from '@tabler/icons-react';
import {Box, rem } from '@mantine/core';
import classes from './PtzWidget.module.css';
import {useMove} from "@mantine/hooks";

export function PtzArrow(props: {value: { x: number, y: number }, setValue:(coord: { x: number, y: number }) => void}) {

    const { ref, active } = useMove(props.setValue, {onScrubEnd: setCenter});

    function setCenter() {
        props.setValue({x: 0.5, y: 0.5})
    }

    return (
        <div className={classes.root} dir="ltr" ref={ref}>
            <div className={classes.controlsGroup}>
                <Box className={classes.control}>
                    <IconArrowUpLeft size={26} stroke={1.5} />
                </Box>
                <Box className={classes.control}>
                    <IconArrowUp size={26} stroke={1.5} />
                </Box>
                <Box className={classes.control}>
                    <IconArrowUpRight size={26} stroke={1.5} />
                </Box>
            </div>
            <div className={classes.controlsGroup}>
                <Box className={classes.control}>
                    <IconArrowLeft size={26} stroke={1.5} />
                </Box>
                <Box className={classes.control}>
                    <IconCircle size={26} stroke={1.5} />
                </Box>
                <Box className={classes.control}>
                    <IconArrowRight size={26} stroke={1.5} />
                </Box>
            </div>
            <div className={classes.controlsGroup}>
                <Box className={classes.control}>
                    <IconArrowDownLeft size={26} stroke={1.5} />
                </Box>
                <Box className={classes.control}>
                    <IconArrowDown size={26} stroke={1.5} />
                </Box>
                <Box className={classes.control}>
                    <IconArrowDownRight size={26} stroke={1.5} />
                </Box>
            </div>
            <Box
                className={classes.control}
                style={{
                    position: 'absolute',
                    left: `calc(${props.value.x * 100}% - ${rem(8)})`,
                    top: `calc(${props.value.y * 100}% - ${rem(8)})`,
                    width: rem(16),
                    height: rem(16),
                    backgroundColor: active ? 'var(--mantine-color-teal-7)' : 'var(--mantine-color-blue-7)',
                }}
            />
        </div>
    );
}
