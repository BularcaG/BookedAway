"use client";

export default function Segmented<T extends string>({
  value,
  options,
  onChange
}: {
  value: T;
  options: { id: T; label: string }[];
  onChange: (next: T) => void;
}) {
  return (
    <div className="segmented">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={"segmented-option " + (value === option.id ? "segmented-option-active" : "")}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
