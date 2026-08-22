"use client";

import { useState } from "react";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import QuizGogoFlow from "../questions-francais/exercises/QuizGogoFlow";

import { elementary1Activity1 } from "@/data/courses/activities/elementary-1/activity1/activity1";

export default function Activity() {
  const [videoCompleted, setVideoCompleted] =
    useState(false);

  return (
    <ActivityLayout
      activity={elementary1Activity1}
    >
      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <LessonBlock
        badge="Niveau élémentaire 1"
        title="QUIZZ A GOGO"
        description="Découvre les principales questions et réponses utilisées dans une conversation simple, puis entraîne-toi grâce à plusieurs exercices interactifs."
        videoSrc="/videos/courses/elementary-1/activities/activity1/JEANQUIZAGOGO.mp4"
        poster="/images/courses/elementary/activities/activity1/jeanposterquizgogo.png"
        onVideoEnded={() => {
          setVideoCompleted(true);
        }}
        info={{
          objectifs: [
            "Pratiquer les questions et les tournures interrogatives",
            "Identifier les réponses adaptées.",
            "Réutiliser ces questions dans des situations simples.",
          ],

          competences: [
            "Compréhension écrite",
            "Prononciation",
          ],

          prerequis: [
            "Questions et mots interrogatifs",
          ],

          duree: "20 minutes",
        }}
      />

      {/* =====================================================
          AVANT LA FIN DE LA VIDÉO
      ===================================================== */}

      {!videoCompleted && (
        <section className="container mt-16">
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
            <div className="text-4xl">
              🎬
            </div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              Regarde d&apos;abord la vidéo
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-600">
              Les deux quiz seront disponibles
              dès que tu auras terminé la vidéo
              de présentation.
            </p>
          </div>
        </section>
      )}

      {/* =====================================================
          QUIZ À GOGO
      ===================================================== */}

      {videoCompleted && (
        <QuizGogoFlow />
      )}
    </ActivityLayout>
  );
}