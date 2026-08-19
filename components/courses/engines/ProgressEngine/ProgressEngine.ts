import {
  ActivityProgress,
  ExerciseProgress,
  ProgressStore,
} from "./types";

import { loadProgress, saveProgress } from "./storage";

export class ProgressEngine {
  private store: ProgressStore;

  constructor() {
    this.store = loadProgress();
  }

  private persist() {
    saveProgress(this.store);
  }

  public getStore(): ProgressStore {
    return this.store;
  }

  public getActivity(activityId: string): ActivityProgress | undefined {
    return this.store.activities[activityId];
  }

  public createActivity(
    activityId: string,
    exerciseIds: string[]
  ): ActivityProgress {
    const existing = this.getActivity(activityId);

    if (existing) {
      return existing;
    }

    const exercises: Record<string, ExerciseProgress> = {};

    exerciseIds.forEach((id, index) => {
      exercises[id] = {
        id,
        state: index === 0 ? "AVAILABLE" : "LOCKED",
        attempts: 0,
        bestScore: 0,
        lastScore: 0,
      };
    });

    const activity: ActivityProgress = {
      activityId,
      completed: false,
      startedAt: new Date().toISOString(),
      exercises,
    };

    this.store.activities[activityId] = activity;

    this.persist();

    return activity;
  }

  public resetActivity(activityId: string): void {
    delete this.store.activities[activityId];
    this.persist();
  }

  public submitScore(
    activityId: string,
    exerciseId: string,
    score: number
  ): void {
    const activity = this.getActivity(activityId);

    if (!activity) {
      throw new Error(`Activity "${activityId}" not found.`);
    }

    const exercise = activity.exercises[exerciseId];

    if (!exercise) {
      throw new Error(`Exercise "${exerciseId}" not found.`);
    }

    exercise.attempts += 1;
    exercise.lastScore = score;

    if (score > exercise.bestScore) {
      exercise.bestScore = score;
    }

    exercise.state = "COMPLETED";
    exercise.completedAt = new Date().toISOString();

    const exerciseIds = Object.keys(activity.exercises);

    const currentIndex = exerciseIds.indexOf(exerciseId);

    const nextExerciseId = exerciseIds[currentIndex + 1];

    if (nextExerciseId) {
      const nextExercise = activity.exercises[nextExerciseId];

      if (nextExercise.state === "LOCKED") {
        nextExercise.state = "AVAILABLE";
        nextExercise.unlockedAt = new Date().toISOString();
      }
    }

    activity.completed = exerciseIds.every(
      (id) => activity.exercises[id].state === "COMPLETED"
    );

    if (activity.completed) {
      activity.completedAt = new Date().toISOString();
    }

    this.persist();
  }

  public getExercise(
    activityId: string,
    exerciseId: string
  ): ExerciseProgress | undefined {
    return this.store.activities[activityId]?.exercises[exerciseId];
  }

  public getExercises(activityId: string): ExerciseProgress[] {
    const activity = this.getActivity(activityId);

    if (!activity) {
      return [];
    }

    return Object.values(activity.exercises);
  }

  public isUnlocked(
    activityId: string,
    exerciseId: string
  ): boolean {
    const exercise = this.getExercise(activityId, exerciseId);
  
    if (!exercise) {
      return false;
    }
  
    return exercise.state !== "LOCKED";
  }

  public isCompleted(
    activityId: string,
    exerciseId: string
  ): boolean {
    return (
      this.getExercise(activityId, exerciseId)?.state === "COMPLETED"
    );
  }

  public getBestScore(
    activityId: string,
    exerciseId: string
  ): number {
    return (
      this.getExercise(activityId, exerciseId)?.bestScore ?? 0
    );
  }

  public getLastScore(
    activityId: string,
    exerciseId: string
  ): number {
    return (
      this.getExercise(activityId, exerciseId)?.lastScore ?? 0
    );
  }

  public getAttempts(
    activityId: string,
    exerciseId: string
  ): number {
    return (
      this.getExercise(activityId, exerciseId)?.attempts ?? 0
    );
  }

  public getActivityScore(activityId: string): number {
    const activity = this.getActivity(activityId);

    if (!activity) {
      return 0;
    }

    const exercises = Object.values(activity.exercises);

    if (exercises.length === 0) {
      return 0;
    }

    const total = exercises.reduce(
      (sum, exercise) => sum + exercise.bestScore,
      0
    );

    return Math.round(total / exercises.length);
  }

  public isActivityCompleted(activityId: string): boolean {
    return this.getActivity(activityId)?.completed ?? false;
  }

  public clearAllProgress(): void {
    this.store = {
      activities: {},
    };

    this.persist();
  }
}