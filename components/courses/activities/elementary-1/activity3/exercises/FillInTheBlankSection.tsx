"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import { fourVerbsData } from "../data/fourVerbsData";
import FillInTheBlankExercise from "./FillInTheBlankExercise";

export default function FillInTheBlankSection() {
  return (
    <ExerciseSection>
      <InstructionBlock
        level="elementary1"
        stampLabel="EXERCICE 1"
        title={fourVerbsData.title || "🧠 Grammaire — Complète les phrases"}
        activityType="type"
        description={
          <div className="space-y-6 text-black">
            <p className="text-base">
              Complète les phrases avec un des verbes au présent.
            </p>

            <div>
              <p className="mb-3 text-sm font-medium text-slate-600">
                Verbes à utiliser :
              </p>

              <div className="flex flex-wrap gap-3">
                {fourVerbsData.verbs.map((verb) => (
                  <span
                    key={verb}
                    className="
                      rounded-xl border
                      border-amber-200 bg-gradient-to-b
                      from-amber-50
                      to-amber-100 px-4 py-2
                      text-base font-semibold
                      text-amber-800
                      shadow-sm
                      transition-all duration-200
                      hover:scale-[1.02] hover:shadow-md
                    "
                  >
                    {verb}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                💡 Astuce :
              </p>

              <p className="text-base">
                Observe le sujet (je, tu, il, nous…) pour choisir la bonne
                conjugaison.
              </p>
            </div>
          </div>
        }
      />

      <FillInTheBlankExercise />
    </ExerciseSection>
  );
}