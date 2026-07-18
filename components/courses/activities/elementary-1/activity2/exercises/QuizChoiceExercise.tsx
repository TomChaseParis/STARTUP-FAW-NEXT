"use client";

import QuizEngine from "@/components/courses/engines/QuizEngine";
 import { quizChoiceQuestions } from "../data/quizChoiceData";


export default function QuizChoiceExercise() {
  return <QuizEngine questions={quizChoiceQuestions} />;
}