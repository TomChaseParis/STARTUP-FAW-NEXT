"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import MonsterQuizExercise from "./MonsterQuizExercise";

export default function MonsterQuizSection() {
  return (
    <ExerciseSection>
      <InstructionBlock
        stampLabel="EXERCICE 2"
        title="LE PETIT MONSTRE"
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
                  👿
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                    Consigne
                  </p>

                  <p className="text-sm text-slate-500">
                    Observe bien chaque image avant de répondre.
                  </p>
                </div>
              </div>

              <p className="text-base leading-relaxed text-slate-800">
                Zap est un petit monstre qui fait des bêtises toute la journée.
                Pour chaque image, choisis la phrase correctement conjuguée en
                tenant compte des indicateurs de temps comme{" "}
                <span className="font-semibold">
                  aujourd'hui, hier, demain, tous les jours...
                </span>
              </p>
            </div>
          </div>
        }
      />

      <MonsterQuizExercise />
    </ExerciseSection>
  );
}