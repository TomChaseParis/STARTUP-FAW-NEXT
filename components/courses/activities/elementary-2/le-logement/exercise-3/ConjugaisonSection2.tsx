
"use client";

import { useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import ListenAndType from "@/components/courses/layout/ListenAndType";
import FloatingAudioPlayer from "@/components/courses/layout/FloatingAudioPlayer";

import { scrollToElementSmooth } from "@/utils/scrollToElementSmooth";

import { episodeAppartementData } from "./episodeAppartementData";
import ConjugaisonExercise2 from "./ConjugaisonExercise2";

export default function ConjugaisonSection2() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);

    scrollToElementSmooth("exercise-3-content", {
      delay: 300,
      offset: 100,
      duration: 1100,
      maxAttempts: 20,
      retryDelay: 100,
    });
  };

  return (
    <ExerciseContainer exerciseId="exercise-3">
      {({ onComplete }) => (
        <ExerciseSection width="full">
          <div className="w-full min-w-0">
            <ListenAndType
              level="elementary-2"
              imageSrc="/images/le-demenagement.png"
              imageAlt="Illustration de l'appartement"
              cefrLevel="A2.1"
              title={episodeAppartementData.title}
              category="EXERCICE ÉCRIT"
              description="Écoute le texte et complète avec les mots manquants. Astuce : regarde les indices dans la phrase (temps, contexte, sujet) pour choisir la bonne conjugaison."
              onStart={handleStart}
              started={started}
            />

            {started && (
              <>
                <FloatingAudioPlayer
                  audioSrc="/audios/courses/elementary-2/la-famille-demenage/la-visite-de-lappart.mp3"
                  imageSrc="/images/le-demenagement.png"
                  imageAlt="Illustration de l'appartement"
                  title={episodeAppartementData.title}
                  hint="Écoute attentivement le texte pendant que tu réalises l'exercice."
                />

                <ConjugaisonExercise2 onComplete={onComplete} />
              </>
            )}
          </div>
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}
