"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ClassificationExercise from "./ClassificationExercise";

export default function ClassificationSection() {
  return (
    <ExerciseSection>
      <InstructionBlock
        stampLabel="EXERCICE 3"
        title="ANGE OU DÉMON ?"
        activityType="click"
        description={
          <div className="space-y-5 text-black">
            <div
              className="
                rounded-2xl
                border border-amber-200
                bg-gradient-to-br from-amber-50 via-white to-amber-50
                p-5
                shadow-sm
              "
            >
              {/* HEADER */}

              <div className="mb-4 flex items-center gap-4">
                <div
                  className="
                    flex h-12 w-12 shrink-0 items-center justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-amber-300
                    to-yellow-400
                    shadow-[0_10px_20px_rgba(245,158,11,0.25)]
                  "
                >
                  😇😈
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                    Consigne
                  </p>

                  <p className="text-sm text-slate-500">
                    Classe chaque phrase dans la bonne catégorie.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-slate-800">
                <p>
                  Dans la première partie, décide si chaque phrase décrit le
                  comportement d'un <strong>ange 😇</strong> ou d'un{" "}
                  <strong>démon 😈</strong>.
                </p>

                <p>
                  Dans la seconde partie, classe les mêmes phrases selon le
                  temps employé : <strong>passé</strong>,{" "}
                  <strong>présent</strong> ou <strong>futur</strong>.
                </p>

                <p>
                  Tu peux écouter chaque phrase en cliquant sur{" "}
                  <strong>🔊</strong> avant de répondre.
                </p>
              </div>
            </div>
          </div>
        }
      />

      <ClassificationExercise />
    </ExerciseSection>
  );
}