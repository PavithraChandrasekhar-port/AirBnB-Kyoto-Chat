"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import CardsReply from "./CardsReply";
import ErrorBubble from "./ErrorBubble";
import ThinkingBubble from "./ThinkingBubble";
import { MOCK_ITINERARY } from "@/lib/mock";
import type { Message } from "@/types/chat";

const THINK_MS = 1800;
let seq = 0;
const nextId = () => `m${++seq}`;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: nextId(), role: "user", text: "Plan my Kyoto weekend, 11–13 Apr" },
  ]);
  const [busy, setBusy] = useState(false);
  const [forceError, setForceError] = useState(false);
  const [draft, setDraft] = useState("");
  const forceRef = useRef(forceError);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const endRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  forceRef.current = forceError;

  const respond = useCallback(() => {
    const thinkingId = nextId();
    setBusy(true);
    setMessages((m) => [...m, { id: thinkingId, role: "assistant", kind: "thinking" }]);
    timer.current = setTimeout(() => {
      const result: Message = forceRef.current
        ? { id: nextId(), role: "assistant", kind: "error" }
        : { id: nextId(), role: "assistant", kind: "cards", items: MOCK_ITINERARY };
      // Replace the thinking bubble, never stack.
      setMessages((m) => m.map((x) => (x.id === thinkingId ? result : x)));
      setBusy(false);
    }, THINK_MS);
  }, []);

  const retry = useCallback(
    (errorId: string) => {
      // Try again turns the force-error switch off so the retry succeeds.
      forceRef.current = false;
      setForceError(false);
      setMessages((m) => m.filter((x) => x.id !== errorId));
      respond();
    },
    [respond],
  );

  // The user has already asked about the weekend: reply on first mount.
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    respond();
  }, [respond]);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    const t = setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    const t2 = setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 1300);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [messages]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (busy || !text) return;
    setDraft("");
    setMessages((m) => [...m, { id: nextId(), role: "user", text }]);
    respond();
  }

  return (
    <div className="mx-auto flex h-dvh max-w-md flex-col bg-neutral-100 md:max-w-5xl">
      <header className="flex items-center justify-between gap-3 border-b border-neutral-200 bg-white px-4 py-3">
        <div>
          <h1 className="text-[17px] font-semibold">Kyoto weekend</h1>
          <p className="text-xs text-neutral-500">Trip assistant</p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-500 select-none">
          <input
            type="checkbox"
            checked={forceError}
            onChange={(e) => setForceError(e.target.checked)}
            className="peer sr-only"
          />
          <span className="relative h-5 w-9 rounded-full bg-neutral-300 transition-colors peer-checked:bg-coral after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
          Force error
        </label>
      </header>
      <p className="bg-amber-50 px-4 py-2 text-center text-xs leading-snug text-amber-900">
        Prototype: all trips shown are mocked sample data. No booking happens.
      </p>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4 md:px-8" aria-live="polite">
        {messages.map((m) => {
          if (m.role === "user")
            return (
              <p key={m.id} className="max-w-[88%] animate-rise self-end rounded-2xl rounded-br-md bg-neutral-900 px-3.5 py-2.5 text-white">
                {m.text}
              </p>
            );
          switch (m.kind) {
            case "thinking":
              return <ThinkingBubble key={m.id} />;
            case "error":
              return <ErrorBubble key={m.id} onRetry={() => retry(m.id)} />;
            case "cards":
              return <CardsReply key={m.id} items={m.items} />;
          }
        })}
        <div ref={endRef} />
      </div>

      <form onSubmit={onSubmit} className="flex gap-2 border-t border-neutral-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:px-8">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={busy}
          placeholder="Message…"
          aria-label="Message"
          className="min-w-0 flex-1 rounded-full border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-base disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-coral px-5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-45"
        >
          Send
        </button>
      </form>
    </div>
  );
}
