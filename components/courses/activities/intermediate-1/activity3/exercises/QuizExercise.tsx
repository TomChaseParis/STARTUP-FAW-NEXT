import QuizEngine from "@/components/courses/engines/QuizEngine";
  import { pronounQuizQuestions } from "../data/quizData";

export default function QuizExercise() {
  return <QuizEngine teacherLevel="beginner" questions={pronounQuizQuestions} />;
}