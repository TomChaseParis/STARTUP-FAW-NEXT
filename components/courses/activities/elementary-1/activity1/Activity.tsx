"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import ListeningSection from "./exercises/ListeningSection";
import WatchAndAnswerSection from "./exercises/WatchAndAnswerSection";

import { elementary1Activity1 } from "@/data/courses/activities/elementary-1/activity1/activity1";

export default function Activity() {
  return (
    <ActivityLayout activity={elementary1Activity1}>
      {/* ================= INTRODUCTION ================= */}

      <LessonBlock
        badge="Niveau élémentaire 1"
        title="Questions - Réponses"
        description="Découvre les principales questions et réponses utilisées dans une conversation simple, puis entraîne-toi grâce à plusieurs exercices interactifs."
        videoSrc="/videos/courses/elementary-1/activities/activity1/presentation.mp4"
        poster="/images/courses/elementary-1/activities/activity1/poster.png"
        info={{
          objectifs: [
            "Comprendre les principales questions de la vie quotidienne.",
            "Identifier les réponses adaptées.",
            "Réutiliser ces questions dans des situations simples.",
          ],
          competences: [
            "Compréhension orale",
            "Compréhension écrite",
            "Expression orale",
          ],
          prerequis: [
            "Les pronoms personnels.",
            "Les verbes être et avoir au présent.",
            "Les mots interrogatifs.",
          ],
          duree: "20 minutes",
        }}
      />

      {/* ================= EXERCICE 1 ================= */}

      <ListeningSection />

      {/* ================= EXERCICE 2 ================= */}

      <WatchAndAnswerSection />
    </ActivityLayout>
  );
}