"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import Exercice from "./Exercice";

import { activity5 } from "@/data/courses/activities/beginner/activity5/activity5";

export default function Activity() {
  return (
    <ActivityLayout activity={activity5}>
      {/* ================= COURS ================= */}
      <LessonBlock
level="beginner"        title="Le présent des verbes du 1er groupe"
        description="Écoute la chanson puis réponds aux questions."
        videoSrc="/videos/etiennesq1_V1.mp4"
        poster="/images/courses/beginner/activities/activity5/presentation.png"
        info={{
          objectifs: ["Comprendre un texte chanté"],
          competences: ["Compréhension orale"],
          prerequis: ["Lexique des vacances"],
          duree: "25 minutes",
        }}
      />

      {/* ================= EXERCICE ================= */}
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

                <p>
                  Concentre-toi sur les habitudes décrites dans la chanson.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-2 text-sm font-medium text-slate-600">
                  🎯 Conseil :
                </p>

                <p>
                  Tu peux écouter plusieurs fois pour mieux comprendre.
                </p>
              </div>
            </div>
          }
        />

        <Exercice />
      </ExerciseSection>
    </ActivityLayout>
  );
}