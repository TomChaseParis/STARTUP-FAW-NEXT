"use client";

import { ReactNode } from "react";

import { useActivity } from "../courses/engines/ProgressEngine/ActivityContext";
import { useNavigation } from "@/core/navigation/ActivityNavigationProvider";

import { ExerciseSessionResult } from "../courses/common/types/exerciseSessionTypes";
import { ActivityResult } from "@/core/activity/models/ActivityResult";

type ExerciseContainerProps = {
  exerciseId: string;

  /*
   * Permet à certains moteurs d'exercice,
   * comme FillGaps, de contrôler eux-mêmes
   * le moment où l'exercice est quitté.
   */
  deferNavigation?: boolean;

  children: (props: {
    onComplete: (result: ExerciseSessionResult) => void;
  }) => ReactNode;
};

export default function ExerciseContainer({
  exerciseId,
  deferNavigation = false,
  children,
}: ExerciseContainerProps) {
  const {
    activity,
    progress,
    refresh,
  } = useActivity();

  const {
    completeExercise,
  } = useNavigation();

  const exercise =
    activity.exercises.find(
      (item) => item.id === exerciseId,
    );

  if (!exercise) {
    throw new Error(
      `Exercise "${exerciseId}" not found in activity "${activity.id}".`,
    );
  }

  const handleComplete = (
    result: ExerciseSessionResult,
  ) => {
    /*
     * On enregistre toujours le score.
     */

    progress.submitScore(
      activity.id,
      exerciseId,
      result.score,
    );

    refresh();

    /*
     * Pour les exercices classiques :
     *
     * score
     * ↓
     * completeExercise()
     * ↓
     * exercice suivant
     *
     * Pour FillGaps :
     *
     * score
     * ↓
     * on laisse FillGapsEngine afficher
     * son résultat et sa correction.
     */

    if (deferNavigation) {
      return;
    }

    const activityResult: ActivityResult = {
      session: result,
      bestScore:
        progress.getBestScore(
          activity.id,
          exerciseId,
        ),
      attempts:
        progress.getAttempts(
          activity.id,
          exerciseId,
        ),
    };

    completeExercise(
      activityResult,
    );
  };

  return (
    <section className="mt-20">
      <h2 className="mb-6 text-3xl font-bold">
        {exercise.title}
      </h2>

      {children({
        onComplete: handleComplete,
      })}
    </section>
  );
}