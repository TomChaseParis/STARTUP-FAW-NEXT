"use client";

import { useMemo, useState } from "react";

export type Teacher = {
  name: string;
  avatar: string;
};

export type Choice = {
  id: string;
  label: string;
  isCorrect: boolean;
  explanation?: string;
  spokenVariants?: string[];

  teacherAudioCorrect?: string;
  teacherAudioWrong?: string;
};

export type Question = {
  id: number;
  question: string;
  image?: string;
  audioQuestion?: string;

  correctAudio?: string;
  wrongAudio?: string;

  teacher?: Teacher;

  choices: Choice[];
};

export type QuizResult = {
  questionId: number;
  selectedChoiceId: string;
  correctChoiceId: string;
  isCorrect: boolean;
};

export function useQuizEngine(questions: Question[]) {

  const safeQuestions = useMemo(() => questions ?? [], [questions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [history, setHistory] = useState<QuizResult[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const totalQuestions = safeQuestions.length;

  const currentQuestion =
    totalQuestions > 0 && currentIndex < totalQuestions
      ? safeQuestions[currentIndex]
      : null;

  const selectChoice = (choiceId: string) => {

    if (!currentQuestion || selectedChoiceId) return;

    const correctChoice = currentQuestion.choices.find((c) => c.isCorrect);

    const result: QuizResult = {
      questionId: currentQuestion.id,
      selectedChoiceId: choiceId,
      correctChoiceId: correctChoice?.id ?? "",
      isCorrect: choiceId === correctChoice?.id,
    };

    setSelectedChoiceId(choiceId);
    setHistory((prev) => [...prev, result]);

  };

  const nextQuestion = () => {

    if (currentIndex >= totalQuestions - 1) {
      setIsFinished(true);
      return;
    }

    setSelectedChoiceId(null);
    setCurrentIndex((prev) => prev + 1);

  };

  const resetQuiz = () => {

    setCurrentIndex(0);
    setSelectedChoiceId(null);
    setHistory([]);
    setIsFinished(false);

  };

  const correctAnswers = history.filter((h) => h.isCorrect).length;

  const scorePercentage =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  return {
    currentIndex,
    currentQuestion,
    selectedChoiceId,
    selectChoice,
    nextQuestion,
    resetQuiz,
    history,
    totalQuestions,
    correctAnswers,
    scorePercentage,
    isFinished,
  };

}