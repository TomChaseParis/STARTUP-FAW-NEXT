"use client";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import { useState } from "react";

import ListeningDiscoveryExercise from "./ListeningDiscoveryExercise";

export default function ListeningDiscoverySection() {
  const [started, setStarted] = useState(false);
  return (
    <ExerciseContainer exerciseId="exercise-1"
    >
      {({ onComplete }) => (
        <ExerciseSection>
       <InstructionBlock
  level="beginner"
  stampLabel="EXERCICE 1"
  title="Découverte"
  subtitle="Écoute le dialogue puis réponds aux questions"
  activityType="listen"
  description={
    <p>
      Écoute une première fois ce dialogue entre un homme
      et une conseillère matrimoniale puis réponds aux
      questions.
    </p>
  }
  onStart={() => setStarted(true)}
  started={started}
/>
{started && (
  <ListeningDiscoveryExercise
    onComplete={onComplete}
  />
)}
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}