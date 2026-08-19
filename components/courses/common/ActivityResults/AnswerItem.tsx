import { ExerciseHistoryItem } from "../types/exerciseSessionTypes";

type Props = {
  item: ExerciseHistoryItem;
};

export default function AnswerItem({ item }: Props) {
  const isCorrect = item.isCorrect;

  return (
    <article
      className={`overflow-hidden rounded-3xl border shadow-sm transition-all duration-200 ${
        isCorrect
          ? "border-emerald-200 bg-emerald-50"
          : "border-red-200 bg-red-50"
      }`}
    >
      {/* Header */}

      <header className="flex items-center justify-between border-b border-black/5 bg-white/60 px-6 py-5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">
            {isCorrect ? "✅" : "❌"}
          </span>

          <div>
            <h3 className="font-bold text-slate-900">
              Question {item.questionId}
            </h3>

            <p className="text-sm text-slate-600">
              {isCorrect
                ? "Bonne réponse"
                : "Réponse incorrecte"}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
            isCorrect
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isCorrect ? "Correct" : "Incorrect"}
        </span>
      </header>

      <div className="space-y-6 p-6">
        {/* Question */}

        <section>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Question
          </p>

          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="leading-relaxed text-slate-900">
              {item.question}
            </p>
          </div>
        </section>

        {/* Réponse utilisateur */}

        <section>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Votre réponse
          </p>

          <div
            className={`rounded-2xl p-4 font-medium ${
              isCorrect
                ? "bg-emerald-100 text-emerald-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {item.selectedAnswer || (
              <span className="italic opacity-70">
                Aucune réponse
              </span>
            )}
          </div>
        </section>

        {/* Bonne réponse */}

        {!isCorrect && (
          <section>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Bonne réponse
            </p>

            <div className="rounded-2xl bg-emerald-100 p-4 font-medium text-emerald-800">
              {item.correctAnswer}
            </div>
          </section>
        )}

        {/* Explication */}

        {item.explanation && (
          <section>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Explication
            </p>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-slate-700">
              <div className="mb-2 flex items-center gap-2 font-semibold text-amber-700">
                💡 Conseil pédagogique
              </div>

              <p className="leading-relaxed">
                {item.explanation}
              </p>
            </div>
          </section>
        )}

        {/* Footer */}

        {item.duration !== undefined && (
          <footer className="flex justify-end border-t border-black/5 pt-4">
            <span className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600">
              ⏱ {item.duration} s
            </span>
          </footer>
        )}
      </div>
    </article>
  );
}