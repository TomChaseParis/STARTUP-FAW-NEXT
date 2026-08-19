import { ActivityResult } from "../activity/models/ActivityResult";

export interface ActivityNavigationState {
  currentExerciseIndex: number;
  flowState: ActivityFlowState;
  lastResult: ActivityResult | null;
}

export interface ActivityNavigationContextType
  extends ActivityNavigationState {
  completeExercise: (
    result: ActivityResult
  ) => void;

  restartExercise: () => void;
  nextExercise: () => void;
  transitionFinished: () => void;
}

export type ActivityFlowState =
  | "exercise"
  | "results"
  | "transition"
  | "finished";