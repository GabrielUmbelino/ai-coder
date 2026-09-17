import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ColumnTitle from "./ColumnTitle";

const setup = () => {
  const onRename = vi.fn();
  render(<ColumnTitle title="Backlog" onRename={onRename} />);
  return onRename;
};

const input = () => screen.getByRole("textbox", { name: "Column name" });

describe("ColumnTitle", () => {
  it("shows the title as a button until clicked", () => {
    setup();

    expect(screen.getByRole("button", { name: "Backlog" })).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("commits a new name on Enter", async () => {
    const onRename = setup();

    await userEvent.click(screen.getByRole("button", { name: "Backlog" }));
    await userEvent.clear(input());
    await userEvent.type(input(), "Ideas{Enter}");

    expect(onRename).toHaveBeenCalledExactlyOnceWith("Ideas");
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("commits a new name on blur", async () => {
    const onRename = setup();

    await userEvent.click(screen.getByRole("button", { name: "Backlog" }));
    await userEvent.clear(input());
    await userEvent.type(input(), "Ideas");
    await userEvent.tab();

    expect(onRename).toHaveBeenCalledExactlyOnceWith("Ideas");
  });

  it("discards the edit on Escape", async () => {
    const onRename = setup();

    await userEvent.click(screen.getByRole("button", { name: "Backlog" }));
    await userEvent.clear(input());
    await userEvent.type(input(), "Ideas{Escape}");

    expect(onRename).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Backlog" })).toBeInTheDocument();
  });

  it("reopens the editor with the current title", async () => {
    setup();

    await userEvent.click(screen.getByRole("button", { name: "Backlog" }));
    await userEvent.type(input(), " items{Escape}");
    await userEvent.click(screen.getByRole("button", { name: "Backlog" }));

    expect(input()).toHaveValue("Backlog");
  });
});
