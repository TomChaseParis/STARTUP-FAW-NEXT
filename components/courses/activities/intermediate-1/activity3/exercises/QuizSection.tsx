"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import QuizEngine from "@/components/courses/engines/QuizEngine";

import { pronounQuizQuestions } from "../data/quizData"; 

export default function QuizSection() {
  return (
    <ExerciseSection width="full">
      <InstructionBlock
      stampLabel="EXERCICE 2"
        title="Vignettes express"
        activityType="click-or-speak"
        description={
          <div className="space-y-5 text-black">
            <p>
              Complète chacune des légendes en choisissant le bon pronom
              complément.
            </p>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                💡 Astuce
              </p>

              <p className="text-base">
  {
    "Observe bien l'image et réfléchis à la fonction du groupe nominal (COD, COI ou pronom tonique) avant de répondre."
  }
</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                ✍️ Caractères français
              </p>

              <p className="text-2xl tracking-wider">
  é &nbsp; è &nbsp; ê &nbsp; à &nbsp; â &nbsp; ç &nbsp; î
  &nbsp; ï &nbsp; ô &nbsp; ù &nbsp; {"'"}
</p>
            </div>
          </div>
        }
      />

      <QuizEngine questions={pronounQuizQuestions} />
    </ExerciseSection>
  );
}