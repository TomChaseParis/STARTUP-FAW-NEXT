"use client";

type Props = {
  isLastQuestion: boolean;
  onNext: () => void;
};

export default function ExerciseNavigation({
  isLastQuestion,
  onNext,
}: Props) {
  return (
    <div className="mt-10 text-right">
      <button
        onClick={onNext}
        className="
          rounded-xl
          bg-black
          px-6
          py-3
          text-white
          shadow-md
          transition
          hover:bg-black/90
        "
      >
        {isLastQuestion
          ? "Voir mon score →"
          : "Question suivante →"}
      </button>
    </div>
  );
}