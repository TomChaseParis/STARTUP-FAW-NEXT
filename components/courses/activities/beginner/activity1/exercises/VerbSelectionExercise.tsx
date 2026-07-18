"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";
import AccentHelper from "@/components/courses/blocks/AccentHelper";
import { verbSelectionData } from "../data/verbSelectionData";

export default function VerbSelectionExercise() {
  return (
    <>
      <AccentHelper />

      <div className="mt-8">
        <FillGapsEngine
          data={verbSelectionData}
          teacherImage="/images/courses/teacher/marietalkquestion.png"
        />
      </div>
    </>
  );
}
