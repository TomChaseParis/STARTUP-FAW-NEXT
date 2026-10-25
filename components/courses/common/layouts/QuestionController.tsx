"use client";

import { ReactNode } from "react";

import ExerciseProgress from "../ExerciseProgress";
import ExerciseCard from "../ExerciseCard";

type Props = {
  current: number;
  total: number;

  header: ReactNode;
  content: ReactNode;

  navigation?: ReactNode;
};

export default function QuestionController({
  current,
  total,
  header,
  content,
  navigation,
}: Props) {
  return (
    <section className="mx-auto  max-w-5xl ">
      <ExerciseProgress
        current={current}
        total={total}
      />

     <div className="rounded-2xl border border-[#E7EAF0] bg-white p-[1px] shadow-[0_8px_28px_rgba(15,23,42,0.045)]">
  <ExerciseCard>
    {header}

    {content}

    {navigation}
  </ExerciseCard>
</div>
    </section>
  );
}