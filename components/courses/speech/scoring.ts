import {
  calculateSimilarity,
  normalize,
  tokenize,
} from "./speech-utils";

import { forbiddenWords } from "./forbiddenWords";

export function validateSingleWord(
  transcript: string,
  expectedWord: string,
) {
  const expected = normalize(expectedWord);

  const spokenWords = tokenize(transcript);

  let bestScore = 0;
  let bestMatch = "";

  spokenWords.forEach((word) => {
    const score = calculateSimilarity(
      expected,
      word,
    );

    if (score > bestScore) {
      bestScore = score;
      bestMatch = word;
    }
  });

  const forbidden =
  forbiddenWords[expected]?.includes(
    bestMatch,
  ) ?? false;

return {
  expected,
  bestMatch,
  similarity: forbidden ? 0 : bestScore,

  isCorrect:
    !forbidden && bestScore >= 85,
};
}