
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import QuizEngine from "@/components/courses/engines/QuizEngine";
import type { Question } from "@/hooks/useQuizEngine";

import { useProgress } from "@/components/courses/engines/ProgressEngine/useProgress";

import ActivityResults from "@/components/courses/common/ActivityResults/ActivityResults";

import ClickOrSpeak from "@/components/courses/layout/ClickOrSpeak";

import { quizData } from "../../data/questionsFrancais";

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

const data = quizData as {
  title: string;
  description: string;
  questions: QuizQuestion[];
};

const questions: Question[] = data.questions.map((question): Question => {
  const correctAnswers =
    question.correctAnswers ??
    (question.correctAnswer ? [question.correctAnswer] : []);

  return {
    id: question.id,
    type: question.type,
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
});

const ACTIVITY_ID = "les-tournures-interrogatives";

const EXERCISE_ID = "quiz-a-gogo";

const smoothScrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);

  if (!element) return;

  const startPosition = window.scrollY;

  const targetPosition =
    element.getBoundingClientRect().top + window.scrollY - 100;

  const distance = targetPosition - startPosition;
  const duration = 1100;

  let startTime: number | null = null;

  const animateScroll = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easeInOut =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * easeInOut);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

export default function LessonTournuresQcm() {
  const router = useRouter();

  const [exerciseStarted, setExerciseStarted] = useState(false);

  const { progress, refresh } = useProgress();

  useEffect(() => {
    if (!exerciseStarted) return;

    const timeout = window.setTimeout(() => {
      smoothScrollToElement("quiz-content");
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [exerciseStarted]);

  const handleStartExercise = () => {
    setExerciseStarted(true);
  };

  const renderResult = (
    result: ExerciseSessionResult,
    resetQuiz: () => void,
  ) => {
    const exercise = progress.getExercise(ACTIVITY_ID, EXERCISE_ID);

    const score = result.score;

    const bestScore = exercise?.bestScore ?? score;

    const attempts = exercise?.attempts ?? 1;

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
          router.push("/courses/elementary-1/modules/questions-francais");
        }}
        isLastExercise={true}
        finishLabel="Terminer la leçon"
        feedbackVariant="lesson"
        teacher="elementary-1"
      />
    );
  };

  return (
    <div className="w-full min-w-0">
      <ClickOrSpeak
      instructionImageSrc="/images/lesson-tournures.png"
        exerciseNumber={1}
        category="QUIZ DE COMPRÉHENSION"
        title="La valse des questions"
        description={data.description}
        example="Lis attentivement la question, puis choisis la bonne réponse."
        level="elementary-1"
        started={exerciseStarted}
        onStart={handleStartExercise}
      >
        <div
          id="quiz-content"
          className="w-full min-w-0 scroll-mt-8"
        >
          <QuizEngine
            teacherLevel="elementary-1"
            questions={questions}
            speechEngine="openai"
            teacherFeedbackImages={{
              correct: "/images/bulles-QCM/elementary-1/jean-hawai/correct.png",
              wrong: "/images/bulles-QCM/elementary-1/jean-hawai/wrong.png",
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
        </div>
      </ClickOrSpeak>
    </div>
  );
}
