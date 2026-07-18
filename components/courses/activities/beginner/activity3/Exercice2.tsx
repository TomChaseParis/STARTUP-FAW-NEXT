"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import MatchQAEngine from "@/components/courses/engines/MatchQAEngine";
import { matchQAData } from "./matchQA.data";

export default function Exercice2() {
  return (
    <section className="mt-12">
      <InstructionBlock
        title={matchQAData.title}
        description={matchQAData.instruction}
        activityType={matchQAData.activityType as any}
      />

      <div className="mt-8">
        <MatchQAEngine data={matchQAData} />
      </div>
    </section>
  );
}
