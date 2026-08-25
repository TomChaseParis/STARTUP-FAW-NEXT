"use client";

import { useMemo, useState } from "react";

import { ExerciseHistoryItem } from "../types/exerciseSessionTypes";

import AnswerItem from "./AnswerItem";

type Props = {
  history: ExerciseHistoryItem[];
};

export default function AnswerHistory({
  history,
}: Props) {
  const [open, setOpen] = useState(false);

  const correctAnswers = useMemo(
    () =>
      history.filter(
        (item) => item.isCorrect,
      ).length,
    [history],
  );

  const mistakes =
    history.length -
    correctAnswers;

  return (
    <section className="mt-8 sm:mt-14">
      <button
        type="button"
        onClick={() =>
          setOpen(
            (previous) => !previous,
          )
        }
        className={`
          w-full
          rounded-3xl
          border
          p-4
          text-left
          transition-all
          duration-200
          sm:p-6
          ${
            open
              ? "border-amber-300 bg-amber-50"
              : "border-slate-200 bg-slate-50 hover:bg-slate-100"
          }
        `}
      >
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="break-words text-lg font-bold text-slate-900 sm:text-2xl">
              📝 Correction détaillée
            </h2>

            <p className="mt-2 break-words text-sm leading-relaxed text-slate-600 sm:text-base">
              Consulte chaque réponse pour comprendre tes erreurs et progresser.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 sm:text-sm">
                ✅ {correctAnswers} bonne
                {correctAnswers > 1
                  ? "s"
                  : ""}{" "}
                réponse
                {correctAnswers > 1
                  ? "s"
                  : ""}
              </span>

              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 sm:text-sm">
                ❌ {mistakes} erreur
                {mistakes > 1
                  ? "s"
                  : ""}
              </span>

              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700 sm:text-sm">
                📚 {history.length} question
                {history.length > 1
                  ? "s"
                  : ""}
              </span>
            </div>
          </div>

          <div
            className={`
              shrink-0
              pt-1
              text-2xl
              transition-transform
              duration-300
              sm:text-3xl
              ${
                open
                  ? "rotate-180"
                  : ""
              }
            `}
          >
            ▼
          </div>
        </div>
      </button>

      {open && (
        <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-6">
          {history.map(
            (item) => (
              <AnswerItem
                key={
                  item.questionId
                }
                item={item}
              />
            ),
          )}
        </div>
      )}
    </section>
  );
}