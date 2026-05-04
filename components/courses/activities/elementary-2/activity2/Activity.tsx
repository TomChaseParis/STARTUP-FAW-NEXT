"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import AudioActivityCard from "@/components/courses/Activity/AudioActivityCard";
import Exercice from "./Exercice";
import Exercice2 from "./Exercice2";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import Exercice3 from "./Exercice3";
import ExerciceEpisode2 from "./Exercice2.2";
import Exercice4 from "./Exercice4";
import AudioBlock from "@/components/courses/blocks/AudioBlock";

export default function Activity() {
  return (
    <ActivityLayout>
      <LessonBlock
        badge="Niveau Élémentaire 2"
        title="Activité 1 — La famille déménage"
        description="Découvrez la journée quotidienne de Clara. Travail sur les heures, les verbes pronominaux et les transformations."
        videoSrc="/videos/courses/elementary-2/activity2/presentation.mp4"
        poster="/images/courses/elementary2/activity2/posterirene.png"
        info={{
          objectifs: ["Parler d’un déménagement"],
          competences: [
            "Compréhension orale",
            "Transformation grammaticale",
            "Phonétique",
          ],
          prerequis: [
            "Vocabulaire du logement",
            "Présent, passé composé, futur simple",
          ],
          duree: "35 minutes",
        }}
      />

      <AudioBlock
        title="Écoute la conversation"
        audioSrc="/audios/courses/elementary/audioloisirs.mp3"
        levelColor="amber"
        tip="Écoute deux fois avant de répondre."
      />

      <ExerciseSection>
        <Exercice />
      </ExerciseSection>

      <ExerciseSection>
        <Exercice2 />
      </ExerciseSection>

      <ExerciseSection>
        <ExerciceEpisode2 />
      </ExerciseSection>

      <ExerciseSection>
        <Exercice3 />
      </ExerciseSection>

      <ExerciseSection>
        <Exercice4 />
      </ExerciseSection>
    </ActivityLayout>
  );
}
