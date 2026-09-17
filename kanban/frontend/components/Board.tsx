"use client";

import { useState } from "react";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { addCard, deleteCard, moveCard, renameColumn } from "@/lib/board";
import { initialColumns } from "@/lib/seed";
import { CardBody } from "./Card";
import ColumnPanel from "./Column";

const ACCENTS = [
  "bg-muted",
  "bg-primary",
  "bg-accent",
  "bg-secondary",
  "bg-navy",
];

export default function Board() {
  const [columns, setColumns] = useState(initialColumns);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const activeCard = columns
    .flatMap((column) => column.cards)
    .find((card) => card.id === activeId);

  const handleDragStart = (event: DragStartEvent) =>
    setActiveId(String(event.active.id));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    if (over) {
      setColumns((current) =>
        moveCard(current, String(active.id), String(over.id)),
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {columns.map((column, index) => (
          <ColumnPanel
            key={column.id}
            column={column}
            accent={ACCENTS[index]}
            onRename={(columnId, title) =>
              setColumns((current) => renameColumn(current, columnId, title))
            }
            onAddCard={(columnId, title, details) =>
              setColumns((current) => addCard(current, columnId, title, details))
            }
            onDeleteCard={(cardId) =>
              setColumns((current) => deleteCard(current, cardId))
            }
          />
        ))}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeCard && (
          <div className="cursor-grabbing">
            <CardBody card={activeCard} dragging />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
