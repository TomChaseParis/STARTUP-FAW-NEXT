"use client";

type Props = {
  options: string[];
  value: string;
  validated: boolean;
  isCorrect: boolean;
  onChange: (value: string) => void;
};

export default function TableCompletionSelect({
  options,
  value,
  validated,
  isCorrect,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      disabled={validated}
      onChange={(e) => onChange(e.target.value)}
      className={`
      w-full
      rounded-xl
      border-2
      px-4
      py-3
      text-base
      font-medium
      shadow-sm
      transition-all
      duration-200
      focus:outline-none
      focus:ring-4
      focus:ring-amber-100
      ${
        !validated
          ? "border-slate-200 bg-white hover:border-amber-300"
          : isCorrect
            ? "border-green-500 bg-green-50 text-green-700"
            : "border-red-500 bg-red-50 text-red-700"
      }
      `}
    >
      <option value="">Choisir...</option>

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}