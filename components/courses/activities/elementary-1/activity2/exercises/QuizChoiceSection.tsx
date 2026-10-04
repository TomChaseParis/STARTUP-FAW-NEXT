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