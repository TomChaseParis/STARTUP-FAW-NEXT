import { ProgressStore } from "./types";

export function loadProgress(): ProgressStore {
  return { activities: {} };
}

export function saveProgress(progress: ProgressStore): void {
  // Désactivé temporairement
}

export function clearProgress(): void {
  // Désactivé temporairement
}