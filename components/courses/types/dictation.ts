export type DictationContent = {
  sentence: string;

  expectedAnswer: string;

  teacherAudio?: string;

  hints?: string[];
};