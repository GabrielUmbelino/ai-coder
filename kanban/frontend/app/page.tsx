"use client";

import dynamic from "next/dynamic";

// The board is client rendered: dnd-kit generates its own accessibility ids,
// which do not survive a server render without a hydration mismatch.
const Board = dynamic(() => import("@/components/Board"), { ssr: false });

export default function Home() {
  return (
    <main className="mx-auto flex h-dvh w-full max-w-[1600px] flex-col gap-5 px-5 py-6 sm:px-8">
      <header className="shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-navy">
          Product Board
        </h1>
        <div className="mt-2 h-0.5 w-12 rounded-full bg-accent" />
      </header>

      <Board />
    </main>
  );
}
