"use client";

type NavigationButtonsProps = {
  canGoBack: boolean;
  canContinue: boolean;

  isLastQuestion: boolean;
  validated: boolean;

  onPrevious: () => void;
  onNext: () => void;
};

export default function NavigationButtons({
  canGoBack,
  canContinue,
  isLastQuestion,
  validated,
  onPrevious,
  onNext,
}: NavigationButtonsProps) {
  return (
    <footer className="mt-12 flex items-center justify-between">
      <div>
        {canGoBack && (
          <button
            type="button"
            onClick={onPrevious}
            className="
              rounded-2xl
              border
              border-slate-300
              bg-white
              px-6
              py-3
              font-semibold
              text-slate-700
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-slate-400
              hover:shadow-md
            "
          >
            ← Précédent
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!canContinue}
        className={`
          rounded-2xl
          px-8
          py-3
          font-semibold
          transition-all
          duration-200

          ${
            canContinue
              ? `
                bg-amber-500
                text-white
                shadow-lg
                hover:-translate-y-1
                hover:bg-amber-600
                hover:shadow-xl
              `
              : `
                cursor-not-allowed
                bg-slate-300
                text-slate-500
              `
          }
        `}
      >
        {!validated
          ? "Valider ✓"
          : isLastQuestion
            ? "Voir mon résultat →"
            : "Question suivante →"}
      </button>
    </footer>
  );
}