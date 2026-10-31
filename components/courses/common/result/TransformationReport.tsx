
"use client";

import type { ExerciseHistoryItem } from "@/components/courses/common/types/exerciseSessionTypes";

type TransformationReportProps = {
  history: ExerciseHistoryItem[];
};

export default function TransformationReport({
  history,
}: TransformationReportProps) {
  return (
    <div className="space-y-4">
      {/* EN-TÊTE */}

      <div className="mb-5 border-b border-slate-200 pb-4">
        <h4 className="text-lg font-extrabold text-[#102744]">
          Correction des transformations
        </h4>

        <p className="mt-1 text-sm leading-relaxed text-slate-500">
          Retrouve tes réponses et découvre les transformations attendues.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            ✓ Bonne réponse
          </span>

          <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            ✕ Mauvaise réponse
          </span>
        </div>
      </div>

      {/* HISTORIQUE DES RÉPONSES */}

      {history.length > 0 ? (
        history.map((item, index) => (
          <article
            key={`${item.questionId}-${index}`}
            className={`overflow-hidden rounded-xl border ${
              item.isCorrect
                ? "border-emerald-200 bg-emerald-50/50"
                : "border-red-200 bg-red-50/50"
            }`}
          >
            <div className="p-4 sm:p-5">
              {/* NUMÉRO ET STATUT */}

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-slate-700">
                  Transformation {index + 1}
                </span>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                    item.isCorrect
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.isCorrect ? "✓ Correct" : "✕ Incorrect"}
                </span>
              </div>

              {/* PHRASE À TRANSFORMER */}

              <div className="mt-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Phrase transformée
                </p>

                <p className="break-words text-sm leading-7 text-slate-700">
                  {item.question}
                </p>
              </div>

              {/* RÉPONSE DE L'UTILISATEUR */}

              <div className="mt-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Ta réponse
                </p>

                <p
                  className={`break-words font-semibold ${
                    item.isCorrect
                      ? "text-emerald-700"
                      : "text-red-700 line-through decoration-2"
                  }`}
                >
                  {item.selectedAnswer || "Aucune réponse"}
                </p>
              </div>

              {/* BONNE RÉPONSE */}

              {!item.isCorrect && (
                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Réponse attendue
                  </p>

                  <p className="break-words font-bold text-emerald-800">
                    {item.correctAnswer}
                  </p>
                </div>
              )}

              {/* EXPLICATION GRAMMATICALE */}

              {item.explanation && (
                <div className="mt-4 rounded-lg border border-violet-100 bg-white p-3">
                  <p className="text-sm leading-relaxed text-slate-600">
                    <span className="font-bold text-[#7C3AED]">
                      Rappel grammatical :{" "}
                    </span>

                    {item.explanation}
                  </p>
                </div>
              )}
            </div>
          </article>
        ))
      ) : (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-500">
            Aucune réponse à afficher.
          </p>
        </div>
      )}
    </div>
  );
}
