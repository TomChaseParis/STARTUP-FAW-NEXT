"use client";

import { useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import ComprehensionExercise from "./ComprehensionExercise";

export default function ComprehensionSection() {
  const [started, setStarted] = useState(false);

  return (
    <ExerciseContainer exerciseId="exercise-2">
      {({ onComplete }) => (
        <ExerciseSection>
          <InstructionBlock
            level="beginner"
            stampLabel="EXERCICE 2"
            title="Compréhension du dialogue"
            subtitle="Réponds aux questions"
            activityType="click"
            description={
              <div className="space-y-3">
                <p className="font-semibold text-slate-800">
                  👂 Consigne
                </p>

                <p>
                  Écoute une seconde fois le dialogue puis réponds
                  aux questions en choisissant la bonne réponse.
                </p>
              </div>
            }
            onStart={() => setStarted(true)}
            started={started}
          />

          {started && (
            <div className="mt-10">
              <ComprehensionExercise
                onComplete={onComplete}
              />
            </div>
          )}
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}