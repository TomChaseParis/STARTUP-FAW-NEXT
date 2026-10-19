"use client";

import { FillGapsData } from "@/types/fillGapsTypes";
import { ExerciseHistoryItem } from "@/components/courses/common/types/exerciseSessionTypes";

type Props = {
  data: FillGapsData;
  history: ExerciseHistoryItem[];
};

function normalizeText(value: string): string {
  return value.trim().toLocaleLowerCase("fr-FR");
}

export default function ConjugationReport({
  data,
  history,
}: Props) {
  let globalInputIndex = 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-6">
        <h3 className="text-lg font-bold text-slate-900">
          Dialogue complet — Correction
        </h3>

        <p className="mt-1 text-sm text-slate-600">
          Retrouve toutes les phrases du dialogue avec tes réponses
          et les formes correctes des verbes être et avoir.
        </p>
      </div>

      <div className="space-y-5 p-4 sm:p-6">
        {data.sentences.map((sentence) => (
          <div
            key={sentence.id}
            className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 leading-8 text-black"
          >
            {sentence.parts.map((part, partIndex) => {
              if (part.type !== "input") {
                return (
                  <span key={`${sentence.id}-${partIndex}`}>
                    {part.value}
                  </span>
                );
              }

              const result = history[globalInputIndex];
              const userAnswer = String(
                result?.selectedAnswer ?? "",
              );
              const correctAnswer = String(
                result?.correctAnswer ?? part.answer,
              );

              const isCorrect =
                result?.isCorrect ??
                normalizeText(userAnswer) ===
                  normalizeText(correctAnswer);

              globalInputIndex += 1;

              return (
                <span
                  key={`${sentence.id}-${partIndex}`}
                  className="inline"
                >
                  {" "}
                  <span
                    className={`
                      inline-flex
                      items-center
                      rounded-md
                      px-2
                      py-0.5
                      font-bold
                      ${
                        isCorrect
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }
                    `}
                  >
                    {userAnswer || "—"}
                  </span>

                  {!isCorrect && (
                    <span className="ml-1 inline-flex items-center rounded-md bg-emerald-100 px-2 py-0.5 font-bold text-emerald-800">
                      {correctAnswer}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm sm:px-6">
        <span className="inline-flex items-center gap-2 text-black">
          <span className="h-3 w-3 rounded-sm bg-emerald-500 text" />
          Bonne réponse
        </span>

        <span className="inline-flex items-center gap-2 text-black">
          <span className="h-3 w-3 rounded-sm bg-red-500" />
          Réponse incorrecte
        </span>
      </div>
    </div>
  );
}