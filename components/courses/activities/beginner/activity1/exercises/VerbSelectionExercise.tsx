"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";
import AccentHelper from "@/components/courses/blocks/AccentHelper";
import { verbSelectionData } from "../data/verbSelectionData";

import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type VerbSelectionExerciseProps = {
  onComplete?: (
    result: ExerciseSessionResult,
  ) => void;
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