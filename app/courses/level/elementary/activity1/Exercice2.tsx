"use client";

import QuizEngine from "@/components/Quiz/QuizEngine";
import { quizData2 } from "./quizData2";

export default function Exercice2() {
  return <QuizEngine data={quizData2} levelColor="amber" />;
}
