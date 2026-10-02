"use client";

import QuizEngine from "@/components/courses/engines/QuizEngine";
import type { Question } from "@/hooks/useQuizEngine";

import {
  useProgress,
} from "@/components/courses/engines/ProgressEngine/useProgress";

import ActivityResults from "@/components/courses/common/ActivityResults/ActivityResults";

import {
  ExerciseSessionResult,
} from "@/components/courses/common/types/exerciseSessionTypes";

import { quizData } from "@/data/courses/activities/elementary-1/questions-francais/questionsFrancais";

type QuizOption = {
  id: string;
  text: string;
};

type QuizQuestion = {
  id: number;
  type:
    | "single-choice"
    | "multiple-choice";
  image?: string;
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

type QuizFranceSectionProps = {
  onCompleted?: (
    result: ExerciseSessionResult,
  ) => void;
};

const data =
  quizData as QuizData;

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

const ACTIVITY_ID =
  "elementary-1-questions-francais";

const EXERCISE_ID =
  "quiz-france";

export default function QuizFranceSection({
  onCompleted,
}: QuizFranceSectionProps) {
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
        teacher="elementary-1"
        onRestart={() => {
          resetQuiz();

          refresh();
        }}
        onNext={() => {
          onCompleted?.(result);
        }}
      />
    );
  };

  return (
    <section className="w-full">
      <QuizEngine
        questions={questions}
        speechEngine="openai"
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
    </section>
  );
}