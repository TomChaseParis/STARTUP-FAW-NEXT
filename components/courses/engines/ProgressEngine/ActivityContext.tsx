"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";

import { ActivityDefinition } from "@/data/courses/activities/types";
import { useProgress } from "./ProgressProvider";

type ActivityContextValue = {
  activity: ActivityDefinition;
  progress: ReturnType<typeof useProgress>["progress"];
  refresh: ReturnType<typeof useProgress>["refresh"];
};

const ActivityContext = createContext<ActivityContextValue | null>(null);

type ActivityProviderProps = {
  activity: ActivityDefinition;
  children: ReactNode;
};

export function ActivityProvider({
  activity,
  children,
}: ActivityProviderProps) {
  const { progress, refresh } = useProgress();

  useEffect(() => {
    const created = progress.createActivity(
      activity.id,
      activity.exercises.map((exercise) => exercise.id),
    );

    if (created) {
      refresh();
    }
  }, [activity, progress]);
  return (
    <ActivityContext.Provider
      value={{
        activity,
        progress,
        refresh,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error("useActivity must be used inside an ActivityProvider.");
  }

  return context;
}
