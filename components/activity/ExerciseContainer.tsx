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
  const {
    activity,
    progress,
    refresh,
  } = useActivity();

  const {
    completeExercise,
  } = useNavigation();

  /*
   * =========================================================
   * RÉCUPÉRATION DE L'EXERCICE
   * =========================================================
   */

  const exercise =
    activity.exercises.find(
      (item) => item.id === exerciseId,
    );

  if (!exercise) {
    throw new Error(
      `Exercise "${exerciseId}" not found in activity "${activity.id}".`,
    );
  }

  /*
   * =========================================================
   * IMPORTANT
   * =========================================================
   *
   * Le déblocage d'un exercice est géré par ActivityFlow /
   * ActivityNavigationProvider.
   *
   * ActivityFlow affiche uniquement l'exercice correspondant
   * à currentExerciseIndex.
   *
   * On ne doit donc PAS faire :
   *
   *   if (!unlocked) return null;
   *
   * ici.
   *
   * Sinon ActivityFlow peut parfaitement être passé à
   * l'exercice suivant alors que ExerciseContainer retourne
   * null, ce qui donne un écran vide.
   *
   * Le système ProgressEngine reste utilisé pour enregistrer
   * les scores et les tentatives.
   */

  const handleComplete = (
    result: ExerciseSessionResult,
  ) => {
    /*
     * Enregistrement du score dans le système global.
     */
    progress.submitScore(
      activity.id,
      exerciseId,
      result.score,
    );

    /*
     * Mise à jour de la progression.
     */
    refresh();

    /*
     * Construction du résultat d'activité.
     */
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

    /*
     * La navigation prend ensuite le relais.
     *
     * completeExercise()
     *        ↓
     * ActivityFlow
     *        ↓
     * ActivityResults
     *        ↓
     * Exercice suivant
     */
    completeExercise(activityResult);
  };

  /*
   * =========================================================
   * RENDU
   * =========================================================
   */

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