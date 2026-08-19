"use client";

import { useMemo, useState } from "react";

type UseActivityAnswersProps<TAnswer> = {
  totalQuestions: number;
  initialValue: TAnswer;
};

export default function useActivityAnswers<TAnswer>({
  totalQuestions,
  initialValue,
}: UseActivityAnswersProps<TAnswer>) {
  const [answers, setAnswers] = useState<TAnswer[]>(
    Array.from({ length: totalQuestions }, () => initialValue),
  );

  const setAnswer = (questionIndex: number, answer: TAnswer) => {
    setAnswers((previous) => {
      const updated = [...previous];
      updated[questionIndex] = answer;
      return updated;
    });
  };

  const getAnswer = (questionIndex: number) => {
    return answers[questionIndex];
  };

  const resetAnswers = () => {
    setAnswers(
      Array.from({ length: totalQuestions }, () => initialValue),
    );
  };

  const allAnswered = useMemo(() => {
    return answers.every((answer) => answer !== initialValue);
  }, [answers, initialValue]);

  return {
    answers,

    setAnswer,

    getAnswer,

    resetAnswers,

    allAnswered,
  };
}