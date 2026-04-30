"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { episode2Data } from "./episode2Data";

export default function Exercice2() {
  return (
    <section className="mt-12">

      <InstructionBlock
        title="✍️ EXERCICE 3 : Complète le dialogue"
        activityType="type"
        description={
          <div className="space-y-5 text-black">

            {/* INTRO */}
            <p className="font-medium">
              👉 Ecoute à nouveau le dialogue et complète le dialogue avec les verbes « être »
et « avoir » à la bonne forme. Rappel de conjugaison :
            </p>

            

            {/* CONSIGNE */}
            <div className="rounded-xl bg-amber-50 border border-amber-300 p-4">
              <p className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
                🎯 Rappel de conjugaison :
              </p>

              <ul className="text-sm text-amber-900 space-y-1">
                <li>• ‘Etre’ : je suis, tu es, il/elle/on est, nous sommes, vous êtes, ils/elles sont</li>
                <li>• ‘Avoir’ : j’ai, tu as, il/elle/on a, nous avons, vous avez, ils/elles ont</li>
              </ul>
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