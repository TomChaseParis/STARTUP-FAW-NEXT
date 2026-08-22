"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import ListeningExercise from "./ListeningExercise";

export default function ListeningSection() {
  return (
    <ExerciseSection>
      <InstructionBlock
        level="elementary1"
        stampLabel="EXERCICE 1"
        title="QUIZZ PANACHE"
        activityType="click-or-speak"
        description={
          <div className="space-y-5 text-black">
            <div
              className="
                rounded-2xl
                border border-emerald-200
                bg-gradient-to-br
                from-emerald-50
                via-white
                to-emerald-50
                p-5
                shadow-sm
              "
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className="
                    flex h-12 w-12 shrink-0
                    items-center justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-emerald-400
                    to-green-500
                    shadow-[0_10px_20px_rgba(16,185,129,0.25)]
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 3h6v4H9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 16h4"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                    Consigne
                  </p>

                  <p className="text-sm text-slate-500">
                    Lis attentivement avant de commencer
                  </p>
                </div>
              </div>

              <p className="text-base leading-relaxed text-slate-800">
                Testez vos connaissances en choisissant la bonne réponse à
                chaque question.
              </p>
            </div>
          </div>
        }
      />

      <ListeningExercise />
    </ExerciseSection>
  );
}