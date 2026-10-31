
"use client";

import { useState } from "react";

import DragAndDrop from "@/components/courses/layout/DragAndDrop";
import ExerciseContainer from "@/components/activity/ExerciseContainer";

import SemanticCoherenceExercise from "./SemanticCoherenceExercise";

type ExerciseTransitionProps = {
  number: number;
};

function ExerciseTransition({
  number,
}: ExerciseTransitionProps) {
  return (
    <div
      className="relative z-10 flex h-[120px] items-center justify-center"
      aria-label={`Étape ${number}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[#7C3AED]"
      />

      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#7C3AED] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(124,58,237,0.25)] ring-1 ring-[#C4B5FD]">
        {number}
      </span>
    </div>
  );
}

export default function SemanticCoherenceSection() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);

    window.setTimeout(() => {
      const element = document.getElementById(
        "semantic-coherence-exercise",
      );

      if (!element) return;

      const startPosition = window.scrollY;

      const targetPosition = Math.max(
        0,
        element.getBoundingClientRect().top + window.scrollY - 100,
      );

      const distance = targetPosition - startPosition;
      const duration = 1100;

      let startTime: number | null = null;

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;

        const progress = Math.min(
          (currentTime - startTime) / duration,
          1,
        );

        const easedProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(
          0,
          startPosition + distance * easedProgress,
        );

        if (progress < 1) {
          window.requestAnimationFrame(animateScroll);
        }
      };

      window.requestAnimationFrame(animateScroll);
    }, 300);
  };

  return (
    <section
      id="semantic-coherence-section"
      className="w-full min-w-0"
    >
      <ExerciseContainer exerciseId="exercise-1">
        {({ onComplete }) => (
          <DragAndDrop
            exerciseNumber={1}
            category="COHÉRENCE SÉMANTIQUE"
            title="Mes parents me demandent toujours..."
            description="Le pauvre Félix, 19 ans, est assailli de tous les côtés : par ses parents, par sa petite amie, par ses professeurs... Associez chaque proposition à la personne qui pourrait lui adresser cette demande."
            example="Ma petite amie me demande toujours... si je suis vraiment heureux avec elle."
            instructionImageSrc="/images/courses/intermediate-2/activities/activity2/exercise-1/draganddrop.png"
            level="intermediate-2"
            started={started}
            onStart={handleStart}
          >
            {started && (
              <div className="container mx-auto -mt-8 w-full min-w-0">
                <ExerciseTransition number={1} />

                <div className="w-full min-w-0">
                  <SemanticCoherenceExercise
                    onCompleted={onComplete}
                  />
                </div>
              </div>
            )}
          </DragAndDrop>
        )}
      </ExerciseContainer>
    </section>
  );
}
