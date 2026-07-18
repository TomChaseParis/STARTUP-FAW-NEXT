import { Teacher } from "./teacher";
import { ExerciseMedia } from "./media";

export type Exercise<TContent> = {
  id: number;

  teacher: Teacher;

  media?: ExerciseMedia;

  content: TContent;
};