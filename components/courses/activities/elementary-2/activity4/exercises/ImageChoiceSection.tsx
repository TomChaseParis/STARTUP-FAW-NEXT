"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ImageChoiceExercise from "./ImageChoiceExercise";

export default function ImageChoiceSection() {
  return (
    <ExerciseSection>
      <InstructionBlock
        stampLabel="EXERCICE 3"
        title="ASSOCIE LE BON DIALOGUE"
        activityType="listen-click"
        description={
          <div className=" text-black">
            <div
              className="
                rounded-2xl
                border border-amber-200
                bg-gradient-to-br from-amber-50 via-white to-amber-50
                p-5
                shadow-sm
              "
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className="
                    to-yellow-400 flex h-12 w-12 items-center
                    justify-center
                    rounded-2xl bg-gradient-to-br from-amber-300
                    shadow-[0_10px_20px_rgba(245,158,11,0.25)]
                  "
                >
                  🖼️
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                    Consigne
                  </p>

                  <p className="text-sm text-slate-500">
  {"Observe l'image puis choisis le dialogue correspondant."}
</p>
                </div>
              </div>

              <p className="text-base leading-relaxed text-slate-800">
                Pour chaque image, clique sur le dialogue qui décrit
                correctement la situation. Une fois ta réponse validée, tu
                entendras le bon dialogue.
              </p>
            </div>
          </div>
        }
      />

      <ImageChoiceExercise />
    </ExerciseSection>
  );
}
