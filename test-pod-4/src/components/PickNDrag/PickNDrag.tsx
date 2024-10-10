import {
    Card,
    Drawer,
    Grid,
    SimpleGrid,
} from '@mantine/core';
import classes from './PickNDrag.module.css';
import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { useFaderMeterContext } from "../../lib/StateProvider";
import { useDisclosure } from "@mantine/hooks";
import { Draggable } from "./Draggable.tsx";
import { DragTile } from "./DragTile.tsx";
import { Droppable } from "./Droppable.tsx";

export function PickNDrag() {

    const faderMeterContext = useFaderMeterContext();

    const [activeId, setActiveId] = useState(null);

    const [opened, { open, close }] = useDisclosure(false);

    const [inOutOpen, setInOutOpen] = useState({inOut: '', num: 0})

    function openDrawer(inOut: 'input' | 'output' | 'closed', num: number) {
        setInOutOpen({inOut: inOut, num: num})
        open()
    }

    function closeDrawer(){
        setInOutOpen({inOut: 'closed', num: 0})
        close()
    }

    function handleDragStart(event: any) {
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
                                        isInOut={(inOutOpen.inOut === 'output' && inOutOpen.num === ou.number)}
                                        onClick={() => openDrawer('output', ou.number as number)}
                                    />
                                ))}
                            </SimpleGrid>
                        </Card>
                    </Grid.Col>

                </Grid>
            </DndContext>
            <Drawer opened={opened} onClose={closeDrawer} title="Video Output Settings" position="bottom">
                {JSON.stringify(inOutOpen)}
            </Drawer>

        </div>
    );
}