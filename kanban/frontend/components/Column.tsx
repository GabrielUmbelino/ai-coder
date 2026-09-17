"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Column } from "@/lib/types";
import AddCardForm from "./AddCardForm";
import SortableCard from "./Card";
import ColumnTitle from "./ColumnTitle";

type Props = {
  column: Column;
  accent: string;
  onRename: (columnId: string, title: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
};

export default function ColumnPanel({
  column,
  accent,
  onRename,
  onAddCard,
  onDeleteCard,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const cardIds = column.cards.map((card) => card.id);

  return (
    <section
      aria-label={column.title}
      className="flex min-h-0 w-full flex-col overflow-hidden rounded-xl bg-panel"
    >
      <div className={`h-1 shrink-0 ${accent}`} />

      <header className="flex shrink-0 items-center justify-between gap-2 px-3 pb-2 pt-3">
        <ColumnTitle
          title={column.title}
          onRename={(title) => onRename(column.id, title)}
        />
        <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs font-medium text-muted">
          {column.cards.length}
        </span>
      </header>

      <div
        ref={setNodeRef}
        className={`min-h-0 flex-1 overflow-y-auto px-2 pb-2 transition-colors ${
          isOver ? "bg-primary/5" : ""
        }`}
      >
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          <ul className="flex flex-col gap-2">
            {column.cards.map((card) => (
              <SortableCard key={card.id} card={card} onDelete={onDeleteCard} />
            ))}
          </ul>
        </SortableContext>

        <AddCardForm
          onAdd={(title, details) => onAddCard(column.id, title, details)}
        />
      </div>
    </section>
  );
}
