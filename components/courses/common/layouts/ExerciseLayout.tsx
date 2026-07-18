"use client";

import { ReactNode } from "react";

import ExerciseCard from "../ExerciseCard";
import ExerciseProgress from "../ExerciseProgress";
import QuestionHeader from "../question/QuestionHeader";

type Props = {
  current: number;

  total: number;

  onPlayAudio: () => void;

  teacherTalking?: boolean;

  children: ReactNode;
};

export default function ExerciseLayout({
  current,
  total,
  onPlayAudio,
  teacherTalking = false,
  children,
}: Props) {
  return (
    <section className="mx-auto max-w-5xl py-16">
      <ExerciseProgress current={current} total={total} />

      <ExerciseCard>
        <QuestionHeader
          current={current}
          total={total}
          onPlay={onPlayAudio}
          disabled={teacherTalking}
        />

        {children}
      </ExerciseCard>
    </section>
  );
}
