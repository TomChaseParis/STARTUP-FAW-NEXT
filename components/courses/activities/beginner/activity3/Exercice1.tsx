"use client";

import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import { exercice1Data } from "./exercice1.data";

export default function Exercice1() {
  return (
    <section className="mt-12">

     
      <div className="mt-8">
        <FillGapsEngine
          data={exercice1Data}
          teacherImage="/images/courses/teacher/irenetalkquestion.png"
        />
      </div>

    </section>
  );
}