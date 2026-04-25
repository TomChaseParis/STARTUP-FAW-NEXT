"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { grammarVerbsData } from "./grammarVerbsData";

export default function Exercice() {
  return (
    <section className="mt-12">

      <InstructionBlock
        title={grammarVerbsData.title || "🧠 Grammaire — Complète les phrases"}
        activityType="type"
        description={
          <div className="space-y-6 text-black">

            {/* CONSIGNE */}
            <p className="text-base">
              Complète les phrases avec un des verbes au présent.
            </p>

            {/* VERBES */}
            <div>
              <p className="text-sm font-medium text-slate-600 mb-3">
                Verbes à utiliser :
              </p>

              <div className="flex flex-wrap gap-3">
                {grammarVerbsData.verbs.map((verb) => (
                  <span
                    key={verb}
                    className="
                      px-4 py-2
                      text-base font-semibold
                      text-amber-800
                      bg-gradient-to-b from-amber-50 to-amber-100
                      border border-amber-200
                      rounded-xl
                      shadow-sm
                      transition-all duration-200
                      hover:shadow-md hover:scale-[1.02]
                    "
                  >
                    {verb}
                  </span>
                ))}
              </div>
            </div>

            {/* ASTUCE */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-medium text-slate-600 mb-2">
                💡 Astuce :
              </p>
              <p className="text-base">
                Observe le sujet (je, tu, il, nous…) pour choisir la bonne conjugaison.
              </p>
            </div>

          </div>
        }
      />

      <div className="mt-8">
        <FillGapsEngine
          data={grammarVerbsData}
          teacherImage="/images/courses/teacher/irenetalkquestion.png"
        />
      </div>

    </section>
  );
}