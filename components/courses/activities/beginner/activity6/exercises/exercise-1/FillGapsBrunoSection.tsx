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
              title="JE M'APPELLE BRUNO GALOPIN..."
              subtitle="Écoute Bruno Galopin se présenter et complète le texte avec le bon groupe verbal."
              activityType="listen-type"
              audioSrc="/audios/courses/beginner/bruno-galopin/bruno-galopin.mp3"
              audioBadge="Bruno Galopin"
              audioImage="/images/courses/audioBlock/beginner/bruno-galopin.jpg"
              description={
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    gap-4
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-4
                    sm:flex-row
                    sm:items-center
                    sm:gap-5
                    sm:px-5
                    sm:py-4
                  "
                >
                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      justify-center
                    "
                  >
                    <img
                      src="/images/courses/beginner/activities/brunogalopin/point.png"
                      alt="Point d'attention"
                      className="
                        h-20
                        w-20
                        object-contain
                        sm:h-28
                        sm:w-24
                      "
                    />
                  </div>

                  <div
                    className="
                      min-w-0
                      w-full
                      space-y-4
                      text-center
                      text-sm
                      leading-relaxed
                      text-slate-800
                      sm:space-y-5
                      sm:text-left
                      sm:text-base
                    "
                  >
                    <div>
                      <p className="font-semibold">
                        Pense à écrire le pronom sujet + le verbe
                        conjugué au présent.
                      </p>

                      <p className="mt-1">
                        <span className="font-semibold">
                          Exemple :
                        </span>{" "}
                        « Je m&apos;appelle » Bruno Galopin
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">
                        Pense à l&apos;élision (« J ») devant une
                        voyelle ou un « h ».
                      </p>

                      <p className="mt-1">
                        <span className="font-semibold">
                          Exemple :
                        </span>{" "}
                        « J&apos;ai » deux enfants
                      </p>
                    </div>
                  </div>
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