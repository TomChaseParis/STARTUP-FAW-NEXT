
"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";
import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

import { frenchLeisureData } from "../../data/frenchLeisureData";

type FillInTheBlankExerciseProps = {
  onComplete?: (result: ExerciseSessionResult) => void;
};

const KEYBOARD_CHARACTERS = [
  "à",
  "â",
  "é",
  "è",
  "ê",
  "î",
  "ï",
  "ô",
  "ù",
  "û",
];

export default function FillInTheBlankExercise({
  onComplete,
}: FillInTheBlankExerciseProps) {
  return (
    <section className="mt-8">
      <FillGapsEngine
        level="elementary-1"

        data={{
          ...frenchLeisureData,
          keyboardCharacters: KEYBOARD_CHARACTERS,
        }}
        keyboardColor="rgb(87, 204, 153)"
        onComplete={onComplete}
      />
    </section>
  );
}
