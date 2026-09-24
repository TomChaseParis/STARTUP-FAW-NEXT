"use client";

import React, { useMemo, useState } from "react";

import {
  validateSentence,
  validateSingleWord,
} from "@/components/courses/speech/scoring";

import { useSpeechRecognition } from "@/components/courses/speech/useSpeechRecognition";
import SpeechButton from "@/components/courses/components/SpeechButton";

import { ExerciseCategory } from "../../data/verbConjugationData";

type VerbScore = {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
};

type VerbSpeakingExerciseProps = {
  category?: ExerciseCategory;
  data?: ExerciseCategory;

  verbTitle?: string;

  onNextVerb?: () => void;
  nextVerbLabel?: string;

  onComplete?: (result: VerbScore) => void;
};

type QuestionResult = {
  status: "correct" | "incorrect" | "correction";
  similarity: number;
};

const VerbSpeakingExercise: React.FC<
  VerbSpeakingExerciseProps
> = ({
  category,
  data,
  verbTitle,
  onNextVerb,
  nextVerbLabel,
  onComplete,
}) => {
  const currentCategory = category ?? data;

  /*
   * ========================================================
   * HOOKS
   *
   * Tous les hooks sont exécutés à chaque render,
   * dans le même ordre.
   * ========================================================
   */

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [feedback, setFeedback] =
    useState("");

  const [attempts, setAttempts] =
    useState(0);

  const [results, setResults] = useState<
    (QuestionResult | null)[]
  >([]);

  const [finished, setFinished] =
    useState(false);

  const { start, isListening } =
    useSpeechRecognition();

  /*
   * ========================================================
   * VALEURS DÉRIVÉES
   * ========================================================
   */

  const totalQuestions =
    currentCategory?.items.length ?? 0;

  const progress = useMemo(() => {
    if (finished) return 100;

    if (totalQuestions === 0) {
      return 0;
    }

    return (
      ((currentIndex + 1) /
        totalQuestions) *
      100
    );
  }, [
    currentIndex,
    totalQuestions,
    finished,
  ]);

  /*
   * ========================================================
   * SÉCURITÉ
   * ========================================================
   */

  if (!currentCategory) {
    return null;
  }

  /*
   * ========================================================
   * INITIALISATION DES RÉSULTATS
   *
   * On évite de modifier le state pendant le render.
   * ========================================================
   */

  const currentItem =
    currentCategory.items[currentIndex];

  /*
   * Si aucun item n'existe, on évite un crash.
   */

  if (!currentItem) {
    return null;
  }

  /*
   * Si le tableau de résultats est encore vide,
   * on l'initialisera au premier changement d'état.
   *
   * Pour éviter un setState pendant le render,
   * on utilise une valeur locale.
   */

  const effectiveResults =
    results.length ===
    currentCategory.items.length
      ? results
      : currentCategory.items.map(
          (_, index) =>
            results[index] ?? null,
        );

  /*
   * ========================================================
   * AUDIO
   * ========================================================
   */

  const playAudio = (file: string) => {
    const audio = new Audio(file);

    void audio.play().catch(() => {
      // Ignore playback errors.
    });
  };

  /*
   * ========================================================
   * SCORE
   * ========================================================
   */

  const calculateScore = () => {
    const completedResults =
      effectiveResults.filter(
        (
          result,
        ): result is QuestionResult =>
          result !== null,
      );

    if (
      completedResults.length === 0
    ) {
      return 0;
    }

    const total =
      completedResults.reduce(
        (sum, result) =>
          sum + result.similarity,
        0,
      );

    return Math.round(
      total /
        completedResults.length,
    );
  };

  /*
   * ========================================================
   * QUESTION SUIVANTE
   * ========================================================
   */

  const handleNextQuestion = () => {
    if (
      currentIndex >=
      totalQuestions - 1
    ) {
      const completedResults =
        effectiveResults.filter(
          (
            result,
          ): result is QuestionResult =>
            result !== null,
        );

      const total =
        completedResults.reduce(
          (sum, result) =>
            sum + result.similarity,
          0,
        );

      const score =
        completedResults.length > 0
          ? Math.round(
              total /
                completedResults.length,
            )
          : 0;

      const correctAnswers =
        completedResults.filter(
          (result) =>
            result.status ===
            "correct",
        ).length;

      onComplete?.({
        score,
        totalQuestions,
        correctAnswers,
      });

      setFinished(true);

      return;
    }

    setCurrentIndex(
      (previous) => previous + 1,
    );

    setFeedback("");
    setAttempts(0);
  };

  /*
   * ========================================================
   * RECONNAISSANCE VOCALE
   * ========================================================
   */

  const handleRecognitionResult = (
    spokenText: string,
  ) => {
    const sentenceResult =
      validateSentence(
        spokenText,
        currentItem.expectedSentence,
      );

    const wordResult =
      validateSingleWord(
        spokenText,
        currentItem.answer,
      );

    const similarity = Math.min(
      sentenceResult.similarity,
      wordResult.similarity,
    );

    const isCorrect =
      sentenceResult.isCorrect &&
      wordResult.isCorrect;

    /*
     * ======================================================
     * BONNE RÉPONSE
     * ======================================================
     */

    if (isCorrect) {
      const correctAudio =
        currentItem.audio.correct[
          Math.floor(
            Math.random() *
              currentItem.audio.correct
                .length,
          )
        ];

      playAudio(correctAudio);

      setFeedback(
        `✅ Bonne réponse (${similarity}%)`,
      );

      setResults((previous) => {
        const updated =
          previous.length ===
          totalQuestions
            ? [...previous]
            : currentCategory.items.map(
                (_, index) =>
                  previous[index] ??
                  null,
              );

        updated[currentIndex] = {
          status: "correct",
          similarity,
        };

        return updated;
      });

      return;
    }

    /*
     * ======================================================
     * MAUVAISE RÉPONSE
     * ======================================================
     */

    const nextAttempts =
      attempts + 1;

    setAttempts(nextAttempts);

    /*
     * 1er échec
     */

    if (nextAttempts === 1) {
      const wrongAudio =
        currentItem.audio.wrong1[
          Math.floor(
            Math.random() *
              currentItem.audio.wrong1
                .length,
          )
        ];

      playAudio(wrongAudio);

      setFeedback(
        `❌ Mauvaise réponse (${similarity}%). Essaie encore.`,
      );

      return;
    }

    /*
     * 2e échec
     */

    if (nextAttempts === 2) {
      const wrongAudio =
        currentItem.audio.wrong2[
          Math.floor(
            Math.random() *
              currentItem.audio.wrong2
                .length,
          )
        ];

      playAudio(wrongAudio);

      setFeedback(
        `❌ Ce n'est pas encore ça (${similarity}%). Essaie encore.`,
      );

      return;
    }

    /*
     * 3e échec
     */

    if (nextAttempts === 3) {
      const wrongAudio =
        currentItem.audio.wrong2[
          Math.floor(
            Math.random() *
              currentItem.audio.wrong2
                .length,
          )
        ];

      playAudio(wrongAudio);

      setFeedback(
        `❌ Dernier essai (${similarity}%). Écoute bien et recommence.`,
      );

      return;
    }

    /*
     * 4e échec → correction
     */

    playAudio(
      currentItem.audio.solution,
    );

    setFeedback(
      `💡 Correction : « ${currentItem.expectedSentence} »`,
    );

    setResults((previous) => {
      const updated =
        previous.length ===
        totalQuestions
          ? [...previous]
          : currentCategory.items.map(
              (_, index) =>
                previous[index] ??
                null,
            );

      updated[currentIndex] = {
        status: "correction",
        similarity,
      };

      return updated;
    });
  };

  /*
   * ========================================================
   * MICRO
   * ========================================================
   */

  const handleSpeak = () => {
    setFeedback(
      "🎤 Parlez maintenant…",
    );

    start((spokenText) => {
      handleRecognitionResult(
        spokenText,
      );
    });
  };

  /*
   * ========================================================
   * RÉSULTAT DU VERBE
   * ========================================================
   */

  if (finished) {
    const score =
      calculateScore();

    return (
      <section className="w-full">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
          {/* HEADER */}

          <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-6 sm:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Exercice terminé
            </p>

            <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Le verbe{" "}
              {verbTitle ??
                currentCategory.title}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Voici ton résultat.
            </p>
          </div>

          {/* SCORE */}

          <div className="px-6 py-8 text-center sm:px-8">
            <p className="text-sm font-medium uppercase tracking-widest text-slate-400">
              Ton score
            </p>

            <div className="mt-3 text-6xl font-black text-slate-900">
              {score}%
            </div>
          </div>

          {/* RÉCAPITULATIF */}

          <div className="space-y-3 border-t border-slate-100 p-5 sm:p-7">
            <h4 className="mb-5 text-lg font-bold text-slate-900">
              Récapitulatif
            </h4>

            {currentCategory.items.map(
              (item, index) => {
                const result =
                  effectiveResults[index];

                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`
                          flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold
                          ${
                            result?.status ===
                            "correct"
                              ? "bg-green-100 text-green-700"
                              : result?.status ===
                                  "correction"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {result?.status ===
                        "correct"
                          ? "✓"
                          : result?.status ===
                              "correction"
                            ? "!"
                            : "×"}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-relaxed text-slate-800">
                          {
                            item.expectedSentence
                          }
                        </p>

                        {result && (
                          <p className="mt-2 text-xs font-medium text-slate-500">
                            {
                              result.similarity
                            }
                            % de
                            correspondance
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              },
            )}
          </div>

          {/* BOUTONS */}

          <div className="border-t border-slate-100 p-5 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setCurrentIndex(0);
                  setFeedback("");
                  setAttempts(0);

                  setResults(
                    currentCategory.items.map(
                      () => null,
                    ),
                  );

                  setFinished(false);
                }}
                className="w-full rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Recommencer
              </button>

              {onNextVerb &&
                nextVerbLabel && (
                  <button
                    type="button"
                    onClick={
                      onNextVerb
                    }
                    className="w-full rounded-2xl bg-[#E09F00] px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#C98D00]"
                  >
                    {
                      nextVerbLabel
                    }
                  </button>
                )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /*
   * ========================================================
   * QUESTION EN COURS
   * ========================================================
   */

  const questionSolved =
    effectiveResults[currentIndex] !==
    null;

  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
        {/* HEADER */}

        <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Prononciation
              </p>

              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Prononce la phrase
              </h3>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-xs font-semibold text-slate-400">
                QUESTION
              </p>

              <p className="text-lg font-bold text-slate-900">
                {currentIndex + 1}{" "}
                <span className="font-medium text-slate-400">
                  / {totalQuestions}
                </span>
              </p>
            </div>
          </div>

          {/* PROGRESSION */}

          <div className="mt-5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* QUESTION */}

        <div className="px-6 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <span className="inline-flex rounded-full bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                Question{" "}
                {currentIndex + 1}
              </span>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 px-6 py-10 text-center sm:px-10">
              <p
                className="text-xl font-semibold leading-relaxed text-slate-900 sm:text-2xl"
                dangerouslySetInnerHTML={{
                  __html:
                    currentItem.phrase.replace(
                      ".......",
                      questionSolved
                        ? `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:90px;margin:0 5px;padding:6px 16px;border-radius:12px;background:#dcfce7;color:#15803d;font-weight:800;">${currentItem.answer}</span>`
                        : `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:90px;margin:0 5px;padding:6px 16px;border-radius:12px;background:#fffaf0;border:1px solid #fde68a;color:#92400e;font-weight:700;">...</span>`,
                    ),
                }}
              />
            </div>

            {/* FEEDBACK */}

            {feedback && (
              <div
                className={`
                  mt-5 rounded-2xl border px-5 py-4 text-center text-sm font-semibold
                  ${
                    feedback.includes("Bonne")
                      ? "border-green-200 bg-green-50 text-green-700"
                      : feedback.includes(
                            "Correction",
                          )
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : feedback.includes(
                              "Parlez",
                          )
                          ? "border-amber-200 bg-amber-50 text-amber-700"
                          : "border-red-200 bg-red-50 text-red-700"
                  }
                `}
              >
                {feedback}
              </div>
            )}

            {/* MICRO */}

            {!questionSolved && (
              <div className="mt-8 flex flex-col items-center">
                <SpeechButton
                  isListening={
                    isListening
                  }
                  onClick={
                    handleSpeak
                  }
                />

                <p className="mt-3 text-sm text-slate-500">
                  {isListening
                    ? "Je t'écoute..."
                    : "Clique sur le micro et prononce la phrase"}
                </p>
              </div>
            )}

            {/* QUESTION SUIVANTE */}

            {questionSolved && (
              <button
                type="button"
                onClick={
                  handleNextQuestion
                }
                className="mt-8 w-full rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                {currentIndex ===
                totalQuestions - 1
                  ? "Voir mon résultat →"
                  : "Question suivante →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerbSpeakingExercise;