"use client";

type MultipleChoiceQuestionProps = {
  options: string[];
  value: number | null;
  onChange: (value: number) => void;

  validated: boolean;
  correctAnswer: number;
};

export default function MultipleChoiceQuestion({
  options,
  value,
  onChange,
  validated,
  correctAnswer,
}: MultipleChoiceQuestionProps) {
  return (
    <div className="space-y-4">
      {options.map((option, index) => {
        let classes =
          "border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50";

        if (validated) {
          if (index === correctAnswer) {
            classes =
              "border-emerald-500 bg-emerald-100 text-emerald-800";
          } else if (index === value) {
            classes =
              "border-red-500 bg-red-100 text-red-800";
          }
        } else if (value === index) {
          classes =
            "border-amber-500 bg-amber-50 shadow-md";
        }

        return (
          <button
            key={index}
            type="button"
            disabled={validated}
            onClick={() => onChange(index)}
            className={`w-full rounded-2xl border p-5 text-left font-medium transition-all duration-200 ${classes}`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>

              {validated && index === correctAnswer && (
                <span className="text-xl">✅</span>
              )}

              {validated &&
                index === value &&
                index !== correctAnswer && (
                  <span className="text-xl">❌</span>
                )}
            </div>
          </button>
        );
      })}
    </div>
  );
}