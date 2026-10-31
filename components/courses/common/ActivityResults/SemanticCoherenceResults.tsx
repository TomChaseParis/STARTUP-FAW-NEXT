"use client";

import Image from "next/image";

import type { ExerciseHistoryItem } from "@/components/courses/common/types/exerciseSessionTypes";

export type SemanticCoherenceCategory = {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
};

type SemanticCoherenceResultsProps = {
  history: ExerciseHistoryItem[];
  categories: SemanticCoherenceCategory[];
};

export default function SemanticCoherenceResults({
  history,
  categories,
}: SemanticCoherenceResultsProps) {
  return (
    <section className="w-full space-y-8">
      <div>
        <h3 className="text-xl font-extrabold text-slate-900">
          Correction des associations
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Retrouve les phrases associées à chaque photo. Les bonnes réponses
          apparaissent en vert et les erreurs en rouge.
        </p>
      </div>

      {categories.map((category, index) => {
        const categoryAnswers = history.filter(
          (item) => item.selectedAnswer === category.label,
        );

        const correctCount = categoryAnswers.filter(
          (item) => item.isCorrect,
        ).length;

        return (
          <article
            key={category.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            {/* EN-TÊTE DE LA PHOTO */}
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="relative flex min-h-64 items-center justify-center bg-[#FFFDF7] p-4 sm:min-h-80">
                <div className="relative h-64 w-full sm:h-80">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center gap-3 bg-slate-50 p-5 sm:p-7">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Situation {index + 1}
                </span>

                <h4 className="text-xl font-extrabold text-slate-900">
                  {category.label}
                </h4>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                    {categoryAnswers.length} phrase
                    {categoryAnswers.length > 1 ? "s" : ""}
                    {" "}associée
                    {categoryAnswers.length > 1 ? "s" : ""}
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                    {correctCount} correcte
                    {correctCount > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* PHRASES ASSOCIÉES À CETTE PHOTO */}
            <div className="space-y-3 border-t border-slate-200 p-4 sm:p-6">
              <h5 className="text-sm font-bold uppercase tracking-wide text-slate-600">
                Phrases associées
              </h5>

              {categoryAnswers.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500">
                  Aucune phrase n&apos;a été associée à cette photo.
                </div>
              ) : (
                categoryAnswers.map((item) => (
                  <div
                    key={item.questionId}
                    className={`rounded-xl border p-4 ${
                      item.isCorrect
                        ? "border-green-300 bg-green-50"
                        : "border-red-300 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          item.isCorrect
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {item.isCorrect ? "✓" : "✕"}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-semibold leading-relaxed ${
                            item.isCorrect
                              ? "text-green-900"
                              : "text-red-900"
                          }`}
                        >
                          {item.question}
                        </p>

                        {!item.isCorrect && (
                          <div className="mt-3 space-y-2 border-t border-red-200 pt-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-red-700">
                              Ta réponse
                            </p>

                            <p className="text-sm font-medium text-red-800">
                              {item.selectedAnswer}
                            </p>

                            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                              Bonne réponse
                            </p>

                            <p className="text-sm font-bold text-green-800">
                              {item.correctAnswer}
                            </p>
                          </div>
                        )}

                        {item.isCorrect && item.explanation && (
                          <p className="mt-2 text-xs text-green-700">
                            {item.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}