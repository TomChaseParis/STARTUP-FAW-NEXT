"use client";

import { useState, useMemo } from "react";

/* ================= TYPES ================= */

export type GapPart =
  | { type: "text"; value: string }
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

/* ================= UTILS ================= */

const normalizeText = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const sentenceToQuestion = (parts: GapPart[]) => {
  return parts
    .map((part) => {
      if (part.type === "text") {
        return part.value;
      }

      return "_____";
    })
    .join("");
};

/* ================= HOOK ================= */

export function useFillGapsEngine(data: FillGapsData) {
  const sentences = useMemo(() => data.sentences ?? [], [data]);

  const totalInputs = useMemo(() => {
    let count = 0;

    sentences.forEach((sentence) => {
      sentence.parts.forEach((part) => {
        if (part.type === "input") {
          count++;
        }
      });
    });

    return count;
  }, [sentences]);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showCorrection, setShowCorrection] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [history, setHistory] = useState<GapResult[]>([]);

  /* ================= ANSWER ================= */

  const setAnswer = (index: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  /* ================= PROGRESS ================= */

  const answeredCount = Object.values(answers).filter(
    (value) => value.trim() !== "",
  ).length;

  const progress =
    totalInputs > 0 ? (answeredCount / totalInputs) * 100 : 0;

  const allAnswered = answeredCount === totalInputs;

  /* ================= CHECK ================= */

  const checkAnswers = () => {
    let correct = 0;
    let globalIndex = 0;

    const results: GapResult[] = [];

    sentences.forEach((sentence) => {
      const questionText = sentenceToQuestion(sentence.parts);

      sentence.parts.forEach((part) => {
        if (part.type === "input") {
          const userAnswer = answers[globalIndex] || "";
          const normalizedUser = normalizeText(userAnswer);
          const normalizedCorrect = normalizeText(part.answer);

          const isCorrect = normalizedUser === normalizedCorrect;

          if (isCorrect) {
            correct++;
          }

          results.push({
            index: globalIndex,
            question: questionText,
            user: userAnswer,
            correct: part.answer,
            isCorrect,
          });

          globalIndex++;
        }
      });
    });

    const finalScore = Math.round((correct / totalInputs) * 100);

    setHistory(results);
    setScore(finalScore);
    setShowCorrection(true);
  };

  /* ================= RESET ================= */

  const reset = () => {
    setAnswers({});
    setShowCorrection(false);
    setScore(null);
    setHistory([]);
  };

  return {
    sentences,
    answers,
    setAnswer,
    showCorrection,
    score,
    checkAnswers,
    reset,
    progress,
    totalInputs,
    answeredCount,
    allAnswered,
    history,
  };
}