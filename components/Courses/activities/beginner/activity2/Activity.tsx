"use client";

import { useMemo } from "react";
import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import AudioBlock from "@/components/courses/blocks/AudioBlock";
import QuizEngine from "@/components/courses/blocks/QuizEngine";
import { quizData } from "./quizData";
import Exercice from "./Exercice";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";

export default function Activity() {
  const questions = useMemo(() => quizData ?? [], []);

  return (
    <ActivityLayout>
      <LessonBlock
        badge="Compréhension orale"
        title="Activité 2 — Écoute et réponds"
        description="Regarde la vidéo, écoute l’audio, puis réponds aux questions."
        videoSrc="/videos/marieactivity1.mp4"
        poster="/images/courses/teacher/wide-marie.png"
        info={{
          objectifs: ["Comprendre un dialogue simple"],
          competences: ["Compréhension orale", "Compréhension écrite"],
          prerequis: ["Vocabulaire du quotidien"],
          duree: "20 minutes",
        }}
      />

      <AudioBlock
        title="Écoute la conversation"
        audioSrc="/audios/lunch.wav"
        badge="Audio"
        tip="Conseil : écoute une première fois, puis relance en notant les mots-clés utiles."
      />

      <ExerciseSection>
        <Exercice />
        <QuizEngine questions={questions} />
      </ExerciseSection>
    </ActivityLayout>
  );
}
