
"use client";

import QuizEngine from "@/components/courses/engines/QuizEngine";
import type { Question } from "@/hooks/useQuizEngine";

import {
  useProgress,
} from "@/components/courses/engines/ProgressEngine/useProgress";

import ActivityResults from "@/components/courses/common/ActivityResults/ActivityResults";

import type {
  ExerciseSessionResult,
} from "@/components/courses/common/types/exerciseSessionTypes";

import { quizData } from "@/components/courses/lessons/elementary-1/data/questionsFrancais";

type QuizOption = {
  id: string;
  text: string;
};

type QuizQuestion = {
  id: number;
  type: "single-choice" | "multiple-choice";
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

type QuizFranceExerciseProps = {
  onCompleted: (result: ExerciseSessionResult) => void;
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
      question: question.question,
      image: question.image,
      teacherImage: question.teacherImage,
      teacherAudioQuestion: question.teacherAudioQuestion,
      choices: question.options.map((option) => ({
        id: option.id.toUpperCase(),
        label: option.text,
        isCorrect: correctAnswers.includes(option.id),
      })),
    };
  },
);

const ACTIVITY_ID = "elementary-1-questions-francais";
const EXERCISE_ID = "quiz-france";

const TEACHER_FEEDBACK_AUDIOS = {
  bad: "/audios/teacher/jean/score/JEAN-0-50.mp3",
  middle: "/audios/teacher/jean/score/JEAN-50-75.mp3",
  good: "/audios/teacher/jean/score/JEAN-100.mp3",
};

export default function QuizFranceExercise({
  onCompleted,
}: QuizFranceExerciseProps) {
  const { progress, refresh } = useProgress();

  const renderResult = (
    result: ExerciseSessionResult,
    resetQuiz: () => void,
  ) => {
    const exercise = progress.getExercise(
      ACTIVITY_ID,
      EXERCISE_ID,
    );

    const bestScore = exercise?.bestScore ?? result.score;
    const attempts = exercise?.attempts ?? 1;

    return (
      <ActivityResults
        result={{
          session: result,
          bestScore,
          attempts,
        }}
        teacher="elementary-1"
        teacherFeedbackImages={{
          bad: "/images/courses/teacher/bulles/bad.png",
          middle: "/images/courses/teacher/bulles/middle.png",
          good: "/images/courses/teacher/bulles/good.png",
        }}
        teacherFeedbackAudios={TEACHER_FEEDBACK_AUDIOS}
        onRestart={() => {
          resetQuiz();
          refresh();
        }}
        onNext={() => {
          onCompleted(result);
        }}
      />
    );
  };

  return (
    <section className="w-full min-w-0">
      <QuizEngine
        questions={questions}
        speechEngine="openai"
        teacherLevel="elementary-1"
        teacherBubbleImage="/images/jean-instruction.png"
        teacherFeedbackImages={{
          correct:
            "/images/bulles-QCM/elementary-1/jean-hawai/correct.png",
          wrong:
            "/images/bulles-QCM/elementary-1/jean-hawai/wrong.png",
        }}
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
    </section>
  );
}
