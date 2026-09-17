"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card } from "@/lib/types";

type BodyProps = {
  card: Card;
  onDelete?: (cardId: string) => void;
  dragging?: boolean;
};

/**
 * The card surface on its own. Rendered both inside the sortable list and,
 * without any drag wiring, inside the board's DragOverlay.
 */
export function CardBody({ card, onDelete, dragging }: BodyProps) {
  return (
    <article
      className={`group relative rounded-lg border border-black/5 bg-white px-3 py-2.5 text-left shadow-sm transition-shadow ${
        dragging ? "shadow-xl ring-2 ring-primary/40" : "hover:shadow-md"
      }`}
    >
      <h3 className="pr-6 text-sm font-semibold leading-snug text-navy">
        {card.title}
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">{card.details}</p>

      {onDelete && (
        <button
          type="button"
          aria-label={`Delete ${card.title}`}
          title="Delete card"
          onPointerDown={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
          onClick={() => onDelete(card.id)}
          className="absolute right-1.5 top-1.5 grid size-6 place-items-center rounded text-muted opacity-0 transition hover:bg-panel hover:text-navy focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group-hover:opacity-100"
        >
          <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>
      )}
    </article>
  );
}

type Props = {
  card: Card;
  onDelete: (cardId: string) => void;
};

export default function SortableCard({ card, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    // Keep the native list semantics: dnd-kit defaults the role to "button",
    // which would both break the list and nest a button inside a button.
  } = useSortable({
    id: card.id,
    attributes: { role: "listitem", roleDescription: "card" },
  });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={`cursor-grab touch-none rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary active:cursor-grabbing ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <CardBody card={card} onDelete={onDelete} />
    </li>
  );
}
