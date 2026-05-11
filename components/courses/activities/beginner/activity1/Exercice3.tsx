"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { exercice3Data } from "./exercice3Data";

export default function Exercice3() {
  return (
    <section className="mt-12">
      {/* ================= INSTRUCTION ================= */}
      <InstructionBlock
        stampLabel="EXERCICE 3"
        title="Choisis le bon verbe à la bonne forme pour chacune des phrases proposées"
        activityType="type"
        description={
          <div className="space-y-5 text-black">
            {/* CONSIGNE */}
            <p className="text-base font-medium">
              👉 Complète chaque phrase avec le bon verbe.
            </p>

            {/* 🔥 VERBES À UTILISER */}
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-600">
                Verbes à utiliser :
              </p>

              <div className="flex flex-wrap gap-3">
                {exercice3Data.verbs?.map((verb) => (
                  <span
                    key={verb}
                    className="
                      rounded-xl border
                      border-amber-200
                      bg-amber-50
                      px-4 py-2
                      text-base
                      font-semibold text-amber-800
                      shadow-sm
                    "
                  >
                    {verb}
                  </span>
                ))}
              </div>
            </div>

            {/* ASTUCE */}
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="mb-2 flex items-center gap-2 text-base font-semibold text-blue-700">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                  💡
                </span>
                Astuce
              </p>

              <p className="text-base text-blue-900">
                Repère d’abord le sujet (je, tu, il, nous…) puis choisis le bon
                verbe.
              </p>
            </div>
          </div>
        }
      />

      {/* ================= ENGINE ================= */}
      <div className="mt-8">
        <FillGapsEngine
          data={exercice3Data}
          teacherImage="/images/courses/teacher/marietalkquestion.png"
        />
      </div>
    </section>
  );
}
