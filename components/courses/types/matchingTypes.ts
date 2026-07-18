export type MatchingQuestion = {
  id: number;
  text: string;
  answerId: string;
};

export type MatchingAnswer = {
  id: string;
  text: string;
};

export type MatchingData = {
  title: string;
  instruction: string;
  questions: MatchingQuestion[];
  answers: MatchingAnswer[];
};