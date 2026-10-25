
"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ClickOrSpeak from "@/components/courses/layout/ClickOrSpeak";

import ListeningDiscoveryExercise from "./ListeningDiscoveryExercise";

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
      {/* Ligne verticale pointillée continue */}
      <div
        aria-hidden="true"
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[#F4B323]"
      />

      {/* Numéro centré sur la ligne */}
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#F2A900] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
        {number}
      </span>
    </div>
  );
}

export default function ListeningDiscoverySection() {
  const [started, setStarted] = useState(false);

  /*
   * Défilement automatique vers le QCM
   * après le démarrage de l'exercice.
   */
  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timeoutId: number | undefined;
    let animationFrameId: number | undefined;

    const scrollToQcm = () => {
      const element = document.getElementById(
        "exercise-1-qcm",
      );

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timeoutId = window.setTimeout(
            scrollToQcm,
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

    // Laisse le QCM se monter avant le défilement.
    timeoutId = window.setTimeout(scrollToQcm, 300);

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      if (animationFrameId !== undefined) {
        window.cancelAnimationFrame(
          animationFrameId,
        );
      }
    };
  }, [started]);

  return (
    <ExerciseContainer exerciseId="exercise-1">
      {({ onComplete }) => (
        <div className="w-full min-w-0">
          {/* ÉNONCÉ AVEC LE LECTEUR AUDIO INTÉGRÉ */}
          <div
            id="exercise-1-instruction"
            className="w-full min-w-0 scroll-mt-10"
          >
            <ClickOrSpeak
              exerciseNumber={1}
              category="COMPRÉHENSION ORALE"
              title="Découverte"
              description="Écoute une première fois le dialogue ci-dessus, puis réponds aux questions."
              example="A : ingénieur"
              dialogueImageSrc="/images/courses/audioBlock/beginner/am.png"
              dialogueImageAlt="Illustration du dialogue de l’agence matrimoniale"
              audioSrc="/audios/courses/beginner/activity2/audio-matrimoniale.mp3"
              audioTitle="Dialogue"
              audioHint="Écoute le professeur présenter la question et les réponses proposées."
              onStart={() => setStarted(true)}
              started={started}
            />
          </div>

          {/* TRANSITION ET QCM */}
          {started && (
            <>
              <ExerciseTransition number={1} />

              <div
                id="exercise-1-qcm"
                className="w-full min-w-0 max-w-full scroll-mt-6"
              >
                <ListeningDiscoveryExercise
                  onComplete={onComplete}
                />
              </div>
            </>
          )}
        </div>
      )}
    </ExerciseContainer>
  );
}
