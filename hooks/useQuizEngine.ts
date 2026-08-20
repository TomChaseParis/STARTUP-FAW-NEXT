"use client";

import {
  useMemo,
  useRef,
  useState,
} from "react";

import { useExerciseSession } from "@/components/courses/common/hooks/useExerciseSession";
import { ProgressEngine } from "@/components/courses/engines/ProgressEngine/ProgressEngine";

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

  type?: "single-choice" | "multiple-choice";

  image?: string;

  teacherImage?: string;

  teacherAudioQuestion?: string;

  correctAudio?: string;

  wrongAudio?: string;
};

export type QuizProgressConfig = {
  progress: ProgressEngine;
  activityId: string;
  exerciseId: string;
  onScoreSubmitted?: (score: number) => void;
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
  if (!a || !b) {
    return 0;
  }

  let matches = 0;

  for (
    let i = 0;
    i < Math.min(a.length, b.length);
    i++
  ) {
    if (a[i] === b[i]) {
      matches++;
    }
  }

  return (
    matches /
    Math.max(a.length, b.length)
  );
}

/* ----------------------------- */
/* DETECTION LETTRE */
/* ----------------------------- */

function detectLetter(
  speech: string,
): string | null {
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
  const normalizedSpeech =
    normalize(speech);

  const letter =
    detectLetter(normalizedSpeech);

  if (letter) {
    const found = choices.find(
      (choice) => choice.id === letter,
    );

    if (found) {
      return found;
    }
  }

  for (const choice of choices) {
    const label = normalize(
      choice.label,
    );

    if (
      label &&
      normalizedSpeech.includes(label)
    ) {
      return choice;
    }
  }

  for (const choice of choices) {
    if (!choice.spokenVariants) {
      continue;
    }

    for (const variant of choice.spokenVariants) {
      const normalizedVariant =
        normalize(variant);

      if (
        normalizedVariant &&
        normalizedSpeech.includes(
          normalizedVariant,
        )
      ) {
        return choice;
      }
    }
  }

  for (const choice of choices) {
    const label = normalize(
      choice.label,
    );

    const score = similarity(
      normalizedSpeech,
      label,
    );

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
  progressConfig?: QuizProgressConfig,
) {
  const safeQuestions = useMemo(
    () => questions ?? [],
    [questions],
  );

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [
    selectedChoiceId,
    setSelectedChoiceId,
  ] = useState<string | null>(null);

  const [
    selectedChoiceIds,
    setSelectedChoiceIds,
  ] = useState<string[]>([]);

  const [
    correctAnswersCount,
    setCorrectAnswersCount,
  ] = useState(0);

  const progressSubmittedRef =
    useRef(false);

  const totalQuestions =
    safeQuestions.length;

  const session =
    useExerciseSession(
      totalQuestions,
    );

  const currentQuestion =
    totalQuestions > 0 &&
    currentIndex < totalQuestions
      ? safeQuestions[currentIndex]
      : null;

  const isMultipleChoice =
    currentQuestion?.type ===
    "multiple-choice";

  /* ================= SELECT ================= */

  const selectChoice = (
    choiceId: string,
  ) => {
    if (!currentQuestion) {
      return;
    }

    session.start();

    /*
     * ==================================================
     * QUESTION MULTIPLE-CHOICE
     * ==================================================
     *
     * Chaque réponse est indépendante.
     *
     * A → feedback immédiat
     * C → feedback immédiat
     *
     * Une réponse déjà traitée ne peut plus
     * être sélectionnée une deuxième fois.
     */

    if (isMultipleChoice) {
      if (
        selectedChoiceIds.includes(
          choiceId,
        )
      ) {
        return;
      }

      setSelectedChoiceIds(
        (previous) => [
          ...previous,
          choiceId,
        ],
      );

      return;
    }

    /*
     * ==================================================
     * QUESTION SINGLE-CHOICE
     * ==================================================
     */

    if (selectedChoiceId !== null) {
      return;
    }

    setSelectedChoiceId(
      choiceId,
    );

    setSelectedChoiceIds([
      choiceId,
    ]);
  };

  /* ================= SPEECH ================= */

  const processSpeechAnswer = (
    speech: string,
  ) => {
    if (!currentQuestion) {
      return;
    }

    const detectedChoice =
      detectChoiceFromSpeech(
        speech,
        currentQuestion.choices,
      );

    if (!detectedChoice) {
      return;
    }

    selectChoice(
      detectedChoice.id,
    );
  };

  /* ================= SUBMIT SCORE ================= */

  const submitProgressScore = (
    finalCorrectAnswersCount: number,
  ) => {
    if (!progressConfig) {
      return;
    }

    if (totalQuestions === 0) {
      return;
    }

    if (progressSubmittedRef.current) {
      return;
    }

    const {
      progress,
      activityId,
      exerciseId,
      onScoreSubmitted,
    } = progressConfig;

    const exercise =
      progress.getExercise(
        activityId,
        exerciseId,
      );

    if (!exercise) {
      console.error(
        "[QuizEngine] Impossible de soumettre le score :",
        "l'exercice de progression n'existe pas.",
        {
          activityId,
          exerciseId,
        },
      );

      return;
    }

    const score = Math.round(
      (finalCorrectAnswersCount /
        totalQuestions) *
        100,
    );

    progress.submitScore(
      activityId,
      exerciseId,
      score,
    );

    progressSubmittedRef.current =
      true;

    onScoreSubmitted?.(score);

    console.log(
      "[QuizEngine] Score soumis au ProgressEngine:",
      {
        activityId,
        exerciseId,
        score,
        progress:
          progress.getExercise(
            activityId,
            exerciseId,
          ),
      },
    );
  };

  /* ================= NEXT ================= */

  const nextQuestion = () => {
    if (!currentQuestion) {
      return;
    }

    /*
     * ==================================================
     * SINGLE-CHOICE
     * ==================================================
     */

    if (!isMultipleChoice) {
      if (!selectedChoiceId) {
        return;
      }

      const selectedChoice =
        currentQuestion.choices.find(
          (choice) =>
            choice.id ===
            selectedChoiceId,
        );

      const correctChoice =
        currentQuestion.choices.find(
          (choice) =>
            choice.isCorrect,
        );

      const isCorrect =
        selectedChoiceId ===
        correctChoice?.id;

      const nextCorrectAnswersCount =
        correctAnswersCount +
        (isCorrect ? 1 : 0);

      session.addAnswer({
        questionId:
          currentQuestion.id,

        question:
          currentQuestion.question,

        selectedAnswer:
          selectedChoice?.label ?? "",

        correctAnswer:
          correctChoice?.label ?? "",

        isCorrect,

        explanation:
          correctChoice?.explanation,
      });

      setCorrectAnswersCount(
        nextCorrectAnswersCount,
      );

      const isLastQuestion =
        currentIndex ===
        totalQuestions - 1;

      if (isLastQuestion) {
        submitProgressScore(
          nextCorrectAnswersCount,
        );
      }

      session.next();

      if (!isLastQuestion) {
        setCurrentIndex(
          (previous) =>
            previous + 1,
        );
      }

      setSelectedChoiceId(null);

      setSelectedChoiceIds([]);

      return;
    }

    /*
     * ==================================================
     * MULTIPLE-CHOICE
     * ==================================================
     */

    if (
      selectedChoiceIds.length === 0
    ) {
      return;
    }

    const selectedChoices =
      currentQuestion.choices.filter(
        (choice) =>
          selectedChoiceIds.includes(
            choice.id,
          ),
      );

    const correctChoices =
      currentQuestion.choices.filter(
        (choice) =>
          choice.isCorrect,
      );

    const selectedCorrectChoices =
      selectedChoices.filter(
        (choice) =>
          choice.isCorrect,
      );

    const selectedWrongChoices =
      selectedChoices.filter(
        (choice) =>
          !choice.isCorrect,
      );

    /*
     * La question multiple est correcte
     * uniquement si :
     *
     * - toutes les bonnes réponses ont
     *   été sélectionnées ;
     * - aucune mauvaise réponse n'a été
     *   sélectionnée.
     */

    const isCorrect =
      selectedCorrectChoices.length ===
        correctChoices.length &&
      selectedWrongChoices.length === 0 &&
      selectedChoices.length ===
        correctChoices.length;

    const selectedAnswer =
      selectedChoices
        .map(
          (choice) =>
            choice.label,
        )
        .join(" ; ");

    const correctAnswer =
      correctChoices
        .map(
          (choice) =>
            choice.label,
        )
        .join(" ; ");

    const explanation =
      correctChoices
        .map(
          (choice) =>
            choice.explanation,
        )
        .filter(Boolean)
        .join(" ");

    const nextCorrectAnswersCount =
      correctAnswersCount +
      (isCorrect ? 1 : 0);

    session.addAnswer({
      questionId:
        currentQuestion.id,

      question:
        currentQuestion.question,

      selectedAnswer,

      correctAnswer,

      isCorrect,

      explanation:
        explanation || undefined,
    });

    setCorrectAnswersCount(
      nextCorrectAnswersCount,
    );

    const isLastQuestion =
      currentIndex ===
      totalQuestions - 1;

    if (isLastQuestion) {
      submitProgressScore(
        nextCorrectAnswersCount,
      );
    }

    session.next();

    if (!isLastQuestion) {
      setCurrentIndex(
        (previous) =>
          previous + 1,
      );
    }

    setSelectedChoiceId(null);

    setSelectedChoiceIds([]);
  };

  /* ================= RESET ================= */

  const resetQuiz = () => {
    setCurrentIndex(0);

    setSelectedChoiceId(null);

    setSelectedChoiceIds([]);

    setCorrectAnswersCount(0);

    progressSubmittedRef.current =
      false;

    session.reset();
  };

  /* ================= RETURN ================= */

  return {
    currentIndex,

    currentQuestion,

    selectedChoiceId,

    selectedChoiceIds,

    selectChoice,

    nextQuestion,

    resetQuiz,

    totalQuestions,

    correctAnswers:
      session.correctAnswers,

    correctAnswersCount,

    history:
      session.history,

    isFinished:
      session.isFinished,

    processSpeechAnswer,

    session,
  };
}