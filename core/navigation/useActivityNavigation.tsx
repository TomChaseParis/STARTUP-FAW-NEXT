"use client";

import { useCallback, useState } from "react";

import type { ActivityResult } from "@/core/activity/models/ActivityResult";
import type {
  ActivityFlowState,
  ActivityNavigationContextType,
} from "./types";

export function useActivityNavigation(
  totalExercises: number,
): ActivityNavigationContextType {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [flowState, setFlowState] =
    useState<ActivityFlowState>("exercise");
  const [lastResult, setLastResult] = useState<ActivityResult | null>(
    null,
  );

  const completeExercise = useCallback(
    (result: ActivityResult) => {
      setLastResult(result);
      setFlowState("results");
    },
    [],
  );

  const restartExercise = useCallback(() => {
    setLastResult(null);
    setFlowState("exercise");
  }, []);

  const nextExercise = useCallback(() => {
    setLastResult(null);

    setCurrentExerciseIndex((previousIndex) => {
      const nextIndex = previousIndex + 1;

      if (nextIndex >= totalExercises) {
        setFlowState("finished");
        return previousIndex;
      }

      setFlowState("transition");
      return nextIndex;
    });
  }, [totalExercises]);

  const transitionFinished = useCallback(() => {
    setFlowState((currentState) =>
      currentState === "transition" ? "exercise" : currentState,
    );
  }, []);

  return {
    currentExerciseIndex,
    flowState,
    lastResult,
    completeExercise,
    restartExercise,
    nextExercise,
    transitionFinished,
  };
}

export default useActivityNavigation;