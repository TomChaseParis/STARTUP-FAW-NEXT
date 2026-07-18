import { useMemo, useRef, useState } from "react";

import {
  ExerciseHistoryItem,
  ExerciseResult,
} from "../types/exerciseSessionTypes";

import { computeScore } from "@/components/courses/common/utils/quizScoring";

export function useExerciseSession(totalQuestions: number) {
  const startedAt = useRef(new Date());

  const [finishedAt, setFinishedAt] = useState<Date | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [history, setHistory] = useState<ExerciseHistoryItem[]>([]);

  const [isFinished, setIsFinished] = useState(false);

  const score = useMemo(
    () => computeScore(correctAnswers, totalQuestions),
    [correctAnswers, totalQuestions],
  );

  function addAnswer(answer: ExerciseHistoryItem) {
    setHistory((previous) => [...previous, answer]);

    if (answer.isCorrect) {
      setCorrectAnswers((previous) => previous + 1);
    }
  }

  function next() {
    if (currentIndex >= totalQuestions - 1) {
      complete();
      return;
    }

    setCurrentIndex((previous) => previous + 1);
  }

  function complete() {
    setFinishedAt(new Date());

    setIsFinished(true);
  }

  function reset() {
    startedAt.current = new Date();

    setFinishedAt(null);

    setCurrentIndex(0);

    setCorrectAnswers(0);

    setHistory([]);

    setIsFinished(false);
  }

  const duration =
    finishedAt === null
      ? 0
      : Math.round((finishedAt.getTime() - startedAt.current.getTime()) / 1000);

  const result: ExerciseResult = {
    score,
    correctAnswers,
    totalQuestions,
    history,
    startedAt: startedAt.current,
    finishedAt,
    duration,
  };

  return {
    currentIndex,

    score,

    correctAnswers,

    history,

    isFinished,

    startedAt: startedAt.current,

    finishedAt,

    duration,

    result,

    addAnswer,

    next,

    complete,

    reset,
  };
}
