"use client";

import QuizEngine from "@/components/courses/engines/QuizEngine";
import { useMemo } from "react";
import { quizData } from "../data/listeningQuizData";

export default function ListeningQuizExercise() {
  const questions = useMemo(() => quizData ?? [], []);

  return (
    <>
      <QuizEngine questions={questions} />;
    </>
  );
}
