"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import FillGapsBrunoExercice from "./FillGapsBrunoExercice";

export default function FillGapsBrunoSection() {
  const [started, setStarted] = useState(false);

  /*
   * Lorsque l'utilisateur clique sur
   * "Lancer l'exercice", l'exercice est affiché.
   *
   * On attend que le contenu soit réellement présent
   * dans le DOM avant de lancer le scroll.
   */
  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timer: number | undefined;

    const scrollToExercise = () => {
      const element =
        document.getElementById("exercise-1-content");

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timer = window.setTimeout(
            scrollToExercise,
            100,
          );
        }

        return;
      }

      const elementTop =
        element.getBoundingClientRect().top +
        window.scrollY;

      const offset = 100;

      window.scrollTo({
        top: Math.max(0, elementTop - offset),
        behavior: "smooth",
      });
    };

    timer = window.setTimeout(
      scrollToExercise,
      100,
    );

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [started]);

  return (
    <ExerciseContainer exerciseId="exercise-1">
      {({ onComplete }) => (
        <div
          id="exercise-1-instruction"
          className="scroll-mt-10"
        >
          <ExerciseSection>
            <InstructionBlock
              level="beginner"
              stampLabel="EXERCICE 1"
              typeLabel="COMPRÉHENSION ORALE"
              title="Meeting Bruno Galopin"
              subtitle="Écoute Bruno Galopin se présenter et complète le texte avec le bon groupe verbal."
              activityType="listen-type"
              audioSrc="/audios/courses/beginner/activity6/bruno-galopin.mp3"
              audioBadge="Bruno Galopin"
              description={
                <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                  <p className="font-semibold text-slate-800">
                    Consigne :
                  </p>

                  <p>
                    Écoute Bruno Galopin se présenter et
                    complète le texte avec le bon groupe
                    verbal.
                  </p>

                  <p>
                    Exemple :{" "}
                    <span className="font-semibold">
                      Je m&apos;appelle
                    </span>{" "}
                    Bruno Galopin.
                  </p>
                </div>
              }
              onStart={() => {
                setStarted(true);
              }}
              started={started}
            />

            {started && (
              <div
                id="exercise-1-content"
                className="scroll-mt-10"
              >
                <FillGapsBrunoExercice
                  onComplete={onComplete}
                />
              </div>
            )}
          </ExerciseSection>
        </div>
      )}
    </ExerciseContainer>
  );
}