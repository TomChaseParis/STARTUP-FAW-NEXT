"use client";

import { useMemo, useState } from "react";
import { useExerciseSession } from "@/components/courses/common/hooks/useExerciseSession";

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

  teacherImage?: string;

  teacherAudioQuestion?: string;

  correctAudio?: string;

  wrongAudio?: string;
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
  choices: Choice[],
): Choice | null {
  const normalizedSpeech = normalize(speech);

  const letter = detectLetter(normalizedSpeech);

  if (letter) {
    const found = choices.find((c) => c.id === letter);

    if (found) {
      return found;
    }
  }

  for (const choice of choices) {
    const label = normalize(choice.label);

    if (normalizedSpeech.includes(label)) {
      return choice;
    }
  }

  for (const choice of choices) {
    if (!choice.spokenVariants) continue;

    for (const variant of choice.spokenVariants) {
      const normalizedVariant = normalize(variant);

      if (normalizedSpeech.includes(normalizedVariant)) {
        return choice;
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

export function useQuizEngine(
  questions: Question[],
) {
  const safeQuestions = useMemo(
    () => questions ?? [],
    [questions],
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedChoiceId, setSelectedChoiceId] =
    useState<string | null>(null);

  const totalQuestions = safeQuestions.length;

  const session = useExerciseSession(totalQuestions);

  const currentQuestion =
    totalQuestions > 0 &&
    currentIndex < totalQuestions
      ? safeQuestions[currentIndex]
      : null;

  /* ================= SELECT ================= */

  const selectChoice = (choiceId: string) => {
    if (!currentQuestion) return;

    if (selectedChoiceId !== null) return;

    session.start();

    setSelectedChoiceId(choiceId);
  };

  /* ================= SPEECH ================= */

  const processSpeechAnswer = (
    speech: string,
  ) => {
    if (!currentQuestion) return;

    const detectedChoice =
      detectChoiceFromSpeech(
        speech,
        currentQuestion.choices,
      );

    if (detectedChoice) {
      selectChoice(detectedChoice.id);
    }
  };

  /* ================= NEXT ================= */

  const nextQuestion = () => {
    if (!currentQuestion) return;

    if (!selectedChoiceId) return;

    const correctChoice =
      currentQuestion.choices.find(
        (choice) => choice.isCorrect,
      );

    session.addAnswer({
      questionId: currentQuestion.id,

      question: currentQuestion.question,

      selectedAnswer:
        currentQuestion.choices.find(
          (choice) =>
            choice.id === selectedChoiceId,
        )?.label ?? "",

      correctAnswer:
        correctChoice?.label ?? "",

      isCorrect:
        selectedChoiceId ===
        correctChoice?.id,

      explanation:
        correctChoice?.explanation,
    });

    session.next();

    if (
      currentIndex <
      totalQuestions - 1
    ) {
      setCurrentIndex(
        (previous) => previous + 1,
      );
    }

    setSelectedChoiceId(null);
  };

    /* ================= RESET ================= */

    const resetQuiz = () => {
      setCurrentIndex(0);
  
      setSelectedChoiceId(null);
  
      session.reset();
    };
  
    /* ================= RETURN ================= */
  
    return {
      currentIndex,
  
      currentQuestion,
  
      selectedChoiceId,
  
      selectChoice,
  
      nextQuestion,
  
      resetQuiz,
  
      totalQuestions,
  
      history: session.history,
  
      correctAnswers: session.correctAnswers,
  
      isFinished: session.isFinished,
  
      processSpeechAnswer,
  
      session,
    };
  }