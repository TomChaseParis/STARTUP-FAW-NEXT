"use client";

import { Children, ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useNavigation } from "./ActivityNavigationProvider";
import ActivityResults from "@/components/courses/common/ActivityResults";
import { ActivityResult } from "@/core/activity/models/ActivityResult";

type TeacherFeedbackImages = {
  bad: string;
  middle: string;
  good: string;
  perfect?: string;
};

type TeacherFeedbackAudios = {
  bad: string;
  middle: string;
  good: string;
  perfect?: string;
};

type Props = {
  children: ReactNode;
  teacher?: "beginner" | "elementary-1" | "intermediate-1";
  teacherFeedbackImages?: TeacherFeedbackImages;
  teacherFeedbackAudios?: TeacherFeedbackAudios;

  /**
   * Index des exercices pour lesquels l'historique
   * question par question doit être masqué.
   *
   * Exemple : [0] masque l'historique du premier exercice.
   */
  hideAnswerHistoryForExercises?: number[];

  detailedReportRenderer?: (
    result: ActivityResult,
    exerciseIndex: number,
  ) => ReactNode;

  finishHref?: string;
};

export default function ActivityFlow({
  children,
  teacher,
  teacherFeedbackImages,
  teacherFeedbackAudios,
  hideAnswerHistoryForExercises = [],
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

  const exercises = Children.toArray(children);

  const isLastExercise =
    currentExerciseIndex === exercises.length - 1;

  const showAnswerHistory =
    !hideAnswerHistoryForExercises.includes(
      currentExerciseIndex,
    );

  if (flowState === "results" && !lastResult) {
    throw new Error(
      "ActivityFlow: results screen requested without a result.",
    );
  }

  if (flowState === "results") {
    return (
      <ActivityResults
        result={lastResult}
        onRestart={restartExercise}
        onNext={() => {
          if (isLastExercise) {
            if (finishHref) {
              router.push(finishHref);
            }

            return;
          }

          nextExercise();

          setTimeout(() => {
            transitionFinished();
          }, 300);
        }}
        isLastExercise={isLastExercise}
        teacher={teacher}
        teacherFeedbackImages={teacherFeedbackImages}
        teacherFeedbackAudios={teacherFeedbackAudios}
        showAnswerHistory={showAnswerHistory}
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

  if (flowState === "transition") {
    return (
      <section className="py-24 text-center">
        <p className="text-xl font-semibold">
          Chargement de l'exercice suivant...
        </p>
      </section>
    );
  }

  if (flowState === "finished") {
    return (
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold">
          Activité terminée 🎉
        </h2>

        <p className="mt-4 text-slate-600">
          Félicitations ! Tu as terminé cette activité.
        </p>
      </section>
    );
  }

  return <>{exercises[currentExerciseIndex]}</>;
}