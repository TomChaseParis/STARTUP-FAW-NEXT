"use client";

import { Children, ReactNode } from "react";

import { useNavigation } from "./ActivityNavigationProvider";
import ActivityResults from "@/components/courses/common/ActivityResults";
type Props = {
  children: ReactNode;
};

export default function ActivityFlow({
  children,
}: Props) {
  const {
    currentExerciseIndex,
    flowState,
    lastResult,
    restartExercise,
    nextExercise,
    transitionFinished,
  } = useNavigation();

  const exercises = Children.toArray(children);

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
          nextExercise();

          // Pour l'instant on passe directement
          // à l'exercice suivant.
          // Plus tard, on remplacera cela
          // par une vraie animation.
          setTimeout(() => {
            transitionFinished();
          }, 300);
        }}
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