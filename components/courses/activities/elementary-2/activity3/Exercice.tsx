"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import { articlesData } from "./articlesData";

export default function Exercice() {
  return (
    <section className="mt-12">
      <InstructionBlock
        title={articlesData.title}
        activityType="type"
        description={
          <div className="space-y-5 text-black">
            <p>Complète les phrases avec le bon article.</p>

            <div>
              <p className="mb-3 text-sm font-medium text-slate-600">
                Articles à utiliser :
              </p>

              <div className="flex flex-wrap gap-3">
                {["le", "la", "l’", "les", "un", "une", "des", "de"].map(
                  (article) => (
                    <span
                      key={article}
                      className="
                      rounded-xl border
                      border-amber-200
                      bg-amber-50
                      px-4 py-2
                      text-base
                      font-semibold text-amber-800
                      shadow-sm
                      transition-all duration-200
                      hover:bg-amber-100 hover:shadow-md
                    "
                    >
                      {article}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                💡 Astuce :
              </p>
              <p className="text-base">
                Fais attention au genre (masculin / féminin), au nombre
                (singulier / pluriel) et aux voyelles (l’).
              </p>
            </div>
          </div>
        }
      />

      <div className="mt-8">
        <FillGapsEngine
          data={articlesData}
          teacherImage="/images/courses/teacher/irenetalkquestion.png"
        />
      </div>
    </section>
  );
}
