"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ListenAndSpeak from "@/components/courses/layout/ListenAndClick";
import FloatingAudioPlayer from "@/components/courses/layout/FloatingAudioPlayer";

import ComprehensionExercise from "./ComprehensionExercise";

function ExerciseTransition({ number }: { number: number }) {
  return (
    <div
      className="relative z-10 flex h-[120px] items-center justify-center"
      aria-label={`Étape ${number}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-[#F4B323]"
      />

      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#F2A900] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
        {number}
      </span>
    </div>
  );
}

export default function ComprehensionSection() {
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

      window.scrollTo({
        top: Math.max(0, elementTop - 100),
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
            <ListenAndSpeak
              exerciseNumber={2}
              category="COMPRÉHENSION ORALE"
              title="Approfondissement"
              description="Écoute une deuxième fois le dialogue puis complète le tableau."
              example="Clique sur chaque réponse de ton choix, puis valide tes réponses quand tu as terminé."
              audioSrc="/audios/courses/beginner/activity2/audio-matrimoniale.mp3"
              dialogueImageSrc="/images/courses/audioBlock/beginner/am.png"
              audioTitle="Dialogue"
              audioHint="Écoute attentivement le dialogue avant de compléter le tableau."
              onStart={() => setStarted(true)}
              started={started}
            />
          </div>

          {/* TRANSITION VERS L'EXERCICE */}
          {started && <ExerciseTransition number={2} />}

          {/* TABLEAU */}
          {started && (
            <div
              id="exercise-2-content"
              className="w-full min-w-0 scroll-mt-10"
            >
              <ComprehensionExercise onComplete={onComplete} />
            </div>
          )}

          {/* LECTEUR AUDIO FLOTTANT */}
          {started && (
            <FloatingAudioPlayer
              audioSrc="/audios/courses/beginner/activity2/audio-matrimoniale.mp3"
              imageSrc="/images/courses/audioBlock/beginner/am.png"
              imageAlt="Illustration du dialogue à écouter"
              title="Dialogue"
              hint="Réécoute le dialogue pendant que tu complètes le tableau."
            />
          )}
        </div>
      )}
    </ExerciseContainer>
  );
}