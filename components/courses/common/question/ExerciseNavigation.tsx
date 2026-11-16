
"use client";

type Props = {
  isLastQuestion: boolean;
  onNext: () => void;
  lastQuestionLabel?: string;
  buttonColor?: string;
};

export default function ExerciseNavigation({
  isLastQuestion,
  onNext,
  lastQuestionLabel = "Voir mon score →",
  buttonColor = "#000000",
}: Props) {
  return (
    <div className="mt-10 text-right">
      <button
        onClick={onNext}
        className="
          rounded-xl
          px-6
          py-3
          text-white
          shadow-md
          transition
          hover:brightness-95
        "
        style={{
          backgroundColor: buttonColor,
        }}
      >
        {isLastQuestion
          ? lastQuestionLabel
          : "Question suivante →"}
      </button>
    </div>
  );
}
