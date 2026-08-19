"use client";

import { ReactNode } from "react";

import { useActivity } from "../courses/engines/ProgressEngine/ActivityContext";
import { useNavigation } from "@/core/navigation/ActivityNavigationProvider";
import { ExerciseSessionResult } from "../courses/common/types/exerciseSessionTypes";
import { ActivityResult } from "@/core/activity/models/ActivityResult";

type ExerciseContainerProps = {
  exerciseId: string;
  children: (props: {
    onComplete: (result: ExerciseSessionResult) => void;
  }) => ReactNode;
};

export default function ExerciseContainer({
  exerciseId,
  children,
}: ExerciseContainerProps) {
  const { activity, progress, refresh } = useActivity();

  const { completeExercise } = useNavigation();

  const exercise = activity.exercises.find((e) => e.id === exerciseId);

  if (!exercise) {
    throw new Error(
      `Exercise "${exerciseId}" not found in activity "${activity.id}".`,
    );
  }

  const unlocked = progress.isUnlocked(activity.id, exerciseId);

  if (!unlocked) {
    return null;
  }

  const completed = progress.isCompleted(activity.id, exerciseId);

  const bestScore = progress.getBestScore(activity.id, exerciseId);

  const attempts = progress.getAttempts(activity.id, exerciseId);

  const handleComplete = (result: ExerciseSessionResult) => {
    progress.submitScore(activity.id, exerciseId, result.score);

    refresh();

    const activityResult: ActivityResult = {
      session: result,
      bestScore: progress.getBestScore(activity.id, exerciseId),
      attempts: progress.getAttempts(activity.id, exerciseId),
    };

    completeExercise(activityResult);
  };

  return (
    <section className="mt-20">
      <h2 className="mb-6 text-3xl font-bold">{exercise.title}</h2>

      {children({
        onComplete: handleComplete,
      })}
    </section>
  );
}
