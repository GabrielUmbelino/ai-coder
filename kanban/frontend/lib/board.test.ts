import { describe, expect, it } from "vitest";
import { addCard, deleteCard, moveCard, renameColumn } from "./board";
import type { Column } from "./types";

const columns = (): Column[] => [
  {
    id: "a",
    title: "A",
    cards: [
      { id: "a1", title: "A1", details: "" },
      { id: "a2", title: "A2", details: "" },
      { id: "a3", title: "A3", details: "" },
    ],
  },
  {
    id: "b",
    title: "B",
    cards: [{ id: "b1", title: "B1", details: "" }],
  },
  { id: "c", title: "C", cards: [] },
];

const ids = (result: Column[], columnId: string) =>
  result.find((column) => column.id === columnId)!.cards.map((card) => card.id);

describe("addCard", () => {
  it("appends to the target column", () => {
    const result = addCard(columns(), "a", "New", "Details");
    const cards = result.find((column) => column.id === "a")!.cards;

    expect(cards).toHaveLength(4);
    expect(cards[3]).toMatchObject({ title: "New", details: "Details" });
    expect(cards[3].id).toBeTruthy();
  });

  it("adds to an empty column", () => {
    expect(ids(addCard(columns(), "c", "New", ""), "c")).toHaveLength(1);
  });

  it("trims whitespace", () => {
    const result = addCard(columns(), "a", "  New  ", "  Details  ");
    expect(result[0].cards[3]).toMatchObject({
      title: "New",
      details: "Details",
    });
  });

  it("leaves other columns alone", () => {
    const result = addCard(columns(), "a", "New", "");
    expect(ids(result, "b")).toEqual(["b1"]);
  });

  it("does not mutate the input", () => {
    const input = columns();
    addCard(input, "a", "New", "");
    expect(input[0].cards).toHaveLength(3);
  });
});

describe("deleteCard", () => {
  it("removes the card", () => {
    expect(ids(deleteCard(columns(), "a2"), "a")).toEqual(["a1", "a3"]);
  });

  it("empties a column holding its last card", () => {
    expect(ids(deleteCard(columns(), "b1"), "b")).toEqual([]);
  });

  it("ignores an unknown id", () => {
    expect(ids(deleteCard(columns(), "nope"), "a")).toEqual(["a1", "a2", "a3"]);
  });

  it("does not mutate the input", () => {
    const input = columns();
    deleteCard(input, "a2");
    expect(input[0].cards).toHaveLength(3);
  });
});

describe("renameColumn", () => {
  it("renames the target column", () => {
    const result = renameColumn(columns(), "a", "Renamed");
    expect(result[0].title).toBe("Renamed");
    expect(result[1].title).toBe("B");
  });

  it("trims the new title", () => {
    expect(renameColumn(columns(), "a", "  Renamed  ")[0].title).toBe("Renamed");
  });

  it("ignores an empty or whitespace title", () => {
    expect(renameColumn(columns(), "a", "")[0].title).toBe("A");
    expect(renameColumn(columns(), "a", "   ")[0].title).toBe("A");
  });

  it("ignores an unknown column", () => {
    expect(renameColumn(columns(), "nope", "Renamed")).toEqual(columns());
  });

  it("does not mutate the input", () => {
    const input = columns();
    renameColumn(input, "a", "Renamed");
    expect(input[0].title).toBe("A");
  });
});

describe("moveCard", () => {
  it("reorders downwards within a column", () => {
    expect(ids(moveCard(columns(), "a1", "a3"), "a")).toEqual([
      "a2",
      "a3",
      "a1",
    ]);
  });

  it("reorders upwards within a column", () => {
    expect(ids(moveCard(columns(), "a3", "a1"), "a")).toEqual([
      "a3",
      "a1",
      "a2",
    ]);
  });

  it("sends a card to the end when dropped on its own column", () => {
    expect(ids(moveCard(columns(), "a1", "a"), "a")).toEqual([
      "a2",
      "a3",
      "a1",
    ]);
  });

  it("moves a card onto another card's position in another column", () => {
    const result = moveCard(columns(), "a1", "b1");
    expect(ids(result, "a")).toEqual(["a2", "a3"]);
    expect(ids(result, "b")).toEqual(["a1", "b1"]);
  });

  it("moves a card into an empty column", () => {
    const result = moveCard(columns(), "a2", "c");
    expect(ids(result, "a")).toEqual(["a1", "a3"]);
    expect(ids(result, "c")).toEqual(["a2"]);
  });

  it("appends when dropped on a non-empty column rather than a card", () => {
    const result = moveCard(columns(), "a1", "b");
    expect(ids(result, "b")).toEqual(["b1", "a1"]);
  });

  it("carries the card contents across", () => {
    const result = moveCard(columns(), "a1", "c");
    expect(result[2].cards[0]).toEqual({ id: "a1", title: "A1", details: "" });
  });

  it("is a no-op when dropped on itself", () => {
    expect(moveCard(columns(), "a1", "a1")).toEqual(columns());
  });

  it("is a no-op for an unknown drop target", () => {
    expect(moveCard(columns(), "a1", "nope")).toEqual(columns());
  });

  it("is a no-op for an unknown card", () => {
    expect(moveCard(columns(), "nope", "b1")).toEqual(columns());
  });

  it("does not mutate the input", () => {
    const input = columns();
    moveCard(input, "a1", "c");
    expect(input[0].cards).toHaveLength(3);
    expect(input[2].cards).toHaveLength(0);
  });
});
