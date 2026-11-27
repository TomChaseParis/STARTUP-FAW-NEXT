
"use client";

import { useRef, useState } from "react";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

import { computeScore } from "@/components/courses/common/utils/quizScoring";

type Word = {
  wrong: string;
  correct: string;
};

type Props = {
  text: (string | Word)[];
  teacherImage?: string;
  onComplete: (result: ExerciseSessionResult) => void;
};

type AnswerHistory = {
  user: string;
  correct: string;
  isCorrect: boolean;
};

const removeAccents = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const normalizeAnswer = (value: string) =>
  removeAccents(value.trim().toLowerCase());

export default function OrthographeInlineEngine({
  text,
  onComplete,
}: Props) {
  const safeText = text ?? [];

  const words: Word[] = safeText.filter(
    (part): part is Word => typeof part !== "string",
  );

  const [answers, setAnswers] = useState<string[]>(() =>
    words.map((word) => word.wrong),
  );

  const [progressPercentage, setProgressPercentage] = useState(0);

  const completedRef = useRef(false);
  const startedAtRef = useRef(new Date());

  const totalInputs = words.length;

  const handleChange = (index: number, value: string) => {
    setAnswers((previous) => {
      const next = [...previous];
      next[index] = value;

      const correctCount = next.filter(
        (answer, answerIndex) =>
          normalizeAnswer(answer) ===
          normalizeAnswer(words[answerIndex].correct),
      ).length;

      setProgressPercentage(
        totalInputs > 0
          ? Math.round((correctCount / totalInputs) * 100)
          : 0,
      );

      return next;
    });
  };

  const checkAnswers = () => {
    if (completedRef.current || totalInputs === 0) {
      return;
    }

    completedRef.current = true;

    const history: AnswerHistory[] = words.map((word, index) => {
      const user = answers[index] ?? "";

      return {
        user,
        correct: word.correct,
        isCorrect:
          normalizeAnswer(user) === normalizeAnswer(word.correct),
      };
    });

    const correctCount = history.filter(
      (answer) => answer.isCorrect,
    ).length;

    const finishedAt = new Date();

    /*
     * Construction du texte complet avec des marqueurs
     * qui permettront de replacer chaque réponse dans le texte.
     *
     * Exemple :
     * "Il y a huit [[ANSWER:1]], les déménageurs ont [[ANSWER:2]]..."
     */

    let answerIndex = 0;

    const formattedText = safeText
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }

        answerIndex += 1;

        return `[[ANSWER:${answerIndex}]]`;
      })
      .join("");

    /*
     * Une entrée spéciale contient le texte complet.
     * Les autres entrées conservent les réponses individuelles
     * pour le calcul du score et l'affichage des corrections.
     */

    const result: ExerciseSessionResult = {
      score: computeScore(correctCount, totalInputs),
      correctAnswers: correctCount,
      totalQuestions: totalInputs,
      history: [
        {
          questionId: 0,
          question: `[[INLINE_TEXT]]${formattedText}`,
          selectedAnswer: "",
          correctAnswer: "",
          isCorrect: true,
        },
        ...history.map((answer, index) => ({
          questionId: index + 1,
          question: words[index].wrong,
          selectedAnswer: answer.user,
          correctAnswer: answer.correct,
          isCorrect: answer.isCorrect,
        })),
      ],
      startedAt: startedAtRef.current,
      finishedAt,
      duration: Math.max(
        0,
        Math.round(
          (finishedAt.getTime() - startedAtRef.current.getTime()) / 1000,
        ),
      ),
    };

    onComplete(result);
  };

  let currentInput = 0;

  return (
    <section className="mx-auto w-full max-w-6xl pb-16">
      <div className="overflow-hidden rounded-3xl border border-[#e8eadf] bg-white shadow-[0_12px_45px_rgba(49,87,44,0.07)]">
        <div className="relative overflow-hidden bg-[#31572C] px-6 py-7 text-white sm:px-9 sm:py-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[35px] border-white/5"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-28 h-48 w-48 rounded-full bg-[#57CC99]/10 blur-2xl"
          />

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-5">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#c7f2d9]">
                  Phonie-graphie
                </span>

                <span className="text-xs font-medium text-white/60">
                  Atelier d&apos;orthographe
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold leading-tight sm:text-3xl">
                À toi de corriger !
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/75">
                Observe les mots incorrects et retrouve leur bonne
                orthographe.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-inner">
              <svg
                viewBox="0 0 48 48"
                className="h-9 w-9 text-[#b8f0d0]"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 8h28v32H10z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 18h14M17 25h14M17 32h9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="m31 31 3 3 6-7"
                  stroke="#57CC99"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
            <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3">
              <p className="text-xs text-white/60">Mots à corriger</p>
              <p className="mt-1 text-2xl font-bold tabular-nums">
                {totalInputs}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3">
              <p className="text-xs text-white/60">Progression actuelle</p>
              <p className="mt-1 text-2xl font-bold tabular-nums">
                {progressPercentage} %
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-8 lg:p-10">
          <div className="mb-8 flex gap-3 rounded-2xl border border-[#dcebdd] bg-[#f5faf4] p-4 sm:p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#31572C]/10 text-[#31572C]">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  d="M12 16v-4m0-4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-bold text-[#31572C]">
                Comment jouer ?
              </p>

              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Remplace chaque mot incorrect par sa bonne orthographe.
                Prends le temps de relire le texte avant de vérifier tes
                réponses.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl border border-[#e9e8df] bg-[#fffefa] p-5 shadow-sm sm:p-8">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-[#ecebe3] pb-5">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#829276]">
                  Ton texte
                </p>

                <h3 className="mt-1 font-serif text-xl font-bold text-[#263b29]">
                  Le déménagement
                </h3>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Mots à corriger
              </div>
            </div>

            <div className="text-[16px] leading-[2.5] text-[#39443b] sm:text-[18px] sm:leading-[2.7]">
              {safeText.map((part, index) => {
                if (typeof part === "string") {
                  return <span key={index}>{part}</span>;
                }

                const inputIndex = currentInput;
                currentInput++;

                return (
                  <span
                    key={index}
                    className="mx-1 inline-flex align-baseline"
                  >
                    <input
                      aria-label={`Mot à corriger ${inputIndex + 1}`}
                      value={answers[inputIndex]}
                      onChange={(event) =>
                        handleChange(inputIndex, event.target.value)
                      }
                      spellCheck={false}
                      className="
                        w-auto min-w-[105px] max-w-full
                        rounded-lg
                        border border-red-200
                        bg-red-50
                        px-3 py-1.5
                        text-center
                        text-[15px] font-bold
                        text-red-700
                        outline-none
                        transition-all duration-200
                        placeholder:text-red-300
                        hover:border-red-300
                        focus:border-[#57CC99]
                        focus:bg-white
                        focus:ring-4
                        focus:ring-[#57CC99]/15
                        sm:text-base
                      "
                      style={{
                        width: `${Math.max(
                          105,
                          Math.min(230, (part.wrong.length + 2) * 10),
                        )}px`,
                      }}
                    />
                  </span>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#ecebe3] pt-5 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-red-100 ring-1 ring-red-200" />
                Mot à corriger
              </span>

              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-white ring-1 ring-[#57CC99]" />
                Zone de saisie
              </span>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">
                Avancement de ton travail
              </span>

              <span className="font-bold tabular-nums text-[#31572C]">
                {progressPercentage} %
              </span>
            </div>

            <div
              className="h-2 overflow-hidden rounded-full bg-[#edf1e9]"
              role="progressbar"
              aria-label="Progression des réponses correctes"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-[#57CC99] transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-xs leading-relaxed text-slate-500 sm:text-left">
              Tu peux modifier tes réponses autant de fois que nécessaire
              avant la vérification.
            </p>

            <button
              type="button"
              onClick={checkAnswers}
              disabled={totalInputs === 0}
              className="
                group inline-flex w-full items-center justify-center gap-3
                rounded-xl
                bg-[#31572C]
                px-7 py-3.5
                text-sm font-bold text-white
                shadow-[0_5px_14px_rgba(49,87,44,0.2)]
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-[#244421]
                hover:shadow-[0_8px_20px_rgba(49,87,44,0.25)]
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-[#57CC99]/30
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:w-auto
              "
            >
              Vérifier mes réponses

              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  d="m9 18 6-6-6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
