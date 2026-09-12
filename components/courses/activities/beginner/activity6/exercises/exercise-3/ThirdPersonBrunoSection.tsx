"use client";

import {
  useEffect,
  useState,
} from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import ThirdPersonBrunoExercise from "./ThirdPersonBrunoExercise";

export default function ThirdPersonBrunoSection() {
  const [started, setStarted] =
    useState(false);

  useEffect(() => {
    if (!started) {
      return;
    }

    let attempts = 0;
    let timer: number | undefined;

    const scrollToExercise = () => {
      const element =
        document.getElementById(
          "exercise-3-content",
        );

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
        element.getBoundingClientRect()
          .top + window.scrollY;

      const offset = 100;

      window.scrollTo({
        top: Math.max(
          0,
          elementTop - offset,
        ),
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
    <ExerciseContainer exerciseId="exercise-3">
      {({ onComplete }) => (
        <div
          id="exercise-3-instruction"
          className="scroll-mt-10"
        >
          <ExerciseSection>
            <InstructionBlock
              level="beginner"
              stampLabel="EXERCICE 3"
              typeLabel="RÉÉCRITURE"
              title="IL S'APPELLE BRUNO GALOPIN..."
              subtitle={
                "Transforme le texte de l’exercice 1 de la 1ère personne à la 3ème personne (« Je » > « Il » ; « Nous » > « Ils »)."
              }
              activityType="type"
              description={
                <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                  <div>
                    <p className="mb-2 font-semibold text-slate-800">
                      Consigne :
                    </p>

                    <p>
                      Complète à nouveau le texte en
                      réécrivant chaque groupe verbal à
                      la troisième personne du singulier.
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-5
                      rounded-xl
                      border
                      border-slate-300
                      bg-white
                      px-5
                      py-4
                      shadow-sm
                    "
                  >
                    <div className="w-16 shrink-0 sm:w-20">
                      <img
                        src="/images/courses/beginner/activities/brunogalopin/point.png"
                        alt="Point d'attention"
                        className="h-auto w-full object-contain"
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-slate-800">
                      Lors de la transposition du « nous » en « ils », faites attention 
à la terminaison du verbe. Rappel : le « ent » ne s’entend pas à
l’oral.

                      </p>


                      <p>
                        Exemple : « Nous vivons » ➡️ « Ils vivent »
                      </p>
                    </div>
                  </div>
                </div>
              }
              onStart={() =>
                setStarted(true)
              }
              started={started}
            />

            {started && (
              <div
                id="exercise-3-content"
                className="scroll-mt-10"
              >
                <ThirdPersonBrunoExercise
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