
"use client";

import { useMemo, useState } from "react";

import type {
  ExerciseHistoryItem,
  ExerciseDialogueLine,
  ExerciseHistoryPresentation,
} from "../types/exerciseSessionTypes";

import AnswerItem from "./AnswerItem";

type Props = {
  history: ExerciseHistoryItem[];
};

type DialogueCorrectionProps = {
  presentation: ExerciseHistoryPresentation;
  history: ExerciseHistoryItem[];
};

function DialogueCorrection({
  presentation,
  history,
}: DialogueCorrectionProps) {
  const answersById = useMemo(
    () =>
      new Map(
        history.map((item) => [item.questionId, item]),
      ),
    [history],
  );

  const speakerStyles: Record<string, string> = {
    Papa: "bg-blue-100 text-blue-800",
    Maman: "bg-pink-100 text-pink-800",
    Pierre: "bg-amber-100 text-amber-800",
    Narration: "bg-slate-100 text-slate-600",
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-7 sm:py-5">
        <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
          💬 Le dialogue corrigé
        </h3>

        <p className="mt-1 text-sm text-slate-600">
          Retrouve tes réponses directement dans le texte.
        </p>
      </header>

      <div className="space-y-3 p-4 sm:p-6">
        {presentation.lines.map(
          (line: ExerciseDialogueLine, index) => {
            const isNarration = line.speaker === "Narration";

            return (
              <div
                key={`${line.speaker}-${index}`}
                className={`rounded-xl border p-3 sm:p-4 ${
                  isNarration
                    ? "border-slate-200 bg-slate-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="mb-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      speakerStyles[line.speaker] ??
                      "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {line.speaker}
                  </span>
                </div>

                <p
                  className={`break-words leading-8 ${
                    isNarration
                      ? "text-[15px] italic text-slate-600"
                      : "text-slate-800"
                  }`}
                >
                  {line.segments.map((segment, segmentIndex) => {
                    if (segment.type === "text") {
                      return (
                        <span key={segmentIndex}>
                          {segment.value}
                        </span>
                      );
                    }

                    const item = answersById.get(
                      segment.questionId,
                    );

                    if (!item) {
                      return null;
                    }

                    return (
                      <span
                        key={`answer-${segment.questionId}`}
                        className="mx-1 inline-flex flex-wrap items-center gap-1 align-baseline"
                      >
                        <span
                          className={`rounded-md px-2 py-1 font-bold ${
                            item.isCorrect
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.selectedAnswer || "Aucune réponse"}
                        </span>

                        {!item.isCorrect && (
                          <span className="inline-flex flex-wrap items-center gap-1 text-sm">
                            <span className="text-slate-500">
                              → Bonne réponse :
                            </span>

                            <span className="rounded-md bg-emerald-100 px-2 py-1 font-bold text-emerald-800">
                              {item.correctAnswer}
                            </span>
                          </span>
                        )}
                      </span>
                    );
                  })}
                </p>
              </div>
            );
          },
        )}
      </div>

      <footer className="flex flex-wrap gap-4 border-t border-slate-200 bg-slate-50 px-5 py-4 text-xs sm:px-7">
        <span className="flex items-center gap-2 text-emerald-700">
          <span className="h-3 w-3 rounded bg-emerald-200" />
          Bonne réponse
        </span>

        <span className="flex items-center gap-2 text-red-700">
          <span className="h-3 w-3 rounded bg-red-200" />
          Réponse incorrecte
        </span>
      </footer>
    </article>
  );
}

export default function AnswerHistory({
  history,
}: Props) {
  const [open, setOpen] = useState(false);

  const correctAnswers = useMemo(
    () =>
      history.filter((item) => item.isCorrect).length,
    [history],
  );

  const mistakes = history.length - correctAnswers;

  const presentation = useMemo(
    () =>
      history.find((item) => item.presentation)?.presentation,
    [history],
  );

  return (
    <section className="mt-8 sm:mt-14">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
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
                {correctAnswers > 1 ? "s" : ""} réponse
                {correctAnswers > 1 ? "s" : ""}
              </span>

              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 sm:text-sm">
                ❌ {mistakes} erreur
                {mistakes > 1 ? "s" : ""}
              </span>

              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700 sm:text-sm">
                📚 {history.length} question
                {history.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className={`
              shrink-0
              pt-1
              text-2xl
              transition-transform
              duration-300
              sm:text-3xl
              ${open ? "rotate-180" : ""}
            `}
          >
            ▼
          </div>
        </div>
      </button>

      {open && (
        <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-6">
          {presentation?.kind === "dialogue" ? (
            <DialogueCorrection
              presentation={presentation}
              history={history}
            />
          ) : (
            history.map((item) => (
              <AnswerItem
                key={item.questionId}
                item={item}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
}
