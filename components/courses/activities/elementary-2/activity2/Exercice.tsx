"use client";

import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { episode1Data } from "./episode1Data";

export default function Exercice() {
  return <FillGapsEngine data={episode1Data} teacherImage="/images/courses/teacher/irenetalkquestion.png" />;
}