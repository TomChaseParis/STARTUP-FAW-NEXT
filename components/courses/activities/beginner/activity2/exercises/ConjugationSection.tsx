"use client";

import { useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import FillGapsQuiz from "../../../fill-gaps/FillGapsQuiz";
import { conjugationExerciseData } from "../data/conjugationExerciseData";

export default function ConjugationSection() {
  const [started, setStarted] = useState(false);

  return (
    <ExerciseContainer exerciseId="exercise-3">
      {({ onComplete }) => (
        <ExerciseSection>
          <InstructionBlock
            level="beginner"
            stampLabel="EXERCICE 3"
            title="Complète le dialogue"
            subtitle="Conjugue les verbes être et avoir au présent"
            activityType="type"
            description={
              <div className="space-y-3">
                <p className="font-semibold text-slate-800">
                  ✍️ Conjugaison
                </p>

                <p>
                  Écoute le dialogue puis complète les phrases
                  avec la bonne forme des verbes{" "}
                  <strong>être</strong> ou{" "}
                  <strong>avoir</strong>.
                </p>
              </div>
            }
            onStart={() => setStarted(true)}
            started={started}
          />

          {started && (
            <div className="mt-10">
              <FillGapsQuiz
                data={conjugationExerciseData}
                onComplete={onComplete}
              />
            </div>
          )}
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}