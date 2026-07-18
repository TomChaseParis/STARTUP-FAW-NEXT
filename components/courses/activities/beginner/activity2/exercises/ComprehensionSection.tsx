"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import ComprehensionExercise from "./ComprehensionExercise";

export default function ComprehensionSection() {
  return (
    <ExerciseSection>
      <InstructionBlock
        level="beginner"
        stampLabel="EXERCICE 2"
        title="Compréhension du dialogue"
        subtitle="Réponds aux questions"
        activityType="click"
        description={
          <div className="space-y-5 text-black">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                👂 Consigne
              </p>

              <p>
                Écoute une seconde fois le dialogue puis réponds aux questions
                en choisissant la bonne réponse.
              </p>
            </div>
          </div>
        }
      />

      <ComprehensionExercise />
    </ExerciseSection>
  );
}