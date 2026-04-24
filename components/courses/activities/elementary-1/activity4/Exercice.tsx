"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ImageWordInputSlider from "@/components/courses/blocks/ImageFillGapsSliderEngine";
import { poolRulesData } from "./poolRules.data.";

export default function Exercice() {
  return (
    <section className="mt-12">

      <InstructionBlock
        title={poolRulesData.title}
        activityType="type"
        description={
          <div className="space-y-4 text-black">

            <p>
              Observe chaque image et complète chaque phrase avec le bon mot.
            </p>

            <div>
              <p className=" text-black text-md mt-9 mb-4">
                Les mots à utiliser sont les suivants :
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "admis",
                  "défense",
                  "obligatoire",
                  "interdiction",
                  "interdit",
                  "interdite",
                  "interdits",
                  "interdites",
                ].map((word) => (
                  <span
                    key={word}
                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-md font-medium"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

          </div>
        }
      />

      <div className="mt-8">
        <ImageWordInputSlider data={poolRulesData} />
      </div>

    </section>
  );
}