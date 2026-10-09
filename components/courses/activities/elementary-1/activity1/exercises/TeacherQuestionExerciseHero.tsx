"use client";

import type { TeacherQuestionExerciseData } from "../data/teacherQuestionData";

type Props = {
  question: TeacherQuestionExerciseData;
  questionNumber: number;
  totalQuestions: number;
  questionPrefix: string;
  questionSuffix: string;
};

/** Carte unique : illustration à gauche, construction de la question à droite. */
export default function TeacherQuestionExerciseHero({
  question,
  questionNumber,
  totalQuestions,
  questionPrefix,
  questionSuffix,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
      <div className="grid min-h-[260px] grid-cols-1 md:grid-cols-2">
        {/* Illustration à gauche */}
        <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-white p-4 md:min-h-[260px]">
          <img
            src={question.image}
            alt={`Illustration : ${question.category}`}
            className="max-h-[280px] w-full object-contain"
          />
        </div>

        {/* Construction de la question à droite */}
        <div className="flex flex-col items-center justify-center bg-slate-50 px-5 py-7 text-center sm:px-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
            CONSTRUIS LA QUESTION
          </p>

          <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
            MOT INTERROGATIF
          </p>

          {/* La bonne réponse n'est jamais affichée ici */}
          <p
            aria-label="Mot interrogatif à trouver"
            className="mt-1 text-3xl font-black uppercase tracking-[0.12em] text-slate-300 sm:text-4xl"
          >
            ???
          </p>

          <span className="mt-3 h-[3px] w-9 rounded-full bg-amber-500" />

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-lg font-black leading-relaxed text-slate-900 sm:text-xl">
            <span className="inline-flex min-w-12 items-center justify-center rounded-lg border border-dashed border-amber-400 px-3 py-1 text-amber-600">
              ?
            </span>

            <span>
              {questionPrefix}
              {questionSuffix}
            </span>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Prononce la question complète pour que Jean puisse te répondre.
          </p>

          <p className="mt-3 text-xs font-medium text-slate-500">
            Question {questionNumber} / {totalQuestions}
          </p>
        </div>
      </div>
    </div>
  );
}