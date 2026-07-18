"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import { exercice1Data } from "./exercice1.data";

export default function Exercice1() {
  return (
    <section className="mt-12">
      <InstructionBlock
        title={exercice1Data.title}
        activityType="type"
        description={
          <div className="space-y-4 text-black">
            <p>
              Complète avec la forme <strong>« je »</strong> et{" "}
              <strong>« vous »</strong> des verbes suivants.
            </p>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">💡 Exemple :</p>
              <p className="mt-1 text-sm">(je) parle / (vous) parlez</p>
            </div>
          </div>
        }
      />

      <div className="mt-8">
        <FillGapsEngine
          data={exercice1Data}
          teacherImage="/images/courses/teacher/irenetalkquestion.png"
        />
      </div>
    </section>
  );
}
