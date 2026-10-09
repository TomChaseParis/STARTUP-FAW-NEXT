"use client";

import QuizEngine from "@/components/courses/engines/QuizEngine";

import { quizChoiceQuestions } from "../data/quizChoiceData";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type QuizChoiceExerciseProps = {
  onComplete?: (
    result: ExerciseSessionResult,
  ) => void;
};

export default function QuizChoiceExercise({
  onComplete,
}: QuizChoiceExerciseProps) {
  return (
    <section className="w-full">
      <QuizEngine
        questions={quizChoiceQuestions}
        speechEngine="openai"
        teacherFeedbackImages={{
          correct:
            "/images/bulles-QCM/elementary-1/jean-vert/correct.png",
          wrong:
          "/images/bulles-QCM/elementary-1/jean-vert/wrong.png",
        }}
        onComplete={onComplete}
      />
    </section>
  );
}