"use client";

import { useMemo } from "react";

import QuizEngine from "@/components/courses/engines/QuizEngine";

import {
  useProgress,
} from "@/components/courses/engines/ProgressEngine/useProgress";

import ActivityResults from "@/components/courses/common/ActivityResults/ActivityResults";

import type {
  ExerciseSessionResult,
} from "@/components/courses/common/types/exerciseSessionTypes";

import { quizData } from "../data/listeningQuizData";

type ListeningQuizExerciseProps = {
  onCompleted?: (
    result: ExerciseSessionResult,
  ) => void;
};

const ACTIVITY_ID =
  "elementary-1-questions-francais";

const EXERCISE_ID =
  "listening-quiz";

const TEACHER_FEEDBACK_AUDIOS = {
  bad:
    "/audios/teacher/jean/score/JEAN-DOWN.mp3",

  middle:
    "/audios/teacher/jean/score/JEAN-MIDDLE.mp3",

  good:
    "/audios/teacher/jean/score/JEAN-100.mp3",
};

export default function ListeningQuizExercise({
  onCompleted,
}: ListeningQuizExerciseProps) {
  const {
    progress,
    refresh,
  } = useProgress();

  const questions = useMemo(
    () => quizData ?? [],
    [],
  );

  const renderResult = (
    result: ExerciseSessionResult,
    resetQuiz: () => void,
  ) => {
    const exercise =
      progress.getExercise(
        ACTIVITY_ID,
        EXERCISE_ID,
      );

    const bestScore =
      exercise?.bestScore ??
      result.score;

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
        teacherFeedbackImages={{
          bad:
            "/images/courses/teacher/bulles/bad.png",

          middle:
            "/images/courses/teacher/bulles/middle.png",

          good:
            "/images/courses/teacher/bulles/good.png",
        }}
        teacherFeedbackAudios={
          TEACHER_FEEDBACK_AUDIOS
        }
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