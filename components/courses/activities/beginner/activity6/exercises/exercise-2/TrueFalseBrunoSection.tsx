
"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import ListenAndSpeak from "@/components/courses/layout/ListenAndClick";

import { scrollToElementSmooth } from "@/utils/scrollToElementSmooth";

import TrueFalseBrunoExercise from "./TrueFalseBrunoExercise";

type ExerciseTransitionProps = {
  number: number;
};

function ExerciseTransition({
  number,
}: ExerciseTransitionProps) {
  return (
    <div
      className="relative z-10 flex h-[120px] items-center justify-center"
      aria-label={`Étape ${number}`}
    >
      {/* Ligne verticale pointillée */}
      <div
        aria-hidden="true"
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[#F4B323]"
      />

      {/* Numéro centré sur la ligne */}
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#F2A900] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
        {number}
      </span>
    </div>
  );
}

export default function TrueFalseBrunoSection() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    return scrollToElementSmooth("exercise-2-content", {
      delay: 300,
      offset: 24,
      duration: 1100,
      maxAttempts: 20,
      retryDelay: 100,
    });
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

          {/* TRANSITION ET EXERCICE 2 */}
          {started && (
            <>
              <ExerciseTransition number={2} />

              <div
                id="exercise-2-content"
                className="w-full min-w-0 scroll-mt-10"
              >
                <TrueFalseBrunoExercise
                  onComplete={onComplete}
                />
              </div>
            </>
          )}
        </div>
      )}
    </ExerciseContainer>
  );
}
