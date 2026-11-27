
"use client";

import { useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import ListenAndType from "@/components/courses/layout/ListenAndType";
import FloatingAudioPlayer from "@/components/courses/layout/FloatingAudioPlayer";

import { scrollToElementSmooth } from "@/utils/scrollToElementSmooth";

import { episode1Data } from "./episode1Data";
import ConjugaisonExercise from "./ConjugaisonExercise";

export default function ConjugaisonSection() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);

    scrollToElementSmooth("exercise-1-content", {
      delay: 300,
      offset: 100,
      duration: 1100,
      maxAttempts: 20,
      retryDelay: 100,
    });
  };

  return (
    <ExerciseContainer exerciseId="exercise-1">
      {({ onComplete }) => (
        <div className="w-full min-w-0">
          {/* CONSIGNE */}
          <div
            id="exercise-1-instruction"
            className="w-full min-w-0 scroll-mt-10"
          >
            <ExerciseSection width="full">
              <ListenAndType
                level="elementary-2"
                imageSrc="/images/courses/elementary2/le-logement/nouveau-logement.png"
                imageAlt="Illustration du nouveau logement"
                cefrLevel="A2.1"
                title={episode1Data.title}
                category="EXERCICE ÉCRIT"
                description="Complète le texte avec les verbes au bon temps et à la bonne personne. Astuce : regarde les indices dans la phrase (temps, contexte, sujet) pour choisir la bonne conjugaison."
                onStart={handleStart}
                started={started}
              />
            </ExerciseSection>
          </div>

          {/* LECTEUR AUDIO ET EXERCICE */}
          {started && (
            <div className="w-full min-w-0">
              <FloatingAudioPlayer
                audioSrc="/audios/courses/elementary-2/la-famille-demenage/le-nouveau-logement.mp3"
                imageSrc="/images/courses/elementary2/le-logement/nouveau-logement.png"
                imageAlt="Illustration du nouveau logement"
                title="Le nouveau logement"
                hint="Écoute attentivement le texte pendant que tu réalises l'exercice."
              />

              <ConjugaisonExercise onComplete={onComplete} />
            </div>
          )}
        </div>
      )}
    </ExerciseContainer>
  );
}
