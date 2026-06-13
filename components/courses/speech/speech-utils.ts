import { levenshtein } from "./levenshtein";
import { speechDictionary } from "./speechDictionary";

/* ================= NORMALIZE ================= */

export function normalize(text: string): string {
  let normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, " ")
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  Object.entries(speechDictionary).forEach(
    ([wrong, correct]) => {
      normalized = normalized.replace(
        new RegExp(`\\b${wrong}\\b`, "g"),
        correct,
      );
    },
  );

  return normalized;
}

/* ================= TOKENIZE ================= */

export function tokenize(text: string): string[] {
  const normalized = normalize(text);

  if (!normalized) return [];

  return normalized.split(" ");
}

/* ================= WORD MATCH ================= */

export function isWordMatch(
  expected: string,
  spoken: string,
): boolean {
  const distance = levenshtein(
    expected,
    spoken,
  );

  const maxLength = Math.max(
    expected.length,
    spoken.length,
  );

  if (maxLength === 0) return false;

  return distance / maxLength < 0.4;
}

/* ================= SIMILARITY ================= */

export function calculateSimilarity(
  expected: string,
  spoken: string,
): number {
  const normalizedExpected =
    normalize(expected);

  const normalizedSpoken =
    normalize(spoken);

  if (
    !normalizedExpected ||
    !normalizedSpoken
  ) {
    return 0;
  }

  const distance = levenshtein(
    normalizedExpected,
    normalizedSpoken,
  );

  const maxLength = Math.max(
    normalizedExpected.length,
    normalizedSpoken.length,
  );

  return Math.max(
    0,
    Math.round(
      (1 - distance / maxLength) * 100,
    ),
  );
}

/* ================= SENTENCE SCORE ================= */

export function scoreSentence(
  expectedWords: string[],
  spokenWords: string[],
): number {
  let matchedWords = 0;

  expectedWords.forEach((expectedWord) => {
    const found = spokenWords.some(
      (spokenWord) =>
        isWordMatch(
          expectedWord,
          spokenWord,
        ),
    );

    if (found) {
      matchedWords++;
    }
  });

  return Math.round(
    (matchedWords / expectedWords.length) *
      100,
  );
}

/* ================= PRONOUN ================= */

export function validatePronoun(
  spokenWords: string[],
  expectedPronoun: string,
): boolean {
  if (
    spokenWords.length === 0 ||
    !expectedPronoun
  ) {
    return false;
  }

  return isWordMatch(
    expectedPronoun,
    spokenWords[0],
  );
}

/* ================= SPLIT PHRASES ================= */

export function splitIntoChunks(
  transcript: string,
): string[] {
  return transcript
    .split(/\.|\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}