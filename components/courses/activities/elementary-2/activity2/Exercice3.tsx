"use client";

import OrthographeInlineEngine from "@/components/courses/blocks/OrthographeInlineEngine";
import { episode3Data } from "./episode3Data";

export default function Exercice3() {
  return (
    <OrthographeInlineEngine
      text={episode3Data}
      title="✍️ EPISODE 3 — Le déménagement"
      instruction="Les mots en rouge sont faux. Corrige-les."
      teacherImage="/images/courses/teacher/irenetalkquestion.png"
    />
  );
}