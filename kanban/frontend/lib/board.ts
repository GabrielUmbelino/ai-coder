import { arrayMove } from "@dnd-kit/sortable";
import type { Column } from "./types";

export function addCard(
  columns: Column[],
  columnId: string,
  title: string,
  details: string,
): Column[] {
  const card = {
    id: crypto.randomUUID(),
    title: title.trim(),
    details: details.trim(),
  };

  return columns.map((column) =>
    column.id === columnId
      ? { ...column, cards: [...column.cards, card] }
      : column,
  );
}

export function deleteCard(columns: Column[], cardId: string): Column[] {
  return columns.map((column) => ({
    ...column,
    cards: column.cards.filter((card) => card.id !== cardId),
  }));
}

export function renameColumn(
  columns: Column[],
  columnId: string,
  title: string,
): Column[] {
  const next = title.trim();
  if (!next) return columns;

  return columns.map((column) =>
    column.id === columnId ? { ...column, title: next } : column,
  );
}

/**
 * Moves a card to wherever it was dropped. `overId` is either a card id, in
 * which case the card lands at that card's position, or a column id, in which
 * case it lands at the end of that column.
 */
export function moveCard(
  columns: Column[],
  activeId: string,
  overId: string,
): Column[] {
  const from = columns.find((column) =>
    column.cards.some((card) => card.id === activeId),
  );
  const to =
    columns.find((column) => column.id === overId) ??
    columns.find((column) => column.cards.some((card) => card.id === overId));

  if (!from || !to) return columns;

  const fromIndex = from.cards.findIndex((card) => card.id === activeId);
  const overIndex = to.cards.findIndex((card) => card.id === overId);
  const toIndex = overIndex === -1 ? to.cards.length : overIndex;

  if (from.id === to.id) {
    if (fromIndex === toIndex) return columns;
    const reordered = arrayMove(
      from.cards,
      fromIndex,
      // Dropping on the column itself sends the card to the end of the list.
      overIndex === -1 ? from.cards.length - 1 : toIndex,
    );
    return columns.map((column) =>
      column.id === from.id ? { ...column, cards: reordered } : column,
    );
  }

  const card = from.cards[fromIndex];

  return columns.map((column) => {
    if (column.id === from.id) {
      return { ...column, cards: column.cards.filter((c) => c.id !== activeId) };
    }
    if (column.id === to.id) {
      const cards = [...column.cards];
      cards.splice(toIndex, 0, card);
      return { ...column, cards };
    }
    return column;
  });
}
