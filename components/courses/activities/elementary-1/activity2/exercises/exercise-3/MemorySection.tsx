
"use client";

import { useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import ClickAndListen from "@/components/courses/layout/ClickAndListen";
import { scrollToElementSmooth } from "@/utils/scrollToElementSmooth";

import MemoryExercise from "./MemoryExercise";
import { memoryPairs } from "./memory.data";

export default function MemorySection() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);

    scrollToElementSmooth("exercise-3-content", {
      delay: 300,
      offset: 100,
      duration: 1100,
      maxAttempts: 20,
      retryDelay: 100,
    });
  };

  return (
    <ExerciseContainer exerciseId="exercise-3">
      {({ onComplete }) => (
        <ExerciseSection width="full">
          <ClickAndListen
            level="elementary-1"
            exerciseNumber={3}
            category="FIXATION LEXICALE"
            title="LE MEMORY D'ANNIE"
            description="La jeune Annie a passé des vacances horribles chez ses grands-parents dans un village perdu des Pyrénées. À son retour, elle imagine un jeu de Memory inédit pour décrire les habitudes des gens du village."
            instruction="Retourne deux cartes à la fois pour retrouver les paires d’images identiques. Si les cartes ne correspondent pas, elles se retournent : mémorise leur emplacement pour réessayer."
            instructionImageSrc="/images/clickandlisten.png"
            dialogueImageSrc="/images/PHONIEGRAPHIEJEAN.PNG"
            dialogueImageAlt="Les loisirs des Français"
            audioTitle="Les loisirs des Français"
            audioHint="Écoute attentivement avant de commencer."
            onStart={handleStart}
            started={started}
          />

          {started && (
            <div
              id="exercise-3-content"
              className="w-full min-w-0 scroll-mt-10"
            >
              <MemoryExercise
                pairs={memoryPairs}
                onComplete={onComplete}
              />
            </div>
          )}
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}
