"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";

import { thirdPersonBrunoData } from "../../data/thirdPersonBrunoData";

import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type ThirdPersonBrunoExerciseProps = {
  onComplete?: (
    result: ExerciseSessionResult,
  ) => void;
};

export default function ThirdPersonBrunoExercise({
  onComplete,
}: ThirdPersonBrunoExerciseProps) {
  return (
    <section className="mt-8">
      <FillGapsEngine
        data={thirdPersonBrunoData}
        onComplete={(
          result: ExerciseSessionResult,
        ) => {
          onComplete?.(result);
        }}
      />
    </section>
  );
}