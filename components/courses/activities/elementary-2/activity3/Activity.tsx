"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import Exercice from "./Exercice";
import Exercice2 from "./Exercice2";

export default function Activity() {
  return (
    <ActivityLayout>
      <LessonBlock
        badge="Niveau Élémentaire 2"
        title="Articles définis et indefinis"
        description="lorem lorem"
        videoSrc="/videos/ireneactivity2subtitlefrench.mp4"
        poster="/images/courses/teacher/irenegood.png"
        info={{
          objectifs: ["Parler d’un déménagement"],
          competences: [
            "Compréhension orale",
            "Transformation grammaticale",
            "Phonétique",
          ],
          prerequis: [
            "Vocabulaire du logement",
            "Présent, passé composé, futur simple",
          ],
          duree: "35 minutes",
        }}
      />
      <Exercice />
      <Exercice2 />
     
    </ActivityLayout>
  );
}
