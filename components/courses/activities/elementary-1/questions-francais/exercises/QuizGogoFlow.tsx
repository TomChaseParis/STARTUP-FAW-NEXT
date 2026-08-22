"use client";

import { useState } from "react";

import QuizFranceSection from "./QuizFranceSection";
import ListeningQuizExercise from "../../activity1/exercises/ListeningQuizExercise";

type QuizStep = 1 | 2;

export default function QuizGogoFlow() {
  const [currentQuiz, setCurrentQuiz] =
    useState<QuizStep>(1);

  const [quiz1Completed, setQuiz1Completed] =
    useState(false);

  const [quiz2Completed, setQuiz2Completed] =
    useState(false);

  const handleQuiz1Next = () => {
    setQuiz1Completed(true);
    setCurrentQuiz(2);
  };

  const handleQuiz2Next = () => {
    setQuiz2Completed(true);
  };

  return (
    <section className="mt-16 w-full">
      {/* =========================
          HEADER
      ========================= */}

      <div className="mx-auto mb-12 max-w-5xl px-4">
        <div className="overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 shadow-sm">
          <div className="p-8 text-center">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-bold uppercase tracking-wider text-amber-700">
              Quiz à gogo
            </span>

            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              À toi de jouer !
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              Deux quiz t'attendent. Commence par le
              premier, puis passe au deuxième une fois
              terminé.
            </p>
          </div>

          {/* =========================
              PROGRESSION
          ========================= */}

          <div className="border-t border-amber-100 bg-white/70 px-6 py-5">
            <div className="mx-auto flex max-w-2xl items-center justify-center gap-3">
              {/* QUIZ 1 */}

              <div className="flex items-center gap-3">
                <div
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition",
                    currentQuiz === 1
                      ? "bg-amber-500 text-white shadow-md"
                      : quiz1Completed
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 text-slate-500",
                  ].join(" ")}
                >
                  {quiz1Completed ? "✓" : "1"}
                </div>

                <span
                  className={[
                    "hidden text-sm font-semibold sm:block",
                    currentQuiz === 1
                      ? "text-amber-700"
                      : quiz1Completed
                        ? "text-emerald-700"
                        : "text-slate-400",
                  ].join(" ")}
                >
                  Quiz 1
                </span>
              </div>

              {/* CONNECTEUR */}

              <div
                className={[
                  "h-1 w-16 rounded-full transition",
                  quiz1Completed
                    ? "bg-emerald-400"
                    : "bg-slate-200",
                ].join(" ")}
              />

              {/* QUIZ 2 */}

              <div className="flex items-center gap-3">
                <div
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition",
                    currentQuiz === 2
                      ? "bg-amber-500 text-white shadow-md"
                      : quiz2Completed
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 text-slate-500",
                  ].join(" ")}
                >
                  {quiz2Completed ? "✓" : "2"}
                </div>

                <span
                  className={[
                    "hidden text-sm font-semibold sm:block",
                    currentQuiz === 2
                      ? "text-amber-700"
                      : quiz2Completed
                        ? "text-emerald-700"
                        : "text-slate-400",
                  ].join(" ")}
                >
                  Quiz 2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          QUIZ 1
      ========================= */}

      {currentQuiz === 1 && (
        <div className="mx-auto max-w-6xl px-4">
          <QuizFranceSection
            onCompleted={handleQuiz1Next}
          />
        </div>
      )}

      {/* =========================
          QUIZ 2
      ========================= */}

      {currentQuiz === 2 && (
        <div className="mx-auto max-w-6xl px-4">
          <ListeningQuizExercise
            onCompleted={handleQuiz2Next}
          />
        </div>
      )}

      {/* =========================
          FIN
      ========================= */}

      {quiz2Completed && (
        <div className="mx-auto mt-12 max-w-4xl px-4">
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-8 text-center shadow-sm">
            <div className="text-5xl">🎉</div>

            <h3 className="mt-4 text-2xl font-bold text-slate-900">
              Quiz à gogo terminé !
            </h3>

            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-600">
              Bravo ! Tu as terminé les deux quiz de
              cette activité.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}