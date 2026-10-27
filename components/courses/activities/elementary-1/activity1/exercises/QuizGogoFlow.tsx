
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ExerciseContainer from "@/components/activity/ExerciseContainer";

import QuizPanacheSection from "./exercise-1/QuizPanacheSection";
import QuizFranceSection from "./exercise-2/QuizFranceSection";
import TeacherQuestionSection from "./exercise-3/TeacherQuestionSection";

import { scrollToElementSmooth } from "@/utils/scrollToElementSmooth";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type QuizStep =
  | "exercise-1"
  | "quiz-1"
  | "exercise-2"
  | "quiz-2"
  | "exercise-3"
  | "quiz-3";

export default function QuizGogoFlow() {
  const router = useRouter();

  const [currentStep, setCurrentStep] =
    useState<QuizStep>("exercise-1");

  const [exercise1Started, setExercise1Started] =
    useState(false);

  const [exercise2Started, setExercise2Started] =
    useState(false);

  const [exercise3Started, setExercise3Started] =
    useState(false);

  /*
   * EXERCICE 1
   */

  const handleStartExercise1 = () => {
    setExercise1Started(true);
    setCurrentStep("quiz-1");

    scrollToElementSmooth("quiz-gogo-quiz-1", {
      delay: 300,
      offset: 24,
      duration: 1100,
      maxAttempts: 20,
      retryDelay: 100,
    });
  };

  const handleQuiz1Completed = () => {
    setCurrentStep("exercise-2");
    setExercise2Started(false);

    scrollToElementSmooth("quiz-gogo-exercise-2", {
      delay: 300,
      offset: 24,
      duration: 1100,
      maxAttempts: 20,
      retryDelay: 100,
    });
  };

  /*
   * EXERCICE 2
   */

  const handleStartExercise2 = () => {
    setExercise2Started(true);
    setCurrentStep("quiz-2");

    scrollToElementSmooth("quiz-gogo-quiz-2", {
      delay: 300,
      offset: 24,
      duration: 1100,
      maxAttempts: 20,
      retryDelay: 100,
    });
  };

  const handleQuiz2Completed = () => {
    setCurrentStep("exercise-3");
    setExercise3Started(false);

    scrollToElementSmooth("quiz-gogo-exercise-3", {
      delay: 300,
      offset: 24,
      duration: 1100,
      maxAttempts: 20,
      retryDelay: 100,
    });
  };

  /*
   * EXERCICE 3
   */

  const handleStartExercise3 = () => {
    setExercise3Started(true);
    setCurrentStep("quiz-3");

    scrollToElementSmooth("quiz-gogo-quiz-3", {
      delay: 300,
      offset: 24,
      duration: 1100,
      maxAttempts: 20,
      retryDelay: 100,
    });
  };

  const handleQuiz3Completed = (
    _result: ExerciseSessionResult,
  ) => {
    router.push(
      "/courses/elementary-1/modules/questions-francais",
    );
  };

  return (
    <section className="mt-16 w-full">
      {/* EXERCICE 1 — QUIZ PANACHÉ */}

      {(currentStep === "exercise-1" ||
        currentStep === "quiz-1") && (
        <section
          id="quiz-gogo-exercise-1"
          className="scroll-mt-8"
        >
          <ExerciseContainer exerciseId="exercise-1">
            {({ onComplete }) => (
              <QuizPanacheSection
                onStart={handleStartExercise1}
                started={exercise1Started}
                onCompleted={(result) => {
                  onComplete(result);
                  handleQuiz1Completed();
                }}
              />
            )}
          </ExerciseContainer>
        </section>
      )}

      {/* EXERCICE 2 — QUIZ SUR LA FRANCE */}

      {(currentStep === "exercise-2" ||
        currentStep === "quiz-2") && (
        <section
          id="quiz-gogo-exercise-2"
          className="mt-16 scroll-mt-8"
        >
          <ExerciseContainer exerciseId="exercise-2">
            {({ onComplete }) => (
              <QuizFranceSection
                onStart={handleStartExercise2}
                started={exercise2Started}
                onCompleted={(result) => {
                  onComplete(result);
                  handleQuiz2Completed();
                }}
              />
            )}
          </ExerciseContainer>
        </section>
      )}

      {/* EXERCICE 3 — LE PROFESSEUR JE-SAIS-TOUT */}

      {(currentStep === "exercise-3" ||
        currentStep === "quiz-3") && (
        <section
          id="quiz-gogo-exercise-3"
          className="mt-16 scroll-mt-8"
        >
          <ExerciseContainer exerciseId="exercise-3">
            {({ onComplete }) => (
              <TeacherQuestionSection
                onStart={handleStartExercise3}
                started={exercise3Started}
                onCompleted={(result) => {
                  onComplete(result);
                  handleQuiz3Completed(result);
                }}
              />
            )}
          </ExerciseContainer>
        </section>
      )}
    </section>
  );
}
