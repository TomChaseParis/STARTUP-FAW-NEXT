export type FillGapsSpeaker =
  | "conseillere"
  | "xavier";

export type GapPart =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "dialogue";
      speaker: FillGapsSpeaker;
      value: string;
    }
  | {
      type: "input";
      answer: string;
      hint?: string;
    };

export type Sentence = {
  id: number;
  parts: GapPart[];
};

export type FillGapsData = {
  title?: string;
  instruction?: string;
  verbs?: string[];
  sentences: Sentence[];
};

export type GapResult = {
  index: number;
  question: string;
  user: string;
  correct: string;
  isCorrect: boolean;
};