"use client";

import { useProgress as useProgressContext } from "./ProgressProvider";

export function useProgress() {
  return useProgressContext();
}