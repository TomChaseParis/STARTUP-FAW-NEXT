"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";
import AccentHelper from "@/components/courses/blocks/AccentHelper";
import { verbSelectionData } from "../data/verbSelectionData";

type VerbSelectionExerciseProps = {
  onComplete?: (score: number) => void;
};

export default function VerbSelectionExercise({
  onComplete,
}: VerbSelectionExerciseProps) {
  return (
    <>
      <AccentHelper />

      <div className="mt-8">
        <FillGapsEngine
          data={verbSelectionData}
          teacherImage="/images/courses/teacher/marietalkquestion.png"
          onComplete={onComplete}
        />
      </div>
    </>
  );
}
