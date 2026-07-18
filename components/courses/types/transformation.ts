export type TransformationContent = {
  instruction: string;

  sourceText: string;

  expectedAnswer: string;

  hints?: string[];
};