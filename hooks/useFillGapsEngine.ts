"use client";

import {
  useState,
  useMemo,
} from "react";

import {
  useExerciseSession,
} from "@/components/courses/common/hooks/useExerciseSession";

import {
  FillGapsData,
  GapPart,
  GapResult,
  
} from "@/types/fillGapsTypes";

/* ================= UTILS ================= */

const normalizeText = (str: string) =>
  str
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const sentenceToQuestion = (parts: GapPart[]) => {
  return parts
    .map((part) => {
      if (part.type === "text" || part.type === "dialogue") {
        return part.value;
      }

      return "_____";
    })
    .join("");
};

/* ================= HOOK ================= */

export function useFillGapsEngine(data: FillGapsData) {
  const sentences = useMemo(
    () => data.sentences ?? [],
    [data],
  );

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

  const session = useExerciseSession(totalInputs);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showCorrection, setShowCorrection] = useState(false);
  const [history, setHistory] = useState<GapResult[]>([]);

  /* ================= ANSWER ================= */

  const setAnswer = (index: number, value: string) => {
    session.start();

    setAnswers((previous) => ({
      ...previous,
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
    if (!allAnswered || showCorrection) return;

    let globalIndex = 0;
    const results: GapResult[] = [];

    sentences.forEach((sentence) => {
      const questionText = sentenceToQuestion(sentence.parts);

      sentence.parts.forEach((part) => {
        if (part.type !== "input") return;

        const userAnswer = answers[globalIndex] || "";

        const isCorrect =
          normalizeText(userAnswer) === normalizeText(part.answer);

        results.push({
          index: globalIndex,
          question: questionText,
          user: userAnswer,
          correct: part.answer,
          isCorrect,
        });

        globalIndex++;
      });
    });

    setHistory(results);
    setShowCorrection(true);

    /*
     * Chaque réponse contribue au score de la session.
     * La session est terminée une seule fois, à la fin
     * de la validation de l'ensemble de l'exercice.
     */
    results.forEach((result) => {
      session.addAnswer({
        questionId: result.index,
        question: result.question,
        selectedAnswer: result.user,
        correctAnswer: result.correct,
        isCorrect: result.isCorrect,
      });
    });

    session.complete();
  };

  /* ================= RESET ================= */

  const reset = () => {
    setAnswers({});
    setShowCorrection(false);
    setHistory([]);
    session.reset();
  };

  return {
    sentences,
    answers,
    setAnswer,
    showCorrection,
    checkAnswers,
    reset,
    progress,
    totalInputs,
    answeredCount,
    allAnswered,
    history,
    session,
  };
}