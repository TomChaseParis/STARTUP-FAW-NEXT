"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { episode2Data } from "./episode2Data";

export default function Exercice2() {
  return (
    <section className="mt-12">

      <InstructionBlock
        title={episode2Data.title}
        activityType="type"
        description={
          <div className="space-y-5 text-black">

            <p>
              Complète le dialogue avec le bon verbe au présent.
            </p>

            <div>
              <p className="text-sm font-medium text-slate-600 mb-3">
                Verbes à utiliser :
              </p>

              <div className="flex flex-wrap gap-3">
                {episode2Data.verbs?.map((verb) => (
                  <span
                    key={verb}
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
                    {verb}
                  </span>
                ))}
              </div>
            </div>

          </div>
        }
      />

      <div className="mt-8">
        <FillGapsEngine data={episode2Data} />
      </div>

    </section>
  );
}