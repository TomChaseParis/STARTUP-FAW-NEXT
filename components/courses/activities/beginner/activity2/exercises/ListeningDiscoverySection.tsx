"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import ListeningDiscoveryExercise from "./ListeningDiscoveryExercise";

export default function ListeningDiscoverySection() {
  return (
    <ExerciseSection>
      <InstructionBlock
        level="beginner"
        stampLabel="EXERCICE 1"
        title="Découverte"
        subtitle="Écoute le dialogue puis réponds aux questions"
        activityType="listen"
        description={
          <div className="space-y-5 text-black">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                👂 Consigne
              </p>

              <p>
                Écoute une première fois ce dialogue entre un homme et une
                conseillère matrimoniale puis réponds aux questions.
              </p>
            </div>
          </div>
        }
      />

      <ListeningDiscoveryExercise />
    </ExerciseSection>
  );
}