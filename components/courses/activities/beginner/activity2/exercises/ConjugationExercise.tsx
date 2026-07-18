"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";
import { conjugationExerciseData } from "../data/conjugationExerciseData";

export default function ConjugationExercise() {
  return (
    <section className="mt-8">
      <FillGapsEngine data={conjugationExerciseData} />
    </section>
  );
}
