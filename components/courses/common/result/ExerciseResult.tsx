"use client";

import ScoreBadge from "./ScoreBadge";

import { ExerciseResult as ExerciseResultType } from "../types/exerciseSessionTypes";

type Props = {
  result: ExerciseResultType;

  onRestart: () => void;

  onShowReport: () => void;
};

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes} min ${remainingSeconds}s`;
}

export default function ExerciseResult({
  result,
  onRestart,
  onShowReport,
}: Props) {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl ring-1 ring-black/5">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
            Résultat final
          </p>

          <div className="mt-8">
            <ScoreBadge score={result.score} />
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Bonnes réponses
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {result.correctAnswers} / {result.totalQuestions}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Temps
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {formatDuration(result.duration)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Questions
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {result.totalQuestions}
              </p>
            </div>
          </div>

          <p className="mt-8 text-lg text-slate-700">
            Tu as répondu correctement à{" "}
            <span className="font-bold">{result.correctAnswers}</span> question
            {result.correctAnswers > 1 ? "s" : ""} sur{" "}
            <span className="font-bold">{result.totalQuestions}</span>.
          </p>

          {result.finishedAt && (
            <p className="mt-3 text-sm text-slate-500">
              Exercice terminé le{" "}
              {result.finishedAt.toLocaleDateString("fr-FR")} à{" "}
              {result.finishedAt.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}

          <div className="mt-12 flex justify-center gap-5">
            <button
              onClick={onShowReport}
              className="
                rounded-xl
                bg-black
                px-8
                py-3
                font-semibold
                text-white
                shadow-md
                transition
                hover:bg-black/90
              "
            >
              Voir mes résultats
            </button>

            <button
              onClick={onRestart}
              className="
                rounded-xl
                bg-amber-500
                px-8
                py-3
                font-semibold
                text-black
                shadow-md
                transition
                hover:bg-amber-400
              "
            >
              Recommencer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
