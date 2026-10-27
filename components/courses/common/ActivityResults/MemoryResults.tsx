
"use client";

import { useEffect, useRef } from "react";
import type { ActivityResult } from "@/core/activity/models/ActivityResult";

type MemoryResultsProps = {
  result: ActivityResult;
  moves: number;
  onRestart: () => void;
  onNext: () => void;
  isLastExercise?: boolean;
  finishLabel?: string;
};

export default function MemoryResults({
  result,
  moves,
  onRestart,
  onNext,
  isLastExercise = false,
  finishLabel = "Terminer l'activité",
}: MemoryResultsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const score = result.session.score;
  const correctPairs = result.session.correctAnswers;
  const totalPairs = result.session.totalQuestions;

  const feedback =
    score === 100
      ? {
          emoji: "🏆",
          title: "Un sans-faute !",
          message:
            "Bravo ! Tu as retrouvé toutes les associations du Memory d'Annie.",
        }
      : score >= 75
        ? {
            emoji: "🌟",
            title: "Excellent travail !",
            message:
              "Tu as très bien réussi ce Memory. Continue comme ça !",
          }
        : score >= 50
          ? {
              emoji: "👏",
              title: "Bien joué !",
              message:
                "Tu progresses ! Continue à entraîner ta mémoire et ton vocabulaire.",
            }
          : {
              emoji: "💪",
              title: "Continue tes efforts !",
              message:
                "Chaque partie est une occasion d'apprendre. Tu peux recommencer pour améliorer ton résultat.",
            };

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!sectionRef.current) return;

      const top =
        sectionRef.current.getBoundingClientRect().top +
        window.scrollY -
        100;

      window.scrollTo({ top, behavior: "smooth" });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="memory-results-title"
      className="mx-auto mt-8 w-full max-w-5xl overflow-hidden rounded-3xl border border-[#f0dfb8] bg-[#fffdf7] p-4 shadow-sm sm:mt-12 sm:p-6 md:p-10"
    >
      <header className="text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#b88628]">
          Exercice 3 · Le Memory d&apos;Annie
        </p>

        <div
          className="mx-auto mt-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#f0dfb8] bg-[#fff5d9] text-4xl"
          aria-hidden="true"
        >
          {feedback.emoji}
        </div>

        <h2
          id="memory-results-title"
          className="mt-5 font-serif text-2xl font-bold text-[#09264a] sm:text-3xl"
        >
          {feedback.title}
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#526176] sm:text-base">
          {feedback.message}
        </p>
      </header>

      <div className="mt-8 rounded-2xl border border-[#f0dfb8] bg-white p-5 text-center sm:mt-10 sm:p-7">
        <p className="text-sm font-semibold text-[#748198]">
          Ton résultat
        </p>

        <p className="mt-2 text-4xl font-black text-[#09264a] sm:text-5xl">
          {correctPairs}
          <span className="text-2xl text-[#9aa5b5]">
            {" "}/ {totalPairs}
          </span>
        </p>

        <p className="mt-2 text-sm font-medium text-[#78591e]">
          Toutes les associations image-phrase
        </p>

        <div
          className="mx-auto mt-5 h-3 max-w-md overflow-hidden rounded-full bg-[#f3ead5]"
          role="progressbar"
          aria-label="Progression des associations retrouvées"
          aria-valuemin={0}
          aria-valuemax={totalPairs}
          aria-valuenow={correctPairs}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#d6b66c] to-[#57b987] transition-all duration-700"
            style={{
              width: `${
                totalPairs > 0
                  ? Math.min(100, (correctPairs / totalPairs) * 100)
                  : 0
              }%`,
            }}
          />
        </div>

        <p className="mt-3 text-sm font-bold text-[#526176]">
          {score}% de réussite
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        <div className="rounded-2xl border border-[#f0dfb8] bg-white p-4 text-center">
          <span className="text-2xl" aria-hidden="true">
            🧩
          </span>
          <p className="mt-2 text-xs font-medium text-[#748198]">
            Paires retrouvées
          </p>
          <p className="mt-1 text-xl font-extrabold text-[#09264a]">
            {correctPairs} / {totalPairs}
          </p>
        </div>

        <div className="rounded-2xl border border-[#f0dfb8] bg-white p-4 text-center">
          <span className="text-2xl" aria-hidden="true">
            🎯
          </span>
          <p className="mt-2 text-xs font-medium text-[#748198]">
            Nombre de coups
          </p>
          <p className="mt-1 text-xl font-extrabold text-[#09264a]">
            {moves}
          </p>
        </div>

        <div className="rounded-2xl border border-[#f0dfb8] bg-white p-4 text-center">
          <span className="text-2xl" aria-hidden="true">
            ⭐
          </span>
          <p className="mt-2 text-xs font-medium text-[#748198]">
            Meilleur score
          </p>
          <p className="mt-1 text-xl font-extrabold text-[#09264a]">
            {result.bestScore}%
          </p>
        </div>
      </div>

      {isLastExercise && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-center">
          <p className="font-bold text-emerald-800">
            🎉 Activité terminée !
          </p>
          <p className="mt-1 text-sm text-emerald-700">
            Bravo ! Tu as terminé tous les exercices de cette activité.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-5">
        <button
          type="button"
          onClick={onRestart}
          className="w-full rounded-xl border border-[#e5d5ae] bg-white px-6 py-3 font-semibold text-[#78591e] transition hover:bg-[#fff6df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c29a4b] sm:w-auto sm:px-8"
        >
          Rejouer au Memory
        </button>

        <button
          type="button"
          onClick={onNext}
          className="w-full rounded-xl bg-[#57cc99] px-6 py-3 font-semibold text-white transition hover:bg-[#46b987] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#269b68] sm:w-auto sm:px-8"
        >
          {isLastExercise ? finishLabel : "Exercice suivant →"}
        </button>
      </div>
    </section>
  );
}
