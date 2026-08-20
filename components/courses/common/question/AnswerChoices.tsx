"use client";

type Choice = {
  id: string;
  label: string;
  isCorrect: boolean;
};

type Props = {
  choices: Choice[];

  selectedChoiceId: string | null;

  selectedChoiceIds?: string[];

  multipleChoice?: boolean;

  disabled?: boolean;

  onSelect: (choiceId: string) => void;
};

export default function AnswerChoices({
  choices,
  selectedChoiceId,
  selectedChoiceIds = [],
  multipleChoice = false,
  disabled = false,
  onSelect,
}: Props) {
  return (
    <div className="space-y-3">
      {choices.map((choice, index) => {
        const isSelected = multipleChoice
          ? selectedChoiceIds.includes(
              choice.id,
            )
          : selectedChoiceId ===
            choice.id;

        const letter =
          String.fromCharCode(
            65 + index,
          );

        const hasSelection =
          multipleChoice
            ? selectedChoiceIds.length > 0
            : !!selectedChoiceId;

        const showFeedback =
          hasSelection &&
          !multipleChoice;

        return (
          <button
            key={choice.id}
            type="button"
            onClick={() =>
              onSelect(choice.id)
            }
            disabled={
              disabled ||
              (!multipleChoice &&
                !!selectedChoiceId)
            }
            className={`
              w-full
              rounded-lg
              border
              px-4
              py-3
              text-left
              text-black
              transition-all
              duration-200

              ${
                multipleChoice
                  ? isSelected
                    ? "border-amber-500 bg-amber-100 text-amber-900 shadow-sm"
                    : "border-black/20 bg-white hover:bg-gray-50"
                  : !selectedChoiceId
                    ? "border-black/20 bg-white hover:bg-gray-50"
                    : choice.isCorrect
                      ? "border-green-500 bg-green-100 text-green-800"
                      : isSelected
                        ? "border-red-500 bg-red-100 text-red-800"
                        : "border-black/10"
              }

              ${
                multipleChoice &&
                isSelected
                  ? "ring-2 ring-amber-200"
                  : ""
              }
            `}
          >
            <span
              className={`
                mr-3
                inline-flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                text-sm
                font-bold

                ${
                  multipleChoice &&
                  isSelected
                    ? "bg-amber-500 text-white"
                    : "bg-slate-100 text-slate-700"
                }
              `}
            >
              {letter}
            </span>

            {choice.label}

            {multipleChoice &&
              isSelected && (
                <span className="float-right font-bold text-amber-600">
                  ✓
                </span>
              )}

            {showFeedback &&
              choice.isCorrect && (
                <span className="float-right font-bold text-green-600">
                  ✓
                </span>
              )}

            {showFeedback &&
              isSelected &&
              !choice.isCorrect && (
                <span className="float-right font-bold text-red-600">
                  ✕
                </span>
              )}
          </button>
        );
      })}
    </div>
  );
}