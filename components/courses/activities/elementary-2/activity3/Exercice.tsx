"use client";

import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
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

            <p>
              Complète les phrases avec le bon article.
            </p>

            <div>
              <p className="text-sm font-medium text-slate-600 mb-3">
                Articles à utiliser :
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  "le",
                  "la",
                  "l’",
                  "les",
                  "un",
                  "une",
                  "des",
                  "de",
                ].map((article) => (
                  <span
                    key={article}
                    className="
                      px-4 py-2
                      bg-amber-50
                      text-amber-800
                      text-base font-semibold
                      rounded-xl
                      border border-amber-200
                      shadow-sm
                      transition-all duration-200
                      hover:bg-amber-100 hover:shadow-md
                    "
                  >
                    {article}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-medium text-slate-600 mb-2">
                💡 Astuce :
              </p>
              <p className="text-base">
                Fais attention au genre (masculin / féminin), au nombre (singulier / pluriel) et aux voyelles (l’).
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