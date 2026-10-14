"use client";

import type { TeacherQuestionExerciseData } from "../data/teacherQuestionData";

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
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
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
      <div className="px-4 pt-2 text-xs font-semibold text-slate-500">
        Question {questionNumber} / {totalQuestions}
      </div>

      <div className="grid min-h-[300px] grid-cols-1 md:grid-cols-2">
        {/* ILLUSTRATION À GAUCHE */}
        <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-white p-4 md:min-h-[300px]">
          <img
            src={question.image}
            alt={`Illustration : ${question.category}`}
            className="max-h-[280px] w-full object-contain"
          />
        </div>

        {/* CONSTRUCTION DE LA QUESTION À DROITE */}
        <div className="flex flex-col bg-slate-50 px-4 pb-6 pt-3 text-center sm:px-7 sm:pb-7">
          {/* MOTS INTERROGATIFS EN HAUT */}
          <div className="w-full">
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500 sm:text-xs">
              Les mots pour poser une question
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {questionWords.map((word) => (
                <span
                  key={word}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-amber-200
                    bg-amber-50
                    px-3
                    py-1.5
                    text-xs
                    font-bold
                    text-amber-800
                    sm:text-sm
                  "
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* QUESTION À COMPLÉTER : PLUS CENTRÉE */}
          <div className="flex flex-1 flex-col items-center justify-center pt-6">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xl font-black leading-relaxed text-slate-900 sm:text-2xl">
              <span
                aria-label="Mot interrogatif à trouver"
                className="
                  inline-flex
                  min-w-12
                  items-center
                  justify-center
                  rounded-xl
                  border-2
                  border-dashed
                  border-amber-400
                  bg-white
                  px-3
                  py-1.5
                  text-amber-600
                  shadow-sm
                "
              >
                ?
              </span>

              <span>
                {questionPrefix}
                {questionSuffix}
              </span>
            </div>

            {/* CONSIGNE ORALE */}
            <p className="mt-5 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm">
              Prononce la question complète pour que Jean puisse te répondre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}