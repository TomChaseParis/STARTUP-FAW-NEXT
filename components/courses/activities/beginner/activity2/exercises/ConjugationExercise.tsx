"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";
import { conjugationExerciseData } from "../data/conjugationExerciseData";

type ConjugationExerciseProps = {
  onComplete?: (score: number) => void;
};

export default function ConjugationExercise({
  onComplete,
}: ConjugationExerciseProps) {
  return (
    <section className="mt-8">
      <FillGapsEngine
        data={conjugationExerciseData}
        onComplete={onComplete}
      />
    </section>
  );
}