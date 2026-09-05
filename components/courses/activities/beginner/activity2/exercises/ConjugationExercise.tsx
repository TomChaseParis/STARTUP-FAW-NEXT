"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";

import { conjugationExerciseData } from "../data/conjugationExerciseData";

import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type ConjugationExerciseProps = {
  onComplete?: (
    result: ExerciseSessionResult,
  ) => void;
};

export default function ConjugationExercise({
  onComplete,
}: ConjugationExerciseProps) {
  return (
    <section className="mt-8">
      <FillGapsEngine
        data={conjugationExerciseData}
        onComplete={(result: ExerciseSessionResult) => {
          onComplete?.(result);
        }}
      />
    </section>
  );
}