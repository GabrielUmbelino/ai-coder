"use client";

import { useState } from "react";

type Props = {
  onAdd: (title: string, details: string) => void;
};

export default function AddCardForm({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const close = () => {
    setOpen(false);
    setTitle("");
    setDetails("");
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-1 flex w-full items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted transition-colors hover:bg-white hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span aria-hidden="true" className="text-base leading-none">
          +
        </span>
        Add card
      </button>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!title.trim()) return;
        onAdd(title, details);
        close();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") close();
      }}
      className="mt-1 rounded-lg border border-black/5 bg-white p-2.5 shadow-sm"
    >
      <input
        autoFocus
        aria-label="Card title"
        placeholder="Card title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="w-full rounded border border-black/10 px-2 py-1.5 text-sm text-navy placeholder:text-muted/70 focus:border-primary focus:outline-none"
      />
      <textarea
        aria-label="Card details"
        placeholder="Details"
        rows={2}
        value={details}
        onChange={(event) => setDetails(event.target.value)}
        className="mt-2 w-full resize-none rounded border border-black/10 px-2 py-1.5 text-xs text-navy placeholder:text-muted/70 focus:border-primary focus:outline-none"
      />
      <div className="mt-2 flex items-center gap-2">
        <button
          type="submit"
          className="rounded bg-secondary px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1"
        >
          Add card
        </button>
        <button
          type="button"
          onClick={close}
          className="rounded px-2 py-1.5 text-xs font-medium text-muted transition-colors hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
