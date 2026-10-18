"use client";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";
import SongFillGapsEngine from "@/components/courses/engines/ProgressEngine/SongFillGapsEngine";

import { episodeVacancesData } from "../episodeVacancesData";

type FillGapsExerciseProps = {
  onComplete: (result: ExerciseSessionResult) => void;
};

export default function FillGapsExercise({
  onComplete,
}: FillGapsExerciseProps) {
  return (
    <SongFillGapsEngine
      data={episodeVacancesData}
      teacherImage="/images/courses/teacher/irenetalkquestion.png"
      onComplete={onComplete}
    />
  );
}