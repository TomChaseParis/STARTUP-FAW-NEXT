"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import QuizEngine from "@/components/courses/blocks/QuizEngine";
import { quizData } from "./quizData";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";

export default function Activity() {

  const questions = quizData;

  return (
    <ActivityLayout>
      <LessonBlock
        badge="Compréhension orale"
        title="L'imparfait d'habitude"
        description="Écoute la chanson puis réponds aux questions."
        videoSrc="/videos/etiennesq1_V1.mp4"
        poster="/images/courses/teacher/etienne-wide-1.png"
        info={{
          objectifs: ["Comprendre un texte chanté"],
          competences: ["Compréhension orale"],
          prerequis: ["Lexique des vacances"],
          duree: "25 minutes",
        }}
      />

      <ExerciseSection>

        <InstructionBlock
          title="✍️ Exercice"
          description="Choisis la bonne réponse pour chaque question."
          activityType="click-or-speak"
        />

        <QuizEngine questions={questions} />

      </ExerciseSection>

    </ActivityLayout>
  );
}