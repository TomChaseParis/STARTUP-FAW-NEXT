
"use client";

import { useCallback } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ListenAndSpeak from "@/components/courses/layout/ListenSpeakInstruction";

import QuestionMatchingExercise from "./QuestionMatchingExercise";

type QuestionMatchingSectionProps = {
  started: boolean;
  onStart: () => void;
};

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

export default function QuestionMatchingSection({
  started,
  onStart,
}: QuestionMatchingSectionProps) {
  const handleStart = useCallback(() => {
    onStart();

    let attempts = 0;
    let timeoutId: number | undefined;
    let animationFrameId: number | undefined;

    const scrollToExercise = () => {
      const element = document.getElementById(
        "question-matching-exercise-content",
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
  }, [onStart]);

  return (
    <ExerciseContainer exerciseId="exercise-2">
      {({ onComplete }) => (
        <section
          id="question-matching-section"
          className="w-full min-w-0"
        >
          {/* INSTRUCTIONS */}
          <div
            id="question-matching-instruction"
            className="w-full min-w-0 scroll-mt-10"
          >
            <ListenAndSpeak
              activityTitle="2"
              level="elementary-2"
              category="PHRASES INTERROGATIVES"
              title="POSE LA BONNE QUESTION À CLARA !"
              description="Pose à Clara la question associée à chaque vignette. Si ta question est la bonne, elle te répondra !"
              imageSrc="/images/courses/elementary2/activity1/exercise-2/listenandspeak.png"
              imageAlt="Illustration de l'exercice sur les questions interrogatives."
              steps={[
                {
                  title: "Observe",
                  description:
                    "Observe attentivement la vignette pour deviner la question à poser.",
                  icon: "eye",
                },
                {
                  title: "Parle",
                  description:
                    "Choisis la question qui correspond à la réponse attendue.",
                  icon: "mic",
                },
              ]}
              pointAttention={{
                imageSrc: "/images/point-dattention.png",
                imageAlt: "Illustration du point d'attention",
                title: (
                  <>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>
                        Observe attentivement chaque vignette.
                      </li>
                      <li>
                        Choisis la question qui correspond précisément à la situation.
                      </li>
                      <li>
                      Tu ne disposes que d&apos;un seul essai par question.                      </li>
                    </ul>
                  </>
                ),
              }}
              onStart={handleStart}
              started={started}
            />
          </div>

          {/* TRANSITION ET EXERCICE 2 */}
          {started && (
            <>
              <ExerciseTransition number={2} />

              <div
                id="question-matching-exercise-content"
                className="container mx-auto w-full min-w-0"
              >
                <QuestionMatchingExercise
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
