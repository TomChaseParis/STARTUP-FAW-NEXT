"use client";

import {
  useEffect,
  useState,
} from "react";

import QuizEngine from "@/components/courses/engines/QuizEngine";
import type { Question } from "@/hooks/useQuizEngine";

import { useProgress } from "@/components/courses/engines/ProgressEngine/useProgress";

import LessonResults from "@/components/courses/common/LessonResults/LessonResults";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import { LessonQuizData } from "@/data/courses/lessons/beginner/introduce-yourself/QuizData";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

/* ========================================================================== */
/* TYPES                                                                      */
/* ========================================================================== */

type QuizOption = {
  id: string;
  text: string;
};

type QuizQuestion = {
  id: number;
  type: "single-choice" | "multiple-choice";
  image: string;
  teacherImage?: string;
  question: string;
  teacherAudioQuestion?: string;
  options: QuizOption[];
  correctAnswer?: string;
  correctAnswers?: string[];
};

type QuizData = {
  title: string;
  description: string;
  questions: QuizQuestion[];
};

/* ========================================================================== */
/* DATA                                                                       */
/* ========================================================================== */

const data = LessonQuizData as QuizData;

const questions: Question[] =
  data.questions.map(
    (question): Question => {
      const correctAnswers =
        question.correctAnswers ??
        (question.correctAnswer
          ? [question.correctAnswer]
          : []);

      return {
        id: question.id,

        type: question.type,

        question:
          question.question,

        image:
          question.image,

        teacherImage:
          question.teacherImage,

        teacherAudioQuestion:
          question.teacherAudioQuestion,

        choices:
          question.options.map(
            (option) => ({
              id:
                option.id.toUpperCase(),

              label:
                option.text,

              isCorrect:
                correctAnswers.includes(
                  option.id,
                ),
            }),
          ),
      };
    },
  );

/* ========================================================================== */
/* PROGRESSION                                                                */
/* ========================================================================== */

const ACTIVITY_ID =
  "beginner-introduce-yourself";

const EXERCISE_ID =
  "lesson-quiz";

/* ========================================================================== */
/* COMPONENT                                                                  */
/* ========================================================================== */

