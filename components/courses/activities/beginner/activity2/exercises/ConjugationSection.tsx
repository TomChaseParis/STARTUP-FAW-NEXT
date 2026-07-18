"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import ConjugationExercise from "./ConjugationExercise";

export default function ConjugationSection() {
  return (
    <ExerciseSection width="wide">
      <InstructionBlock
        level="beginner"
        stampLabel="EXERCICE 3"
        title="Complète le dialogue"
        subtitle="Conjugue les verbes être et avoir au présent"
        activityType="type"
        description={
          <div className="space-y-5 text-black">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                ✍️ Conjugaison
              </p>

              <p>
                Écoute le dialogue puis complète les phrases avec la bonne forme
                des verbes <strong>être</strong> ou <strong>avoir</strong>.
              </p>
            </div>
          </div>
        }
      />

      <ConjugationExercise />
    </ExerciseSection>
  );
}