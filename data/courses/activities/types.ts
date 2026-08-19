export interface ActivityExercise {
  id: string;
  title: string;
}

export interface ActivityDefinition {
  id: string;
  title: string;
  exercises: ActivityExercise[];
}