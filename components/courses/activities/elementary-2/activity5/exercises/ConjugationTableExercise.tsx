"use client";

import ConjugationTableEngine from "@/components/courses/engines/ConjugationTableEngine";
import { conjugationTableData } from "../data/conjugationTableData";

export default function ConjugationTableExercise() {
  return (
    <ConjugationTableEngine
      data={conjugationTableData}
    />
  );
}