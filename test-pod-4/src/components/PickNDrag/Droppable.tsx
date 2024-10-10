import {useDroppable} from "@dnd-kit/core";
import {DragTile} from "./DragTile.tsx";

interface DroppableProps {
    id: string | number;
    itemName: string;
    inNum: number;
    isInOut: boolean;
    onClick: () => void;
}

export function Droppable({ id, itemName, inNum, isInOut, onClick }: DroppableProps) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <div ref={setNodeRef}>
            <DragTile
                id={id}
                itemName={itemName}
                withBorder={isOver || isInOut }
                inNum={inNum}
                onClick={onClick}
            />
        </div>

    );
}