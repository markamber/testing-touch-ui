import {useDraggable} from "@dnd-kit/core";
import {DragTile} from "./DragTile.tsx";

interface DraggableProps {
    id: string | number;
    itemName: string;
}

export function Draggable({ id, itemName }: DraggableProps) {

    const {  attributes, listeners, setNodeRef } = useDraggable({ id });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <DragTile
                id={id}
                itemName={itemName}
            />
        </div>
    );

}