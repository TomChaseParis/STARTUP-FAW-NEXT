"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import FillInTheBlankSection from "./exercises/FillInTheBlankSection";

import { elementary1Activity4 } from "@/data/courses/activities/elementary-1/activity4/activity4";

export default function Activity() {
  return (
    <ActivityLayout activity={elementary1Activity4}>
      <LessonBlock
        badge="Compréhension écrite"
        title="Les expressions de l’interdiction"
        description="Observe les images et complète les phrases."
        videoSrc="/videos/marieactivity4.mp4"
        poster="/images/courses/teacher/wide-jean.png"
        info={{
          objectifs: [
            "Comprendre les règles",
            "Utiliser les expressions d’interdiction",
          ],
          competences: [
            "Compréhension écrite",
            "Production écrite",
          ],
          prerequis: [
            "Présent des verbes",
            "Structures simples",
          ],
          duree: "20 minutes",
        }}
      />

      <FillInTheBlankSection />
    </ActivityLayout>
  );
}