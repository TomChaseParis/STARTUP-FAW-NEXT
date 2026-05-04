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

  choices: Choice[];

  image?: string;

  teacherAudioQuestion?: string;

  teacherImage?: string;

  correctAudio?: string;
  wrongAudio?: string;
};

export type QuizResult = {
  questionId: number;
  selectedChoiceId: string;
  correctChoiceId: string;
  isCorrect: boolean;
};

/* ----------------------------- */
/* NORMALISATION TEXTE VOCALE */
/* ----------------------------- */

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .trim();
}

/* ----------------------------- */
/* SIMILARITE TEXTE */
/* ----------------------------- */

function similarity(a: string, b: string): number {
  let matches = 0;

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) {
      matches++;
    }
  }

  return matches / Math.max(a.length, b.length);
}

/* ----------------------------- */
/* DETECTION LETTRE */
/* ----------------------------- */

function detectLetter(speech: string): string | null {
  const map: Record<string, string> = {
    a: "A",
    b: "B",
    c: "C",
    d: "D",
  };

  for (const key in map) {
    if (
      speech === key ||
      speech.includes(` ${key} `) ||
      speech.startsWith(key) ||
      speech.includes(`reponse ${key}`) ||
      speech.includes(`choisis ${key}`) ||
      speech.includes(`choix ${key}`)
    ) {
      return map[key];
    }
  }

  return null;
}

/* ----------------------------- */
/* DETECTION REPONSE VOCALE */
/* ----------------------------- */

function detectChoiceFromSpeech(
  speech: string,
  choices: Choice[]
): Choice | null {
  const normalizedSpeech = normalize(speech);

  const letter = detectLetter(normalizedSpeech);

  if (letter) {
    const found = choices.find((c) => c.id === letter);
    if (found) return found;
  }

  for (const choice of choices) {
    const label = normalize(choice.label);
    if (normalizedSpeech.includes(label)) {
      return choice;
    }
  }

  for (const choice of choices) {
    if (choice.spokenVariants) {
      for (const variant of choice.spokenVariants) {
        const v = normalize(variant);
        if (normalizedSpeech.includes(v)) {
          return choice;
        }
      }
    }
  }

  for (const choice of choices) {
    const label = normalize(choice.label);
    const score = similarity(normalizedSpeech, label);
    if (score > 0.7) {
      return choice;
    }
  }

  return null;
}

/* ----------------------------- */
/* HOOK QUIZ ENGINE */
/* ----------------------------- */

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

  /* ================= SELECT ================= */

  const selectChoice = (choiceId: string) => {
    if (!currentQuestion || selectedChoiceId !== null) return;
    setSelectedChoiceId(choiceId);
  };

  /* ================= SPEECH ================= */

  const processSpeechAnswer = (speech: string) => {
    if (!currentQuestion) return;

    const detectedChoice = detectChoiceFromSpeech(
      speech,
      currentQuestion.choices
    );

    if (detectedChoice) {
      selectChoice(detectedChoice.id);
    }
  };

  /* ================= NEXT ================= */

  const nextQuestion = () => {
    if (!currentQuestion || !selectedChoiceId) return;

    const correctChoice = currentQuestion.choices.find((c) => c.isCorrect);

    const result: QuizResult = {
      questionId: currentQuestion.id,
      selectedChoiceId,
      correctChoiceId: correctChoice?.id ?? "",
      isCorrect: selectedChoiceId === correctChoice?.id,
    };

    setHistory((prev) => [...prev, result]);

    if (currentIndex >= totalQuestions - 1) {
      setIsFinished(true);
      return;
    }

    setSelectedChoiceId(null);
    setCurrentIndex((prev) => prev + 1);
  };

  /* ================= RESET ================= */

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedChoiceId(null);
    setHistory([]);
    setIsFinished(false);
  };

  /* ================= SCORE ================= */

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
    processSpeechAnswer,
  };
}