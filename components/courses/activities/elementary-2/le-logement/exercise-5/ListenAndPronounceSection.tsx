
"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import ListenSpeakInstruction from "@/components/courses/layout/ListenSpeakInstruction";

import { scrollToElementSmooth } from "@/utils/scrollToElementSmooth";

import ListenAndPronounceExercise from "./ListenAndPronounceExercise";

export default function ListenAndPronounceSection() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  useEffect(() => {
    if (!started) return;

    const timeoutId = window.setTimeout(() => {
      scrollToElementSmooth("exercise-5-transition", {
        delay: 100,
        offset: 100,
        duration: 1100,
        maxAttempts: 20,
        retryDelay: 100,
      });
    }, 400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [started]);

  return (
    <ExerciseContainer exerciseId="exercise-5">
      {({ onComplete }) => (
        <ExerciseSection width="full">
          <ListenSpeakInstruction
            level="elementary-2"
            cefrLevel="A2.2"
            imageSrc="/images/nouveau-quartier.png"
            imageAlt="Illustration de la découverte du nouveau quartier"
            title="ÉPISODE 4 — LA DÉCOUVERTE DU NOUVEAU QUARTIER"
            category="LISTEN & PRONOUNCE"
            description="Découvre le nouveau quartier de la famille. Écoute attentivement le texte, puis entraîne-toi à prononcer les phrases surlignées."
            instruction="Écoute le texte dans son intégralité. Ensuite, prononce à ton tour chaque phrase surlignée en articulant clairement et en respectant l'intonation."
            steps={[
              {
                title: "Écoute",
                description:
                  "Écoute attentivement le texte et repère les phrases surlignées.",
                icon: "sound",
              },
              {
                title: "Prononce",
                description:
                  "Appuie sur le microphone et prononce chaque phrase à ton tour.",
                icon: "mic",
              },
            ]}
            onStart={handleStart}
            started={started}
          />

          {started && (
            <ListenAndPronounceExercise onComplete={onComplete} />
          )}
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}
