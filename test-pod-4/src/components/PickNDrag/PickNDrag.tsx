import {
    Affix,
    Box, Button,
    Card,
    Divider, Drawer,
    Flex,
    Grid,
    Group,
    Paper,
    rem,
    SimpleGrid,
    Text,
    UnstyledButton
} from '@mantine/core';
import {DndContext, DragEndEvent, DragOverlay, useDraggable, useDroppable} from '@dnd-kit/core';
import { CSS } from "@dnd-kit/utilities";
import cx from "clsx";
import classes from './PickNDrag.module.css';
import { useFaderMeterContext } from "../../lib/StateProvider";
import {useState} from "react";
import {useDisclosure} from "@mantine/hooks";

interface DroppableProps {
    id: string | number;
    itemName: string;
    inNum: number;
}

interface DraggableProps {
    id: string | number;
    itemName: string;
}


interface TileProps {
    id: string | number;
    itemName: string;
    withBorder?: boolean;
    inNum?: number
}

function DragTile({ itemName, withBorder, inNum }: TileProps) {

    const style = {
        border: withBorder ? `${rem(1)} solid var(--mantine-color-white)` : ''
    };

    return (
        <UnstyledButton
            className={classes.item}
            style={style}
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

function Droppable({ id, itemName, inNum }: DroppableProps) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <div ref={setNodeRef}>
            <DragTile id={id} itemName={itemName} withBorder={isOver} inNum={inNum} />
        </div>

    );
}



function Draggable({ id, itemName }: DraggableProps) {
    const {  attributes, listeners, setNodeRef } = useDraggable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <DragTile id={id} itemName={itemName}/>
        </div>
    );
}

export function PickNDrag() {
    const faderMeterContext = useFaderMeterContext();

    const [activeId, setActiveId] = useState(null);

    const [opened, { open, close }] = useDisclosure(false);

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && faderMeterContext) {
            faderMeterContext.setVideoOutTo(active.id as number, over.id as number);
        }
        setActiveId(null);
    };

    if (!faderMeterContext) {
        return null; // or some loading state
    }

    return (
        <div className={classes.touchNone}>
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <Grid>
                    <Grid.Col span={{ base: 12, xs: 6 }}>
                        <Card withBorder radius="md" className={classes.card} style={{zIndex: 2}}>
                            <SimpleGrid cols={3} mt="md">
                                {faderMeterContext.videoIn.map((ins) => (
                                    <Draggable
                                        id={ins.number}
                                        itemName={ins.name}
                                        key={ins.number}
                                    />
                                ))}
                            </SimpleGrid>
                        </Card>
                    </Grid.Col>

                    <DragOverlay dropAnimation={null}>
                        {activeId ? (
                            <DragTile id={activeId} itemName={faderMeterContext.videoIn.findLast(ob => ob.number === activeId)?.name || ''}  />
                        ): null}
                    </DragOverlay>

                    <Grid.Col span={{ base: 12, xs: 6 }}>
                        <Card withBorder radius="md" className={classes.card} >
                            <SimpleGrid cols={3} mt="md">
                                {faderMeterContext.videoOut.map((ou) => (
                                    <Droppable
                                        id={ou.number}
                                        itemName={ou.name}
                                        inNum={ou.inNum}
                                        key={ou.number}
                                    />
                                ))}
                            </SimpleGrid>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 12 }}>
                        <Card>
                            yoyoyo
                        </Card>
                    </Grid.Col>
                </Grid>
            </DndContext>
            <Drawer opened={opened} onClose={close} title="Authentication" position="bottom">
                {/* Drawer content */}
            </Drawer>

            <Button onClick={open}>Open Drawer</Button>
        </div>
    );
}