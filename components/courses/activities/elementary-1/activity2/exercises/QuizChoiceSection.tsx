"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import QuizChoiceExercise from "./QuizChoiceExercise";

export default function QuizChoiceSection() {
  return (
    <ExerciseSection>
      <InstructionBlock
        level="elementary1"
        stampLabel="EXERCICE 2"
        title="Trouve la bonne réponse à chaque question"
        activityType="click-or-speak"
        description={
          <div className="space-y-5 text-black">
            <p>
              Regarde la vidéo puis choisis la bonne question à poser à chaque
              personnage.
            </p>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                💡 Astuce :
              </p>

              <p className="text-base">
                Écoute bien les informations pour comprendre la situation avant
                de répondre.
              </p>
            </div>
          </div>
        }
      />

      <QuizChoiceExercise />
    </ExerciseSection>
  );
}