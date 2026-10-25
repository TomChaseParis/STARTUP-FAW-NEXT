"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  validateSentence,
  validateSingleWord,
} from "@/components/courses/speech/scoring";

import { useOpenAISpeechRecognition } from "@/components/courses/speech/useOpenAISpeechRecognition";

import TeacherComicBubble from "@/components/courses/common/teacher/TeacherComicBubble";

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

type RecognitionCallback = (text: string) => void;

const VerbSpeakingExercise: React.FC<VerbSpeakingExerciseProps> = ({
  category,
  data,
  verbTitle,
  onNextVerb,
  nextVerbLabel,
  onComplete,
}) => {
  const currentCategory = category ?? data;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [results, setResults] = useState<(QuestionResult | null)[]>([]);
  const [finished, setFinished] = useState(false);

  // Apparition de Marie et de sa bulle.
  const [showPhoto, setShowPhoto] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [hideTeacher, setHideTeacher] = useState(false);

  const recognitionCallbackRef = useRef<RecognitionCallback>(() => {});

  const totalQuestions = currentCategory?.items.length ?? 0;

  const { startListening, stopListening, isListening, isSupported } =
    useOpenAISpeechRecognition({
      language: "fr-FR",
      onResult: (text) => {
        recognitionCallbackRef.current(text);
      },
    });

  // Marie réapparaît à chaque nouvelle question.
  useEffect(() => {
    setShowPhoto(false);
    setShowBubble(false);
    setHideTeacher(false);

    const photoTimeout = window.setTimeout(() => {
      setShowPhoto(true);
    }, 500);

    const bubbleTimeout = window.setTimeout(() => {
      setShowBubble(true);
    }, 1200);

    return () => {
      window.clearTimeout(photoTimeout);
      window.clearTimeout(bubbleTimeout);
    };
  }, [currentIndex]);

  const progress = useMemo(() => {
    if (finished) return 100;
    if (totalQuestions === 0) return 0;

    return ((currentIndex + 1) / totalQuestions) * 100;
  }, [currentIndex, totalQuestions, finished]);

  if (!currentCategory) {
    return null;
  }

  const currentItem = currentCategory.items[currentIndex];

  if (!currentItem) {
    return null;
  }

  const effectiveResults =
    results.length === currentCategory.items.length
      ? results
      : currentCategory.items.map((_, index) => results[index] ?? null);

  const playAudio = (file: string) => {
    const audio = new Audio(file);
    void audio.play().catch(() => {});
  };

  const calculateScore = () => {
    const completedResults = effectiveResults.filter(
      (result): result is QuestionResult => result !== null,
    );

    if (completedResults.length === 0) return 0;

    const total = completedResults.reduce(
      (sum, result) => sum + result.similarity,
      0,
    );

    return Math.round(total / completedResults.length);
  };

  const handleNextQuestion = () => {
    if (currentIndex >= totalQuestions - 1) {
      const completedResults = effectiveResults.filter(
        (result): result is QuestionResult => result !== null,
      );

      const total = completedResults.reduce(
        (sum, result) => sum + result.similarity,
        0,
      );

      const score =
        completedResults.length > 0
          ? Math.round(total / completedResults.length)
          : 0;

      const correctAnswers = completedResults.filter(
        (result) => result.status === "correct",
      ).length;

      onComplete?.({
        score,
        totalQuestions,
        correctAnswers,
      });

      setFinished(true);
      return;
    }

    setCurrentIndex((previous) => previous + 1);
    setFeedback("");
    setAttempts(0);
  };

  const handleRecognitionResult = (spokenText: string) => {
    const normalizedSpokenText = spokenText.trim();

    if (!normalizedSpokenText) {
      setFeedback("Je n'ai pas entendu ta réponse. Réessaie.");
      return;
    }

    const sentenceResult = validateSentence(
      normalizedSpokenText,
      currentItem.expectedSentence,
    );

    const wordResult = validateSingleWord(
      normalizedSpokenText,
      currentItem.answer,
    );

    const similarity = Math.min(
      sentenceResult.similarity,
      wordResult.similarity,
    );

    const isCorrect = sentenceResult.isCorrect && wordResult.isCorrect;

    if (isCorrect) {
      const correctAudios = currentItem.audio.correct;

      if (correctAudios.length > 0) {
        const correctAudio =
          correctAudios[Math.floor(Math.random() * correctAudios.length)];

        playAudio(correctAudio);
      }

      setFeedback(`✅ Bonne réponse (${similarity}%)`);

      setResults((previous) => {
        const updated =
          previous.length === totalQuestions
            ? [...previous]
            : currentCategory.items.map(
                (_, index) => previous[index] ?? null,
              );

        updated[currentIndex] = {
          status: "correct",
          similarity,
        };

        return updated;
      });

      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (nextAttempts === 1) {
      const wrongAudios = currentItem.audio.wrong1;

      if (wrongAudios.length > 0) {
        const wrongAudio =
          wrongAudios[Math.floor(Math.random() * wrongAudios.length)];

        playAudio(wrongAudio);
      }

      setFeedback(`❌ Mauvaise réponse (${similarity}%). Essaie encore.`);
      return;
    }

    if (nextAttempts === 2) {
      const wrongAudios = currentItem.audio.wrong2;

      if (wrongAudios.length > 0) {
        const wrongAudio =
          wrongAudios[Math.floor(Math.random() * wrongAudios.length)];

        playAudio(wrongAudio);
      }

      setFeedback(`❌ Ce n'est pas encore ça (${similarity}%). Essaie encore.`);
      return;
    }

    if (nextAttempts === 3) {
      const wrongAudios = currentItem.audio.wrong2;

      if (wrongAudios.length > 0) {
        const wrongAudio =
          wrongAudios[Math.floor(Math.random() * wrongAudios.length)];

        playAudio(wrongAudio);
      }

      setFeedback(
        `❌ Dernier essai (${similarity}%). Écoute bien et recommence.`,
      );
      return;
    }

    playAudio(currentItem.audio.solution);

    setFeedback(`💡 Correction : « ${currentItem.expectedSentence} »`);

    setResults((previous) => {
      const updated =
        previous.length === totalQuestions
          ? [...previous]
          : currentCategory.items.map(
              (_, index) => previous[index] ?? null,
            );

      updated[currentIndex] = {
        status: "correction",
        similarity,
      };

      return updated;
    });
  };

  // La référence pointe toujours vers la question actuelle.
  recognitionCallbackRef.current = handleRecognitionResult;

  const handleSpeak = () => {
    // Masque Marie, sa bulle et le halo sans déplacer le microphone.
    setHideTeacher(true);

    if (isListening) {
      stopListening();
      return;
    }

    if (!isSupported) {
      setFeedback("❌ Ton navigateur ne permet pas d'accéder au microphone.");
      return;
    }

    setFeedback("🎤 Parle maintenant…");
    void startListening();
  };

  if (finished) {
    const score = calculateScore();

    return (
      <section className="mx-auto w-full min-w-0 max-w-full">
        <div className="w-full min-w-0 max-w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
          <div className="to-yellow-50 border-b border-amber-100 bg-gradient-to-r from-amber-50 px-6 py-6 sm:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Exercice terminé
            </p>

            <h3 className="mt-1 break-words text-3xl font-bold tracking-tight text-slate-900">
              Le verbe {verbTitle ?? currentCategory.title}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Voici ton résultat.
            </p>
          </div>

          <div className="px-6 py-8 text-center sm:px-8">
            <p className="text-sm font-medium uppercase tracking-widest text-slate-400">
              Ton score
            </p>

            <div className="mt-3 text-6xl font-black text-slate-900">
              {score}%
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 p-5 sm:p-7">
            <h4 className="mb-5 text-lg font-bold text-slate-900">
              Récapitulatif
            </h4>

            {currentCategory.items.map((item, index) => {
              const result = effectiveResults[index];

              return (
                <div
                  key={index}
                  className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        result?.status === "correct"
                          ? "bg-green-100 text-green-700"
                          : result?.status === "correction"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {result?.status === "correct"
                        ? "✓"
                        : result?.status === "correction"
                          ? "!"
                          : "×"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="break-words text-sm font-medium leading-relaxed text-slate-800">
                        {item.expectedSentence}
                      </p>

                      {result && (
                        <p className="mt-2 text-xs font-medium text-slate-500">
                          {result.similarity}% de correspondance
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-100 p-5 sm:p-7">
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setCurrentIndex(0);
                  setFeedback("");
                  setAttempts(0);
                  setResults(currentCategory.items.map(() => null));
                  setFinished(false);
                  setShowPhoto(false);
                  setShowBubble(false);
                  setHideTeacher(false);
                }}
                className="w-full min-w-0 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Recommencer
              </button>

              {onNextVerb && nextVerbLabel && (
                <button
                  type="button"
                  onClick={onNextVerb}
                  className="w-full min-w-0 rounded-2xl bg-[#E09F00] px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#C98D00]"
                >
                  {nextVerbLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const questionSolved = effectiveResults[currentIndex] !== null;

  const escapedAnswer = currentItem.answer
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  const questionHtml = currentItem.phrase.replace(
    ".......",
    questionSolved
      ? `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:90px;margin:0 5px;padding:6px 16px;border-radius:12px;background:#dcfce7;color:#15803d;font-weight:800;">${escapedAnswer}</span>`
      : '<span style="display:inline-flex;align-items:center;justify-content:center;min-width:90px;margin:0 5px;padding:6px 16px;border-radius:12px;background:#fffaf0;border:1px solid #fde68a;color:#92400e;font-weight:700;">...</span>',
  );

  return (
    <section className="mx-auto w-full min-w-0 max-w-full">
      <div className="w-full min-w-0 max-w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
        <div className="to-yellow-50 border-b border-amber-100 bg-gradient-to-r from-amber-50 px-6 py-5 sm:px-8">
          <div className="flex min-w-0 items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Prononciation
              </p>

              <h3 className="mt-1 break-words text-2xl font-bold tracking-tight text-slate-900">
                Prononce la phrase
              </h3>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-xs font-semibold text-slate-400">QUESTION</p>

              <p className="text-lg font-bold text-slate-900">
                {currentIndex + 1}{" "}
                <span className="font-medium text-slate-400">
                  / {totalQuestions}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="min-w-0 px-6 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto w-full min-w-0 max-w-2xl">
            <div className="mb-8 text-center">
              <span className="inline-flex rounded-full bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                Question {currentIndex + 1}
              </span>
            </div>

            <div className="w-full min-w-0 rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-10 text-center sm:px-10">
              <p
                className="break-words text-xl font-semibold leading-relaxed text-slate-900 sm:text-2xl"
                dangerouslySetInnerHTML={{ __html: questionHtml }}
              />
            </div>

            {feedback && (
              <div
                className={`mt-5 w-full min-w-0 break-words rounded-2xl border px-5 py-4 text-center text-sm font-semibold ${
                  feedback.includes("Bonne")
                    ? "border-green-200 bg-green-50 text-green-700"
                    : feedback.includes("Correction")
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : feedback.includes("Parle")
                        ? "border-amber-200 bg-amber-50 text-amber-700"
                        : feedback.includes("Je n'ai pas entendu")
                          ? "border-amber-200 bg-amber-50 text-amber-700"
                          : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {feedback}
              </div>
            )}

            {/* MARIE ET MICROPHONE */}
            {!questionSolved && (
              <div className="relative mt-8 flex min-w-0 flex-col items-center">
                {/* MARIE ET SA BULLE :
                    descendues de 8 px, sans déplacer le microphone. */}
                <div
className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-full max-w-sm -translate-x-1/2 translate-y-[0px]"                  aria-hidden={hideTeacher}
                >
                  <div className={hideTeacher ? "invisible" : "visible"}>
                    <TeacherComicBubble
                      className="w-full items-center gap-2"
                      message="Clique ici pour parler et prononcer la phrase"
                      showPhoto={showPhoto && !hideTeacher}
                      showBubble={showBubble && !hideTeacher}
                    />
                  </div>
                </div>

                {/* MICROPHONE : POSITION INCHANGÉE */}
                <div className="flex min-w-0 flex-col items-center">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleSpeak}
                      aria-label={
                        isListening
                          ? "Arrêter l'enregistrement"
                          : "Commencer l'enregistrement"
                      }
                      aria-pressed={isListening}
                      className={`
                        relative flex h-14 w-14 shrink-0
                        items-center justify-center rounded-full
                        border shadow-xl transition-all duration-200
                        ${
                          isListening
                            ? "scale-105 border-amber-500 bg-amber-400 text-black"
                            : hideTeacher
                              ? "border-slate-200 bg-white text-amber-600"
                              : "animate-[audioAttention_1.4s_ease-in-out_infinite] border-amber-300 bg-white text-amber-600 hover:scale-105 hover:bg-amber-50"
                        }
                      `}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 18v3m0 0h3m-3 0H9m3-7a4 4 0 004-4V7a4 4 0 10-8 0v3a4 4 0 004 4z"
                        />
                      </svg>

                      {isListening && (
                        <div className="absolute -bottom-4 flex gap-1">
                          <div className="animate-wave1 h-3 w-1 rounded bg-amber-300" />
                          <div className="animate-wave2 h-4 w-1 rounded bg-amber-500" />
                          <div className="animate-wave3 h-3 w-1 rounded bg-amber-300" />
                        </div>
                      )}
                    </button>

                    {isListening && (
                      <div className="flex items-center gap-2 text-sm text-black">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-black" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-black delay-75" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-black delay-150" />
                        <span>Parle...</span>
                      </div>
                    )}
                  </div>

                  {!isListening && (
                    <p className="mt-4 break-words text-center text-sm text-slate-500">
                      Clique sur le micro et prononce la phrase
                    </p>
                  )}
                </div>
              </div>
            )}

            {questionSolved && (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="mt-8 w-full min-w-0 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                {currentIndex === totalQuestions - 1
                  ? "Voir mon résultat →"
                  : "Question suivante →"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* HALO DORÉ DU MICROPHONE */}
      <style jsx>{`
        @keyframes audioAttention {
          0%,
          100% {
            box-shadow:
              0 0 0 4px rgba(245, 158, 11, 0.12),
              0 0 12px rgba(245, 158, 11, 0.25);
          }

          50% {
            box-shadow:
              0 0 0 8px rgba(245, 158, 11, 0.22),
              0 0 30px rgba(245, 158, 11, 0.55);
          }
        }
      `}</style>
    </section>
  );
};

export default VerbSpeakingExercise;