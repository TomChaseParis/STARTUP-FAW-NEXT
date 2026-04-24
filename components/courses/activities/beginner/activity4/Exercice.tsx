"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ImageWritingEngine from "@/components/courses/blocks/ImageSliderEngine";
import { imageWritingData } from "./imageWriting.data";

export default function Exercice() {
  return (
    <section className="mt-12">

      <InstructionBlock
        title={imageWritingData.title}
        description={imageWritingData.instruction}
        activityType={imageWritingData.activityType}
      />

      <div className="mt-8">
        <ImageWritingEngine data={imageWritingData}   teacherImage={imageWritingData.teacherImage}
 />
      </div>

    </section>
  );
}