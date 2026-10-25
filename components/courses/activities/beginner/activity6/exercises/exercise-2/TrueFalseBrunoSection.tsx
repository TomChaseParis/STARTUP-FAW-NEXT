"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import ListenAndSpeak from "@/components/courses/layout/ListenAndClick";

import TrueFalseBrunoExercise from "./TrueFalseBrunoExercise";

export default function TrueFalseBrunoSection() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timer: number | undefined;

    const scrollToExercise = () => {
      const element = document.getElementById("exercise-2-content");

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timer = window.setTimeout(scrollToExercise, 100);
        }

        return;
      }

      const elementTop =
        element.getBoundingClientRect().top + window.scrollY;

      const offset = 100;

      window.scrollTo({
        top: Math.max(0, elementTop - offset),
        behavior: "smooth",
      });
    };

    timer = window.setTimeout(scrollToExercise, 100);

    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };
  }, [started]);

  return (
    <ExerciseContainer exerciseId="exercise-2">
      {({ onComplete }) => (
        <div className="w-full min-w-0">
          {/* ÉNONCÉ */}
          <div
            id="exercise-2-instruction"
            className="w-full min-w-0 scroll-mt-10"
          >
            <ExerciseSection width="full">
              <ListenAndSpeak
                exerciseNumber={2}
                category="COMPRÉHENSION ORALE"
                title="VRAI OU FAUX ?"
                description="Écoute une nouvelle fois le dialogue de Bruno Galopin, puis indique si les phrases proposées sont vraies ou fausses."
                example="Pour chaque phrase, sélectionne VRAI ou FAUX, puis valide tes réponses."
                activityTitle="EXERCICE 2"
                audioSrc="/audios/courses/beginner/bruno-galopin/bruno-galopin.mp3"
                audioTitle="Bruno Galopin"
                audioHint="Réécoute le dialogue pour vérifier les informations."
                onStart={() => setStarted(true)}
                started={started}
              />
            </ExerciseSection>
          </div>

          {/* EXERCICE — SÉPARÉ DE L'ÉNONCÉ */}
          {started && (
            <div
              id="exercise-2-content"
              className="mt-8 w-full min-w-0 scroll-mt-10"
            >
              <TrueFalseBrunoExercise onComplete={onComplete} />
            </div>
          )}
        </div>
      )}
    </ExerciseContainer>
  );
}