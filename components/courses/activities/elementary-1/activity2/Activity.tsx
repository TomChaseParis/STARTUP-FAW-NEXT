"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import QuizEngine from "@/components/courses/blocks/QuizEngine";
import { quizData } from "./quizData";
import Exercice2 from "./Exercice";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";

export default function Activity() {
  return (
    <ActivityLayout>
      <LessonBlock
        badge="Compréhension orale"
        title="Les loisirs des Français"
        description="Regarde les images et choisis la bonne réponse."
        videoSrc="/videos/courses/elementary-1/activities/activity2/presentation.mp4"
        poster="/images/courses/elementary/activities/activity2/poster.png"
        info={{
          objectifs: ["Parler des loisirs"],
          competences: ["Compréhension orale", "Vocabulaire"],
          prerequis: ["Présent — 3e personne du pluriel"],
          duree: "25 minutes",
        }}
      />

      {/* ================= EXERCICE 1 ================= */}
      <ExerciseSection>
        <InstructionBlock
          title="✍️ Exercice"
          activityType="type"
          description={
            <div className="space-y-5 text-black">

              <p>
                Complète la phrase avec la bonne forme du verbe.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm font-medium text-slate-600 mb-2">
                  💡 Exemple :
                </p>
                <p className="text-base">
                  Les jeunes <span className="font-semibold">passent</span> beaucoup de temps sur internet.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm font-medium text-slate-600 mb-2">
                  🎯 Astuce :
                </p>
                <p className="text-base">
                  Fais attention au sujet pour choisir la bonne terminaison du verbe.
                </p>
              </div>

            </div>
          }
        />

        <Exercice2 />
      </ExerciseSection>

      {/* ================= EXERCICE 2 ================= */}
      <ExerciseSection>
        <InstructionBlock
          title="Trouve la bonne réponse à chaque question"
          activityType="click-or-speak"
          description={
            <div className="space-y-5 text-black">

              <p>
                Regarde la vidéo puis choisis la bonne question à poser à chaque personnage.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm font-medium text-slate-600 mb-2">
                  💡 Astuce :
                </p>
                <p className="text-base">
                  Écoute bien les informations pour comprendre la situation avant de répondre.
                </p>
              </div>

            </div>
          }
        />

        <QuizEngine questions={quizData} />
      </ExerciseSection>
    </ActivityLayout>
  );
}