"use client";

type Props = {
  value: string;
  validated: boolean;
  isCorrect: boolean;
  correctAnswer: string;
  onChange: (value: string) => void;
};

export default function FillGapInput({
  value,
  validated,
  isCorrect,
  correctAnswer,
  onChange,
}: Props) {
  if (validated) {
    return (
      <span
        className={`
          mx-1 inline-flex min-w-[90px] justify-center rounded-xl px-3 py-2
          font-semibold transition-all duration-300
          ${
            isCorrect
              ? "bg-green-100 text-green-700 ring-2 ring-green-400"
              : "bg-red-100 text-red-700 ring-2 ring-red-400"
          }
        `}
      >
        {value}

        {!isCorrect && (
          <span className="ml-2 text-green-600">
            ({correctAnswer})
          </span>
        )}
      </span>
    );
  }

  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        mx-1 inline-block
        w-32
        rounded-xl
        border-2
        border-slate-300
        bg-white
        px-3
        py-2
        text-center
        font-medium
        outline-none
        transition-all
        duration-300
        focus:border-amber-500
        focus:ring-4
        focus:ring-amber-200
      "
    />
  );
}