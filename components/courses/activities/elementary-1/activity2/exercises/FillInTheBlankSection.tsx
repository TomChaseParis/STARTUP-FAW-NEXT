"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import leisureConjugationData from "./data/leisureConjugationData";
import FillInTheBlankExercise from "./FillInTheBlankExercise";

export default function FillInTheBlankSection() {
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
              level="elementary1"
              stampLabel="EXERCICE 1"
              title="Complète les phrases"
              activityType="type"
              audioSrc={
                leisureConjugationData.audioSrc
              }
              audioImage="/images/courses/audioBlock/elementary1/am.png"
              audioBadge="Compréhension orale"
              description={
                <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {/* ===================================================== */}
                  {/* UTILISATION DU LECTEUR AUDIO */}
                  {/* ===================================================== */}

                  <div className="flex flex-wrap items-center gap-2">
                    <span>
                      Utilise le bouton
                    </span>

                    {/* ICÔNE D'ÉCOUTE */}

                    <span
                      className="
                        inline-flex
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
                      aria-hidden="true"
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
                          d="M11 5L6 9H3v6h3l5 4V5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13"
                        />
                      </svg>
                    </span>

                    <span>
                      pour écouter le professeur présenter la
                      question et les réponses proposées.
                    </span>
                  </div>

                  {/* ===================================================== */}
                  {/* BOUTON MICRO */}
                  {/* ===================================================== */}

                  <div className="flex flex-wrap items-center gap-2">
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
                      si tu préfères répondre à la question à
                      l&apos;oral.
                    </span>
                  </div>

                  {/* ===================================================== */}
                  {/* CONSIGNE DE L'EXERCICE */}
                  {/* ===================================================== */}

                  <p>
                    Complète chaque phrase avec la bonne forme
                    du verbe.
                  </p>

                  {/* ===================================================== */}
                  {/* EXEMPLE */}
                  {/* ===================================================== */}

                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <p className="mb-2 text-sm font-medium text-slate-600">
                      💡 Exemple :
                    </p>

                    <p className="text-base">
                      Les jeunes{" "}
                      <span className="font-semibold">
                        passent
                      </span>{" "}
                      beaucoup de temps sur internet.
                    </p>
                  </div>

                  {/* ===================================================== */}
                  {/* ASTUCE */}
                  {/* ===================================================== */}

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="mb-2 text-sm font-medium text-slate-600">
                      🎯 Astuce :
                    </p>

                    <p className="text-base">
                      Fais attention au sujet pour choisir la
                      bonne terminaison du verbe.
                    </p>
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
                <FillInTheBlankExercise
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