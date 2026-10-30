
"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import TypeInstruction from "@/components/courses/layout/TypeInstruction";

import IllustratedTransformationExercise from "./IllustratedTransformationExercise";

type ExerciseTransitionProps = {
  number: number;
};

function ExerciseTransition({ number }: ExerciseTransitionProps) {
  return (
    <div
      className="relative z-10 flex h-[90px] items-center justify-center"
      aria-label={`Étape ${number}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l border-dashed border-[#F4B323]"
      />

      <span className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-white bg-[#F2A900] text-sm font-bold text-white shadow-[0_1px_4px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
        {number}
      </span>
    </div>
  );
}

export default function IllustratedTransformationSection() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timeoutId: number | undefined;
    let animationFrameId: number | undefined;

    const scrollToExercise = () => {
      const element = document.getElementById(
        "illustrated-exercise-transition",
      );

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timeoutId = window.setTimeout(scrollToExercise, 100);
        }

        return;
      }

      const startPosition = window.scrollY;
      const targetPosition = Math.max(
        0,
        element.getBoundingClientRect().top + window.scrollY - 100,
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
  }, [started]);

  return (
    <ExerciseContainer exerciseId="exercise-2">
      {({ onComplete }) => (
        <section
          id="exercise-2-instruction"
          className="container mx-auto w-full min-w-0 px-4 py-8 sm:px-6 lg:px-8"
        >
          <div className="mx-auto w-full max-w-6xl space-y-0">
            {/* CONSIGNES : TAILLE ORIGINALE */}
            <div className="w-full min-w-0 scroll-mt-10">
              <TypeInstruction
                level="intermediate-2"
                imageSrc="/images/courses/intermediate-2/activities/activity1/typeilfautque.png"
                imageAlt="Henri, le professeur de français"
                activityTitle="Intermediate 2"
                category="Transformation morphosyntaxique"
                title="Il faut que je parte..."
                description="Dans chacun des exemples, transforme le groupe verbal (sujet + verbe) en conjuguant le verbe au subjonctif présent."
                example="Je dois partir. → Il faut que je parte."
                steps={[
                  {
                    title: "Lis",
                    description:
                      "Lis attentivement la phrase de départ.",
                    icon: "keyboard",
                  },
                  {
                    title: "Transforme",
                    description:
                      "Complète la nouvelle phrase avec le verbe au subjonctif présent.",
                    icon: "keyboard",
                  },
                ]}
                onStart={() => setStarted(true)}
                started={started}
              />
            </div>

            {/* TRANSITION ET EXERCICE */}
            {started && (
              <div className="w-full min-w-0">
                <div id="illustrated-exercise-transition">
                  <ExerciseTransition number={2} />
                </div>

                <div
                  id="illustrated-exercise-content"
                  className="w-full min-w-0 scroll-mt-6"
                >
                  <IllustratedTransformationExercise
                    onComplete={onComplete}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </ExerciseContainer>
  );
}
