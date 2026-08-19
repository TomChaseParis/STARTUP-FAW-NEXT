"use client";

import { ReactNode } from "react";

import QuizHeader from "./QuizHeader";
import QuestionCard from "./QuestionCard";
import NavigationButtons from "./NavigationButtons";

type ActivityCardProps = {
  title: string;

  current?: number;
  total?: number;

  question: string;

  icon?: ReactNode;

  children: ReactNode;

  canGoBack: boolean;
  canContinue: boolean;
  isLastQuestion: boolean;
  validated: boolean;

  showProgress?: boolean;

  onPrevious: () => void;
  onNext: () => void;
};

export default function ActivityCard({
  title,
  current = 1,
  total = 1,
  question,
  icon,
  children,
  canGoBack,
  canContinue,
  isLastQuestion,
  validated,
  showProgress = true,
  onPrevious,
  onNext,
}: ActivityCardProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12">
      {/* PROGRESSION */}
      {showProgress && (
        <QuizHeader
          title={title}
          current={current}
          total={total}
        />
      )}

      {/* EXERCICE */}
      <QuestionCard
        icon={icon}
        title={`Question ${current} sur ${total}`}
        question={question}
        showTitle={showProgress}
      >
        {children}
      </QuestionCard>

      {/* NAVIGATION */}
      <NavigationButtons
        canGoBack={canGoBack}
        canContinue={canContinue}
        isLastQuestion={isLastQuestion}
        validated={validated}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </section>
  );
}