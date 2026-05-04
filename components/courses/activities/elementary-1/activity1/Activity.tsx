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
        videoSrc="/videos/courses/elementary-1/activities/activity1/presentation.mp4"
        poster="/images/courses/elementary/activities/activity1/poster.png"
        info={{
          objectifs: ["Pratiquer les questions"],
          competences: ["Compréhension écrite", "Compréhension orale"],
          prerequis: ["Questions et mots interrogatifs", "Verbes au présent"],
          duree: "20 minutes",
        }}
      />
      <ExerciseSection>
        <InstructionBlock
          title="✍️ Exercice -"
          subtitle=""
          description="Testez vos connaissances en choisissant la bonne réponse à chaque question."
          activityType="click-or-speak"
        />
        <Exercice />
      </ExerciseSection>

      {/* ================= PARTIE 2 ================= */}

    
      <ExerciseSection>
        <Exercice2 />
      </ExerciseSection>
    </ActivityLayout>
  );
}
