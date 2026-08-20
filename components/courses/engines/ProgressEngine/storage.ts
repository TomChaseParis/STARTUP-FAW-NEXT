import { ProgressStore } from "./types";

const STORAGE_KEY =
  "faw-course-progress";

export function loadProgress(): ProgressStore {
  if (
    typeof window === "undefined"
  ) {
    return {
      activities: {},
    };
  }

  try {
    const stored =
      window.localStorage.getItem(
        STORAGE_KEY,
      );

    if (!stored) {
      return {
        activities: {},
      };
    }

    const parsed =
      JSON.parse(stored) as ProgressStore;

    if (
      !parsed ||
      typeof parsed !== "object" ||
      !parsed.activities ||
      typeof parsed.activities !==
        "object"
    ) {
      return {
        activities: {},
      };
    }

    return parsed;
  } catch {
    return {
      activities: {},
    };
  }
}

export function saveProgress(
  progress: ProgressStore,
): void {
  if (
    typeof window === "undefined"
  ) {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress),
    );
  } catch {
    // Le stockage local peut être indisponible
    // dans certains environnements.
  }
}

export function clearProgress(): void {
  if (
    typeof window === "undefined"
  ) {
    return;
  }

  try {
    window.localStorage.removeItem(
      STORAGE_KEY,
    );
  } catch {
    // Le stockage local peut être indisponible
    // dans certains environnements.
  }
}