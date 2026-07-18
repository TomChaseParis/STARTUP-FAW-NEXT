"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import WatchAndAnswerExercise from "./WatchAndAnswerExercise";

export default function WatchAndAnswerSection() {
  return (
    <ExerciseSection>
      <InstructionBlock
        level="elementary1"
        stampLabel="EXERCICE 2"
        title="Trouve la bonne question à poser"
        description="Regarde la vidéo puis choisis la bonne question à poser à chaque personnage dans le QCM ci-dessous."
        activityType="click-or-speak"
      />

      <WatchAndAnswerExercise />
    </ExerciseSection>
  );
}
