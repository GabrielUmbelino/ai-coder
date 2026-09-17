"use client";

import { useState } from "react";

type Props = {
  title: string;
  onRename: (title: string) => void;
};

export default function ColumnTitle({ title, onRename }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(title);

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => {
          setDraft(title);
          setEditing(true);
        }}
        title="Rename column"
        className="rounded px-1 -mx-1 text-sm font-semibold tracking-wide uppercase text-navy transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {title}
      </button>
    );
  }

  const commit = () => {
    onRename(draft);
    setEditing(false);
  };

  return (
    <input
      autoFocus
      aria-label="Column name"
      value={draft}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === "Enter") commit();
        if (event.key === "Escape") setEditing(false);
      }}
      className="w-full rounded border border-primary bg-white px-1 -mx-1 text-sm font-semibold tracking-wide uppercase text-navy focus:outline-none"
    />
  );
}
