"use client";

const STEPS = [
  { id: 1, label: "Connect Facebook" },
  { id: 2, label: "Upload Photo" },
  { id: 3, label: "Generate Creatives" },
  { id: 4, label: "Publish Campaign" }
];

export default function StepNav({ current }: { current: number }) {
  return (
    <ol className="mb-8 flex flex-wrap gap-3">
      {STEPS.map((step) => {
        const state = step.id === current ? "active" : step.id < current ? "done" : "todo";
        return (
          <li
            key={step.id}
            className={
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium " +
              (state === "active"
                ? "bg-brand-600 text-white"
                : state === "done"
                ? "bg-brand-100 text-brand-700"
                : "bg-slate-200 text-slate-500")
            }
          >
            <span
              className={
                "flex h-5 w-5 items-center justify-center rounded-full text-xs " +
                (state === "active" ? "bg-white text-brand-600" : state === "done" ? "bg-brand-600 text-white" : "bg-slate-400 text-white")
              }
            >
              {state === "done" ? "✓" : step.id}
            </span>
            {step.label}
          </li>
        );
      })}
    </ol>
  );
}
