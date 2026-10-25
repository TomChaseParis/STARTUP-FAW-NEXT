"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import QuestionHeader from "@/components/courses/common/question/QuestionHeader";
import ExerciseResult from "@/components/courses/common/result/ExerciseResult";
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

type TeacherFeedbackImages = {
  correct: string;
  wrong: string;
};

type Props = {
  questions: Question[];
  mode?: "training" | "exam";
  progressConfig?: QuizProgressConfig;
  onComplete?: (result: ExerciseSessionResult) => void;
  resultRenderer?: (
    result: ExerciseSessionResult,
    resetQuiz: () => void,
  ) => ReactNode;
  speechEngine?: "browser" | "openai";
  onLastQuestion?: () => void;
  lastQuestionLabel?: string;
  teacherFeedbackImages?: TeacherFeedbackImages;
};

// Délai avant l'apparition de la TeacherComicBubble, en millisecondes.
const SPEECH_PROMPT_DELAY = 1000;

const QuizEngine: React.FC<Props> = ({
  questions,
  progressConfig,
  onComplete,
  resultRenderer,
  speechEngine = "browser",
  onLastQuestion,
  lastQuestionLabel,
  teacherFeedbackImages,
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
  } = useQuizEngine(questions, progressConfig);

  const [audioQuestionStarted, setAudioQuestionStarted] = useState(false);
  const [audioQuestionFinished, setAudioQuestionFinished] = useState(false);

  // Verrou global : une seule apparition pendant la session du QCM.
  const speechPromptClaimedRef = useRef(false);

  // Contrôle la visibilité de la bulle.
  const [speechPromptVisible, setSpeechPromptVisible] = useState(false);

  const wasTalkingRef = useRef(false);
  const previousQuestionRef = useRef<number | null>(null);

  useEffect(() => {
    if (!session.isFinished) return;

    onComplete?.(session.result);
  }, [session.isFinished, session.result, onComplete]);

  const teacher = useTeacherController({
    onSpeech: processSpeechAnswer,
    speechEngine,
  });

  const {
    playQuestion,
    isTalking,
    isListening,
    startListening,
    stopListening,
  } = teacher;

  const { handleAnswer } = teacher;

  // Réinitialiser le suivi audio au changement de question,
  // sans réinitialiser le verrou de la bulle.
  useEffect(() => {
    if (previousQuestionRef.current === currentIndex) return;

    const isQuestionChange = previousQuestionRef.current !== null;

    previousQuestionRef.current = currentIndex;

    setAudioQuestionStarted(false);
    setAudioQuestionFinished(false);
    wasTalkingRef.current = false;

    if (isQuestionChange) {
      setSpeechPromptVisible(false);
    }
  }, [currentIndex]);

  // Détecter la fin effective de la lecture audio.
  useEffect(() => {
    if (isTalking) {
      wasTalkingRef.current = true;
      return;
    }

    if (wasTalkingRef.current && audioQuestionStarted) {
      wasTalkingRef.current = false;
      setAudioQuestionFinished(true);
    }
  }, [isTalking, audioQuestionStarted]);

  // Afficher la TeacherComicBubble une seule fois,
  // une seconde après la fin de la lecture audio.
  useEffect(() => {
    if (!audioQuestionFinished || !currentQuestion) return;
    if (speechPromptClaimedRef.current) return;

    const hasAnswer =
      currentQuestion.type === "multiple-choice"
        ? selectedChoiceIds.length > 0
        : !!selectedChoiceId;

    if (hasAnswer) return;

    const timeoutId = window.setTimeout(() => {
      if (speechPromptClaimedRef.current) return;

      speechPromptClaimedRef.current = true;
      setSpeechPromptVisible(true);
    }, SPEECH_PROMPT_DELAY);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    audioQuestionFinished,
    currentQuestion,
    selectedChoiceId,
    selectedChoiceIds,
    currentIndex,
  ]);

  useEffect(() => {
    if (!currentQuestion) return;
    if (currentQuestion.type === "multiple-choice") return;
    if (!selectedChoiceId) return;

    const choice = currentQuestion.choices.find(
      (item) => item.id === selectedChoiceId,
    );

    if (!choice) return;

    handleAnswer(
      choice.isCorrect,
      choice.teacherAudioCorrect,
      choice.teacherAudioWrong,
    );
  }, [currentQuestion, selectedChoiceId, handleAnswer]);

  if (!currentQuestion && !session.isFinished) return null;

  if (session.isFinished && resultRenderer) {
    return resultRenderer(session.result, resetQuiz);
  }

  if (session.isFinished) {
    return (
      <DefaultQuizResult
        result={session.result}
        resetQuiz={resetQuiz}
      />
    );
  }

  if (!currentQuestion) return null;

  const question = currentQuestion.question;
  const choices = currentQuestion.choices;
  const image = currentQuestion.image;
  const teacherImage = currentQuestion.teacherImage;
  const teacherAudioQuestion = currentQuestion.teacherAudioQuestion;

  const isMultipleChoice = currentQuestion.type === "multiple-choice";

  const hasSelectedChoice = isMultipleChoice
    ? selectedChoiceIds.length > 0
    : !!selectedChoiceId;

  const feedbackChoiceId = isMultipleChoice
    ? selectedChoiceIds[selectedChoiceIds.length - 1]
    : selectedChoiceId;

  const selectedChoice = feedbackChoiceId
    ? choices.find((choice) => choice.id === feedbackChoiceId)
    : undefined;

  const correctChoice = choices.find((choice) => choice.isCorrect);

  const teacherFeedbackImage =
    selectedChoice && teacherFeedbackImages
      ? selectedChoice.isCorrect
        ? teacherFeedbackImages.correct
        : teacherFeedbackImages.wrong
      : undefined;

  const playQuestionAudio = () => {
    setAudioQuestionStarted(true);
    setAudioQuestionFinished(false);
    wasTalkingRef.current = false;

    playQuestion(teacherAudioQuestion);
  };

  const handleSpeechButton = () => {
    if (isListening) {
      stopListening();
      return;
    }

    startListening();
  };

  // Masquer la bulle au clic sur le micro, sans rouvrir le verrou.
  const handleSpeechPromptUsed = () => {
    setSpeechPromptVisible(false);
  };

  const showSpeechPrompt =
    speechPromptVisible && !hasSelectedChoice;

  const isLastQuestion = currentIndex + 1 === totalQuestions;

  const handleNext = () => {
    if (isLastQuestion && onLastQuestion) {
      onLastQuestion();
      return;
    }

    nextQuestion();
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
          selectedChoiceIds={selectedChoiceIds}
          multipleChoice={isMultipleChoice}
          onSelect={selectChoice}
          image={image}
          teacherImage={teacherImage}
          teacherTalking={isTalking}
          isListening={isListening}
          onSpeech={handleSpeechButton}
          disabled={false}
          selectedChoice={selectedChoice}
          correctChoice={correctChoice}
          teacherFeedbackImage={teacherFeedbackImage}
          showSpeechPrompt={showSpeechPrompt}
          onSpeechPromptUsed={handleSpeechPromptUsed}
        />
      }
      navigation={
        hasSelectedChoice ? (
          <ExerciseNavigation
            isLastQuestion={isLastQuestion}
            onNext={handleNext}
            lastQuestionLabel={lastQuestionLabel}
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