export default function IntroduceYourselfQuiz() {
  const {
    progress,
    refresh,
  } = useProgress();

  const [started, setStarted] =
    useState(false);

  /* ======================================================================== */
  /* SCROLL VERS LE QCM                                                       */
  /* ======================================================================== */

  useEffect(() => {
    if (!started) {
      return;
    }

    let attempts = 0;
    let timer:
      | number
      | undefined;

    const scrollToQcm = () => {
      const element =
        document.getElementById(
          "exercise-1-qcm",
        );

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timer =
            window.setTimeout(
              scrollToQcm,
              100,
            );
        }

        return;
      }

      const elementTop =
        element.getBoundingClientRect()
          .top +
        window.scrollY;

      const offset = 100;

      window.scrollTo({
        top: Math.max(
          0,
          elementTop - offset,
        ),
        behavior: "smooth",
      });
    };

    timer =
      window.setTimeout(
        scrollToQcm,
        100,
      );

    return () => {
      if (timer) {
        window.clearTimeout(
          timer,
        );
      }
    };
  }, [started]);

  /* ======================================================================== */
  /* RESULTAT                                                                 */
  /* ======================================================================== */

  const renderResult = (
    result: ExerciseSessionResult,
    resetQuiz: () => void,
  ) => {
    const exercise =
      progress.getExercise(
        ACTIVITY_ID,
        EXERCISE_ID,
      );

    const score =
      result.score;

    const bestScore =
      exercise?.bestScore ??
      score;

    const attempts =
      exercise?.attempts ??
      1;

    return (
      <LessonResults
        result={{
          session: result,
          bestScore,
          attempts,
        }}
        onRestart={() => {
          resetQuiz();
          setStarted(false);
          refresh();
        }}
        finishHref="/courses/beginner"
      />
    );
  };

  /* ======================================================================== */
  /* RENDER                                                                   */
  /* ======================================================================== */

  return (
    <div className="w-full">
      <ExerciseSection>

        {/* ================================================================ */}
        {/* BLOC D'INSTRUCTION                                               */}
        {/* ================================================================ */}

        <div
          id="exercise-1-instruction"
          className="scroll-mt-10"
        >
          <InstructionBlock
            level="beginner"
            stampLabel="EXERCICE"
            typeLabel="QUIZ DE COMPRÉHENSION"
            title="SE PRÉSENTER EN FRANÇAIS"
            subtitle="Écoute chaque question puis choisis la bonne réponse."
            activityType="click-or-speak"
            description={
              <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">

                {/* ===================================================== */}
                {/* BOUTON AUDIO */}
                {/* ===================================================== */}

                <div
                  className="
                    flex
                    flex-col
                    gap-2
                    sm:grid
                    sm:grid-cols-[120px_40px_1fr]
                    sm:items-center
                    sm:gap-3
                  "
                >
                  <span>
                    Appuie sur le bouton
                  </span>

                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      relative
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      self-start
                      rounded-full
                      border
                      border-slate-200
                      bg-white
                      text-amber-500
                      shadow-[0_6px_18px_rgba(15,23,42,0.10)]
                      sm:self-auto
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="
                        relative
                        z-10
                        ml-0.5
                        h-4
                        w-4
                      "
                    >
                      <path d="M8.5 5.2a1.5 1.5 0 0 1 2.35-1.23l8.4 6.8a1.57 1.57 0 0 1 0 2.46l-8.4 6.8A1.5 1.5 0 0 1 8.5 18.8V5.2Z" />
                    </svg>
                  </button>

                  <span>
                    si tu veux entendre le professeur
                    présenter la question et les
                    réponses proposées.
                  </span>
                </div>

                {/* ===================================================== */}
                {/* BOUTON MICRO */}
                {/* ===================================================== */}

                <div
                  className="
                    flex
                    flex-col
                    gap-2
                    sm:grid
                    sm:grid-cols-[120px_40px_1fr]
                    sm:items-center
                    sm:gap-3
                  "
                >
                  <span>
                    Appuie sur le bouton
                  </span>

                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      relative
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      self-start
                      rounded-full
                      bg-white
                      text-amber-600
                      shadow-[0_6px_18px_rgba(15,23,42,0.10)]
                      sm:self-auto
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18v3m0 0h3m-3 0H9m3-7a4 4 0 004-4V7a4 4 0 10-8 0v3a4 4 0 004 4z"
                      />
                    </svg>
                  </button>

                  <span>
                    si tu préfères répondre à la
                    question à l&apos;oral.
                  </span>
                </div>

                {/* ===================================================== */}
                {/* RECONNAISSANCE VOCALE */}
                {/* ===================================================== */}

                <p>
                  Pour aider l&apos;outil de
                  reconnaissance vocale à bien
                  identifier ta réponse, pense à dire la
                  lettre (A, B ou C) qui correspond à ta
                  réponse, suivi de la réponse en entier.
                  Exemple :
                  <span className="font-semibold text-slate-900">
                    {" « A : ingénieur »."}
                  </span>
                </p>
              </div>
            }
            onStart={() => {
              setStarted(true);
            }}
            started={started}
          />
        </div>

        {/* ================================================================ */}
        {/* QCM                                                               */}
        {/* ================================================================ */}

        {started && (
          <div
            id="exercise-1-qcm"
            className="scroll-mt-10"
          >
            <div className="mt-8">
              <QuizEngine
                questions={
                  questions
                }
                progressConfig={{
                  progress,

                  activityId:
                    ACTIVITY_ID,

                  exerciseId:
                    EXERCISE_ID,

                  onScoreSubmitted:
                    () => {
                      refresh();
                    },
                }}
                resultRenderer={
                  renderResult
                }
              />
            </div>
          </div>
        )}

      </ExerciseSection>
    </div>
  );
}