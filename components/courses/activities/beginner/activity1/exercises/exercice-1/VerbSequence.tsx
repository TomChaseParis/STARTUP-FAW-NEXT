"use client";

import { useMemo, useState } from "react";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

import verbSpeakingData, {
  ExerciseCategory,
} from "../../data/verbSpeakingData";

import VerbListeningExercise from "./VerbListeningExercise";
import VerbSpeakingExercise from "./VerbSpeakingExercise";

type VerbSequenceProps = {
  onComplete: (result: ExerciseSessionResult) => void;
};

type VerbScore = {
  correctAnswers: number;
  totalQuestions: number;
};

export default function VerbSequence({
  onComplete,
}: VerbSequenceProps) {
  const [currentVerbIndex, setCurrentVerbIndex] =
    useState(0);

  const [speakingStarted, setSpeakingStarted] =
    useState(false);

  const [verbFinished, setVerbFinished] =
    useState(false);

  const [verbScore, setVerbScore] =
    useState<VerbScore | null>(null);

  const [scores, setScores] = useState<
    VerbScore[]
  >([]);

  const [startedAt] = useState(
    () => new Date(),
  );

  const currentCategory =
    verbSpeakingData[currentVerbIndex];

  const isLastVerb =
    currentVerbIndex ===
    verbSpeakingData.length - 1;

  const totalQuestions = useMemo(
    () =>
      verbSpeakingData.reduce(
        (total, category) =>
          total + category.items.length,
        0,
      ),
    [],
  );

  if (!currentCategory) {
    return null;
  }

  /*
   * =========================================================
   * DÉMARRAGE DE LA PARTIE PRONONCIATION
   * =========================================================
   */

  const handleStartSpeaking = () => {
    setSpeakingStarted(true);
  };

  /*
   * =========================================================
   * FIN D'UN VERBE
   * =========================================================
   */

  const handleVerbComplete = (
    result: VerbScore,
  ) => {
    setVerbScore(result);
    setVerbFinished(true);

    setScores((previous) => {
      const next = [...previous];

      next[currentVerbIndex] = result;

      return next;
    });
  };

  /*
   * =========================================================
   * VERBE SUIVANT
   * =========================================================
   */

  const handleNextVerb = () => {
    if (isLastVerb) {
      const finalScores = [...scores];

      if (verbScore) {
        finalScores[currentVerbIndex] =
          verbScore;
      }

      const correctAnswers =
        finalScores.reduce(
          (total, score) =>
            total + score.correctAnswers,
          0,
        );

      const score =
        totalQuestions > 0
          ? Math.round(
              (correctAnswers /
                totalQuestions) *
                100,
            )
          : 0;

      const finishedAt =
        new Date();

      const duration = Math.max(
        0,
        Math.round(
          (finishedAt.getTime() -
            startedAt.getTime()) /
            1000,
        ),
      );

      /*
       * L'historique détaillé est déjà
       * construit par VerbSpeakingExercise.
       *
       * Pour l'instant, le résultat global
       * contient les statistiques du parcours.
       */
      onComplete({
        score,
        correctAnswers,
        totalQuestions,
        history: [],
        startedAt,
        finishedAt,
        duration,
      });

      return;
    }

    setCurrentVerbIndex(
      (previous) =>
        previous + 1,
    );

    setSpeakingStarted(false);
    setVerbFinished(false);
    setVerbScore(null);
  };

  /*
   * =========================================================
   * VERBE COURANT
   * =========================================================
   */

  return (
    <section className="w-full">
      {/* ===================================================== */}
      {/* PROGRESSION DES 4 VERBES                              */}
      {/* ===================================================== */}

      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Verbe {currentVerbIndex + 1} sur{" "}
              {verbSpeakingData.length}
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {currentCategory.title}
            </h2>
          </div>

          <div className="text-sm font-semibold text-slate-500">
            {Math.round(
              ((currentVerbIndex + 1) /
                verbSpeakingData.length) *
                100,
            )}
            %
          </div>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="
              h-full
              rounded-full
              bg-amber-400
              transition-all
              duration-500
            "
            style={{
              width: `${
                ((currentVerbIndex + 1) /
                  verbSpeakingData.length) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      {/* ===================================================== */}
      {/* CARTE DU VERBE                                        */}
      {/* ===================================================== */}

      <div className="mb-10">
        <VerbListeningExercise
          category={currentCategory}
        />
      </div>

      {/* ===================================================== */}
      {/* INSTRUCTION PRONONCIATION                             */}
      {/* ===================================================== */}

      {!speakingStarted && (
        <div
          className="
            mb-8
            rounded-3xl
            border
            border-blue-200
            bg-blue-50
            p-6
            sm:p-8
          "
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                À toi de parler
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Prononce les phrases avec{" "}
                {currentCategory.title.replace(
                  /^\d+\.\s*/,
                  "",
                )}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Appuie sur le micro puis prononce
                la phrase demandée.
              </p>
            </div>

            <button
              type="button"
              onClick={handleStartSpeaking}
              className="
                inline-flex
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-blue-600
                px-6
                py-3
                font-bold
                text-white
                shadow-[0_10px_25px_rgba(37,99,235,0.20)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-blue-700
                active:translate-y-0
              "
            >
              Commencer →
            </button>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* EXERCICE VOCAL                                        */}
      {/* ===================================================== */}

      {speakingStarted && !verbFinished && (
        <VerbSpeakingExercise
          category={currentCategory}
          onComplete={handleVerbComplete}
        />
      )}

      {/* ===================================================== */}
      {/* CORRECTION DU VERBE                                   */}
      {/* ===================================================== */}

      {verbFinished && verbScore && (
        <div
          className="
            mt-8
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-[0_10px_35px_rgba(15,23,42,0.08)]
          "
        >
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Correction
            </p>

            <h3 className="mt-1 text-2xl font-bold text-slate-900">
              {currentCategory.title}
            </h3>
          </div>

          <div className="px-6 py-7 sm:px-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-50">
                <span className="text-3xl font-black text-amber-600">
                  {Math.round(
                    (verbScore.correctAnswers /
                      verbScore.totalQuestions) *
                      100,
                  )}
                  %
                </span>
              </div>

              <p className="mt-4 text-lg font-bold text-slate-900">
                {verbScore.correctAnswers} /{" "}
                {verbScore.totalQuestions} réponses
                correctes
              </p>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                Bravo ! Tu peux maintenant passer
                au verbe suivant.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleNextVerb}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-2xl
                  bg-amber-400
                  px-7
                  py-3.5
                  font-bold
                  text-slate-950
                  shadow-[0_10px_25px_rgba(245,158,11,0.20)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-amber-300
                  active:translate-y-0
                "
              >
                {isLastVerb
                  ? "Terminer l'exercice →"
                  : "Verbe suivant →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}