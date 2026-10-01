"use client";

import {
  useCallback,
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
  onScoreSubmitted?: (
    score: number,
  ) => void;
};

/* ----------------------------- */
/* NORMALISATION TEXTE VOCALE */
/* ----------------------------- */

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ----------------------------- */
/* NORMALISATION DES NOMBRES */
/* ----------------------------- */

function normalizeNumbers(
  text: string,
): string {
  let normalized =
    normalize(text);

  /*
   * On transforme les nombres écrits
   * en lettres vers leur équivalent
   * numérique.
   *
   * Exemples :
   *
   * quarante-six → 46
   * quarante six → 46
   * quarante → 40
   * trente-six → 36
   * trente six → 36
   */

  const numberReplacements: Array<
    [RegExp, string]
  > = [
    [
      /\bquarante[\s-]+six\b/g,
      "46",
    ],
    [
      /\bquarante[\s-]+cinq\b/g,
      "45",
    ],
    [
      /\bquarante[\s-]+quatre\b/g,
      "44",
    ],
    [
      /\bquarante[\s-]+trois\b/g,
      "43",
    ],
    [
      /\bquarante[\s-]+deux\b/g,
      "42",
    ],
    [
      /\bquarante[\s-]+un\b/g,
      "41",
    ],
    [
      /\btrente[\s-]+neuf\b/g,
      "39",
    ],
    [
      /\btrente[\s-]+huit\b/g,
      "38",
    ],
    [
      /\btrente[\s-]+sept\b/g,
      "37",
    ],
    [
      /\btrente[\s-]+six\b/g,
      "36",
    ],
    [
      /\btrente[\s-]+cinq\b/g,
      "35",
    ],
    [
      /\btrente[\s-]+quatre\b/g,
      "34",
    ],
    [
      /\btrente[\s-]+trois\b/g,
      "33",
    ],
    [
      /\btrente[\s-]+deux\b/g,
      "32",
    ],
    [
      /\btrente[\s-]+un\b/g,
      "31",
    ],
    [
      /\bquarante\b/g,
      "40",
    ],
    [
      /\btrente\b/g,
      "30",
    ],
    [
      /\bvingt\b/g,
      "20",
    ],
    [
      /\bdix-neuf\b/g,
      "19",
    ],
    [
      /\bdix neuf\b/g,
      "19",
    ],
    [
      /\bdix-huit\b/g,
      "18",
    ],
    [
      /\bdix huit\b/g,
      "18",
    ],
    [
      /\bdix-sept\b/g,
      "17",
    ],
    [
      /\bdix sept\b/g,
      "17",
    ],
    [
      /\bseize\b/g,
      "16",
    ],
    [
      /\bquinze\b/g,
      "15",
    ],
    [
      /\bquatorze\b/g,
      "14",
    ],
    [
      /\btreize\b/g,
      "13",
    ],
    [
      /\bdouze\b/g,
      "12",
    ],
    [
      /\bonze\b/g,
      "11",
    ],
    [
      /\bdix\b/g,
      "10",
    ],
    [
      /\bneuf\b/g,
      "9",
    ],
    [
      /\bhuit\b/g,
      "8",
    ],
    [
      /\bsept\b/g,
      "7",
    ],
    [
      /\bsix\b/g,
      "6",
    ],
    [
      /\bcinq\b/g,
      "5",
    ],
    [
      /\bquatre\b/g,
      "4",
    ],
    [
      /\btrois\b/g,
      "3",
    ],
    [
      /\bdeux\b/g,
      "2",
    ],
    [
      /\bun\b/g,
      "1",
    ],
    [
      /\bzéro\b/g,
      "0",
    ],
    [
      /\bzero\b/g,
      "0",
    ],
  ];

  for (const [
    pattern,
    replacement,
  ] of numberReplacements) {
    normalized =
      normalized.replace(
        pattern,
        replacement,
      );
  }

  return normalized
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}

/* ----------------------------- */
/* SIMILARITE TEXTE */
/* ----------------------------- */

function similarity(
  a: string,
  b: string,
): number {
  if (!a || !b) {
    return 0;
  }

  let matches = 0;

  for (
    let i = 0;
    i <
    Math.min(
      a.length,
      b.length,
    );
    i++
  ) {
    if (a[i] === b[i]) {
      matches++;
    }
  }

  return (
    matches /
    Math.max(
      a.length,
      b.length,
    )
  );
}

/* ----------------------------- */
/* DETECTION LETTRE */
/* ----------------------------- */

