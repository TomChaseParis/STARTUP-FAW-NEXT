"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { episode2Data } from "./episode2Data";

export default function Exercice2() {
  return (
    <section className="mt-12">
      <InstructionBlock
        stampLabel="EXERCICE 3"
        title="CONJUGAISON"
        activityType="type"
        description={
          <div className="space-y-5 text-black">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                💡 Consigne :
              </p>
              <p className="text-base">
                Ecoute à nouveau le dialogue et complète le dialogue avec les
                verbes « être » et « avoir » à la bonne forme.
              </p>
            </div>
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                Selon le pays d'où tu viens et le clavier que utilises, tu n'as
                peut-être pas certains accents présents sur ton clavier. Tu peux
                les copier coller dans la liste ci-dessous, tu en auras besoin
                pour l'exercice qui suit.
              </p>

              <div className="flex flex-wrap gap-2 text-sm">
                {["à", "â", "è", "ê", "é", "ô", "î", "'"].map((p) => (
                  <span
                    key={p}
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
                    {p}
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
