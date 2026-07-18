"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import ExerciseBlock from "@/components/courses/layout/ExerciseBlock";
import ListeningDiscoveryExercise from "./exercises/ListeningDiscoveryExercise";
import ComprehensionExercise from "./exercises/ComprehensionExercise";
import ConjugationExercise from "./exercises/ConjugationExercise";
import ListeningDiscoverySection from "./exercises/ListeningDiscoverySection";
import ComprehensionSection from "./exercises/ComprehensionSection";
import ConjugationSection from "./exercises/ConjugationSection";

export default function Activity() {
  return (
    <ActivityLayout>
      {/* ================= HEADER + VIDEO + INFO ================= */}
      <LessonBlock
        badge="Compréhension orale"
        title="A l’Agence matrimoniale"
        description="Regarde la vidéo puis réponds aux questions."
        videoSrc="/videos/courses/beginner/activities/activity2/presentation.mp4"
        poster="/images/courses/beginner/activities/activity2/postermarie.png"
        info={{
          objectifs: ["Se présenter", "Répondre à des questions"],
          competences: [
            "Compréhension orale",
            "Phonie / graphie",
            "Expression orale",
          ],
          prerequis: [
            `Conjugaison au présent à la forme "tu" et "vous" des verbes de base pour savoir se présenter :
            avoir, être, faire, habiter, parler, etc.`,
            "Tournures interrogatives, questions et mots interrogatifs",
            "Chiffres et numéros",
          ],
          duree: "35 minutes",
        }}
      />

      {/* ================= EXERCICE 1 ================= */}

      <ListeningDiscoverySection />

      {/* ================= EXERCICE 2 ================= */}
      <ComprehensionSection />
      {/* ================= EXERCICE 3 ================= */}
<ConjugationSection />
    </ActivityLayout>
  );
}
