"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";
import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

import { frenchLeisureData } from "../data/frenchLeisureData";

type FillInTheBlankExerciseProps = {
  onComplete?: (
    result: ExerciseSessionResult,
  ) => void;
};

export default function FillInTheBlankExercise({
  onComplete,
}: FillInTheBlankExerciseProps) {
  return (
    <section className="mt-8">
      <FillGapsEngine
        data={frenchLeisureData}
        onComplete={(result: ExerciseSessionResult) => {
          onComplete?.(result);
        }}
      />
    </section>
  );
}