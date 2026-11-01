"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";

import {
  questionMatchingData,
  type QuestionMatchingData,
} from "./data/questionMatchingData";

import { useTeacherController } from "@/components/courses/common/hooks/useTeacherController";
import { useExerciseSession } from "@/components/courses/common/hooks/useExerciseSession";

import type {
  ExerciseSessionResult,
} from "@/components/courses/common/types/exerciseSessionTypes";

type FeedbackType = "correct" | "incorrect" | null;

type MatchedOption = {
  optionId: string;
  similarity: number;
};

type QuestionMatchingExerciseProps = {
  onComplete?: (result: ExerciseSessionResult) => void;
};

const SIMILARITY_THRESHOLD = 0.78;

const normalizeSpeech = (text: string): string => {
  return text
    .toLocaleLowerCase("fr-FR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .replace(/[’']/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const calculateSimilarity = (
  expected: string,
  actual: string,
): number => {
  const first = normalizeSpeech(expected);
  const second = normalizeSpeech(actual);

  if (first === second) return 1;
  if (!first || !second) return 0;

  const previousRow = Array.from(
    { length: second.length + 1 },
    (_, index) => index,
  );

  for (let i = 1; i <= first.length; i++) {
    const currentRow = [i];

    for (let j = 1; j <= second.length; j++) {
      const cost = first[i - 1] === second[j - 1] ? 0 : 1;

      currentRow[j] = Math.min(
        currentRow[j - 1] + 1,
        previousRow[j] + 1,
        previousRow[j - 1] + cost,
      );
    }

    previousRow.splice(
      0,
      previousRow.length,
      ...currentRow,
    );
  }

  const distance = previousRow[second.length];
  const maxLength = Math.max(first.length, second.length);

  return 1 - distance / maxLength;
};

const findMatchingOption = (
  transcript: string,
  question: QuestionMatchingData,
): MatchedOption | null => {
  const matches = question.options
    .map((option) => ({
      optionId: option.id,
      similarity: calculateSimilarity(option.text, transcript),
    }))
    .sort((a, b) => b.similarity - a.similarity);

  const bestMatch = matches[0];

  if (!bestMatch || bestMatch.similarity < SIMILARITY_THRESHOLD) {
    return null;
  }

  return bestMatch;
};

export default function QuestionMatchingExercise({
  onComplete,
}: QuestionMatchingExerciseProps) {
  const totalQuestions = questionMatchingData.length;

  const session = useExerciseSession(totalQuestions);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [matchedOptionId, setMatchedOptionId] = useState<string | null>(
    null,
  );
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechFinished, setSpeechFinished] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAnsweredRef = useRef(false);

  const currentQuestion: QuestionMatchingData | undefined =
    questionMatchingData[currentIndex];

  useEffect(() => {
    if (!session.isFinished) {
      return;
    }

    onComplete?.(session.result);
  }, [session.isFinished, session.result, onComplete]);

  const stopCurrentAudio = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.onended = null;
    audio.onerror = null;
    audioRef.current = null;
  }, []);

  const playFeedbackAudio = useCallback(
    (audioSrc: string) => {
      stopCurrentAudio();

      setIsSpeaking(true);
      setSpeechFinished(false);

      const audio = new Audio(audioSrc);

      audioRef.current = audio;

      const finishPlayback = () => {
        if (audioRef.current !== audio) return;

        setIsSpeaking(false);
        setSpeechFinished(true);
        audioRef.current = null;
      };

      audio.onended = finishPlayback;
      audio.onerror = finishPlayback;

      audio.play().catch((error) => {
        console.error(
          "Impossible de lire le fichier audio :",
          audioSrc,
          error,
        );

        finishPlayback();
      });
    },
    [stopCurrentAudio],
  );

  const handleSpeechResult = useCallback(
    (transcript: string) => {
      if (
        !currentQuestion ||
        hasAnsweredRef.current ||
        session.isFinished
      ) {
        return;
      }

      const cleanTranscript = transcript.trim();

      if (!cleanTranscript) return;

      hasAnsweredRef.current = true;

      setHasAnswered(true);
      setRecognizedText(cleanTranscript);

      const matchingOption = findMatchingOption(
        cleanTranscript,
        currentQuestion,
      );

      const isCorrect =
        matchingOption !== null &&
        matchingOption.optionId === currentQuestion.correctOptionId;

      setMatchedOptionId(matchingOption?.optionId ?? null);
      setFeedbackType(isCorrect ? "correct" : "incorrect");

      session.start();

      const correctOption = currentQuestion.options.find(
        (option) => option.id === currentQuestion.correctOptionId,
      );

      session.addAnswer({
        questionId: currentIndex,
        question: `Question ${currentIndex + 1}`,
        selectedAnswer: cleanTranscript,
        correctAnswer:
          correctOption?.text ?? currentQuestion.correctOptionId,
        isCorrect,
        explanation: isCorrect
          ? "Bravo ! Tu as formulé la bonne question."
          : `La question attendue était : « ${correctOption?.text ?? currentQuestion.correctOptionId} ».`,
      });

      const audioSrc = isCorrect
        ? currentQuestion.audio.correct
        : currentQuestion.audio.incorrect;

      playFeedbackAudio(audioSrc);
    },
    [
      currentQuestion,
      currentIndex,
      session,
      playFeedbackAudio,
    ],
  );

  const {
    isListening,
    isBusy,
    startListening,
    stopListening,
  } = useTeacherController({
    language: "fr-FR",
    onSpeech: handleSpeechResult,
    speechEngine: "openai",
  });

  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, [stopCurrentAudio]);

  const handleMicrophone = () => {
    if (hasAnsweredRef.current) return;

    if (isListening) {
      stopListening();
      return;
    }

    if (isBusy) return;

    startListening();
  };

  const handleNextQuestion = () => {
    if (
      !speechFinished ||
      isSpeaking ||
      isListening ||
      isBusy
    ) {
      return;
    }

    stopCurrentAudio();

    if (currentIndex < totalQuestions - 1) {
      hasAnsweredRef.current = false;

      setCurrentIndex((previousIndex) => previousIndex + 1);
      setFeedbackType(null);
      setRecognizedText("");
      setMatchedOptionId(null);
      setHasAnswered(false);
      setSpeechFinished(false);
      setIsSpeaking(false);

      return;
    }

    session.complete();
  };

  /*
   * COULEURS ORIGINALES DES PROPOSITIONS
   *
   * Avant réponse :
   * - Fond pêche : #FCE5D1
   * - Bordure : #E9B48F
   *
   * Bonne réponse :
   * - Fond vert
   * - Texte vert foncé
   *
   * Mauvaise réponse prononcée :
   * - Fond rouge
   * - Texte rouge foncé
   */
  const getOptionStyle = (optionId: string) => {
    if (!hasAnswered) {
      return "border-[#E9B48F] bg-[#FCE5D1] text-[#5B4636]";
    }
  
    if (optionId === currentQuestion?.correctOptionId) {
      return "border-green-600 bg-green-100 text-green-900";
    }
  
    if (optionId === matchedOptionId) {
      return "border-red-500 bg-red-100 text-red-900";
    }
  
    return "border-gray-200 bg-gray-100 text-gray-400 opacity-60";
  };

  if (!currentQuestion) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
      <p className="font-semibold text-amber-800">
  Aucune question n&apos;est disponible pour cet exercice.
