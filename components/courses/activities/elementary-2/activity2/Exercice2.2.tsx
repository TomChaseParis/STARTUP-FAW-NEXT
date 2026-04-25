"use client";

import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import { episodeAppartementData } from "./episodeAppartementData";

export default function ExerciceEpisode2() {
  return (
    <section className="mt-12">

      <InstructionBlock
        title={episodeAppartementData.title}
        activityType="type"
        description={
          <div className="space-y-5 text-black">

            <p>
              Réécoute le texte et complète avec les mots manquants.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-medium text-slate-600 mb-2">
                💡 Consigne :
              </p>
              <p className="text-base">
                Les mots surlignés en rouge sont mal écrits. Écoute attentivement et corrige leur orthographe.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-sm font-medium text-slate-600 mb-2">
                🎧 Astuce :
              </p>
              <p className="text-base">
                Concentre-toi sur les sons entendus pour retrouver la bonne orthographe.
              </p>
            </div>

          </div>
        }
      />

      <div className="mt-8">
        <FillGapsEngine
          data={episodeAppartementData}
          teacherImage="/images/courses/teacher/irenetalkquestion.png"
        />
      </div>

    </section>
  );
}