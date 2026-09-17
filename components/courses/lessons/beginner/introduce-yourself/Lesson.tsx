"use client";

import QuizEngine from "@/components/courses/engines/QuizEngine";
import type { Question } from "@/hooks/useQuizEngine";

import { useProgress } from "@/components/courses/engines/ProgressEngine/useProgress";

import ActivityResults from "@/components/courses/common/ActivityResults/ActivityResults";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import { LessonQuizData } from "@/data/courses/lessons/beginner/introduce-yourself/QuizData";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

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

const data = LessonQuizData as QuizData;

const questions: Question[] = data.questions.map(
  (question): Question => {
    const correctAnswers =
      question.correctAnswers ??
      (question.correctAnswer
        ? [question.correctAnswer]
        : []);

    return {
      id: question.id,
      type: question.type,
      question: question.question,
      image: question.image,
      teacherImage: question.teacherImage,
      teacherAudioQuestion:
        question.teacherAudioQuestion,
      choices: question.options.map(
        (option) => ({
          id: option.id.toUpperCase(),
          label: option.text,
          isCorrect:
            correctAnswers.includes(
              option.id,
            ),
        }),
      ),
    };
  },
);

const ACTIVITY_ID =
  "beginner-introduce-yourself";

const EXERCISE_ID =
  "lesson-quiz";

export default function IntroduceYourselfQuiz() {
  const {
    progress,
    refresh,
  } = useProgress();

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
      <ActivityResults
        result={{
          session: result,
          bestScore,
          attempts,
        }}
        onRestart={() => {
          resetQuiz();
          refresh();
        }}
        onNext={() => {
          console.log(
            "[IntroduceYourselfQuiz] Aucun exercice suivant configuré.",
          );
        }}
      />
    );
  };

  return (
    <div className="w-full">
      <ExerciseSection>

        {/* ================================================================ */}
        {/* BLOC D'INSTRUCTION                                               */}
        {/* ================================================================ */}

        <InstructionBlock
          level="beginner"
          stampLabel="EXERCICE 1"
          typeLabel="QUIZ DE COMPRÉHENSION"
          title="PRÉSENTATIONS"
          subtitle="Vérifie tes connaissances après avoir regardé la leçon."
          activityType="listen"
          description={
            <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
              <div>
                <p className="mb-2 font-semibold text-slate-800">
                  Consigne :
                </p>

                <p>
                  Écoute chaque question puis choisis la bonne
                  réponse.
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-4
                  py-4
                  shadow-sm
                  sm:px-5
                  sm:py-4
                "
              >
                <p className="font-semibold text-slate-800">
                  Pour chaque question, choisis la réponse qui
                  correspond à la situation proposée.
                </p>
              </div>
            </div>
          }
        />

        {/* ================================================================ */}
        {/* QCM                                                               */}
        {/* ================================================================ */}

        <div className="mt-8">
          <QuizEngine
            questions={questions}
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

      </ExerciseSection>
    </div>
  );
}