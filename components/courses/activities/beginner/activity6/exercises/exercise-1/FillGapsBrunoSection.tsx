
"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import ExerciseInstruction from "@/components/courses/layout/ExerciseInstruction";
import FloatingAudioPlayer from "@/components/courses/layout/FloatingAudioPlayer";

import FillGapsBrunoExercice from "./FillGapsBrunoExercice";

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
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[#F4B323]"
      />

      {/* Numéro centré sur la ligne */}
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#F2A900] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
        {number}
      </span>
    </div>
  );
}

export default function FillGapsBrunoSection() {
  const [started, setStarted] = useState(false);

  /*
   * Défilement automatique vers l'exercice
   * après le démarrage.
   *
   * Même comportement que ListeningDiscoverySection :
   * - attente de 300 ms ;
   * - durée de 1 100 ms ;
   * - même courbe d'accélération/décélération ;
   * - même position d'arrivée à 24 px du haut.
   */
  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timeoutId: number | undefined;
    let animationFrameId: number | undefined;

    const scrollToExercise = () => {
      const element = document.getElementById(
        "exercise-1-content",
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

    // Attend le montage de l'exercice avant le défilement.
    timeoutId = window.setTimeout(
      scrollToExercise,
      300,
    );

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
          {/* ÉNONCÉ */}
          <div
            id="exercise-1-instruction"
            className="w-full min-w-0 scroll-mt-10"
          >
            <ExerciseSection width="full">
              <div className="w-full min-w-0">
                <ExerciseInstruction
                  imageSrc="/images/LISTENTYPEBRUNO.png"
                  imageAlt="Bruno Galopin devant son ordinateur"
                  category="COMPRÉHENSION ORALE"
                  title="JE M'APPELLE BRUNO GALOPIN..."
                  description="Écoute Bruno Galopin se présenter et complète le texte avec le bon groupe verbal."
                  example="Je m'appelle Bruno Galopin"
                  activityTitle="EXERCICE 1"
                  steps={[
                    {
                      title: "Écoute",
                      description:
                        "Écoute attentivement le dialogue de Bruno.",
                      icon: "sound",
                    },
                    {
                      title: "Complète",
                      description:
                        "Écris le pronom sujet et le verbe conjugué au présent.",
                      icon: "keyboard",
                    },
                  ]}
                  
                  onStart={() => setStarted(true)}
                  started={started}
                />
              </div>
            </ExerciseSection>
          </div>

          {/* TRANSITION ET EXERCICE 1 */}
          {started && (
            <>
              <ExerciseTransition number={1} />

              <div
                id="exercise-1-content"
                className="w-full min-w-0 max-w-full scroll-mt-6"
              >
                <FillGapsBrunoExercice
                  onComplete={onComplete}
                />
              </div>
            </>
          )}

          {/* LECTEUR AUDIO FLOTTANT */}
          {started && (
            <FloatingAudioPlayer
              audioSrc="/audios/courses/beginner/bruno-galopin/bruno-galopin.mp3"
              imageSrc="/images/courses/audioBlock/beginner/bruno-galopin.jpg"
              imageAlt="Bruno Galopin"
              title="Bruno Galopin"
              hint="Réécoute le dialogue pour compléter le texte."
            />
          )}
        </div>
      )}
    </ExerciseContainer>
  );
}
