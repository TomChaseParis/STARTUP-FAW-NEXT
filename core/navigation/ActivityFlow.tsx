"use client";

import {
  Children,
  ReactNode,
} from "react";

import { useRouter } from "next/navigation";

import { useNavigation } from "./ActivityNavigationProvider";

import ActivityResults from "@/components/courses/common/ActivityResults";

import {
  ActivityResult,
} from "@/core/activity/models/ActivityResult";

type TeacherFeedbackImages = {
  bad: string;
  middle: string;
  good: string;
};

type TeacherFeedbackAudios = {
  bad: string;
  middle: string;
  good: string;
};

type Props = {
  children: ReactNode;

  teacherFeedbackImages?: TeacherFeedbackImages;

  teacherFeedbackAudios?: TeacherFeedbackAudios;

  /**
   * Correction détaillée personnalisée.
   *
   * Le renderer reçoit :
   *
   * - le résultat de l'exercice
   * - l'index de l'exercice
   *
   * Cela permet de réserver une correction
   * personnalisée à certains exercices uniquement.
   */
  detailedReportRenderer?: (
    result: ActivityResult,
    exerciseIndex: number,
  ) => ReactNode;

  /**
   * Destination après le dernier exercice.
   */
  finishHref?: string;
};

export default function ActivityFlow({
  children,
  teacherFeedbackImages,
  teacherFeedbackAudios,
  detailedReportRenderer,
  finishHref,
}: Props) {
  const router = useRouter();

  const {
    currentExerciseIndex,
    flowState,
    lastResult,
    restartExercise,
    nextExercise,
    transitionFinished,
  } = useNavigation();

  const exercises =
    Children.toArray(children);

  const isLastExercise =
    currentExerciseIndex ===
    exercises.length - 1;

  /* ========================================================= */
  /* SÉCURITÉ                                                  */
  /* ========================================================= */

  if (
    flowState === "results" &&
    !lastResult
  ) {
    throw new Error(
      "ActivityFlow: results screen requested without a result.",
    );
  }

  /* ========================================================= */
  /* RÉSULTATS                                                 */
  /* ========================================================= */

  if (flowState === "results") {
    return (
      <ActivityResults
        result={lastResult}
        onRestart={restartExercise}
        onNext={() => {
          if (isLastExercise) {
            if (finishHref) {
              router.push(
                finishHref,
              );
            }

            return;
          }

          nextExercise();

          setTimeout(() => {
            transitionFinished();
          }, 300);
        }}
        isLastExercise={
          isLastExercise
        }
        teacherFeedbackImages={
          teacherFeedbackImages
        }
        teacherFeedbackAudios={
          teacherFeedbackAudios
        }
        detailedReport={
          detailedReportRenderer
            ? detailedReportRenderer(
                lastResult,
                currentExerciseIndex,
              )
            : undefined
        }
      />
    );
  }

  /* ========================================================= */
  /* TRANSITION                                                */
  /* ========================================================= */

  if (
    flowState === "transition"
  ) {
    return (
      <section className="py-24 text-center">
        <p className="text-xl font-semibold">
          Chargement de l'exercice suivant...
        </p>
      </section>
    );
  }

  /* ========================================================= */
  /* FIN                                                        */
  /* ========================================================= */

  if (
    flowState === "finished"
  ) {
    return (
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold">
          Activité terminée 🎉
        </h2>

        <p className="mt-4 text-slate-600">
          Félicitations ! Tu as terminé
          cette activité.
        </p>
      </section>
    );
  }

  /* ========================================================= */
  /* EXERCICE COURANT                                          */
  /* ========================================================= */

  return (
    <>
      {
        exercises[
          currentExerciseIndex
        ]
      }
    </>
  );
}