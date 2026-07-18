"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ImageWritingEngine from "@/components/courses/engines/ImageSliderEngine";
import { imageWritingData } from "./imageWriting.data";

export default function Exercice() {
  return (
    <section className="mt-12">
      <InstructionBlock
        title={imageWritingData.title}
        activityType={imageWritingData.activityType}
        description={
          <div className="space-y-5 text-black">
            <p>Observe chaque image et décris ce que la personne fait.</p>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                💡 Exemple :
              </p>
              <p className="text-base">→ Il dort.</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                🎯 Astuce :
              </p>
              <p className="text-base">
                Utilise des phrases simples avec &quot;il&quot; + verbe
                (présent).
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
