"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import AudioBlock from "@/components/courses/blocks/AudioBlock";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import Exercice from "./Exercice";
import Exercice2 from "./Exercice2";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";

export default function Activity() {
  return (
    <ActivityLayout>
      {/* ================= HEADER + VIDEO + INFO ================= */}
      <LessonBlock
        badge="Compréhension orale"
        title="À l’agence matrimoniale"
        description="Regarde la vidéo puis réponds aux questions."
        videoSrc="/videos/marieactivity3.mp4"
        poster="/images/courses/teacher/mariegood.png"
        info={{
          objectifs: ["Se présenter", "Répondre à des questions personnelles"],
          competences: ["Compréhension orale", "Expression orale"],
          prerequis: [
            "Présent des verbes être / avoir",
            "Questions interrogatives",
            "Chiffres et numéros",
          ],
          duree: "35 minutes",
        }}
      />

      <AudioBlock
        title="Écoute la conversation"
        audioSrc="/audios/courses/beginner/audioactivity3.mp3"
        levelColor="amber"
        tip="Écoute deux fois avant de répondre."
      />

      <ExerciseSection>
        <InstructionBlock
          title="✍️ Exercice - Compléter le tableau"
          activityType="click"
          description="Complète le tableau en choisissant à chaque ligne parmi les trois
        réponses proposées"
        ></InstructionBlock>
        <Exercice />
      </ExerciseSection>

      {/* ================= EXERCICE 2 ================= */}
      <ExerciseSection>
        <Exercice2 />
      </ExerciseSection>
    </ActivityLayout>
  );
}
