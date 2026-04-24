"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import QuizEngine from "@/components/courses/blocks/QuizEngine";
import Exercice2 from "./Exercice";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import Exercice from "./Exercice";

export default function Activity() {
  return (
    <ActivityLayout>
      <LessonBlock
        badge="Compréhension orale"
        title="Les 4 verbes au présent : Devoir, Vouloir, Pouvoir, Savoir"
        description="Regarde les images et choisis la bonne réponse."
        videoSrc="/videos/jeanactivity2subtitlefrench.mp4"
        poster="/images/courses/teacher/jeangood.png"
        info={{
          objectifs: ["Parler des loisirs"],
          competences: ["Compréhension orale", "Vocabulaire"],
          prerequis: ["Présent — 3e personne du pluriel"],
          duree: "25 minutes",
        }}
      />

     <Exercice />
    </ActivityLayout>
  );
}
