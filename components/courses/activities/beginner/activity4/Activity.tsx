"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import Exercice from "./Exercice";

import { activity4 } from "@/data/courses/activities/beginner/activity4/activity4";

export default function Activity() {
  return (
    <ActivityLayout activity={activity4}>
      <LessonBlock
        badge="Production écrite"
        title="Les activités de la journée"
        description="Observe les images et décris ce que fait la personne."
        videoSrc="/videos/marieactivity3.mp4"
        poster="/images/courses/teacher/mariegood.png"
        info={{
          objectifs: ["Décrire une action", "Utiliser le présent"],
          competences: ["Expression écrite"],
          prerequis: ["Verbes du 1er groupe"],
          duree: "15 minutes",
        }}
      />

      <ExerciseSection>
        <Exercice />
      </ExerciseSection>
    </ActivityLayout>
  );
}