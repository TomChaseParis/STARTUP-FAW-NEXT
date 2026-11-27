"use client";

import { useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import ClickAndListen from "@/components/courses/layout/ClickAndListen";
import { scrollToElementSmooth } from "@/utils/scrollToElementSmooth";

import MemoryExercise from "./MemoryExercise";
import { memoryPairs } from "./memory.data";

type ExerciseTransitionProps = {
  number: number;
};

function ExerciseTransition({ number }: ExerciseTransitionProps) {
  return (
    <div
      className="relative z-10 flex h-[120px] items-center justify-center"
      aria-label={`Étape ${number}`}
    >
      {/* Ligne verticale prolongée pour toucher les deux blocs */}
      <div
        aria-hidden="true"
        className="absolute -bottom-9 -top-9 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[#31572C]"
      />

      {/* Numéro centré sur la ligne */}
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#31572C] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(49,87,44,0.25)] ring-1 ring-[#8FAE88]">
        {number}
      </span>
    </div>
  );
}

export default function MemorySection() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);

    scrollToElementSmooth("exercise-2-content", {
      delay: 300,
      offset: 100,
      duration: 1100,
      maxAttempts: 20,
      retryDelay: 100,
    });
  };

  return (
    <ExerciseContainer exerciseId="exercise-2">
      {({ onComplete }) => (
        <ExerciseSection width="full">
          <ClickAndListen
            cefrLevel="A2.1"
            level="elementary-2"
            exerciseNumber={2}
            category="FIXATION LEXICALE"
            title="LA VISITE DU NOUVEL APPARTEMENT"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
            instruction="Retourne deux cartes à la fois pour retrouver les paires d’images identiques. Si les cartes ne correspondent pas, elles se retournent : mémorise leur emplacement pour réessayer."
            instructionImageSrc="/images/memory-elementary2.png"
            dialogueImageSrc="/images/PHONIEGRAPHIEJEAN.PNG"
            dialogueImageAlt="Les loisirs des Français"
            audioTitle="Les loisirs des Français"
            audioHint="Écoute attentivement avant de commencer."
            onStart={handleStart}
            started={started}
          />

          {/* TRANSITION ET EXERCICE 3 */}

          {started && (
            <>
              <ExerciseTransition number={2} />

              <div
                id="exercise-2-content"
                className="w-full min-w-0 scroll-mt-10"
              >
                <MemoryExercise pairs={memoryPairs} onComplete={onComplete} />
              </div>
            </>
          )}
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}