function detectLetter(
  speech: string,
): string | null {
  const normalized =
    normalize(speech);

  /*
   * Une lettre seule est une réponse
   * valide.
   */

  if (normalized === "a") {
    return "A";
  }

  if (normalized === "b") {
    return "B";
  }

  if (normalized === "c") {
    return "C";
  }

  if (normalized === "d") {
    return "D";
  }

  /*
   * ==================================================
   * LETTRE + RÉPONSE
   * ==================================================
   *
   * Exemples acceptés :
   *
   * B. Fido est mon prénom...
   * B : Fido est mon prénom...
   * B, Fido est mon prénom...
   * B - Fido est mon prénom...
   * B; Fido est mon prénom...
   *
   * IMPORTANT :
   *
   * On exige une ponctuation après la lettre.
   *
   * Cela évite qu'une phrase comme :
   *
   * "A Marseille..."
   *
   * soit interprétée comme une réponse A.
   */

  const explicitLetterMatch =
    speech
      .trim()
      .match(
        /^([ABCD])\s*[.:,;-]\s*\S/i,
      );

  if (explicitLetterMatch) {
    const letter =
      explicitLetterMatch[1].toUpperCase();

    console.log(
      "[QuizEngine] Lettre explicite détectée :",
      letter,
    );

    return letter;
  }

  /*
   * ==================================================
   * FORMULATIONS EXPLICITES
   * ==================================================
   *
   * Exemples :
   *
   * Réponse B
   * Choix B
   * Je choisis B
   * Je prends B
   */

  const patterns: Array<{
    pattern: RegExp;
    letter: string;
  }> = [
    {
      pattern:
        /^(?:reponse|réponse)\s+a$/,
      letter: "A",
    },
    {
      pattern:
        /^(?:reponse|réponse)\s+b$/,
      letter: "B",
    },
    {
      pattern:
        /^(?:reponse|réponse)\s+c$/,
      letter: "C",
    },
    {
      pattern:
        /^(?:reponse|réponse)\s+d$/,
      letter: "D",
    },
    {
      pattern:
        /^(?:choix|choisis|je choisis|je prends|je prend)\s+a$/,
      letter: "A",
    },
    {
      pattern:
        /^(?:choix|choisis|je choisis|je prends|je prend)\s+b$/,
      letter: "B",
    },
    {
      pattern:
        /^(?:choix|choisis|je choisis|je prends|je prend)\s+c$/,
      letter: "C",
    },
    {
      pattern:
        /^(?:choix|choisis|je choisis|je prends|je prend)\s+d$/,
      letter: "D",
    },
  ];

  for (const item of patterns) {
    if (
      item.pattern.test(
        normalized,
      )
    ) {
      return item.letter;
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

  const normalizedSpeechNumbers =
    normalizeNumbers(
      speech,
    );

  console.log(
    "[QuizEngine] Texte vocal normalisé :",
    normalizedSpeech,
  );

  console.log(
    "[QuizEngine] Texte vocal avec nombres normalisés :",
    normalizedSpeechNumbers,
  );

  /*
   * ==================================================
   * DETECTION PAR LETTRE
   * ==================================================
   */

  const letter =
    detectLetter(
      speech,
    );

  if (letter) {
    console.log(
      "[QuizEngine] Lettre détectée :",
      letter,
    );

    const found =
      choices.find(
        (choice) =>
          choice.id.toUpperCase() ===
          letter,
      );

    if (found) {
      console.log(
        "[QuizEngine] Réponse trouvée par lettre :",
        found,
      );

      return found;
    }
  }

  /*
   * ==================================================
   * DETECTION PAR TEXTE COMPLET
   * ==================================================
   */

  for (const choice of choices) {
    const label =
      normalize(
        choice.label,
      );

    const labelNumbers =
      normalizeNumbers(
        choice.label,
      );

    /*
     * Comparaison classique.
     */

    if (
      label &&
      normalizedSpeech.includes(
        label,
      )
    ) {
      console.log(
        "[QuizEngine] Réponse trouvée par texte :",
        choice,
      );

      return choice;
    }

    /*
     * Comparaison avec les nombres
     * normalisés.
     */

    if (
      labelNumbers &&
      normalizedSpeechNumbers.includes(
        labelNumbers,
      )
    ) {
      console.log(
        "[QuizEngine] Réponse trouvée par texte avec nombres normalisés :",
        choice,
      );

      return choice;
    }
  }

  /*
   * ==================================================
   * DETECTION PAR VARIANTE
   * ==================================================
   */

  for (const choice of choices) {
    if (
      !choice.spokenVariants
    ) {
      continue;
    }

    for (const variant of choice.spokenVariants) {
      const normalizedVariant =
        normalize(
          variant,
        );

      const normalizedVariantNumbers =
        normalizeNumbers(
          variant,
        );

      if (
        normalizedVariant &&
        normalizedSpeech.includes(
          normalizedVariant,
        )
      ) {
        console.log(
          "[QuizEngine] Réponse trouvée par variante :",
          choice,
        );

        return choice;
      }

      if (
        normalizedVariantNumbers &&
        normalizedSpeechNumbers.includes(
          normalizedVariantNumbers,
        )
      ) {
        console.log(
          "[QuizEngine] Réponse trouvée par variante avec nombres normalisés :",
          choice,
        );

        return choice;
      }
    }
  }

  /*
   * ==================================================
   * DETECTION PAR SIMILARITE
   * ==================================================
   */

  for (const choice of choices) {
    const label =
      normalize(
        choice.label,
      );

    const labelNumbers =
      normalizeNumbers(
        choice.label,
      );

    /*
     * Similarité classique.
     */

    const score =
      similarity(
        normalizedSpeech,
        label,
      );

    if (score > 0.7) {
      console.log(
        "[QuizEngine] Réponse trouvée par similarité :",
        {
          choice,
          score,
        },
      );

      return choice;
    }

    /*
     * Similarité après normalisation
     * des nombres.
     */

    const numberScore =
      similarity(
        normalizedSpeechNumbers,
        labelNumbers,
      );

    if (
      numberScore > 0.7
    ) {
      console.log(
        "[QuizEngine] Réponse trouvée par similarité avec nombres normalisés :",
        {
          choice,
          score:
            numberScore,
        },
      );

      return choice;
    }
  }

  console.warn(
    "[QuizEngine] Aucune réponse détectée pour :",
    speech,
  );

  return null;
}

/* ----------------------------- */
/* HOOK QUIZ ENGINE */
/* ----------------------------- */

export function useQuizEngine(
  questions: Question[],
  progressConfig?: QuizProgressConfig,
) {
  const safeQuestions =
    useMemo(
      () => questions ?? [],
      [questions],
    );

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    selectedChoiceId,
    setSelectedChoiceId,
  ] = useState<
    string | null
  >(null);

  const [
    selectedChoiceIds,
    setSelectedChoiceIds,
  ] = useState<string[]>(
    [],
  );

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
    currentIndex <
      totalQuestions
      ? safeQuestions[
          currentIndex
        ]
      : null;

  const isMultipleChoice =
    currentQuestion?.type ===
    "multiple-choice";

  /* ================= SELECT ================= */

  const selectChoice =
    useCallback(
      (choiceId: string) => {
        if (!currentQuestion) {
          return;
        }

        session.start();

        /*
         * ==================================================
         * MULTIPLE-CHOICE
         * ==================================================
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
         * SINGLE-CHOICE
         * ==================================================
         */

        if (
          selectedChoiceId !== null
        ) {
          return;
        }

        setSelectedChoiceId(
          choiceId,
        );

        setSelectedChoiceIds([
          choiceId,
        ]);
      },
      [
        currentQuestion,
        isMultipleChoice,
        selectedChoiceId,
        selectedChoiceIds,
        session,
      ],
    );

  /* ================= SPEECH ================= */

  const processSpeechAnswer =
    useCallback(
      (speech: string) => {
        if (!currentQuestion) {
          console.warn(
            "[QuizEngine] Aucune question courante pour la réponse vocale.",
          );

          return;
        }

        console.log(
          "[QuizEngine] Réponse vocale reçue :",
          speech,
        );

        console.log(
          "[QuizEngine] Choix disponibles :",
          currentQuestion.choices.map(
            (choice) => ({
              id: choice.id,
              label: choice.label,
            }),
          ),
        );

        const detectedChoice =
          detectChoiceFromSpeech(
            speech,
            currentQuestion.choices,
          );

        if (
          !detectedChoice
        ) {
          console.warn(
            "[QuizEngine] Impossible d'identifier une réponse.",
          );

          return;
        }

        console.log(
          "[QuizEngine] Sélection de la réponse :",
          detectedChoice.id,
        );

        selectChoice(
          detectedChoice.id,
        );
      },
      [
        currentQuestion,
        selectChoice,
      ],
    );

  /* ================= SUBMIT SCORE ================= */

  const submitProgressScore =
    useCallback(
      (
        finalCorrectAnswersCount: number,
      ) => {
        if (!progressConfig) {
          return;
        }

        if (
          totalQuestions === 0
        ) {
          return;
        }

        if (
          progressSubmittedRef.current
        ) {
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

        const score =
          Math.round(
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

        onScoreSubmitted?.(
          score,
        );

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
      },
      [
        progressConfig,
        totalQuestions,
      ],
    );

  /* ================= NEXT ================= */

  const nextQuestion =
    useCallback(() => {
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
            selectedChoice?.label ??
            "",

          correctAnswer:
            correctChoice?.label ??
            "",

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

        setSelectedChoiceId(
          null,
        );

        setSelectedChoiceIds(
          [],
        );

        return;
      }

      /* ==================================================
         MULTIPLE-CHOICE
         ================================================== */

      if (
        selectedChoiceIds.length ===
        0
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

      const isCorrect =
        selectedCorrectChoices.length ===
          correctChoices.length &&
        selectedWrongChoices.length ===
          0 &&
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
          explanation ||
          undefined,
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

      setSelectedChoiceId(
        null,
      );

      setSelectedChoiceIds(
        [],
      );
    }, [
      currentQuestion,
      isMultipleChoice,
      selectedChoiceId,
      selectedChoiceIds,
      correctAnswersCount,
      currentIndex,
      totalQuestions,
      session,
      submitProgressScore,
    ]);

  /* ================= RESET ================= */

  const resetQuiz =
    useCallback(() => {
      setCurrentIndex(0);

      setSelectedChoiceId(
        null,
      );

      setSelectedChoiceIds(
        [],
      );

      setCorrectAnswersCount(0);

      progressSubmittedRef.current =
        false;

      session.reset();
    }, [session]);

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