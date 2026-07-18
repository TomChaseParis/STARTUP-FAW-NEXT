"use client";

import QuestionHeader from "@/components/courses/common/question/QuestionHeader";
import { useState, useEffect } from "react";
import { useQuizEngine, Question } from "@/hooks/useQuizEngine";
import ExerciseResult from "@/components/courses/common/result/ExerciseResult";
import ExerciseReport from "@/components/courses/common/result/ExerciseReport";
import { useTeacherController } from "../common/hooks/useTeacherController";
import QuestionController from "@/components/courses/common/layouts/QuestionController";
import QuestionContent from "@/components/courses/common/question/QuestionContent";
import ExerciseNavigation from "@/components/courses/common/question/ExerciseNavigation";

type Props = {
  questions: Question[];
  mode?: "training" | "exam"; 
};

const QuizEngine: React.FC<Props> = ({ questions }) => {
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


  useEffect(() => {
    if (!currentQuestion || !selectedChoiceId) return;
  
    const choice = currentQuestion.choices.find(
      (c) => c.id === selectedChoiceId,
    );
  
    if (!choice) return;
  
    teacher.handleAnswer(
      choice.isCorrect,
      choice.teacherAudioCorrect,
      choice.teacherAudioWrong,
    );
  }, [currentQuestion, selectedChoiceId, teacher]);
  /* ================= FINAL TEACHER ANNOUNCEMENT ================= */


  /* ================= AUDIO PROF ================= */


  /* ================= RESULT PAGE ================= */



  if (!currentQuestion) {
    return null;
  }

const question = currentQuestion.question;

const choices = currentQuestion.choices;

const image = currentQuestion.image;

const teacherImage = currentQuestion.teacherImage;

const teacherAudioQuestion =
  currentQuestion.teacherAudioQuestion;


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

  const correctChoice = choices.find(
    (c) => c.isCorrect,
  );
  
  const selectedChoice = choices.find(
    (c) => c.id === selectedChoiceId,
  );

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
        teacherImage={teacherImage}
        teacherTalking={isTalking}
        image={image}
        choices={choices}
        selectedChoiceId={selectedChoiceId}
        selectedChoice={selectedChoice}
        correctChoice={correctChoice}
        disabled={isTalking}
        onSelect={selectChoice}
        onSpeech={startListening}
        isListening={isListening}
      />
      }
      navigation={
        selectedChoiceId ? (
          <ExerciseNavigation
            isLastQuestion={currentIndex + 1 === totalQuestions}
            onNext={nextQuestion}
          />
        ) : undefined
      }
    />
  );
};

export default QuizEngine;
