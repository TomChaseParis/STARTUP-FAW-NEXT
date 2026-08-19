"use client";

import { useEffect, useState } from "react";

import QuestionHeader from "@/components/courses/common/question/QuestionHeader";
import ExerciseResult from "@/components/courses/common/result/ExerciseResult";
import ExerciseReport from "@/components/courses/common/result/ExerciseReport";
import QuestionController from "@/components/courses/common/layouts/QuestionController";
import QuestionContent from "@/components/courses/common/question/QuestionContent";
import ExerciseNavigation from "@/components/courses/common/question/ExerciseNavigation";

import { useQuizEngine, Question } from "@/hooks/useQuizEngine";
import { useTeacherController } from "../common/hooks/useTeacherController";

import { ExerciseSessionResult } from "../common/types/exerciseSessionTypes";

type Props = {
  questions: Question[];

  mode?: "training" | "exam";

  onComplete?: (
    result: ExerciseSessionResult,
  ) => void;
};

const QuizEngine: React.FC<Props> = ({
  questions,
  onComplete,
}) => {
  const {
    currentIndex,
    currentQuestion,
    selectedChoiceId,
    selectChoice,
    nextQuestion,
    resetQuiz,
    totalQuestions,
    processSpeechAnswer,
    session,
  } = useQuizEngine(questions);

  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    if (session.isFinished) {
      onComplete?.(session.result);
    }
  }, [
    session.isFinished,
    session.result,
    onComplete,
  ]);

  /* ================= AUDIO CONTROL ================= */

  const teacher = useTeacherController({
    onSpeech: processSpeechAnswer,
  });

  const {
    playQuestion,
    stopEverything,
    startListening,
    isTalking,
    isListening,
  } = teacher;

  const { handleAnswer } = teacher;

  useEffect(() => {
    if (!currentQuestion || !selectedChoiceId) {
      return;
    }

    const choice = currentQuestion.choices.find(
      (c) => c.id === selectedChoiceId,
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

  /* ================= RESULT PAGE ================= */

  if (!currentQuestion) {
    return null;
  }

  /* ================= FINAL RESULT ================= */

  if (session.isFinished) {
    if (showReport) {
      return (
        <ExerciseReport
          history={session.history}
          onRestart={() => {
            setShowReport(false);
            resetQuiz();
          }}
          onBack={() => setShowReport(false)}
        />
      );
    }

    return (
      <ExerciseResult
        result={session.result}
        onRestart={() => {
          setShowReport(false);
          resetQuiz();
        }}
        onShowReport={() => setShowReport(true)}
      />
    );
  }

  /* ================= QUESTION PAGE ================= */

  const question = currentQuestion.question;

  const choices = currentQuestion.choices;

  const image = currentQuestion.image;

  const teacherImage =
    currentQuestion.teacherImage;

  const teacherAudioQuestion =
    currentQuestion.teacherAudioQuestion;

  const playQuestionAudio = () => {
    playQuestion(teacherAudioQuestion);
  };

  return (
    <QuestionController
      current={currentIndex + 1}
      total={totalQuestions}
      header={
        <QuestionHeader
          current={currentIndex + 1}
          total={totalQuestions}
          onPlay={playQuestionAudio}
          disabled={isTalking}
        />
      }
      content={
        <QuestionContent
          question={question}
          choices={choices}
          selectedChoiceId={selectedChoiceId}
          onSelect={selectChoice}
          image={image}
          teacherImage={teacherImage}
          isTalking={isTalking}
          isListening={isListening}
          onStartListening={startListening}
          onStopListening={stopEverything}
        />
      }
      navigation={
        selectedChoiceId ? (
          <ExerciseNavigation
            isLastQuestion={
              currentIndex + 1 === totalQuestions
            }
            onNext={nextQuestion}
          />
        ) : undefined
      }
    />
  );
};

export default QuizEngine;