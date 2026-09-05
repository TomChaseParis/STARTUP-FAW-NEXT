"use client";

import QuizEngine from "@/components/courses/engines/QuizEngine";

import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

import { listeningDiscoveryQuizData } from "../data/listeningDiscoveryQuizData";

type ListeningDiscoveryExerciseProps = {
  onComplete?: (result: ExerciseSessionResult) => void;
};

export default function ListeningDiscoveryExercise({
  onComplete,
}: ListeningDiscoveryExerciseProps) {
  return (
    <QuizEngine
      questions={listeningDiscoveryQuizData}
      onComplete={onComplete}
    />
  );
}