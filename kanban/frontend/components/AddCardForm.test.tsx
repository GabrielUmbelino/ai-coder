import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AddCardForm from "./AddCardForm";

const setup = () => {
  const onAdd = vi.fn();
  render(<AddCardForm onAdd={onAdd} />);
  return onAdd;
};

const openForm = () =>
  userEvent.click(screen.getByRole("button", { name: /add card/i }));

const submit = () =>
  userEvent.click(screen.getByRole("button", { name: "Add card" }));

describe("AddCardForm", () => {
  it("only shows the fields once opened", async () => {
    setup();

    expect(screen.queryByLabelText("Card title")).not.toBeInTheDocument();
    await openForm();
    expect(screen.getByLabelText("Card title")).toBeInTheDocument();
  });

  it("submits the trimmed title and details", async () => {
    const onAdd = setup();

    await openForm();
    await userEvent.type(screen.getByLabelText("Card title"), "  Write docs  ");
    await userEvent.type(screen.getByLabelText("Card details"), "  Two pages  ");
    await submit();

    expect(onAdd).toHaveBeenCalledExactlyOnceWith("  Write docs  ", "  Two pages  ");
  });

  it("allows details to be left empty", async () => {
    const onAdd = setup();

    await openForm();
    await userEvent.type(screen.getByLabelText("Card title"), "Write docs");
    await submit();

    expect(onAdd).toHaveBeenCalledExactlyOnceWith("Write docs", "");
  });

  it("does not submit an empty or whitespace title", async () => {
    const onAdd = setup();

    await openForm();
    await submit();
    await userEvent.type(screen.getByLabelText("Card title"), "   ");
    await submit();

    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Card title")).toBeInTheDocument();
  });

  it("closes and clears after a successful add", async () => {
    setup();

    await openForm();
    await userEvent.type(screen.getByLabelText("Card title"), "Write docs");
    await submit();

    expect(screen.queryByLabelText("Card title")).not.toBeInTheDocument();
    await openForm();
    expect(screen.getByLabelText("Card title")).toHaveValue("");
  });

  it("closes without adding on Escape", async () => {
    const onAdd = setup();

    await openForm();
    await userEvent.type(screen.getByLabelText("Card title"), "Write docs{Escape}");

    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.queryByLabelText("Card title")).not.toBeInTheDocument();
  });
});
