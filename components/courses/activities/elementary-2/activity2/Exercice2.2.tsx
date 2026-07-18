"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";
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
            <p>Réécoute le texte et complète avec les mots manquants.</p>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                💡 Consigne :
              </p>
              <p className="text-base">
                Les mots surlignés en rouge sont mal écrits. Écoute
                attentivement et corrige leur orthographe.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                🎧 Astuce :
              </p>
              <p className="text-base">
                Concentre-toi sur les sons entendus pour retrouver la bonne
                orthographe.
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
