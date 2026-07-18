"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import FillInTheBlankExercise from "./FillInTheBlankExercise";

export default function FillInTheBlankSection() {
  return (
    <ExerciseSection>
      <InstructionBlock
        level="elementary1"
        stampLabel="EXERCICE 1"
        title="Complète les phrases"
        activityType="type"
        description={
          <div className="space-y-5 text-black">
            <p>Complète chaque phrase avec la bonne forme du verbe.</p>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                💡 Exemple :
              </p>

              <p className="text-base">
                Les jeunes <span className="font-semibold">passent</span>{" "}
                beaucoup de temps sur internet.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                🎯 Astuce :
              </p>

              <p className="text-base">
                Fais attention au sujet pour choisir la bonne terminaison du
                verbe.
              </p>
            </div>
          </div>
        }
      />

      <FillInTheBlankExercise />
    </ExerciseSection>
  );
}