
"use client";

import { useState } from "react";

import TeacherAvatar from "./TeacherAvatar";
import TeacherSpeechBubble from "./TeacherSpeechBubble";
import AnswerChoices from "./AnswerChoices";
import TeacherComicBubble, {
  type TeacherLevel,
} from "../teacher/TeacherComicBubble";
import QuestionImage from "./QuestionImage";
import AnswerFeedback from "./AnswerFeedback";

type Choice = {
  id: string;
  label: string;
  isCorrect: boolean;
};

type Props = {
  question: string;
  teacherImage?: string;
  teacherBubbleImage?: string;
  teacherLevel: TeacherLevel;
  teacherTalking: boolean;
  image?: string;
  choices: Choice[];
  selectedChoiceId: string | null;
  selectedChoiceIds?: string[];
  multipleChoice?: boolean;
  onSelect: (choiceId: string) => void;
  disabled?: boolean;
  isListening: boolean;
  onSpeech: () => void;
  selectedChoice?: Choice;
  correctChoice?: Choice;
  teacherFeedbackImage?: string;
  showSpeechPrompt?: boolean;
  onSpeechPromptUsed?: () => void;
};

export default function QuestionContent({
  question,
  teacherImage,
  teacherBubbleImage,
  teacherLevel,
  teacherTalking,
  image,
  choices,
  selectedChoiceId,
  selectedChoiceIds = [],
  multipleChoice = false,
  onSelect,
  disabled = false,
  isListening,
  onSpeech,
  selectedChoice,
  correctChoice,
  teacherFeedbackImage,
  showSpeechPrompt = false,
  onSpeechPromptUsed,
}: Props) {
  const hasSelectedChoice = multipleChoice
    ? selectedChoiceIds.length > 0
    : !!selectedChoiceId;

  const [hasClickedSpeech, setHasClickedSpeech] = useState(false);

  const handleSpeechClick = () => {
    onSpeechPromptUsed?.();
    setHasClickedSpeech(true);
    onSpeech();
  };

  const teacherAlt =
    teacherLevel === "beginner"
      ? "Marie, professeure de français"
      : teacherLevel === "elementary-1"
        ? "Jean, professeur de français"
        : teacherLevel === "elementary-2"
          ? "Irène, professeure de français"
          : "Henri, professeur de français";

  // Même image pour la lecture audio et l'enregistrement vocal.
  const resolvedTeacherImage = teacherImage || teacherBubbleImage;

  // Le professeur apparaît pendant la lecture OU pendant l'écoute.
  const showActiveTeacher = teacherTalking || isListening;

  const teacherMessage = isListening
    ? "Je t'écoute ! À toi de parler..."
    : "Le professeur parle...";

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
      {/* CONTENU QUESTION / RÉPONSES */}
      <div className="flex-1 lg:pt-8">
        <p className="mb-6 text-lg font-medium leading-7 text-black">
          {question}
        </p>

        {/* PROFESSEUR PENDANT LA LECTURE AUDIO OU LE MICRO */}
        {showActiveTeacher && resolvedTeacherImage && (
          <div className="mb-5 flex items-center gap-4">
            <TeacherAvatar
              image={resolvedTeacherImage}
            />

            <TeacherSpeechBubble text={teacherMessage} />
          </div>
        )}

        <AnswerChoices
          choices={choices}
          selectedChoiceId={selectedChoiceId}
          selectedChoiceIds={selectedChoiceIds}
          multipleChoice={multipleChoice}
          disabled={disabled}
          onSelect={onSelect}
          teacherFeedbackImage={teacherFeedbackImage}
        />

        {!hasSelectedChoice && (
          <div className="mt-5">
            {/* BOUTON DU MICRO */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSpeechClick}
                disabled={disabled}
                aria-label={
                  isListening
                    ? "Arrêter l'enregistrement"
                    : "Commencer l'enregistrement"
                }
                className={`
                  relative flex h-14 w-14 shrink-0
                  items-center justify-center
                  rounded-full
                  shadow-xl
                  transition-all
                  duration-200
                  ${
                    isListening
                      ? "scale-105 bg-amber-400 text-black"
                      : "bg-white text-amber-600 hover:scale-105 hover:bg-amber-100"
                  }
                  ${
                    showSpeechPrompt &&
                    !hasClickedSpeech &&
                    !isListening
                      ? "animate-pulse ring-4 ring-amber-300/50"
                      : ""
                  }
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v3m0 0h3m-3 0H9m3-7a4 4 0 004-4V7a4 4 0 10-8 0v3a4 4 0 004 4z"
                  />
                </svg>

                {isListening && (
                  <div className="absolute -bottom-4 flex gap-1">
                    <div className="animate-wave1 h-3 w-1 rounded bg-amber-300" />
                    <div className="animate-wave2 h-4 w-1 rounded bg-amber-500" />
                    <div className="animate-wave3 h-3 w-1 rounded bg-amber-300" />
                  </div>
                )}
              </button>

              {isListening && (
                <div className="flex items-center gap-2 text-sm text-black">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-black" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-black delay-75" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-black delay-150" />
                  <span>Parle...</span>
                </div>
              )}
            </div>

            {/* BULLE DU MICRO */}
            {showSpeechPrompt && !hasClickedSpeech && (
              <div className="mt-3 max-w-xl">
                <TeacherComicBubble
                  message="Clique ici pour donner ta réponse à l'oral."
                  level={teacherLevel}
                  imageSrc={teacherBubbleImage}
                  imageAlt={teacherAlt}
                />
              </div>
            )}
          </div>
        )}

        {/* RETOUR SUR LA RÉPONSE */}
        {selectedChoice && correctChoice && (
          <AnswerFeedback
            correct={selectedChoice.isCorrect}
            selectedAnswer={selectedChoice.label}
            correctAnswer={correctChoice.label}
          />
        )}
      </div>

      {/* IMAGE DE LA QUESTION */}
      <div className="w-full lg:w-[42%] lg:shrink-0">
        <QuestionImage image={image} />
      </div>
    </div>
  );
}
