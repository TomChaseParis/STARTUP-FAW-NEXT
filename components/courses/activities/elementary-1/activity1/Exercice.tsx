"use client";

import QuizEngine from "@/components/courses/blocks/QuizEngine";
import { useMemo } from "react";
import { quizData } from "./quizData";

export default function Exercice() {
  const questions = useMemo(() => quizData ?? [], []);

  return (
    <>
  
    <QuizEngine questions={questions} />;
    </>
  )
}
