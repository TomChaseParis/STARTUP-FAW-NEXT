"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import QuizGogoFlow from "./exercises/QuizGogoFlow";

import { elementary1Activity1 } from "@/data/courses/activities/elementary-1/activity1/activity1";

export default function Activity() {
  return (
    <ActivityLayout activity={elementary1Activity1}>
      {/* ================= INTRODUCTION ================= */}

      <LessonBlock
        badge="Niveau élémentaire 1"
        title="QUIZZ A GOGO"
        description="Découvre les principales questions et réponses utilisées dans une conversation simple, puis entraîne-toi grâce à plusieurs exercices interactifs."
        videoSrc="/videos/courses/elementary-1/activities/activity1/JEANQUIZAGOGO.mp4"
        poster="/images/courses/elementary/activities/activity1/jeanposterquizgogo.png"
        info={{
          objectifs: [
            "Pratiquer les questions et les tournures interrogatives",
            "Identifier les réponses adaptées.",
            "Réutiliser ces questions dans des situations simples.",
          ],
          competences: [
            "Compréhension écrite",
            "Prononciation",
          ],
          prerequis: [
            "Questions et mots interrogatifs",
          ],
          duree: "20 minutes",
        }}
      />

      {/* ================= QUIZ À GOGO ================= */}

      <QuizGogoFlow />
    </ActivityLayout>
  );
}