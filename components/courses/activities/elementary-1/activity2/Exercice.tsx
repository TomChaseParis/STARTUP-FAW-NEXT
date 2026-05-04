"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { loisirsData } from "./episodeXData";

export default function Exercice() {
  return (
    <section className="mt-12">
      <div className="mt-8">
        <FillGapsEngine data={loisirsData}   teacherImage="/images/courses/elementary/activities/activity2/bubble.png" />
      </div>
    </section>
  );
}
