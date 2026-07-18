"use client";

type Choice = {
  id: string;
  label: string;
  isCorrect: boolean;
};

type Props = {
  choices: Choice[];
  selectedChoiceId: string | null;
  disabled?: boolean;
  onSelect: (choiceId: string) => void;
};

export default function AnswerChoices({
  choices,
  selectedChoiceId,
  disabled = false,
  onSelect,
}: Props) {
  return (
    <div className="space-y-3">
      {choices.map((choice) => {
        const isSelected = selectedChoiceId === choice.id;

        return (
          <button
            key={choice.id}
            onClick={() => onSelect(choice.id)}
            disabled={disabled || !!selectedChoiceId}
            className={`
              w-full
              rounded-lg
              border
              px-4
              py-3
              text-left
              text-black
              transition

              ${
                !selectedChoiceId
                  ? "border-black/20 hover:bg-gray-50"
                  : choice.isCorrect
                    ? "border-green-500 bg-green-100 text-green-800"
                    : isSelected
                      ? "border-red-500 bg-red-100 text-red-800"
                      : "border-black/10"
              }
            `}
          >
            {choice.label}
          </button>
        );
      })}
    </div>
  );
}