</p>
      </div>
    );
  }

  return (
    <section
      id="question-matching-exercise"
      className="mx-auto w-full max-w-6xl min-w-0"
    >
      {/* EN-TÊTE */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#748198]">
            Compréhension et formulation
          </p>

          <h2 className="mt-1 font-serif text-2xl font-bold text-[#09264a] sm:text-3xl">
            Pose la bonne question
          </h2>
        </div>

        <div className="rounded-full border border-[#C8D6C3] bg-[#EAF0E7] px-4 py-2 text-sm font-bold text-[#31572C]">
          Question {currentIndex + 1} / {totalQuestions}
        </div>
      </div>

      {/* PROGRESSION */}
      <div
        className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-100"
        role="progressbar"
        aria-label="Progression de l'exercice"
        aria-valuemin={0}
        aria-valuemax={totalQuestions}
        aria-valuenow={currentIndex + 1}
      >
        <div
          className="h-full rounded-full bg-[#31572C] transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
          }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* IMAGE DE CLARA */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#D9DFD5] bg-[#F7F9F5] shadow-sm">
            <Image
              src={currentQuestion.imageSrc}
              alt="Clara dans une situation de sa journée quotidienne"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 40vw"
              className="object-contain"
            />
          </div>

          {/* RETOUR DE CLARA */}
          {feedbackType && (
            <div
              className={`relative rounded-2xl border-2 p-4 shadow-sm transition-all duration-300 ${
                feedbackType === "correct"
                  ? "border-green-300 bg-green-50"
                  : "border-red-300 bg-red-50"
              }`}
              aria-live="polite"
              aria-atomic="true"
            >
              <div
                aria-hidden="true"
                className={`absolute -top-[9px] left-8 h-4 w-4 rotate-45 border-l-2 border-t-2 ${
                  feedbackType === "correct"
                    ? "border-green-300 bg-green-50"
                    : "border-red-300 bg-red-50"
                }`}
              />

              <div className="relative flex items-center justify-between gap-3">
                <p
                  className={`text-xs font-extrabold uppercase tracking-wider ${
                    feedbackType === "correct"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  Clara te répond
                </p>

                {isSpeaking && (
                  <span className="flex shrink-0 items-center gap-2 text-xs font-semibold text-gray-600">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-1 animate-pulse rounded-full bg-current" />
                      <span className="h-3 w-1 animate-pulse rounded-full bg-current [animation-delay:150ms]" />
                      <span className="h-2 w-1 animate-pulse rounded-full bg-current [animation-delay:300ms]" />
                    </span>
                    Clara parle...
                  </span>
                )}
              </div>

              <p
                className={`mt-3 text-base font-semibold leading-relaxed ${
                  feedbackType === "correct"
                    ? "text-green-950"
                    : "text-red-950"
                }`}
              >
                « {currentQuestion.feedback[feedbackType]} »
              </p>

              {speechFinished && (
                <p className="mt-3 text-xs font-medium text-gray-500">
                  Réponse orale terminée.
                </p>
              )}
            </div>
          )}
        </div>

        {/* QUESTIONS ET MICRO */}
        <div className="min-w-0">
          {/* LISTE DES QUESTIONS */}
          <div className="mb-5 rounded-xl border border-[#D9DFD5] bg-[#F7F9F5] p-4">
            <p className="mb-4 text-center text-sm font-bold uppercase tracking-wide text-[#31572C]">
              Choisis oralement la bonne question
            </p>

            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option, index) => {
                const isMatched = matchedOptionId === option.id;
                const isCorrectOption =
                  option.id === currentQuestion.correctOptionId;

                return (
                  <div
                    key={option.id}
                    className={`flex min-h-[54px] items-center justify-between gap-3 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all duration-200 sm:text-base ${getOptionStyle(option.id)}`}
                  >
                    <span>
                      <span className="mr-2 font-bold opacity-60">
                        {index + 1}.
                      </span>

                      {`« ${option.text} »`}
                    </span>

                    {hasAnswered && isCorrectOption && (
                      <span
                        className="shrink-0 text-xl font-bold text-green-700"
                        aria-label="Bonne question"
                      >
                        ✓
                      </span>
                    )}

                    {hasAnswered && isMatched && !isCorrectOption && (
                      <span
                        className="shrink-0 text-xl font-bold text-red-600"
                        aria-label="Question prononcée"
                      >
                        ✕
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* MICROPHONE */}
          <div className="flex flex-col items-center rounded-2xl border border-[#E9D9C9] bg-[#FFFAF5] px-5 py-8 text-center">
            <button
              type="button"
              onClick={handleMicrophone}
              disabled={hasAnswered || (isBusy && !isListening)}
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
                  !hasAnswered && !isBusy && !isListening
                    ? "animate-pulse ring-4 ring-amber-300/50"
                    : ""
                }
                disabled:cursor-not-allowed disabled:opacity-50
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

            <p className="mt-5 text-sm font-semibold text-gray-700">
              {isListening
                ? "Je t'écoute ! À toi de parler..."
                : isBusy
                  ? "Analyse de ta réponse..."
                  : hasAnswered
                    ? "Réponse enregistrée."
                    : "Clique sur le micro et pose ta question à Clara."}
            </p>

            {!hasAnswered && !isBusy && !isListening && (
              <p className="mt-2 text-xs text-gray-500">
                Observe les propositions et formule la bonne question à voix haute.
              </p>
            )}
          </div>

          {/* TRANSCRIPTION */}
          {recognizedText && (
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                Ce que tu as dit
              </p>

              <p className="mt-2 text-base font-medium leading-relaxed text-gray-800">
                « {recognizedText} »
              </p>
            </div>
          )}

          {/* RÉSULTAT DE LA RECONNAISSANCE */}
          {hasAnswered && (
            <div
              className={`mt-4 rounded-xl border p-4 ${
                feedbackType === "correct"
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  feedbackType === "correct"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {feedbackType === "correct"
                  ? "Bravo ! Tu as formulé la bonne question."
                  : "Ce n'est pas la bonne question. Écoute la réponse de Clara."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* BOUTON QUESTION SUIVANTE */}
      {hasAnswered && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleNextQuestion}
            disabled={!speechFinished || isSpeaking || isBusy || isListening}
            className="rounded-xl bg-[rgb(49,87,44)] px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-[rgb(39,70,35)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {currentIndex < totalQuestions - 1
              ? "Question suivante"
              : "Terminer l'exercice"}
          </button>
        </div>
      )}
    </section>
  );
}