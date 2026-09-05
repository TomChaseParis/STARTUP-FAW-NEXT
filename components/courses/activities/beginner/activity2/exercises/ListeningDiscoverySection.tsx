"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import ListeningDiscoveryExercise from "./ListeningDiscoveryExercise";

export default function ListeningDiscoverySection() {
  const [started, setStarted] = useState(false);

  /*
   * Lorsque l'utilisateur clique sur
   * "Lancer l'exercice", le QCM est monté.
   *
   * On attend donc que le DOM soit réellement disponible
   * avant de déclencher le scroll.
   */
  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timer: number | undefined;

    const scrollToQcm = () => {
      const element =
        document.getElementById("exercise-1-qcm");

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timer = window.setTimeout(
            scrollToQcm,
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

    /*
     * Petit délai pour laisser React terminer le rendu
     * du QCM avant de calculer sa position.
     */
    timer = window.setTimeout(
      scrollToQcm,
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
              title="Découverte"
              subtitle="Écoute une première fois le dialogue ci-dessus, puis réponds aux questions."
              activityType="click-or-speak"
              audioSrc="/audios/courses/beginner/activity2/audio-matrimoniale.mp3"
              audioBadge="Dialogue"
              description={
                <div className="space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {/* BOUTON AUDIO */}

                  <div className="grid grid-cols-[120px_40px_1fr] items-center gap-3">
                    <span>
                      Appuie sur le bouton
                    </span>

                    <button
                      type="button"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        relative
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-slate-200
                        bg-white
                        text-amber-500
                        shadow-[0_6px_18px_rgba(15,23,42,0.10)]
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="
                          relative
                          z-10
                          ml-0.5
                          h-4
                          w-4
                        "
                      >
                        <path d="M8.5 5.2a1.5 1.5 0 0 1 2.35-1.23l8.4 6.8a1.57 1.57 0 0 1 0 2.46l-8.4 6.8A1.5 1.5 0 0 1 8.5 18.8V5.2Z" />
                      </svg>
                    </button>

                    <span>
                      si tu veux entendre le professeur
                      présenter la question et les
                      réponses proposées.
                    </span>
                  </div>

                  {/* BOUTON MICRO */}

                  <div className="grid grid-cols-[120px_40px_1fr] items-center gap-3">
                    <span>
                      Appuie sur le bouton
                    </span>

                    <button
                      type="button"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        relative
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-amber-600
                        shadow-[0_6px_18px_rgba(15,23,42,0.10)]
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 18v3m0 0h3m-3 0H9m3-7a4 4 0 004-4V7a4 4 0 10-8 0v3a4 4 0 004 4z"
                        />
                      </svg>
                    </button>

                    <span>
                      si tu préfères répondre à la
                      question à l&apos;oral.
                    </span>
                  </div>

                  {/* RECONNAISSANCE VOCALE */}

                  <p>
                    Pour aider l&apos;outil de reconnaissance
                    vocale à bien identifier ta réponse,
                    pense à dire la lettre (A, B ou C) qui
                    correspond à ta réponse, suivi de la
                    réponse en entier. Exemple :
                    <span className="font-semibold text-slate-900">
                      {" « A : ingénieur »."}
                    </span>
                  </p>
                </div>
              }
              onStart={() => {
                setStarted(true);
              }}
              started={started}
            />

            {/* ========================================================= */}
            {/* QCM */}
            {/* ========================================================= */}

            {started && (
              <div
                id="exercise-1-qcm"
                className="scroll-mt-10"
              >
                <ListeningDiscoveryExercise
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