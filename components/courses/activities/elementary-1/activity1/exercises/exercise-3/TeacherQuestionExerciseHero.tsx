"use client";

import type { TeacherQuestionExerciseData } from "../../data/teacherQuestionData";

type Props = {
  question: TeacherQuestionExerciseData;
  questionNumber: number;
  totalQuestions: number;
  questionPrefix: string;
  questionSuffix: string;
};

/** Carte de construction de question avec aide pédagogique. */
export default function TeacherQuestionExerciseHero({
  question,
  questionNumber,
  totalQuestions,
  questionPrefix,
  questionSuffix,
}: Props) {
  const progress =
    totalQuestions > 0
      ? Math.min((questionNumber / totalQuestions) * 100, 100)
      : 0;

  const questionWords = [
    "Où",
    "Quand",
    "Qui",
    "Quel(le)(s)",
    "Comment",
    "Combien",
    "Pourquoi",
    "Est-ce que",
    "Qu’est-ce que",
  ];

  return (
    <div className="box-border w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
      {/* BARRE DE PROGRESSION */}
      <div
        className="h-2 w-full bg-slate-100"
        role="progressbar"
        aria-label="Progression des questions"
        aria-valuemin={0}
        aria-valuemax={totalQuestions}
        aria-valuenow={questionNumber}
      >
        <div
          className="h-full rounded-r-full bg-amber-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* NUMÉRO DE QUESTION */}
      <div className="box-border w-full min-w-0 px-4 pt-2 text-xs font-semibold text-slate-500 sm:px-6">
        Question {questionNumber} / {totalQuestions}
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="grid min-h-[340px] w-full min-w-0 grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ILLUSTRATION À GAUCHE */}
        <div className="relative flex min-h-[240px] min-w-0 items-center justify-center overflow-hidden bg-white p-5 sm:p-7 md:min-h-[380px]">
          <img
            src={question.image}
            alt={`Illustration : ${question.category}`}
            className="block h-auto max-h-[320px] max-w-full object-contain md:max-h-[360px]"
          />
        </div>

        {/* CONSTRUCTION DE LA QUESTION À DROITE */}
        <div className="box-border flex min-w-0 flex-col overflow-hidden bg-slate-50 px-4 pb-7 pt-5 text-center sm:px-7 sm:pb-8 md:px-8 md:py-7">
          {/* MOTS INTERROGATIFS */}
          <div className="w-full min-w-0">
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500 sm:text-xs">
              Les mots pour poser une question
            </p>

            <div className="flex w-full min-w-0 flex-wrap justify-center gap-2">
              {questionWords.map((word) => (
                <span
                  key={word}
                  className="inline-flex max-w-full items-center justify-center rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800 sm:text-sm"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* QUESTION À COMPLÉTER */}
          <div className="flex min-w-0 flex-1 flex-col items-center justify-center pt-8">
            <div className="flex w-full min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-3 text-xl font-black leading-relaxed text-slate-900 sm:text-2xl md:text-3xl">
              <span
                aria-label="Mot interrogatif à trouver"
                className="inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-amber-400 bg-white px-4 py-2 text-amber-600 shadow-sm"
              >
                ?
              </span>

              <span className="min-w-0 max-w-full [overflow-wrap:anywhere]">
                {questionPrefix}
                {questionSuffix}
              </span>
            </div>

            {/* CONSIGNE ORALE */}
            <p className="mt-6 w-full min-w-0 max-w-md text-xs leading-6 text-slate-500 sm:text-sm">
              Prononce la question complète pour que Jean puisse te répondre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}