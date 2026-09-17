"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What are you working on at Upsiide?",
  "Tell me about your leadership experience",
  "Which frameworks have you shipped?",
  "Why should we hire you?",
];

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi — I'm Gabriel's digital twin, trained on his career. Ask me where he's worked, what he's built, or what he's looking for next.",
};

export const TWIN_OPEN_EVENT = "twin:open";

export default function DigitalTwin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* -------------------------- open / close -------------------------- */

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(TWIN_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(TWIN_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "/" && !open) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          e.preventDefault();
          setOpen(true);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 420);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy]);

  useEffect(() => () => abortRef.current?.abort(), []);

  /* ----------------------------- sending ---------------------------- */

  const send = useCallback(
    async (raw: string) => {
      const question = raw.trim();
      if (!question || busy) return;

      const next: Message[] = [...messages, { role: "user", content: question }];
      setMessages([...next, { role: "assistant", content: "" }]);
      setInput("");
      setBusy(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: next.filter((m) => m.content.trim().length > 0),
          }),
          signal: controller.signal,
        });

        if (!res.body) throw new Error("No response stream");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: acc };
            return copy;
          });
        }

        if (!acc.trim()) {
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              role: "assistant",
              content: `I couldn't get an answer just then. Email me at ${profile.email} and I'll reply properly.`,
            };
            return copy;
          });
        }
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content: `Something went wrong reaching my twin. Email me at ${profile.email} instead.`,
          };
          return copy;
        });
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy, messages]
  );

  const showSuggestions = messages.length === 1 && !busy;

  return (
    <>
      {/* launcher */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Ask Gabriel's digital twin"
        className={`group fixed bottom-6 right-6 z-40 flex items-center gap-3 border border-line bg-ink-2/90 py-3 pl-4 pr-5 backdrop-blur-xl transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent ${
          open
            ? "pointer-events-none translate-y-3 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute inset-0 border border-line transition-colors duration-500 group-hover:border-accent" />
          <span className="animate-live h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        <span className="text-left">
          <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-dim">
            Ask my
          </span>
          <span className="block text-[0.8125rem] font-medium tracking-tight text-text">
            Digital Twin
          </span>
        </span>
      </button>

      {/* scrim */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-40 bg-ink/70 backdrop-blur-[2px] transition-opacity duration-600 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Gabriel's digital twin"
        className={`fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-line bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:max-w-[28rem] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="grid-field pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64"
          style={{
            background:
              "radial-gradient(80% 100% at 50% 0%, rgba(215,255,62,0.06), transparent 70%)",
          }}
          aria-hidden
        />

        {/* header */}
        <header className="relative flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center border border-line">
              <span className="font-mono text-[0.7rem] text-accent">GU</span>
            </span>
            <div>
              <p className="text-[0.875rem] font-medium tracking-tight text-text">
                Digital Twin
              </p>
              <p className="mt-1 flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-dim">
                <span className="animate-live h-1 w-1 rounded-full bg-accent" />
                Trained on my career
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center border border-line text-muted transition-colors duration-400 hover:border-accent hover:text-text"
          >
            <span className="text-lg leading-none">&times;</span>
          </button>
        </header>

        {/* transcript */}
        <div
          ref={scrollRef}
          className="relative flex-1 space-y-5 overflow-y-auto px-5 py-6"
        >
          {messages.map((m, i) => {
            const isUser = m.role === "user";
            const isStreaming = busy && i === messages.length - 1 && !m.content;

            if (isStreaming) {
              return (
                <div key={i} className="flex gap-1.5 pl-1" aria-live="polite">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-dim"
                      style={{
                        animation: "pulse-dot 1.2s ease-in-out infinite",
                        animationDelay: `${d * 160}ms`,
                      }}
                    />
                  ))}
                </div>
              );
            }

            return (
              <div
                key={i}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    isUser
                      ? "max-w-[85%] border border-line bg-ink-2 px-4 py-2.5 text-[0.875rem] leading-relaxed text-text"
                      : "max-w-[92%] border-l border-accent/40 pl-4 text-[0.9375rem] leading-[1.7] text-muted"
                  }
                >
                  {m.content}
                </div>
              </div>
            );
          })}

          {showSuggestions && (
            <div className="space-y-2 pt-2">
              <p className="eyebrow">Try asking</p>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="group flex w-full items-center justify-between gap-3 border border-line px-4 py-2.5 text-left text-[0.8125rem] text-muted transition-colors duration-400 hover:border-accent/50 hover:text-text"
                >
                  {s}
                  <span className="font-mono text-[0.75rem] text-dim transition-colors duration-400 group-hover:text-accent">
                    →
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="relative border-t border-line p-4"
        >
          <div className="flex items-end gap-2 border border-line bg-ink-2 px-3 py-2 transition-colors duration-400 focus-within:border-accent/60">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              disabled={busy}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask about my career…"
              aria-label="Your question"
              className="max-h-[120px] flex-1 resize-none bg-transparent py-1.5 text-[0.875rem] text-text placeholder:text-dim focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="mb-0.5 grid h-8 w-8 shrink-0 place-items-center border border-line text-muted transition-colors duration-400 hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
            >
              <span className="font-mono text-[0.8125rem]">↑</span>
            </button>
          </div>
          <p className="mt-2.5 text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] text-dim">
            AI-generated · verify anything important
          </p>
        </form>
      </aside>
    </>
  );
}
