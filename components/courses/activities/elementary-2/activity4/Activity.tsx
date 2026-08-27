"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import ListeningDiscoverySection from "./exercises/ListeningDiscoverySection";
import MatchingSection from "./exercises/MatchingSection";
import ImageChoiceSection from "./exercises/ImageChoiceSection";
// import ListeningQuizSection from "./exercises/ListeningQuizSection";
// import NegationFillGapsSection from "./exercises/NegationFillGapsSection";
import { elementary2Activity4 } from "@/data/courses/activities/elementary-2/activity4/activity4";
export default function Activity() {
  return (
    <ActivityLayout activity={elementary2Activity4}>
      {/* ================= INTRODUCTION ================= */}

      <LessonBlock
        level="elementary-2"
        title="NON, NON, NON ! (Emploi des tournures négatives)"
        description="Découvre comment utiliser les principales tournures négatives en français à travers un dialogue authentique, puis entraîne-toi grâce à plusieurs exercices interactifs."
        videoSrc="/videos/courses/elementary-2/activities/activity1/presentation.mp4"
        poster="/images/courses/elementary-2/activities/activity1/poster.png"
        info={{
          objectifs: [
            "Identifier et utiliser les tournures négatives en français.",
            "Comprendre les différentes formes de négation dans un dialogue.",
            "Réutiliser les tournures négatives dans des exercices variés.",
          ],
          competences: [
            "Compréhension orale",
            "Compréhension écrite",
            "Grammaire",
          ],
          prerequis: [
            "Le sens et l'emploi des tournures négatives : « pas », « plus », « jamais », « rien », « personne », « aucun », « nulle part ».",
            "Conjugaison des verbes au présent et au passé composé.",
            "Les tournures interrogatives.",
          ],
          duree: "20 minutes",
        }}
      />

      {/* ================= EXERCICE 1 ================= */}

      <ListeningDiscoverySection />

      {/* ================= EXERCICE 2 ================= */}

     <MatchingSection />

      {/* ================= EXERCICE 3 ================= */}

      <ImageChoiceSection />
    </ActivityLayout>
  );
}