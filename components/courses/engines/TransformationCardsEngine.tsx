
"use client";

import { useRef, useState } from "react";

import { useTransformationCards } from "@/hooks/useTransformationCards";

import type {
  TransformationCardsData,
  TransformationCardsResult,
  TransformationInputPart,
} from "@/types/transformationCardsTypes";

type TransformationCardsEngineProps = {
  data: TransformationCardsData;
  onComplete?: (result: TransformationCardsResult) => void;
};

export default function TransformationCardsEngine({
  data,
  onComplete,
}: TransformationCardsEngineProps) {
  const {
    answers,
    setAnswer,
    validateCard,
    validateAll,
    totalCards,
    totalInputs,
    completedCards,
    correctAnswers,
    score,
    validatedAnswers,
  } = useTransformationCards({
    data,
    onComplete,
  });

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [cardValidated, setCardValidated] = useState(false);
  const [sessionSubmitted, setSessionSubmitted] = useState(false);

  const submissionInProgress = useRef(false);

  const currentCard = data.cards[activeCardIndex];
  const isLastCard = activeCardIndex === totalCards - 1;

  const getInputResult = (inputId: string) =>
    validatedAnswers.find((answer) => answer.inputId === inputId);

  const renderInput = (input: TransformationInputPart) => {
    const inputResult = getInputResult(input.id);
    const hasBeenValidated = Boolean(inputResult);
    const isCorrect = inputResult?.isCorrect;

    return (
      <span
        key={input.id}
        className="my-1 inline-flex max-w-full min-w-0 flex-col align-middle"
      >
        <input
          type="text"
          value={answers[input.id] ?? ""}
          onChange={(event) => setAnswer(input.id, event.target.value)}
          placeholder={input.placeholder ?? "Votre réponse"}
          disabled={hasBeenValidated || sessionSubmitted}
          aria-label={`Réponse ${input.id}`}
          aria-invalid={hasBeenValidated ? !isCorrect : undefined}
          className={`
            box-border w-full min-w-0 max-w-[220px]
            rounded-lg border-2 px-3 py-2
            text-center text-sm font-medium
            outline-none transition-all duration-200
            placeholder:text-xs placeholder:font-normal
            focus:ring-2 focus:ring-offset-1
            ${
              hasBeenValidated
                ? isCorrect
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800 focus:ring-emerald-200"
                  : "border-red-500 bg-red-50 text-red-800 focus:ring-red-200"
                : "border-gray-200 bg-white text-gray-800 focus:border-amber-400 focus:ring-amber-100"
            }
            disabled:cursor-default
          `}
        />

        {input.hint && (
          <span className="mt-1 max-w-[220px] break-words text-center text-xs text-gray-500">
            {input.hint}
          </span>
        )}

        {hasBeenValidated && (
          <span
            className={`mt-1 max-w-[220px] break-words text-center text-xs font-semibold ${
              isCorrect ? "text-emerald-700" : "text-red-600"
            }`}
          >
            {isCorrect
              ? "✓ Bonne réponse"
              : `✗ Réponse attendue : ${inputResult.expectedAnswers.join(" ou ")}`}
          </span>
        )}
      </span>
    );
  };

  const handleValidate = () => {
    if (!currentCard || cardValidated || sessionSubmitted) return;

    validateCard(currentCard.id);
    setCardValidated(true);
  };

  const handleContinue = () => {
    if (!cardValidated || sessionSubmitted || submissionInProgress.current) {
      return;
    }

    if (isLastCard) {
      submissionInProgress.current = true;
      setSessionSubmitted(true);

      validateAll();
      return;
    }

    setActiveCardIndex((previous) => previous + 1);
    setCardValidated(false);
  };

  if (totalCards === 0) {
    return null;
  }

  const cardCorrectAnswers = currentCard
    ? validatedAnswers.filter(
        (answer) => answer.cardId === currentCard.id && answer.isCorrect,
      ).length
    : 0;

  const cardTotalInputs = currentCard
    ? currentCard.target.filter((part) => part.type === "input").length
    : 0;

  return (
    <section className="box-border w-full min-w-0 max-w-full overflow-hidden">
      {/* EN-TÊTE ET PROGRESSION */}
      <header className="mb-6 w-full min-w-0 space-y-4">
        {data.title && (
          <h2 className="break-words text-xl font-semibold text-gray-900 sm:text-2xl">
            {data.title}
          </h2>
        )}

        <p className="break-words text-sm leading-7 text-gray-600 sm:text-base">
          {data.instruction}
        </p>

        <div className="flex min-w-0 items-center justify-between gap-3">
          <span className="text-sm font-medium text-gray-500">
            Transformation {activeCardIndex + 1} sur {totalCards}
          </span>

          <span className="shrink-0 text-sm font-medium tabular-nums text-gray-500">
            {Math.round((completedCards / totalCards) * 100)} %
          </span>
        </div>

        <div
          className="h-2 w-full overflow-hidden rounded-full bg-gray-100"
          role="progressbar"
          aria-label="Progression de l'exercice"
          aria-valuemin={0}
          aria-valuemax={totalCards}
          aria-valuenow={completedCards}
        >
          <div
            className="h-full rounded-full bg-amber-400 transition-all duration-500"
            style={{
              width: `${(completedCards / totalCards) * 100}%`,
            }}
          />
        </div>
      </header>

      {/* CARTE ACTIVE */}
      {!sessionSubmitted && currentCard && (
        <article className="box-border w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* EN-TÊTE */}
          <div className="flex min-w-0 items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-4 sm:px-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
              {activeCardIndex + 1}
            </span>

            <div className="min-w-0">
              <h3 className="break-words text-base font-semibold text-gray-900">
                Transformation {activeCardIndex + 1}
              </h3>

              <p className="text-xs text-gray-500">
                Complète la phrase ci-dessous.
              </p>
            </div>
          </div>

          <div className="min-w-0 space-y-5 p-4 sm:p-6">
            {/* PHRASE SOURCE */}
            <div className="min-w-0 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Phrase de départ
              </span>

              <p className="break-words text-base leading-8 text-gray-700 sm:text-lg">
                {currentCard.example.map((part, index) => {
                  if (part.type === "highlight") {
                    return (
                      <span
                        key={`example-${index}`}
                        className="font-semibold text-gray-900 underline decoration-amber-400 decoration-2 underline-offset-4"
                      >
                        {part.value}
                      </span>
                    );
                  }

                  return (
                    <span key={`example-${index}`}>
                      {part.value}
                    </span>
                  );
                })}
              </p>
            </div>

            {/* SÉPARATION */}
            <div className="flex items-center gap-3 py-1">
              <div className="h-px min-w-0 flex-1 bg-gray-100" />

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>

              <div className="h-px min-w-0 flex-1 bg-gray-100" />
            </div>

            {/* PHRASE À COMPLÉTER */}
            <div className="min-w-0 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                À vous de transformer
              </span>

              <p className="break-words text-base leading-9 text-gray-800 sm:text-lg">
                {currentCard.target.map((part, index) => {
                  if (part.type === "input") {
                    return renderInput(part);
                  }

                  return (
                    <span key={`target-${index}`}>
                      {part.value}
                    </span>
                  );
                })}
              </p>
            </div>

            {/* EXPLICATION */}
            {currentCard.explanation && (
              <div className="flex min-w-0 gap-3 rounded-xl border border-amber-100 bg-amber-50/70 p-3 sm:p-4">
                <span className="mt-0.5 shrink-0 text-amber-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </span>

                <p className="min-w-0 break-words text-sm leading-6 text-amber-900">
                  {currentCard.explanation}
                </p>
              </div>
            )}

            {/* BILAN DE LA CARTE */}
            {cardValidated && (
              <div
                className={`flex items-center gap-3 rounded-xl border p-4 ${
                  cardCorrectAnswers === cardTotalInputs
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <span className="text-xl">
                  {cardCorrectAnswers === cardTotalInputs ? "✓" : "!"}
                </span>

                <div>
                  <p
                    className={`text-sm font-semibold ${
                      cardCorrectAnswers === cardTotalInputs
                        ? "text-emerald-800"
                        : "text-red-800"
                    }`}
                  >
                    {cardCorrectAnswers === cardTotalInputs
                      ? "Bravo ! Toutes les réponses sont correctes."
                      : "Certaines réponses sont incorrectes."}
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    {cardCorrectAnswers} bonne(s) réponse(s) sur{" "}
                    {cardTotalInputs}
                  </p>
                </div>
              </div>
            )}
          </div>
        </article>
      )}

      {/* BOUTONS CENTRÉS */}
      {!sessionSubmitted && currentCard && (
        <div className="mt-6 flex w-full min-w-0 justify-center">
          {!cardValidated ? (
            <button
              type="button"
              onClick={handleValidate}
              className="
                inline-flex min-h-12 max-w-full items-center justify-center
                gap-2 rounded-xl bg-[#B9A0F8] px-7 py-3
                text-sm font-semibold text-[#241344] shadow-sm
                transition-all duration-300 hover:scale-105 hover:bg-[#A78BFA]
                focus:outline-none focus:ring-2 focus:ring-[#B9A0F8]
                focus:ring-offset-2
              "
            >
              Vérifier ma réponse
            </button>
          ) : (
            <button
              type="button"
              onClick={handleContinue}
              className="
                inline-flex min-h-12 max-w-full items-center justify-center
                gap-2 rounded-xl bg-[#B9A0F8] px-7 py-3
                text-sm font-semibold text-[#241344] shadow-sm
                transition-all duration-300 hover:scale-105 hover:bg-[#A78BFA]
                focus:outline-none focus:ring-2 focus:ring-[#B9A0F8]
                focus:ring-offset-2
              "
            >
              {isLastCard ? "Voir mon résultat" : "Transformation suivante"}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* RÉSULTAT FINAL LOCAL */}
      {sessionSubmitted && (
        <div className="mt-6 w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Exercice terminé
            </span>

            <p className="mt-3 text-4xl font-bold tabular-nums text-gray-900">
              {score} %
            </p>

            <p className="mt-2 text-sm text-gray-600">
              {correctAnswers} bonne(s) réponse(s) sur {totalInputs}
            </p>

            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
