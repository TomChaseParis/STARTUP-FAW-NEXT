import { useState } from "react";
import { ActivityFlowState } from "./types";
import { ActivityResult } from "../activity/models/ActivityResult";


export function useActivityNavigation(totalExercises: number) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const [flowState, setFlowState] = useState<ActivityFlowState>("exercise");

  const [lastResult, setLastResult] =
  useState<ActivityResult | null>(null);

  function completeExercise(result: ActivityResult) {
    console.log("completeExercise appelé", result);
  
    setLastResult(result);
  
    console.log("lastResult enregistré");
  
    setFlowState("results");
  
    console.log("flowState = results");
  }
  function restartExercise() {
    setFlowState("exercise");
  }

  function nextExercise() {
    if (currentExerciseIndex >= totalExercises - 1) {
      setFlowState("finished");
      return;
    }

    setFlowState("transition");
  }

  function transitionFinished() {
    setCurrentExerciseIndex((prev) => prev + 1);
    setFlowState("exercise");
  }

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
