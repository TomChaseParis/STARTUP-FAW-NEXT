"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { exercice3Data } from "./exercice3Data";

export default function Exercice3() {
  return (
    <section className="mt-12">

      {/* ================= INSTRUCTION ================= */}
      <InstructionBlock
        title="✍️ EXERCICE 3 : Choisis le bon verbe à la bonne forme pour chacune des phrases proposées"
        activityType="type"
        description={
          <div className="space-y-5 text-black">

            {/* CONSIGNE */}
            <p className="text-base font-medium">
              👉 Complète chaque phrase avec le bon verbe.
            </p>

            {/* 🔥 VERBES À UTILISER */}
            <div>
              <p className="text-sm font-semibold text-slate-600 mb-3">
                Verbes à utiliser :
              </p>

              <div className="flex flex-wrap gap-3">
                {exercice3Data.verbs?.map((verb) => (
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
                    "
                  >
                    {verb}
                  </span>
                ))}
              </div>
            </div>

            {/* ASTUCE */}
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
              <p className="text-base font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                  💡
                </span>
                Astuce
              </p>

              <p className="text-base text-blue-900">
                Repère d’abord le sujet (je, tu, il, nous…) puis choisis le bon verbe.
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