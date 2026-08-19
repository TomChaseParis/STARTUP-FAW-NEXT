"use client";

import TableCompletionQuiz from "@/components/activity/table-completion/TableCompletionQuiz";
import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";
import { activity2Data } from "@/data/courses/activities/beginner/activity-2/completion-demo-data";

type ComprehensionExerciseProps = {
  onComplete?: (result: ExerciseSessionResult) => void;
};

export default function ComprehensionExercise({
  onComplete,
}: ComprehensionExerciseProps) {
  return (
    <section className="mt-12 bg-white pb-20 text-black">
      <TableCompletionQuiz data={activity2Data} onComplete={onComplete} />
    </section>
  );
}
