import QuizEngine from "@/components/courses/engines/QuizEngine";
import { monsterQuizQuestions } from "../data/monsterQuizData";

export default function MonsterQuizExercise() {
  return (
    <QuizEngine
      questions={monsterQuizQuestions}
    />
  );
}