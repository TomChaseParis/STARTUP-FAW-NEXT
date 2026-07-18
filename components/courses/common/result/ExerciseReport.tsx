"use client";

import { ExerciseHistoryItem } from "../types/exerciseSessionTypes";

type Props = {
  history: ExerciseHistoryItem[];

  onRestart: () => void;

  onBack: () => void;
};

export default function ExerciseReport({ history, onRestart, onBack }: Props) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-10 text-center text-3xl font-bold">
          📊 Détail de tes réponses
        </h2>

        <div className="space-y-8">
          {history.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">
                  Question {index + 1}
                </h3>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    item.isCorrect
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Question
                  </p>

                  <p className="text-lg text-slate-900">{item.question}</p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Ta réponse
                  </p>

                  <p
                    className={`text-lg font-semibold ${
                      item.isCorrect ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {item.selectedAnswer}
                  </p>
                </div>

                {!item.isCorrect && (
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-green-700">
                      Bonne réponse
                    </p>

                    <p className="text-lg font-semibold text-green-700">
                      {item.correctAnswer}
                    </p>
                  </div>
                )}

                {item.explanation && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <p className="text-sm font-bold uppercase tracking-widest text-amber-700">
                      💡 Explication
                    </p>

                    <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-700">
                      {item.explanation}
                    </p>
                  </div>
                )}

                {item.duration && (
                  <p className="text-sm text-slate-500">
                    Temps de réponse : {item.duration}s
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-5">
          <button
            onClick={onBack}
            className="rounded-xl border border-slate-300 bg-white px-8 py-3 font-semibold shadow-sm transition hover:bg-slate-100"
          >
            ← Retour
          </button>

          <button
            onClick={onRestart}
            className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black shadow-md transition hover:bg-amber-400"
          >
            Recommencer
          </button>
        </div>
      </div>
    </section>
  );
}
