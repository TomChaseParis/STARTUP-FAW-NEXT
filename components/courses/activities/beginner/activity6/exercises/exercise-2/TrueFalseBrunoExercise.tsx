"use client";

import {
  useEffect,
  useState,
} from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  useExerciseSession,
} from "@/components/courses/common/hooks/useExerciseSession";

import type {
  ExerciseSessionResult,
} from "@/components/courses/common/types/exerciseSessionTypes";

import TrueFalseQuestionCard from "./TrueFalseQuestionCard";

import {
  trueFalseBrunoData,
} from "../../data/trueFalseBrunoData";

type Answer = "true" | "false";

type TrueFalseBrunoExerciseProps = {
  onComplete?: (
    result: ExerciseSessionResult,
  ) => void;
};

export default function TrueFalseBrunoExercise({
  onComplete,
}: TrueFalseBrunoExerciseProps) {
  /*
   * =========================================================
   * SESSION
   * =========================================================
   */

  const totalQuestions =
    trueFalseBrunoData.length;

  const session =
    useExerciseSession(
      totalQuestions,
    );

  /*
   * =========================================================
   * ÉTAT DE L'EXERCICE
   * =========================================================
   */

  const [
    currentQuestionIndex,
    setCurrentQuestionIndex,
  ] = useState(0);

  const [
    selectedAnswer,
    setSelectedAnswer,
  ] = useState<Answer | null>(null);

  /*
   * Historique visuel des réponses.
   *
   * Permet d'afficher les petits ✓ / ✕
   * dans la progression.
   */

  const [
    answerHistory,
    setAnswerHistory,
  ] = useState<
    Array<Answer | null>
  >(
    () =>
      Array(totalQuestions).fill(null),
  );

  /*
   * =========================================================
   * QUESTION COURANTE
   * =========================================================
   */

  const currentQuestion =
    trueFalseBrunoData[
      currentQuestionIndex
    ];

  /*
   * =========================================================
   * RÉSULTAT
   * =========================================================
   */

  useEffect(() => {
    if (!session.isFinished) {
      return;
    }

    onComplete?.(
      session.result,
    );
  }, [
    session.isFinished,
    session.result,
    onComplete,
  ]);

  /*
   * =========================================================
   * DÉMARRAGE DE LA SESSION
   * =========================================================
   */

  const startSession = () => {
    session.start();
  };

  /*
   * =========================================================
   * RÉPONSE
   * =========================================================
   */

  const handleAnswer = (
    answer: Answer,
  ) => {
    if (selectedAnswer !== null) {
      return;
    }

    startSession();

    setSelectedAnswer(answer);

    setAnswerHistory(
      (previous) => {
        const next = [
          ...previous,
        ];

        next[currentQuestionIndex] =
          answer;

        return next;
      },
    );

    const isCorrect =
      answer ===
      currentQuestion.correctAnswer;

    session.addAnswer({
      questionId:
        currentQuestion.id,

      question:
        currentQuestion.statement,

      selectedAnswer:
        answer === "true"
          ? "VRAI"
          : "FAUX",

      correctAnswer:
        currentQuestion.correctAnswer ===
        "true"
          ? "VRAI"
          : "FAUX",

      isCorrect,

      explanation:
        currentQuestion.explanation,
    });
  };

  /*
   * =========================================================
   * QUESTION SUIVANTE
   * =========================================================
   */

  const handleNext = () => {
    if (selectedAnswer === null) {
      return;
    }
  
    const isLastQuestion =
      currentQuestionIndex ===
      totalQuestions - 1;
  
    if (isLastQuestion) {
      session.complete();
      return;
    }
  
    setSelectedAnswer(null);
  
    setCurrentQuestionIndex(
      (previous) =>
        previous + 1,
    );
  };

  /*
   * =========================================================
   * PROGRESSION
   * =========================================================
   */

  const progress =
    ((currentQuestionIndex +
      (selectedAnswer !== null
        ? 1
        : 0)) /
      totalQuestions) *
    100;

  /*
   * =========================================================
   * RENDU
   * =========================================================
   */

  if (!currentQuestion) {
    return null;
  }

  return (
    <section
      className="
        w-full
        overflow-x-hidden
        bg-gradient-to-b
        from-white
        via-slate-50
        to-white
        pb-20
        pt-4
      "
    >
      <div
        className="
          container
          mx-auto
          w-full
          max-w-5xl
          px-4
          sm:px-6
        "
      >
        {/* ===================================================
            EN-TÊTE
        ==================================================== */}

        <div className="mb-6">
          <div
            className="
              mb-3
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-extrabold
                  uppercase
                  tracking-[0.18em]
                  text-amber-600
                "
              >
                Vrai ou faux ?
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  font-medium
                  text-slate-500
                "
              >
                Vérifie ce que tu as compris.
              </p>
            </div>

            <div
              className="
                shrink-0
                rounded-full
                bg-white
                px-4
                py-2
                text-sm
                font-bold
                text-slate-700
                shadow-sm
                ring-1
                ring-slate-200
              "
            >
              Question{" "}
              <span className="text-amber-600">
                {currentQuestionIndex + 1}
              </span>{" "}
              / {totalQuestions}
            </div>
          </div>

          {/* Barre de progression */}

          <div
            className="
              h-2.5
              w-full
              overflow-hidden
              rounded-full
              bg-slate-200
            "
          >
            <motion.div
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-amber-400
                to-amber-600
              "
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
            />
          </div>
        </div>

        {/* ===================================================
            INDICATEURS DES QUESTIONS
        ==================================================== */}

        <div
          className="
            mb-8
            flex
            items-center
            justify-center
            gap-2
          "
        >
          {trueFalseBrunoData.map(
            (question, index) => {
              const answer =
                answerHistory[index];

              const isCurrent =
                index ===
                currentQuestionIndex;

              return (
                <div
                  key={question.id}
                  className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    text-xs
                    font-extrabold
                    transition-all
                    duration-300
                    ${
                      answer === null
                        ? isCurrent
                          ? "bg-amber-100 text-amber-700 ring-2 ring-amber-400 ring-offset-2"
                          : "bg-slate-200 text-slate-400"
                        : answer ===
                          trueFalseBrunoData[
                            index
                          ].correctAnswer
                        ? "bg-emerald-500 text-white"
                        : "bg-red-500 text-white"
                    }
                  `}
                >
                  {answer === null
                    ? index + 1
                    : answer ===
                        trueFalseBrunoData[
                          index
                        ]
                          .correctAnswer
                      ? "✓"
                      : "✕"}
                </div>
              );
            },
          )}
        </div>

        {/* ===================================================
            QUESTION
        ==================================================== */}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -25,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <TrueFalseQuestionCard
              statement={
                currentQuestion.statement
              }
              selectedAnswer={
                selectedAnswer
              }
              correctAnswer={
                currentQuestion.correctAnswer
              }
              explanation={
                currentQuestion.explanation
              }
              disabled={
                selectedAnswer !== null
              }
              onAnswer={
                handleAnswer
              }
            />

            {/* =================================================
                BOUTON SUIVANT
            ================================================== */}

            <AnimatePresence>
              {selectedAnswer !==
                null && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mt-8
                    flex
                    justify-center
                  "
                >
                  <motion.button
                    type="button"
                    onClick={
                      handleNext
                    }
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-3
                      rounded-2xl
                      bg-black
                      px-7
                      py-4
                      text-base
                      font-bold
                      text-white
                      shadow-xl
                      transition
                      hover:bg-slate-800
                    "
                  >
                    {currentQuestionIndex ===
                    totalQuestions - 1
                      ? "Voir mon résultat"
                      : "Question suivante"}

                    <span
                      className="
                        text-lg
                      "
                    >
                      →
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}