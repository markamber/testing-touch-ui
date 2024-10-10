import {Divider, rem, Text, UnstyledButton} from "@mantine/core";
import classes from "./PickNDrag.module.css";

interface TileProps {
    id: string | number;
    itemName: string;
    withBorder?: boolean;
    inNum?: number
    onClick?: () => void
}

export function DragTile({ itemName, withBorder, inNum, onClick }: TileProps) {

    const style = {
        border: withBorder ? `${rem(1)} solid var(--mantine-color-white)` : ''
    };

    return (
        <UnstyledButton
            className={classes.item}
            style={style}
            onClick={onClick}
        >
            <Text className={classes.symbol}>C</Text>
            <Text size="xs" mt={7}>
                {itemName}
            </Text>

            <Divider c='white' />
            <Text c="dimmed" size="sm">
                {inNum && inNum}
            </Text>
        </UnstyledButton>
    )
}