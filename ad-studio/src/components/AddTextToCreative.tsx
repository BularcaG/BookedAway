"use client";

import { useState } from "react";
import type { CreativeRecord } from "@/lib/store";

/**
 * Lets the operator add exact, self-typed text onto an already-generated
 * (usually text-free) creative, on demand - as opposed to the main
 * generator's templates, which write their own headline/CTA layout.
 */
export default function AddTextToCreative({ creative, onAdded }: { creative: CreativeRecord; onAdded: (c: CreativeRecord) => void }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [position, setPosition] = useState<"top" | "center" | "bottom">("bottom");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) {
    return (
      <button className="text-xs font-medium text-brand-600 underline" onClick={() => setOpen(true)}>
        + Add text
      </button>
    );
  }

  async function submit() {
    if (!text.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/creatives/add-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creativeId: creative.id, text, position })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not add text");
      onAdded(data.creative);
      setOpen(false);
      setText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add text");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-1">
      {error && <p className="text-xs text-red-600">{error}</p>}
      <input
        className="input px-2 py-1 text-xs"
        placeholder="Exact text to add"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <div className="flex items-center gap-1">
        <select className="input px-1 py-1 text-xs" value={position} onChange={(e) => setPosition(e.target.value as "top" | "center" | "bottom")}>
          <option value="top">Top</option>
          <option value="center">Center</option>
          <option value="bottom">Bottom</option>
        </select>
        <button className="btn-secondary px-2 py-1 text-xs" onClick={submit} disabled={submitting || !text.trim()}>
          {submitting ? "Adding…" : "Apply"}
        </button>
        <button className="text-xs text-slate-500" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
