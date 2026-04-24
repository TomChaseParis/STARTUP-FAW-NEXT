"use client";

import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { articlesExercice2Data } from "./articlesExercice2Data";

export default function Exercice2() {
  return (
    <FillGapsEngine
      data={articlesExercice2Data}
      teacherImage="/images/courses/teacher/irenetalkquestion.png"
    />
  );
}