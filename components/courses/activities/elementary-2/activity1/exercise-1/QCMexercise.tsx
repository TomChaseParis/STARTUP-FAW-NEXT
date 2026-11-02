
"use client";

import { useMemo } from "react";

import QuizEngine from "@/components/courses/engines/QuizEngine";
import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

import { qcmData } from "./data/qcm.data";

type QCMExerciceProps = {
  onComplete: (result: ExerciseSessionResult) => void;
};

export default function QCMExercice({
  onComplete,
}: QCMExerciceProps) {
  const questions = useMemo(() => qcmData ?? [], []);

  if (questions.length === 0) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-center">
        <p className="text-sm font-medium text-amber-800">
          Aucune question n&apos;a été trouvée pour cet exercice.
        </p>
      </div>
    );
  }

  return (
    <section
      id="qcm-exercice"
      className="w-full min-w-0"
    >
      <QuizEngine
        teacherLevel="elementary-2"
        questions={questions}
        speechEngine="openai"
        teacherFeedbackImages={{
          correct:
            "/images/bulles-QCM/elementary-2/correct.png",
          wrong:
          "/images/bulles-QCM/elementary-2/wrong.png",
        }}
        onComplete={onComplete}
      />
    </section>
  );
}
