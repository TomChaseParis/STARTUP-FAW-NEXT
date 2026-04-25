"use client";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ImageWordInputSlider from "@/components/courses/blocks/ImageFillGapsSliderEngine";
import { poolRulesData } from "./poolRules.data.";
export default function Exercice() {
  return (
    <section className="mt-12">
      {" "}
      <InstructionBlock
        title={poolRulesData.title}
        activityType="type"
        description={
          <div className="space-y-4 text-black">
            {" "}
            <p>
              {" "}
              Observe chaque image et complète chaque phrase avec le bon
              mot.{" "}
            </p>{" "}
            <div>
              {" "}
              <p className=" text-md mb-4 mt-9 text-black">
                {" "}
                Les mots à utiliser sont les suivants :{" "}
              </p>{" "}
              <div className="flex flex-wrap gap-3">
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
      className="
        px-4 py-2
        bg-amber-50
        text-amber-800
        text-base font-semibold
        rounded-xl
        border border-amber-200
        shadow-sm
        transition-all duration-200
        hover:bg-amber-100 hover:shadow-md
      "
    >
      {word}
    </span>
  ))}
</div>
            </div>{" "}
          </div>
        }
      />{" "}
      <div className="mt-8">
        {" "}
        <ImageWordInputSlider data={poolRulesData} />{" "}
      </div>{" "}
    </section>
  );
}
