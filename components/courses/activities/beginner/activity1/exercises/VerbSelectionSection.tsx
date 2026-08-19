"use client";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import VerbSelectionExercise from "./VerbSelectionExercise";

export default function VerbSelectionSection() {
  return (
    <ExerciseContainer exerciseId="exercise-2">
      {({ onComplete }) => (
        <ExerciseSection width="wide">
          <InstructionBlock
            level="beginner"
            stampLabel="EXERCICE 2"
            title="Choisis le bon verbe à la bonne forme"
            activityType="type"
            description={
              <div className="space-y-5 text-black">
                <p>Complète chaque phrase avec le bon verbe.</p>

                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="mb-2 text-sm font-medium text-slate-600">
                    ⚠️ Consigne
                  </p>

                  <p className="text-base">
                    Complète chaque phrase avec le bon verbe.
                  </p>
                </div>

                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <p className="mb-2 text-sm font-medium text-slate-600">
                    💡 Conseil
                  </p>

                  <p className="text-base">
                    Repère d'abord le sujet (je, tu, il, nous…) puis choisis le
                    bon verbe.
                  </p>
                </div>
              </div>
            }
          />

          <VerbSelectionExercise onComplete={onComplete} />
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}
