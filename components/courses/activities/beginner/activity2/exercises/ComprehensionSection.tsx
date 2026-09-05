"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import ComprehensionExercise from "./ComprehensionExercise";

export default function ComprehensionSection() {
  const [started, setStarted] = useState(false);

  /*
   * Lorsque l'utilisateur clique sur
   * "Lancer l'exercice", le tableau est affiché.
   *
   * On attend que le tableau soit réellement présent
   * dans le DOM avant de lancer le scroll.
   */
  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timer: number | undefined;

    const scrollToExercise = () => {
      const element =
        document.getElementById("exercise-2-content");

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
    <ExerciseContainer exerciseId="exercise-2">
      {({ onComplete }) => (
        <div
          id="exercise-2-instruction"
          className="scroll-mt-10"
        >
          <ExerciseSection>
            <InstructionBlock
              level="beginner"
              icon={null}
              stampLabel="EXERCICE 2"
              typeLabel="COMPRÉHENSION ORALE"
              title="Approfondissement"
              subtitle="Écoute une deuxième fois le dialogue puis complète le tableau."
              activityType="listen-click"
              audioSrc="/audios/courses/beginner/activity2/audio-matrimoniale.mp3"
              audioBadge="Dialogue"
              description={
                <div className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  <p>
                    Clique sur chaque réponse de ton
                    choix, puis valide tes réponses quand
                    tu as terminé.
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
                id="exercise-2-content"
                className="scroll-mt-10"
              >
                <ComprehensionExercise
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