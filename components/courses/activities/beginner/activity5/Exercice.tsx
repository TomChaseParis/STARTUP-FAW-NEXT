"use client";

import QuizEngine from "@/components/courses/blocks/QuizEngine";
import { quizData } from "./quizData";

export default function Exercice() {
  const questions = quizData;

  return (
    <div className="mt-8">
      <QuizEngine questions={questions} />
    </div>
  );
}