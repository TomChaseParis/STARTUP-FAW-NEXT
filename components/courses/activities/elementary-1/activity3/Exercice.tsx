"use client";

import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { grammarVerbsData } from "./grammarVerbsData";

export default function Exercice() {
  return (
    <FillGapsEngine
      data={grammarVerbsData}
      teacherImage="/images/courses/teacher/irenetalkquestion.png"
    />
  );
}