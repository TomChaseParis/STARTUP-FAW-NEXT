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

/* ================= HOOK ================= */

export function useFillGapsEngine(data: FillGapsData) {
  const sentences = useMemo(
    () => data.sentences ?? [],
    [data]
  );

  const totalInputs = useMemo(() => {
    let count = 0;

    sentences.forEach((s) => {
      s.parts.forEach((p) => {
        if (p.type === "input") count++;
      });
    });

    return count;
  }, [sentences]);

  const [answers, setAnswers] = useState<
    Record<number, string>
  >({});

  const [showCorrection, setShowCorrection] =
    useState(false);

  const [score, setScore] = useState<number | null>(
    null
  );

  const [history, setHistory] = useState<
    GapResult[]
  >([]);

  /* ================= ANSWER ================= */

  const setAnswer = (
    index: number,
    value: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  /* ================= PROGRESS ================= */

  const answeredCount = Object.values(
    answers
  ).filter((v) => v.trim() !== "").length;

  const progress =
    totalInputs > 0
      ? (answeredCount / totalInputs) * 100
      : 0;

  const allAnswered =
    answeredCount === totalInputs;

  /* ================= CHECK ================= */

  const checkAnswers = () => {
    let correct = 0;
    let idx = 0;

    const results: GapResult[] = [];

    sentences.forEach((sentence) => {
      sentence.parts.forEach((p) => {
        if (p.type === "input") {
          const user = normalizeText(
            answers[idx] || ""
          );

          const good = normalizeText(
            p.answer
          );

          const ok = user === good;

          if (ok) correct++;

          results.push({
            index: idx,
            user: answers[idx] || "",
            correct: p.answer,
            isCorrect: ok,
          });

          idx++;
        }
      });
    });

    const finalScore = Math.round(
      (correct / totalInputs) * 100
    );

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