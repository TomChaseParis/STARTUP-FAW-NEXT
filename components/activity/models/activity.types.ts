export type QuestionType =
  | "multiple-choice"
  | "image-choice"
  | "audio"
  | "matching"
  | "speaking";

export interface BaseQuestion {
  id: string;
  question: string;
  type: QuestionType;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  options: string[];
  correctIndex: number;
}

export interface ImageChoiceQuestion extends BaseQuestion {
  type: "image-choice";
  images: string[];
  correctIndex: number;
}

export type ActivityQuestion =
  | MultipleChoiceQuestion
  | ImageChoiceQuestion;