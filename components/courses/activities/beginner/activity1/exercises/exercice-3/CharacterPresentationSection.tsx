"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import CharacterPresentationExercise from "./CharacterPresentationExercise";

export default function CharacterPresentationSection() {
  return (
    <ExerciseSection width="wide">
      <InstructionBlock
        level="beginner"
        stampLabel="EXERCICE 3"
        title="Présente les personnages"
        subtitle="Parle à voix haute en utilisant le bon pronom"
        activityType="click-speak"
        description={
          <div className="space-y-5 text-black">
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                ⚠️ Consigne
              </p>

              <p>
                Présente chaque personnage en conjuguant les verbes à la bonne
                forme.
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                👤 Pronoms
              </p>

              <p>
                JE • TU • IL • ELLE • NOUS • VOUS • ILS
              </p>
            </div>

            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                ✅ Exemple
              </p>

              <ul className="list-disc space-y-1 pl-5">
                <li>Ils sont mariés.</li>
                <li>Ils font une croisière.</li>
              </ul>
            </div>
          </div>
        }
      />

      <CharacterPresentationExercise />
    </ExerciseSection>
  );
}