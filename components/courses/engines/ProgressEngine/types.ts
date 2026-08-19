// types.ts

export type ExerciseState =
  | "LOCKED"
  | "AVAILABLE"
  | "COMPLETED";

export interface ExerciseProgress {
  id: string;

  state: ExerciseState;

  attempts: number;

  bestScore: number;

  lastScore: number;

  unlockedAt?: string;

  completedAt?: string;
}

export interface ActivityProgress {
  activityId: string;

  exercises: Record<string, ExerciseProgress>;

  completed: boolean;

  startedAt?: string;

  completedAt?: string;
}

export interface ProgressStore {
  activities: Record<string, ActivityProgress>;
}