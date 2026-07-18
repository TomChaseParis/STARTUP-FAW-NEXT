export type QuizChoice = {
  id: string;

  label: string;

  isCorrect: boolean;

  explanation?: string;

  spokenVariants?: string[];

  teacherAudioCorrect?: string;

  teacherAudioWrong?: string;
};

export type QuizContent = {
  question: string;

  choices: QuizChoice[];
};