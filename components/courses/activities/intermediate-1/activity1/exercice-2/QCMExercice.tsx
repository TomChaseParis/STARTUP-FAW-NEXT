
"use client";

import { useMemo } from "react";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";
import QuizEngine from "@/components/courses/engines/QuizEngine";

import { quizData } from "../quizData";

type QCMExerciseProps = {
  onComplete: (result: ExerciseSessionResult) => void;
};

export default function QCMExercise({
  onComplete,
}: QCMExerciseProps) {
  const questions = useMemo(() => quizData ?? [], []);

  return (
    <QuizEngine
      questions={questions}
      onComplete={onComplete}
      speechEngine="openai"
      teacherFeedbackImages={{
        correct:
          "/images/bulles-QCM/intermediate-1/etienne-blue/correct.png",
        wrong:
          "/images/bulles-QCM/intermediate-1/etienne-blue/wrong.png",
      }}
    />
  );
}
