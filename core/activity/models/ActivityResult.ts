import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

export interface ActivityResult {
  session: ExerciseSessionResult;

  bestScore: number;

  attempts: number;
}