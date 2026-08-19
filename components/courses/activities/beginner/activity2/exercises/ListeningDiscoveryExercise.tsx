"use client";

import AudioBlock from "@/components/courses/blocks/AudioBlock";
import QuizEngine from "@/components/courses/engines/QuizEngine";

import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

import { listeningDiscoveryQuizData } from "../data/listeningDiscoveryQuizData";

type ListeningDiscoveryExerciseProps = {
  onComplete?: (result: ExerciseSessionResult) => void;
};

export default function ListeningDiscoveryExercise({
  onComplete,
}: ListeningDiscoveryExerciseProps) {
  return (
    <div className="space-y-8">
      <AudioBlock
        audioSrc="/audios/courses/beginner/activity2/audio-matrimoniale.mp3"
        imageSrc="/images/courses/beginner/activities/activity2/agence-matrimoniale.png"
        badge="Dialogue"
        tip="Écoute attentivement le dialogue avant de répondre aux questions."
        levelColor="amber"
      />

      <QuizEngine
        questions={listeningDiscoveryQuizData}
        instruction="Écoute une première fois ce dialogue entre un homme et une conseillère matrimoniale puis réponds aux questions."
        onComplete={onComplete}
      />
    </div>
  );
}