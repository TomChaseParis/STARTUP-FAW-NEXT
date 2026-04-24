"use client";

import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { articlesData } from "./articlesData";

export default function Exercice() {
  return (
    <FillGapsEngine
      data={articlesData}
      teacherImage="/images/courses/teacher/irenetalkquestion.png"
    />
  );
}