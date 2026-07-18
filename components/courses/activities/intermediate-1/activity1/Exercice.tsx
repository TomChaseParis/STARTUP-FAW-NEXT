"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import { episodeVacancesData } from "./episodeVacancesData";

export default function Exercice() {
  return (
    <section className="mt-12">
      <InstructionBlock
        title={episodeVacancesData.title}
        activityType="type"
        description={
          <div className="space-y-5 text-black">
            <p>
              Complète les paroles de la chanson avec le verbe à la bonne forme.
            </p>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                💡 Astuce :
              </p>
              <p className="text-base">
                Fais attention au temps utilisé dans la chanson (souvent à
                l’imparfait).
              </p>
            </div>
          </div>
        }
      />

      <div className="mt-8">
        <FillGapsEngine
          data={episodeVacancesData}
          teacherImage="/images/courses/teacher/irenetalkquestion.png"
        />
      </div>
    </section>
  );
}
