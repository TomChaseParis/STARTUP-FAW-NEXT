"use client";

import QuizEngine from "@/components/Quiz/QuizEngine";
import { quizData } from "./quizData";

export default function Exercice() {
  return <QuizEngine data={quizData} levelColor="amber" />;
}
