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
    () => history.filter((item) => item.isCorrect).length,
    [history],
  );

  const mistakes = history.length - correctAnswers;

  return (
    <section className="mt-14">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className={`w-full rounded-3xl border p-6 text-left transition-all duration-200 ${
          open
            ? "border-amber-300 bg-amber-50"
            : "border-slate-200 bg-slate-50 hover:bg-slate-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              📝 Correction détaillée
            </h2>

            <p className="mt-2 text-slate-600">
              Consulte chaque réponse pour comprendre tes erreurs et progresser.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                ✅ {correctAnswers} bonne
                {correctAnswers > 1 ? "s" : ""} réponse
                {correctAnswers > 1 ? "s" : ""}
              </span>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                ❌ {mistakes} erreur
                {mistakes > 1 ? "s" : ""}
              </span>

              <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700">
                📚 {history.length} question
                {history.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div
            className={`text-3xl transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            ▼
          </div>
        </div>
      </button>

      {open && (
        <div className="mt-8 space-y-6">
          {history.map((item) => (
            <AnswerItem
              key={item.questionId}
              item={item}
            />
          ))}
        </div>
      )}
    </section>
  );
}