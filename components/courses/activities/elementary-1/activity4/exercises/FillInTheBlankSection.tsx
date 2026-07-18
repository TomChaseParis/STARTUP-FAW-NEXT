"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import { prohibitionExpressionsData } from "../data/prohibitionExpressionsData";
import FillInTheBlankExercise from "./FillInTheBlankExercise";

export default function FillInTheBlankSection() {
  return (
    <ExerciseSection>
      <InstructionBlock
        level="elementary1"
        stampLabel="EXERCICE 1"
        title={prohibitionExpressionsData.title}
        activityType="type"
        description={
          <div className="space-y-4 text-black">
            <p>
              Observe chaque image et complète chaque phrase avec le bon mot.
            </p>

            <div>
              <p className="mb-4 mt-9 text-md text-black">
                Les mots à utiliser sont les suivants :
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  "admis",
                  "défense",
                  "obligatoire",
                  "interdiction",
                  "interdit",
                  "interdite",
                  "interdits",
                  "interdites",
                ].map((word) => (
                  <span
                    key={word}
                    className="
                      rounded-xl border
                      border-amber-200
                      bg-amber-50
                      px-4 py-2
                      text-base
                      font-semibold
                      text-amber-800
                      shadow-sm
                      transition-all duration-200
                      hover:bg-amber-100
                      hover:shadow-md
                    "
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <FillInTheBlankExercise />
    </ExerciseSection>
  );
}