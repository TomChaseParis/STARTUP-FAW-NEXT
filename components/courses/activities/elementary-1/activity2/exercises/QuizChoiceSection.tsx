"use client";

import { useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import QuizChoiceExercise from "./QuizChoiceExercise";

export default function QuizChoiceSection() {
  const [started, setStarted] = useState(false);

  return (
    <ExerciseContainer exerciseId="exercise-2">
      {({ onComplete }) => (
        <ExerciseSection>
          <InstructionBlock
            level="elementary1"
            stampLabel="EXERCICE 2"
            title="Trouve la bonne réponse à chaque question"
            subtitle="Écoute les questions puis choisis la bonne réponse"
            activityType="listen"
            description={
              <div className="space-y-5 text-black">
                <p>
                  Écoute chaque question à l&apos;aide du bouton audio,
                  observe l&apos;image lorsqu&apos;il y en a une, puis
                  sélectionne la bonne réponse parmi les propositions.
                </p>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="mb-2 text-sm font-medium text-slate-600">
                    💡 Astuce :
                  </p>

                  <p className="text-base">
                    Écoute bien les informations et observe attentivement
                    les images avant de répondre.
                  </p>
                </div>
              </div>
            }
            onStart={() => setStarted(true)}
            started={started}
          />

          {started && (
            <QuizChoiceExercise
              onComplete={onComplete}
            />
          )}
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}