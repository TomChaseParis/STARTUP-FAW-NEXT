"use client";

import { useState } from "react";


import QuizFranceSection from "../activities/elementary-1/questions-francais/exercises/QuizFranceSection";

import ListeningQuizExercise from "../activities/elementary-1/activity1/exercises/ListeningQuizExercise";

type QuizStep = 1 | 2;

export default function QuizAGogoEngine() {
  const [currentQuiz, setCurrentQuiz] =
    useState<QuizStep>(1);

  const goToSecondQuiz = () => {
    setCurrentQuiz(2);
  };

  if (currentQuiz === 1) {
    return (
      <section className="w-full">
        <div className="mx-auto mb-10 max-w-5xl px-4">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">
                  Quiz à gogo
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Quiz 1 sur 2
                </h2>

                <p className="mt-2 text-slate-600">
                  Commence par tester tes connaissances
                  sur la France et les Français.
                </p>
              </div>

              <div className="hidden shrink-0 sm:flex">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 font-bold text-white">
                    1
                  </div>

                  <div className="h-1 w-10 rounded-full bg-slate-200" />

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-400">
                    2
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <QuizFranceSection
          onComplete={goToSecondQuiz}
        />
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="mx-auto mb-10 max-w-5xl px-4">
        <div className="rounded-3xl border border-orange-200 bg-orange-50 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
                Quiz à gogo
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Quiz 2 sur 2
              </h2>

              <p className="mt-2 text-slate-600">
                Dernier quiz : écoute attentivement et
                choisis la bonne réponse.
              </p>
            </div>

            <div className="hidden shrink-0 sm:flex">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 font-bold text-white">
                  ✓
                </div>

                <div className="h-1 w-10 rounded-full bg-orange-300" />

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                  2
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ListeningQuizExercise />
    </section>
  );
}