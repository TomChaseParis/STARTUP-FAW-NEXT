"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import AudioActivityCard from "@/components/courses/Activity/AudioActivityCard";
import Exercice from "./Exercice";
import Exercice2 from "./Exercice2";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";

export default function Activity() {
  return (
    <ActivityLayout>
      <LessonBlock
        badge="Niveau Élémentaire 2"
        title="Activité 1 — La famille déménage"
        description="Découvrez la journée quotidienne de Clara. Travail sur les heures, les verbes pronominaux et les transformations."
        videoSrc="/videos/irene-activity-2.mp4"
        poster="/images/courses/teacher/irenegood.png"
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
       <AudioActivityCard
        title="La famille déménage — Écoute l'audio"
        audioSrc="/audios/courses/elementary/audioloisirs.mp3"
      />
      <ExerciseSection>
     

      <Exercice />


      </ExerciseSection>

      <ExerciseSection>
      <Exercice2 />

        
      </ExerciseSection>

 
    </ActivityLayout>
  );
}
