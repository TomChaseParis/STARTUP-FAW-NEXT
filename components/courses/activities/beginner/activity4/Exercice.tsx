"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ImageWritingEngine from "@/components/courses/blocks/ImageSliderEngine";
import { imageWritingData } from "./imageWriting.data";

export default function Exercice() {
  return (
    <section className="mt-12">

      <InstructionBlock
        title={imageWritingData.title}
        activityType={imageWritingData.activityType}
        description={
          <div className="space-y-5 text-black">

            <p>
              Observe chaque image et décris ce que la personne fait.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-medium text-slate-600 mb-2">
                💡 Exemple :
              </p>
              <p className="text-base">
                → Il dort.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-sm font-medium text-slate-600 mb-2">
                🎯 Astuce :
              </p>
              <p className="text-base">
                Utilise des phrases simples avec "il" + verbe (présent).
              </p>
            </div>

          </div>
        }
      />

      <div className="mt-8">
        <ImageWritingEngine
          data={imageWritingData}
          teacherImage={imageWritingData.teacherImage}
        />
      </div>

    </section>
  );
}