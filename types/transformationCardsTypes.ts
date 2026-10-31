
export type TransformationTextPart = {
  type: "text";
  value: string;
};

export type TransformationHighlightPart = {
  type: "highlight";
  value: string;
};

export type TransformationInputPart = {
  type: "input";
  id: string;
  answers: string[];
  placeholder?: string;
  hint?: string;
  caseSensitive?: boolean;
};

export type TransformationSentencePart =
  | TransformationTextPart
  | TransformationHighlightPart;

export type TransformationTargetPart =
  | TransformationTextPart
  | TransformationInputPart;

export type TransformationCard = {
  id: string;
  instruction?: string;
  example: TransformationSentencePart[];
  target: TransformationTargetPart[];
  explanation?: string;
};

export type TransformationCardsData = {
  title?: string;
  instruction: string;
  cards: TransformationCard[];
};

export type TransformationAnswer = {
  cardId: string;
  inputId: string;
  userAnswer: string;
  expectedAnswers: string[];
  isCorrect: boolean;
};

export type TransformationCardResult = {
  cardId: string;
  answers: TransformationAnswer[];
  isCorrect: boolean;
};

export type TransformationCardsResult = {
  totalCards: number;
  completedCards: number;
  totalInputs: number;
  correctAnswers: number;
  score: number;
  answers: TransformationAnswer[];
  cards: TransformationCardResult[];
  startedAt: Date;
  finishedAt: Date;
};
