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
    <section className="mx-auto max-w-5xl py-16">
      <ExerciseProgress
        current={current}
        total={total}
      />

      <ExerciseCard>
        {header}

        {content}

        {navigation}
      </ExerciseCard>
    </section>
  );
}