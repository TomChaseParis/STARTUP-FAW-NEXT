"use client";

import PronunciationEngine from "@/components/courses/engines/PronunciationEngine";
import { episode4Data } from "./episode4Data";

export default function Exercice4() {
  return (
    <PronunciationEngine
      title={episode4Data.title}
      instruction={episode4Data.instruction}
      text={episode4Data.text}
      highlight={episode4Data.highlight}
    />
  );
}
