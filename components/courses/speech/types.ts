export type SpeechResult = {
  expected: string;
  transcript: string;
  similarity: number;
  isCorrect: boolean;
};

export type SpeechRecognitionResult = {
  transcript: string;
  results: SpeechResult[];
};

export type SpeechEngineProps = {
  expectedSentences: string[];
  requiredPronoun?: string;
  onResult: (result: SpeechRecognitionResult) => void;
};