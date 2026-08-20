"use client";

import {
  ReactNode,
  useEffect,
} from "react";

import QuestionHeader from "@/components/courses/common/question/QuestionHeader";
import ExerciseResult from "@/components/courses/common/result/ExerciseResult";
import ExerciseReport from "@/components/courses/common/result/ExerciseReport";
import QuestionController from "@/components/courses/common/layouts/QuestionController";
import QuestionContent from "@/components/courses/common/question/QuestionContent";
import ExerciseNavigation from "@/components/courses/common/question/ExerciseNavigation";

import {
  useQuizEngine,
  Question,
  QuizProgressConfig,
} from "@/hooks/useQuizEngine";

import { useTeacherController } from "../common/hooks/useTeacherController";

import { ExerciseSessionResult } from "../common/types/exerciseSessionTypes";

type Props = {
  questions: Question[];

  mode?: "training" | "exam";

  progressConfig?: QuizProgressConfig;

  onComplete?: (
    result: ExerciseSessionResult,
  ) => void;

  resultRenderer?: (
    result: ExerciseSessionResult,
    resetQuiz: () => void,
  ) => ReactNode;
};

const QuizEngine: React.FC<Props> = ({
  questions,
  progressConfig,
  onComplete,
  resultRenderer,
}) => {
  const {
    currentIndex,
    currentQuestion,
    selectedChoiceId,
    selectedChoiceIds,
    selectChoice,
    nextQuestion,
    resetQuiz,
    totalQuestions,
    processSpeechAnswer,
    session,
  } = useQuizEngine(
    questions,
    progressConfig,
  );

  useEffect(() => {
    if (!session.isFinished) {
      return;
    }

    onComplete?.(session.result);
  }, [
    session.isFinished,
    session.result,
    onComplete,
  ]);

  /* ================= AUDIO CONTROL ================= */

  const teacher =
    useTeacherController({
      onSpeech:
        processSpeechAnswer,
    });

  const {
    playQuestion,
    stopEverything,
    startListening,
    isTalking,
    isListening,
  } = teacher;

  const { handleAnswer } =
    teacher;

  /*
   * ==================================================
   * FEEDBACK AUDIO
   * ==================================================
   *
   * Single-choice :
   * feedback après sélection.
   *
   * Multiple-choice :
   * le feedback est également joué après
   * chaque nouvelle réponse sélectionnée.
   */

  useEffect(() => {
    if (!currentQuestion) {
      return;
    }

    if (
      currentQuestion.type ===
      "multiple-choice"
    ) {
      return;
    }

    if (!selectedChoiceId) {
      return;
    }

    const choice =
      currentQuestion.choices.find(
        (item) =>
          item.id ===
          selectedChoiceId,
      );

    if (!choice) {
      return;
    }

    handleAnswer(
      choice.isCorrect,
      choice.teacherAudioCorrect,
      choice.teacherAudioWrong,
    );
  }, [
    currentQuestion,
    selectedChoiceId,
    handleAnswer,
  ]);

  /*
   * ==================================================
   * RESULT PAGE
   * ==================================================
   */

  if (
    !currentQuestion &&
    !session.isFinished
  ) {
    return null;
  }

  if (
    session.isFinished &&
    resultRenderer
  ) {
    return resultRenderer(
      session.result,
      resetQuiz,
    );
  }

  if (session.isFinished) {
    return (
      <DefaultQuizResult
        result={session.result}
        resetQuiz={resetQuiz}
      />
    );
  }

  /*
   * ==================================================
   * QUESTION PAGE
   * ==================================================
   */

  if (!currentQuestion) {
    return null;
  }

  const question =
    currentQuestion.question;

  const choices =
    currentQuestion.choices;

  const image =
    currentQuestion.image;

  const teacherImage =
    currentQuestion.teacherImage;

  const teacherAudioQuestion =
    currentQuestion.teacherAudioQuestion;

  const isMultipleChoice =
    currentQuestion.type ===
    "multiple-choice";

  const hasSelectedChoice =
    isMultipleChoice
      ? selectedChoiceIds.length > 0
      : !!selectedChoiceId;

  const playQuestionAudio =
    () => {
      playQuestion(
        teacherAudioQuestion,
      );
    };

  return (
    <QuestionController
      current={
        currentIndex + 1
      }
      total={totalQuestions}
      header={
        <QuestionHeader
          current={
            currentIndex + 1
          }
          total={
            totalQuestions
          }
          onPlay={
            playQuestionAudio
          }
          disabled={isTalking}
        />
      }
      content={
        <QuestionContent
          question={
            question
          }
          choices={
            choices
          }
          selectedChoiceId={
            selectedChoiceId
          }
          selectedChoiceIds={
            selectedChoiceIds
          }
          multipleChoice={
            isMultipleChoice
          }
          onSelect={
            selectChoice
          }
          image={
            image
          }
          teacherImage={
            teacherImage
          }
          teacherTalking={
            isTalking
          }
          isListening={
            isListening
          }
          onSpeech={
            startListening
          }
          disabled={false}
        />
      }
      navigation={
        hasSelectedChoice ? (
          <ExerciseNavigation
            isLastQuestion={
              currentIndex +
                1 ===
              totalQuestions
            }
            onNext={
              nextQuestion
            }
          />
        ) : undefined
      }
    />
  );
};

type DefaultQuizResultProps = {
  result: ExerciseSessionResult;
  resetQuiz: () => void;
};

function DefaultQuizResult({
  result,
  resetQuiz,
}: DefaultQuizResultProps) {
  return (
    <ExerciseResult
      result={result}
      onRestart={resetQuiz}
      onShowReport={() => {}}
    />
  );
}

export default QuizEngine;