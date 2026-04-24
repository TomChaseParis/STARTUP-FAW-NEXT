"use client";

import QuizEngine from "@/components/courses/blocks/QuizEngine";
import { useMemo } from "react";
import { quizData2 } from "./quizData2";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

export default function Exercice2() {
  const questions = useMemo(() => quizData2 ?? [], []);

  return (
    <>
      <InstructionBlock
        title="Trouve la bonne question à poser"
        description="Regarde la vidéo puis choisis la bonne question à poser à chaque personnage dans le QCM ci-dessous."
        activityType="click-or-speak"
      ></InstructionBlock>
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
