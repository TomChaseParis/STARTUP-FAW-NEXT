"use client";

import QuizEngine from "@/components/courses/engines/QuizEngine";
import type { Question } from "@/hooks/useQuizEngine";

import { useProgress } from "@/components/courses/engines/ProgressEngine/useProgress";

import LessonResults from "@/components/courses/common/LessonResults/LessonResults";

import quizData from "@/data/courses/lessons/beginner/introduce-yourself/quiz.json";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type QuizOption = {
  id: string;
  text: string;
};

type QuizQuestion = {
  id: number;
  type: "single-choice" | "multiple-choice";
  image: string;
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

const data = quizData as QuizData;

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
      teacherAudioQuestion:
        question.teacherAudioQuestion,
      choices: question.options.map((option) => ({
        id: option.id.toUpperCase(),
        label: option.text,
        isCorrect: correctAnswers.includes(
          option.id,
        ),
      })),
    };
  },
);

const ACTIVITY_ID =
  "beginner-introduce-yourself";

const EXERCISE_ID = "lesson-quiz";

export default function IntroduceYourselfQuiz() {
  const { progress, refresh } = useProgress();

  const renderResult = (
    result: ExerciseSessionResult,
    resetQuiz: () => void,
  ) => {
    const exercise = progress.getExercise(
      ACTIVITY_ID,
      EXERCISE_ID,
    );

    const bestScore =
      exercise?.bestScore ?? result.score;

    const attempts =
      exercise?.attempts ?? 1;

    return (
      <LessonResults
        result={{
          session: result,
          bestScore,
          attempts,
        }}
        onRestart={() => {
          resetQuiz();
          refresh();
        }}
        finishHref="/courses/beginner"
      />
    );
  };

  return (
    <div className="w-full">
      <QuizEngine
        questions={questions}
        progressConfig={{
          progress,
          activityId: ACTIVITY_ID,
          exerciseId: EXERCISE_ID,
          onScoreSubmitted: () => {
            refresh();
          },
        }}
        resultRenderer={renderResult}
      />
    </div>
  );
}