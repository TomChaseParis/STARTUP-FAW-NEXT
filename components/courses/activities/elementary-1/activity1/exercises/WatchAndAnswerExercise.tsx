"use client";

import { useMemo } from "react";

import QuizEngine from "@/components/courses/engines/QuizEngine";

import { watchAndAnswerQuestions } from "../data/watchAndAnswerData";

export default function WatchAndAnswerExercise() {
  const questions = useMemo(() => watchAndAnswerQuestions ?? [], []);

  return (
    <>
      {/* ===== VIDEO ===== */}

      <div className="mt-6">
        <div className="overflow-hidden rounded-xl border border-neutral-300 bg-white shadow-md">
          <div className="border-b px-4 py-2 text-sm font-semibold text-neutral-700">
            🎬 Regarde la vidéo
          </div>

          <video src="/videos/videoexo2.mp4" controls className="w-full" />
        </div>
      </div>

      <QuizEngine questions={questions} />
    </>
  );
}
