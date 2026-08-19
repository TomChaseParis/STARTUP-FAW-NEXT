"use client";

import { useState } from "react";

import ActivityCard from "@/components/activity/ActivityCard/ActivityCard";

import QuestionRenderer from "@/components/activity/question-types/QuestionRenderer";

import useActivityNavigation from "@/components/activity/hooks/useActivityNavigation";

import useActivityAnswers from "@/components/activity/hooks/useActivityAnswers";

import { comprehensionQuizData } from "../data/comprehensionQuizData";

import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type ComprehensionQuizProps = {
  onComplete?: (result: ExerciseSessionResult) => void;
};
const computeScore = (correct: number, total: number) =>
  Math.round((correct / total) * 100);

export default function ComprehensionQuiz({
  onComplete,
}: ComprehensionQuizProps) {
  const navigation = useActivityNavigation({
    questions: comprehensionQuizData,
  });

  const answers = useActivityAnswers<number | null>({
    totalQuestions: navigation.totalQuestions,
    initialValue: null,
  });

  const currentQuestion = navigation.currentQuestion;

  const currentAnswer = answers.getAnswer(navigation.currentIndex);

  const [validated, setValidated] = useState(false);


  const handleNext = () => {
    // Première pression : on valide uniquement la question
    if (!validated) {
      setValidated(true);
      return;
    }
  
    // Dernière question -> résultat
    if (navigation.isLastQuestion) {
      let correct = 0;
  
      comprehensionQuizData.forEach((question, index) => {
        if (answers.answers[index] === question.correctIndex) {
          correct++;
        }
      });
  
      const score = computeScore(correct, comprehensionQuizData.length);
  
      const startedAt = new Date();
      const finishedAt = new Date();
  
      const history = comprehensionQuizData.map((question, index) => {
        const selected = answers.answers[index];
  
        return {
          questionId: Number(question.id),
          question: question.question,
          selectedAnswer:
            selected === null 
              ? ""
              : question.type === "multiple-choice"
              ? question.options[selected]
              : `Image ${selected + 1}`,
          correctAnswer:
            question.type === "multiple-choice"
              ? question.options[question.correctIndex]
              : `Image ${question.correctIndex + 1}`,
          isCorrect: selected === question.correctIndex,
        };
      });
  
      const result: ExerciseSessionResult = {
        score,
        correctAnswers: correct,
        totalQuestions: comprehensionQuizData.length,
        history,
        startedAt,
        finishedAt,
        duration: Math.round(
          (finishedAt.getTime() - startedAt.getTime()) / 1000,
        ),
      };
  
      onComplete?.(result);
      return;
    }
  
    // Question suivante
    navigation.next();
    setValidated(false);
  };
  return (
    <ActivityCard
      title="Compréhension orale"
      current={navigation.currentIndex + 1}
      total={navigation.totalQuestions}
      question={currentQuestion.question}
      canGoBack={false}
      canContinue={currentAnswer !== null}
      isLastQuestion={navigation.isLastQuestion}
      validated={validated}
      onPrevious={navigation.previous}
      onNext={handleNext}
    >
      <QuestionRenderer
        question={currentQuestion}
        value={currentAnswer}
        validated={validated}
        correctAnswer={currentQuestion.correctIndex}
        onChange={(value) =>
          answers.setAnswer(navigation.currentIndex, value)
        }
      />
    </ActivityCard>
  );

}
