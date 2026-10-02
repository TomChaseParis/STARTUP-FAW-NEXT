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
              activityType="listen-type"
              audioSrc={
                leisureConjugationData.audioSrc
              }
              audioImage="/images/courses/elementary/lesloisirsdesfrancais/loisirs-fr.png"
              audioBadge="Compréhension orale"
              description={
                <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
            
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