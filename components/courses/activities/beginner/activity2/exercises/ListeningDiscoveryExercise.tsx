"use client";

import AudioBlock from "@/components/courses/blocks/AudioBlock";
import QuizEngine from "@/components/courses/engines/QuizEngine";
import { listeningDiscoveryQuizData } from "../data/listeningDiscoveryQuizData";

export default function ListeningDiscoveryExercise() {
  return (
    <section className="space-y-8">
      <AudioBlock
        imageSrc="/images/courses/beginner/activities/activity2/agence-matrimoniale.png"
        audioSrc="/audios/courses/beginner/activity2/audio-matrimoniale.mp3"
        levelColor="amber"
        tip="Écoute deux fois avant de répondre."
      />

      <QuizEngine questions={listeningDiscoveryQuizData} />
    </section>
  );
}