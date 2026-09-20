"use client";

export default function Toggle({
  label,
  hint,
  checked,
  onChange,
  disabled
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="toggle-row">
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink-900">{label}</p>
        {hint && <p className="mt-0.5 text-xs leading-relaxed text-ink-400">{hint}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={
          "relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition disabled:opacity-40 " +
          (checked ? "bg-brand-600" : "bg-ink-200")
        }
      >
        <span
          className={
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all " + (checked ? "left-[22px]" : "left-0.5")
          }
        />
      </button>
    </div>
  );
}
