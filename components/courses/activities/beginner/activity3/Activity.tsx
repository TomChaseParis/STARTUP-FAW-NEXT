"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import AudioBlock from "@/components/courses/blocks/AudioBlock";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import Exercice1 from "./Exercice1";
import ConceptBlock from "@/components/courses/layout/ConceptBlock";
import Exercice2 from "./Exercice2";

import { activity3 } from "@/data/courses/activities/beginner/activity3/activity3";

export default function Activity() {
  return (
    <ActivityLayout activity={activity3}>
      {/* 🎓 LEÇON */}
      <LessonBlock
level="beginner"
title="Les verbes du 1er groupe au présent"
        description="Apprends à conjuguer les verbes en -ER avec « je » et « vous »."
        videoSrc="/videos/marieactivity3.mp4"
        poster="/images/courses/teacher/mariegood.png"
        info={{
          objectifs: ["Conjuguer au présent", "Utiliser je et vous"],
          competences: ["Grammaire", "Expression écrite"],
          prerequis: ["Verbes du 1er groupe"],
          duree: "15 minutes",
        }}
      />

      {/* 🔊 AUDIO */}
      <AudioBlock
        audioSrc="/audios/courses/beginner/audioactivity-3.mp3"
        levelColor="amber"
        tip="Écoute avant de répondre."
      />

      <ConceptBlock />

      {/* 📝 EXERCICE 1 */}
      <ExerciseSection>
        <Exercice1 />
      </ExerciseSection>

      {/* 📝 EXERCICE 2 */}
      <ExerciseSection>
        <Exercice2 />
      </ExerciseSection>
    </ActivityLayout>
  );
}