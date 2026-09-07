"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";

import { brunoGalopinData } from "../../data/brunoGalopinData";

import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type FillGapsBrunoExerciceProps = {
  onComplete?: (
    result: ExerciseSessionResult,
  ) => void;
};

export default function FillGapsBrunoExercice({
  onComplete,
}: FillGapsBrunoExerciceProps) {
  return (
    <section className="mt-8">
      <FillGapsEngine
        data={brunoGalopinData}
        onComplete={(result: ExerciseSessionResult) => {
          onComplete?.(result);
        }}
      />
    </section>
  );
}