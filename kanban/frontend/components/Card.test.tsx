import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CardBody } from "./Card";

const card = { id: "card-1", title: "Ship the board", details: "Five columns" };

describe("CardBody", () => {
  it("renders the title and details", () => {
    render(<CardBody card={card} />);

    expect(screen.getByText("Ship the board")).toBeInTheDocument();
    expect(screen.getByText("Five columns")).toBeInTheDocument();
  });

  it("calls onDelete with the card id", async () => {
    const onDelete = vi.fn();
    render(<CardBody card={card} onDelete={onDelete} />);

    await userEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(onDelete).toHaveBeenCalledExactlyOnceWith("card-1");
  });

  it("has no delete button when onDelete is omitted", () => {
    render(<CardBody card={card} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
