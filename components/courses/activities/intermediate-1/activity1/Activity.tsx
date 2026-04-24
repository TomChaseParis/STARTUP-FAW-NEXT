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
        title="Les vacances au bord de la mer"
        description="Écoute la chanson puis réponds aux questions."
        videoSrc="/videos/etienneactivity1.mp4"
        poster="/images/courses/teacher/wide-etienne.png"
        info={{
          objectifs: ["Comprendre un texte chanté"],
          competences: ["Compréhension orale"],
          prerequis: ["Lexique des vacances"],
          duree: "25 minutes",
        }}
      />

      <AudioBlock
        title="Écoute la chanson"
        audioSrc="/audios/courses/intermediate/lesvacancesauborddemer.mp3"
        badge="Audio"
        tip="Écoute une première fois avant de répondre."
      />
      <Exercice />

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
