"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import FillInTheBlankSection from "./exercises/FillInTheBlankSection";
import QuizChoiceSection from "./exercises/QuizChoiceSection";

export default function Activity() {
  return (
    <ActivityLayout>
      <LessonBlock
        badge="Compréhension orale"
        title="Les loisirs des Français"
        description="Regarde les images et choisis la bonne réponse."
        videoSrc="/videos/courses/elementary-1/activities/activity2/presentation.mp4"
        poster="/images/courses/elementary/activities/activity2/poster.png"
        info={{
          objectifs: ["Parler des loisirs"],
          competences: ["Compréhension orale", "Vocabulaire"],
          prerequis: ["Présent — 3e personne du pluriel"],
          duree: "25 minutes",
        }}
      />

      {/* ================= EXERCICE 1 ================= */}

      <FillInTheBlankSection />

      {/* ================= EXERCICE 2 ================= */}

      <QuizChoiceSection />

    </ActivityLayout>
  );
}