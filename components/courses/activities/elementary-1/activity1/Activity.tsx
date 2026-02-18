"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import AudioBlock from "@/components/courses/blocks/AudioBlock";

import Exercice from "./Exercice";
import Exercice2 from "./Exercice2";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";

export default function Activity() {
  return (
    <ActivityLayout>
      {/* ================= PARTIE 1 ================= */}

      <LessonBlock
        badge="Compréhension orale"
        title="Questions - Réponses"
        description="Regarde la vidéo, puis écoute l'audio et complète le texte."
        videoSrc="/videos/jean-activity-1.mp4"
        poster="/images/courses/teacher/jeangood.png"
        info={{
          objectifs: ["Pratiquer les questions"],
          competences: ["Compréhension écrite", "Compréhension orale"],
          prerequis: ["Questions et mots interrogatifs", "Verbes au présent"],
          duree: "20 minutes",
        }}
      />
      <ExerciseSection>
        <InstructionBlock
          title="✍️ Exercice"
          subtitle="Testez vos connaissances en choisissant la bonne réponse à chaque question."
          description="Écoutez le texte et conjuguez tous les verbes à la troisième personne du pluriel.
    Exemple : Les jeunes _______ (passer) beaucoup de temps sur internet."
        />
        <Exercice />
      </ExerciseSection>

      {/* ================= PARTIE 2 ================= */}

      <LessonBlock
        badge="Compréhension orale"
        title="Exercice 2 — Trouver la bonne question"
        videoSrc="/videos/videoexo2.mp4"
        poster="/images/courses/elementary/questions-reponses/adrien.png"
      />
      <ExerciseSection>
              <Exercice2 />

      </ExerciseSection>

    </ActivityLayout>
  );
}
