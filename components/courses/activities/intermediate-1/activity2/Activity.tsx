"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import QuizEngine from "@/components/courses/engines/QuizEngine";
import { quizData } from "./quizData";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import { intermediate1Activity2 } from "@/data/courses/activities/intermediate-1/activity2/activity2";
export default function Activity() {
  const questions = quizData;

  return (
    <ActivityLayout activity={intermediate1Activity2}>
      <LessonBlock
        level="intermediate-1"
        title="L'imparfait d'habitude"
        description="Écoute la chanson puis réponds aux questions."
        videoSrc="/videos/etiennesq1_V1.mp4"
        poster="/images/courses/teacher/etienne-wide-1.png"
        info={{
          objectifs: ["Comprendre un texte chanté"],
          competences: ["Compréhension orale"],
          prerequis: ["Lexique des vacances"],
          duree: "25 minutes",
        }}
      />

      <ExerciseSection>
        <InstructionBlock
          title="✍️ Exercice"
          activityType="click-or-speak"
          description={
            <div className="space-y-5 text-black">
              <p>
                Écoute la chanson puis choisis la bonne réponse pour chaque
                question.
              </p>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="mb-2 text-sm font-medium text-slate-600">
                  💡 Astuce :
                </p>
                <p className="text-base">
                  Concentre-toi sur les habitudes décrites dans la chanson
                  (actions répétées dans le passé).
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-2 text-sm font-medium text-slate-600">
                  🎯 Conseil :
                </p>
                <p className="text-base">
                  Tu peux écouter plusieurs fois pour mieux comprendre les
                  détails.
                </p>
              </div>
            </div>
          }
        />

        <QuizEngine questions={questions} />
      </ExerciseSection>
    </ActivityLayout>
  );
}
