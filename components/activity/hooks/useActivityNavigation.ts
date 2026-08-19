"use client";

import { useMemo, useState } from "react";

type UseActivityNavigationProps<T> = {
  questions: T[];
};

export default function useActivityNavigation<T>({
  questions,
}: UseActivityNavigationProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalQuestions = questions.length;

  const currentQuestion = useMemo(
    () => questions[currentIndex],
    [questions, currentIndex],
  );

  const canGoBack = currentIndex > 0;

  const isLastQuestion = currentIndex === totalQuestions - 1;

  const next = () => {
    if (!isLastQuestion) {
      setCurrentIndex((previous) => previous + 1);
    }
  };

  const previous = () => {
    if (canGoBack) {
      setCurrentIndex((previous) => previous - 1);
    }
  };

  const goTo = (index: number) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentIndex(index);
    }
  };

  return {
    currentIndex,

    currentQuestion,

    totalQuestions,

    canGoBack,

    isLastQuestion,

    next,

    previous,

    goTo,
  };
}