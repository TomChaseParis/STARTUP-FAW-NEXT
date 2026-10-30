
"use client";

import { useState } from "react";

import IllustratedTransformationEngine, {
  type PhraseSegment,
} from "@/components/courses/engines/IllustratedTransformationEngine";

import { illustratedTransformationData } from "./data/illustratedTransformationData";

import type {
  ExerciseSessionResult,
  ExerciseHistoryItem,
} from "@/components/courses/common/types/exerciseSessionTypes";

type Props = {
  onComplete?: (result: ExerciseSessionResult) => void;
};

/**
 * Normalise les réponses pour éviter les faux négatifs :
 * - espaces superflus ;
 * - majuscules/minuscules ;
 * - apostrophes typographiques ou droites.
 */
const normalize = (value: string) =>
  value
    .trim()
    .toLocaleLowerCase("fr-FR")
    .replace(/[’‘`ʼ]/g, "'")
    .replace(/\s+/g, " ");

export default function IllustratedTransformationExercise({
  onComplete,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<
    Record<string, boolean>
  >({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [validated, setValidated] = useState(false);
  const [startedAt] = useState(() => new Date());

  const questions = illustratedTransformationData;
  const totalQuestions = questions.length;

  if (totalQuestions === 0) {
    return (
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-800">
        Aucune question n&apos;est disponible pour cet exercice.
      </p>
    );
  }

  const currentQuestion = questions[currentIndex];

  const currentAnswer = answers[currentQuestion.id] ?? "";
  const currentChecked = Boolean(checkedQuestions[currentQuestion.id]);
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const allAnswered = questions.every(
    (question) => (answers[question.id] ?? "").trim().length > 0,
  );

  const allChecked = questions.every(
    (question) => Boolean(checkedQuestions[question.id]),
  );

  const correctAnswers = questions.filter(
    (question) =>
      normalize(answers[question.id] ?? "") ===
      normalize(question.expectedAnswer),
  ).length;

  const score =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  const currentIsCorrect =
    normalize(currentAnswer) ===
    normalize(currentQuestion.expectedAnswer);

  const transformedPhrase: PhraseSegment[] = [
    { type: "text", value: currentQuestion.before },
    {
      type: "input",
      id: currentQuestion.id,
      expectedAnswer: currentQuestion.expectedAnswer,
      placeholder: "Ta réponse",
      width: "10rem",
    },
    { type: "text", value: currentQuestion.after },
  ];

  // Vérifie uniquement la question affichée.
  const handleCheckAnswer = () => {
    if (!currentAnswer.trim() || currentChecked || validated) return;

    setCheckedQuestions((previous) => ({
      ...previous,
      [currentQuestion.id]: true,
    }));
  };

  const handleNext = () => {
    if (!currentChecked || isLastQuestion || validated) return;

    setCurrentIndex((index) => index + 1);
  };

  const handlePrevious = () => {
    if (currentIndex === 0 || validated) return;

    setCurrentIndex((index) => index - 1);
  };

  // Termine l'exercice après la correction de toutes les questions.
  const handleFinish = () => {
    if (!allAnswered || !allChecked || validated) return;

    const finishedAt = new Date();

    const history: ExerciseHistoryItem[] = questions.map(
      (question, index) => {
        const selectedAnswer = (answers[question.id] ?? "").trim();

        const isCorrect =
          normalize(selectedAnswer) ===
          normalize(question.expectedAnswer);

        return {
          questionId: index + 1,
          question: `${question.originalText} → ${question.before}[…]${question.after}`,
          selectedAnswer,
          correctAnswer: question.expectedAnswer,
          isCorrect,
          explanation: question.explanation,
        };
      },
    );

    const result: ExerciseSessionResult = {
      score,
      correctAnswers,
      totalQuestions,
      history,
      startedAt,
      finishedAt,
      duration: Math.max(
        0,
        Math.round(
          (finishedAt.getTime() - startedAt.getTime()) / 1000,
        ),
      ),
    };

    setValidated(true);
    onComplete?.(result);
  };

  const progress = validated
    ? 100
    : ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <section className="w-full space-y-6">
      {/* EN-TÊTE */}
      <header className="rounded-2xl border border-[#DDD6FE] bg-gradient-to-r from-[#F5F0FF] via-white to-[#F9F7FF] p-5 shadow-sm sm:p-7">
        <span className="rounded-full border border-[#DDD6FE] bg-white px-4 py-2 text-sm font-semibold text-[#6D28D9]">
          Question {currentIndex + 1} sur {totalQuestions}
        </span>

        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          Reformule la phrase en utilisant « il faut que ».
          Complète le champ avec la forme correcte du verbe au
          subjonctif présent.
        </p>

        {/* PROGRESSION */}
        <div className="mt-5">
          <div
            className="h-2.5 overflow-hidden rounded-full bg-[#EDE9FE]"
            role="progressbar"
            aria-label="Progression de l'exercice"
            aria-valuemin={0}
            aria-valuemax={totalQuestions}
            aria-valuenow={validated ? totalQuestions : currentIndex + 1}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* REPÈRES NON CLIQUABLES */}
        <div
          className="mt-4 flex flex-wrap gap-2"
          aria-label="Progression des questions"
        >
          {questions.map((question, index) => {
            const isCurrent = index === currentIndex;
            const isChecked = Boolean(checkedQuestions[question.id]);

            return (
              <span
                key={question.id}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Question ${index + 1}${
                  isChecked ? ", corrigée" : ""
                }${isCurrent ? ", question actuelle" : ""}`}
                className={`flex h-9 w-9 select-none items-center justify-center rounded-full border text-sm font-bold ${
                  isCurrent
                    ? "border-[#7C3AED] bg-[#7C3AED] text-white shadow-sm"
                    : isChecked
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-[#DDD6FE] bg-white text-[#6D28D9]"
                }`}
              >
                {isChecked ? "✓" : index + 1}
              </span>
            );
          })}
        </div>
      </header>

      {!validated ? (
        <div className="space-y-5">
          {/* TITRE DE LA QUESTION */}
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F0FF] text-lg font-bold text-[#6D28D9]">
              {currentIndex + 1}
            </span>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
                À toi de jouer
              </p>

              <h3 className="text-lg font-bold text-[#102744] sm:text-xl">
                Lis et transforme la phrase
              </h3>
            </div>
          </div>

          {/* ILLUSTRATION ET PHRASE */}
          <IllustratedTransformationEngine
            imageSrc={currentQuestion.imageSrc}
            imageAlt={currentQuestion.imageAlt}
            originalText={currentQuestion.originalText}
            transformedPhrase={transformedPhrase}
            answers={answers}
            onAnswerChange={(id, value) => {
              if (checkedQuestions[id] || validated) return;

              setAnswers((previous) => ({
                ...previous,
                [id]: value,
              }));
            }}
            validated={currentChecked}
            showCorrection={currentChecked}
            className="min-h-[300px]"
          />

          {/* CORRECTION IMMÉDIATE */}
          {currentChecked && (
            <div
              role="status"
              className={`rounded-2xl border p-5 sm:p-6 ${
                currentIsCorrect
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">
                  {currentIsCorrect ? "✓" : "✗"}
                </span>

                <div className="min-w-0">
                  <p
                    className={`text-lg font-bold ${
                      currentIsCorrect
                        ? "text-emerald-800"
                        : "text-red-800"
                    }`}
                  >
                    {currentIsCorrect
                      ? "Bravo ! Bonne réponse."
                      : "Pas tout à fait !"}
                  </p>

                  {!currentIsCorrect && (
                    <p className="mt-2 leading-7 text-slate-800">
                      La bonne réponse était :{" "}
                      <strong className="text-emerald-700">
                        {currentQuestion.expectedAnswer}
                      </strong>
                    </p>
                  )}

                  <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-base">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* NAVIGATION */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Précédente
            </button>

            {!currentChecked ? (
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={!currentAnswer.trim()}
                className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-6 py-3 font-bold text-white shadow-md transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Vérifier ma réponse
              </button>
            ) : isLastQuestion ? (
              <button
                type="button"
                onClick={handleFinish}
                disabled={!allAnswered || !allChecked}
                className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-6 py-3 font-bold text-white shadow-md transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Terminer et voir mon résultat
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-6 py-3 font-bold text-white shadow-md transition hover:brightness-105"
              >
                Question suivante →
              </button>
            )}
          </div>

          <p className="text-center text-sm text-slate-500">
            {currentChecked
              ? "Correction affichée : tu peux continuer."
              : "Vérifie ta réponse pour découvrir la correction."}
          </p>
        </div>
      ) : (
        /* RÉSULTAT LOCAL DE SECOURS */
        <div className="space-y-5">
          <div className="rounded-2xl border border-[#DDD6FE] bg-[#F5F0FF] p-6 text-center">
            <p className="font-semibold text-[#6D28D9]">
              Résultat de l&apos;exercice
            </p>

            <p className="mt-2 text-4xl font-bold text-[#4C1D95]">
              {score} %
            </p>

            <p className="mt-2 text-slate-700">
              {correctAnswers} bonne(s) réponse(s) sur {totalQuestions}.
            </p>
          </div>

          {questions.map((question, index) => {
            const answer = answers[question.id] ?? "";
            const isCorrect =
              normalize(answer) === normalize(question.expectedAnswer);

            return (
              <div
                key={question.id}
                className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
              >
                <p className="font-bold text-[#102744]">
                  Question {index + 1}
                </p>

                <p className="mt-2 text-slate-700">
                  Ta réponse :{" "}
                  <span
                    className={
                      isCorrect
                        ? "font-semibold text-emerald-700"
                        : "font-semibold text-red-700"
                    }
                  >
                    {answer}
                  </span>
                </p>

                {!isCorrect && (
                  <p className="mt-1 text-slate-700">
                    Réponse attendue :{" "}
                    <span className="font-semibold text-emerald-700">
                      {question.expectedAnswer}
                    </span>
                  </p>
                )}

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {question.explanation}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
