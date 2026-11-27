
"use client";

import { useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import ListenAndType from "@/components/courses/layout/ListenAndType";

import { scrollToElementSmooth } from "@/utils/scrollToElementSmooth";

import PhonieGraphieExercise from "./PhonieGraphieExercise";

export default function PhonieGraphieSection() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);

    scrollToElementSmooth("phonie-graphie-content", {
      delay: 300,
      offset: 100,
      duration: 1100,
      maxAttempts: 20,
      retryDelay: 100,
    });
  };

  return (
    <ExerciseContainer exerciseId="exercise-4">
      {({ onComplete }) => (
        <ExerciseSection width="full">
          <ListenAndType
            level="elementary-2"
            cefrLevel="A2.2"
            imageSrc="/images/le-demenagement.png"
            imageAlt="Illustration du déménagement"
            title="ÉPISODE 3 — LE DÉMÉNAGEMENT"
            category="PHONIE-GRAPHIE"
            description="Écoute attentivement le texte du déménagement et repère les mots mal orthographiés. Consigne : les mots surlignés en rouge sont incorrects. Écoute le texte, puis réécris-les avec la bonne orthographe."
            onStart={handleStart}
            started={started}
          />

          {started && (
            <PhonieGraphieExercise onComplete={onComplete} />
          )}
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}
