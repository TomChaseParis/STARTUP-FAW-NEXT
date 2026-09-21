"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import TrueFalseBrunoExercise from "./TrueFalseBrunoExercise";

export default function TrueFalseBrunoSection() {
  const [started, setStarted] = useState(false);

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
              stampLabel="EXERCICE 2"
              typeLabel="COMPRÉHENSION ORALE"
              title="VRAI OU FAUX ?"
              subtitle="Écoute une nouvelle fois le dialogue et dis si les phrases proposées sont vraies ou fausses."
              activityType="listen-click"

              audioSrc="/audios/courses/beginner/bruno-galopin/bruno-galopin.mp3"
              audioBadge="Bruno Galopin"
              audioImage="/images/courses/audioBlock/beginner/bruno-galopin.jpg"

              description={
                <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                  <p className="font-semibold text-slate-800">
                    Consigne :
                  </p>

                  <p>
                    Écoute une nouvelle fois le dialogue et
                    dis si les phrases proposées sont vraies
                    ou fausses.
                  </p>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-amber-200
                      bg-amber-50
                      px-4
                      py-3
                      font-semibold
                      text-slate-800
                    "
                  >
                    Pour chaque phrase, sélectionne{" "}
                    <span className="text-amber-700">
                      VRAI
                    </span>{" "}
                    ou{" "}
                    <span className="text-amber-700">
                      FAUX
                    </span>
                    .
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
                id="exercise-2-content"
                className="scroll-mt-10"
              >
                <TrueFalseBrunoExercise
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