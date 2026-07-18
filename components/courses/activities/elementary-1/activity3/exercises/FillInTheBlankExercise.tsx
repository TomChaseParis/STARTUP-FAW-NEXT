"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";

import { fourVerbsData } from "../data/fourVerbsData";

export default function FillInTheBlankExercise() {
  return (
    <FillGapsEngine
      data={fourVerbsData}
      teacherImage="/images/courses/teacher/irenetalkquestion.png"
    />
  );
}