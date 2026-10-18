"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import QuizChoiceExercise from "./QuizChoiceExercise";

export default function QuizChoiceSection() {
  const [started, setStarted] = useState(false);

  const exerciseRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) {
      return;
    }

    let attempts = 0;
    let timer: number | undefined;

    const scrollToExercise = () => {
      const element =
        exerciseRef.current;

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
    <ExerciseContainer exerciseId="exercise-2">
      {({ onComplete }) => (
        <ExerciseSection>
          <InstructionBlock
            level="elementary1"
            stampLabel="EXERCICE 2"
            title="QU’EST-CE QU’ILS FONT ?"
            activityType="click-or-speak"
            description={
              <div className="space-y-5 text-black">
                <p>
                  <span className="font-semibold">
                    Consigne :
                  </span>{" "}
                  Associe chaque image à ce qu’elle représente
                  en choisissant parmi les trois phrases proposées.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                    <span>
                      Utilise le bouton
                    </span>

                    {/* ICÔNE D'ÉCOUTE */}

                    <span
                    className="
                      inline-flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-full border border-slate-200
                      bg-white text-amber-500
                      shadow-[0_3px_10px_rgba(15,23,42,0.06)]
                    "
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5.5a.75.75 0 0 1 1.14-.64l9.25 6a.75.75 0 0 1 0 1.28l-9.25 6A.75.75 0 0 1 8 17.5v-12Z" />
                    </svg>
                  </span>
                    <span>
                      pour écouter le professeur présenter la question et les
                      réponses proposées.
                    </span>
                  </div>

                  {/* ===================================================== */}
                  {/* BOUTON MICRO */}
                  {/* ===================================================== */}

                  <div className="flex flex-wrap items-center gap-2">
                    <span>Appuie sur le bouton</span>

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
                      space-y-3
                      text-center
                      text-sm
                      leading-relaxed
                      text-slate-800
                      sm:text-left
                      sm:text-base
                    "
                  >
                    <p className="font-bold">
                      Attention (1) : si vous utilisez le micro
                      pour répondre à l’oral, vous devez dire{" "}
                      <strong>toute la phrase</strong>.
                    </p>

                    <p>
                      Exemple : « Ils boivent du thé. »
                    </p>

                    <p className="font-bold">
                      Attention (2) : le <em>–ent</em>{" "}
                      <strong>ne se prononce pas</strong> à la fin
                      des verbes à la 3ème personne du pluriel.
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
              ref={exerciseRef}
              className="scroll-mt-10"
            >
              <QuizChoiceExercise
                onComplete={onComplete}
              />
            </div>
          )}
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}