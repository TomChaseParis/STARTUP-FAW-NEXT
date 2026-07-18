"use client";

import { useRef, useState } from "react";
import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import VerbListeningExercise from "./exercises/VerbListeningExercise";
import ExerciseBlock from "@/components/courses/layout/ExerciseBlock";
import VerbConjugationExercise from "./exercises/VerbConjugationExercise";
import VerbSelectionExercise from "./exercises/VerbSelectionExercise";
import CharacterPresentationExercise from "./exercises/CharacterPresentationExercise";
import VerbListeningSection from "./exercises/VerbListeningSection";
import VerbConjugationSection from "./exercises/VerbConjugationSection";
import VerbSelectionSection from "./exercises/VerbListeningSection";
import CharacterPresentationSection from "./exercises/CharacterPresentationSection";

export default function Activity() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(
    null,
  );
  const [currentTime, setCurrentTime] = useState(0);

  const playVerbAudio = (id: string, src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(src);
    audioRef.current = audio;

    setCurrentlyPlayingId(id);
    setCurrentTime(0);

    audio.play();

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onended = () => {
      setCurrentlyPlayingId(null);
      setCurrentTime(0);
    };

    audio.onerror = () => {
      setCurrentlyPlayingId(null);
      setCurrentTime(0);
    };
  };

  return (
    <ActivityLayout>
      {/* ================= HEADER + VIDEO ================= */}
      <div className="mx-auto w-full max-w-6xl px-6">
        <LessonBlock
          badge="Grammaire"
          title="Les 4 verbes essentiels : Être – Avoir – Faire – Aller"
          description="Regarde la vidéo puis écoute et répète les conjugaisons."
          videoSrc="/videos/courses/beginner/activities/activity1/presentation.mp4"
          poster="/images/courses/beginner/activities/activity1/postermarie.png"
          info={{
            objectifs: [
              "Conjuguer des verbes de base pour faire des phrases simples",
            ],
            competences: [
              "Compréhension écrite",
              "Transformation grammaticale",
              "Phonie / graphie",
              "Prononciation",
            ],
            prerequis: [
              "Les verbes « être », « avoir », « aller » et « faire » au présent",
              "Les pronoms sujets : « Je », « Tu », « Il », « Elle », « On », « Nous », « Vous », « Ils » et « Elles»",
            ],
            duree: "30 minutes",
          }}
        />
      </div>

      {/* ================= EXERCICE 1 ================= */}

      <VerbListeningSection />

      {/* ================= EXERCICE 2 ================= */}

      <VerbConjugationSection />

      {/* ================= EXERCICE 3 ================= */}

      <VerbSelectionSection />
      {/* ================= EXERCICE 4 ================= */}

      <CharacterPresentationSection />
    </ActivityLayout>
  );
}
