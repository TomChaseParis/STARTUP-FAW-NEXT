
"use client";

import { useCallback, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import TypeInstruction from "@/components/courses/layout/TypeInstruction";

import TransformationTypeExercise from "./TransformationTypeExercise";

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
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[rgb(49,87,44)]"
      />

      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[rgb(49,87,44)] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(49,87,44,0.25)] ring-1 ring-[rgb(49,87,44)]">
        {number}
      </span>
    </div>
  );
}

export default function TransformationTypeSection() {
  const [started, setStarted] = useState(false);

  const handleStart = useCallback(() => {
    setStarted(true);

    let attempts = 0;
    let timeoutId: number | undefined;
    let animationFrameId: number | undefined;

    const scrollToExercise = () => {
      const element = document.getElementById(
        "transformation-type-exercise-content",
      );

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timeoutId = window.setTimeout(
            scrollToExercise,
            100,
          );
        }

        return;
      }

      const startPosition = window.scrollY;

      const targetPosition = Math.max(
        0,
        element.getBoundingClientRect().top +
          window.scrollY -
          100,
      );

      const distance = targetPosition - startPosition;
      const duration = 1100;

      let startTime: number | null = null;

      const animateScroll = (currentTime: number) => {
        if (startTime === null) {
          startTime = currentTime;
        }

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
          animationFrameId =
            window.requestAnimationFrame(animateScroll);
        }
      };

      animationFrameId =
        window.requestAnimationFrame(animateScroll);
    };

    timeoutId = window.setTimeout(scrollToExercise, 300);

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      if (animationFrameId !== undefined) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <ExerciseContainer exerciseId="exercise-3">
      {({ onComplete }) => (
        <section
          id="transformation-type-section"
          className="w-full min-w-0"
        >
          {/* INSTRUCTIONS */}
          <TypeInstruction
            activityTitle="3"
            level="elementary-2"
            category="TRANSFORMATION SYNTAXIQUE"
            title="DU « JE » AU « ELLE »"
            description="Réécris le texte en passant de « Je » (1re personne) à « Elle » (3e personne) et en faisant toutes les transformations nécessaires."
            example="« Je me lève seulement à 9 heures. » → « Elle se lève seulement à 9 heures. »"
            imageSrc="/images/EXO3QCM.png"
            imageAlt="Illustration de l'exercice de transformation syntaxique."
            steps={[
              {
                title: "Observe",
                description:
                  "Lis attentivement le texte tel qu'il est écrit à la première personne.",
                icon: "eye",
              },
              {
                title: "Transforme",
                description:
                  "Réécris les passages en passant de « je » à « elle » et adapte les verbes.",
                icon: "keyboard",
              },
            ]}
            onStart={handleStart}
            started={started}
          />

          {/* TRANSITION ET EXERCICE 3 */}
          {started && (
            <>
              <ExerciseTransition number={3} />

              <div
                id="transformation-type-exercise-content"
                className="container mx-auto w-full min-w-0"
              >
                <TransformationTypeExercise
                  onComplete={onComplete}
                />
              </div>
            </>
          )}
        </section>
      )}
    </ExerciseContainer>
  );
}
