"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import VerbListeningExercise from "./VerbListeningExercise";

export default function VerbListeningSection() {
  return (
    <ExerciseSection width="wide">
      <InstructionBlock
        level="beginner"
        stampLabel="EXERCICE 1"
        title="CHOISIS LE BON VERBE A LA BONNE FORME POUR
        CHACUNE DES PHRASES PROPOSEES"
        activityType="type"
        description={
          <div className="space-y-5 text-black">
            <p>Ecoute bien commment se prononcent tous les verbes</p>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                💡 Conseil
              </p>

              <p className="text-base">
                {"Repère d'abord le sujet (je, tu, il, nous…)"}
              </p>
            </div>
          </div>
        }
      />

      <VerbListeningExercise />
    </ExerciseSection>
  );
}
