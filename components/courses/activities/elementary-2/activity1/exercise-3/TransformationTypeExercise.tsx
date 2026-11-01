
"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";
import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

import { transformationTypeData } from "./data/TransformationTypeData";

type TypeExerciseProps = {
  onComplete: (result: ExerciseSessionResult) => void;
};

export default function TransformationTypeExercise({
  onComplete,
}: TypeExerciseProps) {
  return (
    <section className="mt-8">
      <FillGapsEngine
        data={transformationTypeData}
        onComplete={onComplete}
      />
    </section>
  );
}
