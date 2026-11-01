"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ClickOrSpeak from "@/components/courses/layout/ClickOrSpeak";

import QCMExercice from "./QCMexercise";

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
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[rgb(49,87,44)]"
      />

      {/* Numéro de l'exercice */}
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[rgb(49,87,44)] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(49,87,44,0.25)] ring-1 ring-[rgb(49,87,44)]">
        {number}
      </span>
    </div>
  );
}

export default function QCMSection() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timeoutId: number | undefined;
    let animationFrameId: number | undefined;

    const scrollToExercise = () => {
      const element = document.getElementById(
        "qcm-exercise-content",
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
    <ExerciseContainer exerciseId="exercise-1">
      {({ onComplete }) => (
        <section
          id="qcm-section"
          className="w-full min-w-0"
        >
          {/* CONSIGNE CLICK OR SPEAK */}
          <div
            id="qcm-instruction"
            className="w-full min-w-0 scroll-mt-10"
          >
            <ClickOrSpeak
              exerciseNumber={1}
              activityTitle="1"
              level="elementary-2"
              category="COMPRÉHENSION GLOBALE"
              title="QUESTIONS RÉPONSES"
              description="Découvre le quotidien de Clara et réponds aux questions en choisissant la bonne réponse."
              example="Lis attentivement chaque question et sélectionne la réponse qui te semble correcte."
              instructionImageSrc="/images/courses/elementary2/activity1/exercise-1/instruction.png"
              steps={[
                {
                  title: "Écoute",
                  description:
                    "Utilise le bouton audio pour écouter le dialogue et les réponses proposées.",
                  icon: "sound",
                },
                {
                  title: "Réponds",
                  description:
                    "Choisis ta réponse ou utilise le microphone pour répondre à l’oral.",
                  icon: "mic",
                },
              ]}
              onStart={() => setStarted(true)}
              started={started}
            />
          </div>

          {/* TRANSITION VERS LE QCM */}
          {started && (
            <div className="container mx-auto w-full min-w-0">
              <ExerciseTransition number={1} />

              {/* EXERCICE QCM */}
              <div
                id="qcm-exercise-content"
                className="w-full min-w-0 scroll-mt-6"
              >
                <QCMExercice onComplete={onComplete} />
              </div>
            </div>
          )}
        </section>
      )}
    </ExerciseContainer>
  );
}