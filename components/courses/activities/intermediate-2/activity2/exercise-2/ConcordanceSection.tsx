
"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import TypeInstruction from "@/components/courses/layout/TypeInstruction";

import ConcordanceExercise from "./ConcordanceExercise";

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
      {/* Ligne verticale pointillée */}
      <div
        aria-hidden="true"
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[#7C3AED]"
      />

      {/* Numéro centré sur la ligne */}
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#7C3AED] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(124,58,237,0.25)] ring-1 ring-[#C4B5FD]">
        {number}
      </span>
    </div>
  );
}

export default function ConcordanceSection() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timeoutId: number | undefined;
    let animationFrameId: number | undefined;

    const scrollToExercise = () => {
      const element = document.getElementById(
        "concordance-exercise-content",
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
          24,
      );

      const distance = targetPosition - startPosition;
      const duration = 1100;

      let startTime: number | null = null;

      const animateScroll = (currentTime: number) => {
        if (startTime === null) {
          startTime = currentTime;
        }

        const elapsed = currentTime - startTime;

        const progress = Math.min(
          elapsed / duration,
          1,
        );

        const easedProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 -
              Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(
          0,
          startPosition + distance * easedProgress,
        );

        if (progress < 1) {
          animationFrameId =
            window.requestAnimationFrame(
              animateScroll,
            );
        }
      };

      animationFrameId =
        window.requestAnimationFrame(animateScroll);
    };

    timeoutId = window.setTimeout(
      scrollToExercise,
      300,
    );

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      if (animationFrameId !== undefined) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [started]);

  return (
    <ExerciseContainer exerciseId="exercise-2">
      {({ onComplete }) => (
        <section
          id="concordance-section"
          className="w-full min-w-0"
        >
          {/* CONSIGNE */}
          <div
            id="concordance-instruction"
            className="w-full min-w-0 scroll-mt-10"
          >
            <TypeInstruction
              imageSrc="/images/courses/intermediate-2/activities/activity2/exercise-2/type.png"
              imageAlt="Illustration de l'exercice 2 sur la concordance des temps"
              level="intermediate-2"
              activityTitle="2"
              category="CONCORDANCE DES TEMPS"
              title="Quand j'étais jeune, ils me demandaient toujours..."
              description="Félix se souvient du calvaire que son professeur, sa petite amie et les autres lui faisaient vivre quand il était jeune. Complète chaque phrase dont le verbe introducteur est à l'imparfait en veillant à la concordance des temps."
              rappel={
                <>
                  <p className="mb-1">
                    Rappel de concordance des temps lorsque le verbe introducteur est au passé :
                  </p>

                  <ul className="ml-6 list-disc">
                    <li>présent → imparfait</li>
                    <li>passé composé → plus-que-parfait</li>
                    <li>futur → conditionnel</li>
                    <li>futur antérieur → conditionnel passé</li>
                  </ul>
                </>
              }
              onStart={() => setStarted(true)}
              started={started}
            />
          </div>

          {/* EXERCICE DANS LE MÊME CONTAINER QUE LA CONSIGNE */}
          {started && (
            <div className="container mx-auto w-full min-w-0">
              <ExerciseTransition number={2} />

              <div
                id="concordance-exercise-content"
                className="w-full min-w-0 max-w-full scroll-mt-6"
              >
                <ConcordanceExercise
                  onComplete={onComplete}
                />
              </div>
            </div>
          )}
        </section>
      )}
    </ExerciseContainer>
  );
}
