"use client";

import TeacherAvatar from "./TeacherAvatar";
import TeacherSpeechBubble from "./TeacherSpeechBubble";
import AnswerChoices from "./AnswerChoices";
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
};

export default function QuestionContent({
  question,
  teacherImage,
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
}: Props) {
  const hasSelectedChoice = multipleChoice
    ? selectedChoiceIds.length > 0
    : !!selectedChoiceId;

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
      {/* =====================================================
          CONTENU QUESTION / RÉPONSES
      ===================================================== */}

      <div className="flex-1 lg:pt-8">
        <p className="mb-6 text-lg font-medium leading-7 text-black">
          {question}
        </p>

        {teacherTalking && (
          <div className="mb-5 flex items-center gap-4">
            <TeacherAvatar
              image={
                teacherImage ||
                "/images/teachers/default.png"
              }
              speaking={teacherTalking}
            />

            <TeacherSpeechBubble text="Le professeur parle..." />
          </div>
        )}

        <AnswerChoices
          choices={choices}
          selectedChoiceId={selectedChoiceId}
          selectedChoiceIds={selectedChoiceIds}
          multipleChoice={multipleChoice}
          disabled={disabled}
          onSelect={onSelect}
        />

        {!hasSelectedChoice && (
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={onSpeech}
              disabled={isListening}
              className={`
                relative flex h-14 w-14
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
        )}

        {selectedChoice && correctChoice && (
          <AnswerFeedback
            correct={selectedChoice.isCorrect}
            selectedAnswer={selectedChoice.label}
            correctAnswer={correctChoice.label}
          />
        )}
      </div>

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="w-full lg:w-[42%] lg:shrink-0">
        <QuestionImage image={image} />
      </div>
    </div>
  );
}