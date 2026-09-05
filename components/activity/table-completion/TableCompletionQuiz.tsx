"use client";

import { useState } from "react";

import ActivityCard from "@/components/activity/ActivityCard/ActivityCard";
import useActivityAnswers from "@/components/activity/hooks/useActivityAnswers";

import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

import TableCompletionRenderer from "./components/TableCompletionRenderer";
import { TableCompletionActivity } from "./types";

type TableCompletionQuizProps = {
  data: TableCompletionActivity;
  onComplete?: (result: ExerciseSessionResult) => void;
};

export default function TableCompletionQuiz({
  data,
  onComplete,
}: TableCompletionQuizProps) {
  const answers = useActivityAnswers<string>({
    totalQuestions: data.questions.length,
    initialValue: "",
  });

  const [validated, setValidated] = useState(false);

  const allQuestionsAnswered = data.questions.every(
    (_, index) => answers.answers[index]?.trim() !== "",
  );

  const handleNext = () => {
    if (!validated) {
      setValidated(true);
      return;
    }

    const correct = data.questions.filter(
      (question, index) =>
        answers.answers[index] === question.answer,
    ).length;

    const startedAt = new Date();
    const finishedAt = new Date();

    const result: ExerciseSessionResult = {
      score: Math.round(
        (correct / data.questions.length) * 100,
      ),
      correctAnswers: correct,
      totalQuestions: data.questions.length,
      startedAt,
      finishedAt,
      duration: Math.round(
        (finishedAt.getTime() - startedAt.getTime()) / 1000,
      ),
      history: data.questions.map((question, index) => ({
        questionId: Number(question.id),
        question: `${question.before} ____ ${question.after}`,
        selectedAnswer: answers.answers[index] ?? "",
        correctAnswer: question.answer,
        isCorrect:
          answers.answers[index] === question.answer,
      })),
    };

    onComplete?.(result);
  };

  return (
    <ActivityCard
      showProgress={false}
      title={data.title}
      question={data.instruction}
      icon={null}
      canGoBack={false}
      canContinue={validated || allQuestionsAnswered}
      isLastQuestion
      validated={validated}
      current={1}
      total={1}
      onPrevious={() => {}}
      onNext={handleNext}
    >
      <TableCompletionRenderer
        questions={data.questions}
        answers={answers.answers}
        validated={validated}
        onChange={answers.setAnswer}
      />
    </ActivityCard>
  );
}