"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type {
  ExerciseHistoryItem,
  ExerciseSessionResult,
} from "@/components/courses/common/types/exerciseSessionTypes";

import {
  REPORTED_SPEECH_EXAMPLE,
  REPORTED_SPEECH_QUESTIONS,
} from "./data/reportedSpeech.data";

import { useOpenAISpeechRecognition } from "@/components/courses/speech/useOpenAISpeechRecognition";

import HenriIntervention from "@/components/courses/layout/HenriIntervention";

type ReportedSpeechExerciseProps = {
  onComplete: (result: ExerciseSessionResult) => void;
};

function normalizeAnswer(value: string): string {
  return value
    .toLocaleLowerCase("fr-FR")
    .replace(/[\u2018\u2019\u02BC`]/g, "'")
    .replace(/[.,!?;:«»"“”]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function ReportedSpeechExercise({
  onComplete,
}: ReportedSpeechExerciseProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [validated, setValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [history, setHistory] = useState<ExerciseHistoryItem[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const [playingSpeaker, setPlayingSpeaker] = useState<
    "pauline" | "henri" | null
  >(null);

  const [isPaulineFinished, setIsPaulineFinished] = useState(false);
  const [isHenriFinished, setIsHenriFinished] = useState(false);

  const startedAtRef = useRef<Date>(new Date());
  const submissionInProgress = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionCallbackRef = useRef<(text: string) => void>(() => {});
  const henriTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const QUESTIONS = REPORTED_SPEECH_QUESTIONS;
  const EXAMPLE = REPORTED_SPEECH_EXAMPLE;
  const currentQuestion = QUESTIONS[currentIndex];

  const {
    startListening,
    stopListening,
    isListening,
    isSupported,
  } = useOpenAISpeechRecognition({
    language: "fr-FR",
    onResult: (text) => {
      recognitionCallbackRef.current(text);
    },
  });

  const totalVignettes = QUESTIONS.length;

  const progress = hasStarted
    ? ((currentIndex + 1) / totalVignettes) * 100
    : 0;

  // ANNULATION DU DÉLAI AVANT LE LANCEMENT AUTOMATIQUE D'HENRI
  const clearHenriTimeout = useCallback(() => {
    if (henriTimeoutRef.current !== null) {
      clearTimeout(henriTimeoutRef.current);
      henriTimeoutRef.current = null;
    }
  }, []);

  // ARRÊT DE L'AUDIO ET DU DÉLAI À LA FERMETURE DU COMPOSANT
  useEffect(() => {
    return () => {
      clearHenriTimeout();

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [clearHenriTimeout]);

  // ARRÊT DE L'AUDIO EN COURS
  const stopCurrentAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setPlayingSpeaker(null);
  }, []);

  // LECTURE AUDIO
  const playAudioFile = useCallback(
    (
      audioSrc: string,
      speaker: "pauline" | "henri",
      onEnded?: () => void,
      onError?: () => void,
    ) => {
      if (!audioSrc) {
        onError?.();
        setFeedback("Aucun fichier audio disponible pour cette vignette.");
        return;
      }

      const audio = new Audio(audioSrc);
      audioRef.current = audio;

      audio.onended = () => {
        if (audioRef.current !== audio) return;

        audioRef.current = null;
        setPlayingSpeaker(null);
        onEnded?.();
      };

      audio.onerror = () => {
        if (audioRef.current !== audio) return;

        audioRef.current = null;
        setPlayingSpeaker(null);
        setFeedback(
          "Impossible de lire cet audio. Vérifie le fichier puis réessaie.",
        );
        onError?.();
      };

      setPlayingSpeaker(speaker);
      setFeedback("");

      void audio.play().catch(() => {
        if (audioRef.current !== audio) return;

        audioRef.current = null;
        setPlayingSpeaker(null);
        setFeedback(
          "Impossible de lire cet audio. Vérifie le fichier puis réessaie.",
        );
        onError?.();
      });
    },
    [],
  );

  // PAULINE : HENRI SE LANCE AUTOMATIQUEMENT 3 SECONDES APRÈS.
  const handlePlayQuestionPauline = () => {
    if (!currentQuestion) return;

    clearHenriTimeout();

    if (playingSpeaker === "pauline") {
      stopCurrentAudio();
      setIsPaulineFinished(false);
      setIsHenriFinished(false);
      return;
    }

    if (isListening) stopListening();

    stopCurrentAudio();
    setIsPaulineFinished(false);
    setIsHenriFinished(false);

    playAudioFile(
      currentQuestion.audioSrc,
      "pauline",
      () => {
        setIsPaulineFinished(true);

        if (!currentQuestion.professorAudioSrc) {
          setIsHenriFinished(true);
          return;
        }

        henriTimeoutRef.current = setTimeout(() => {
          henriTimeoutRef.current = null;

          playAudioFile(
            currentQuestion.professorAudioSrc!,
            "henri",
            () => setIsHenriFinished(true),
          );
        }, 3000);
      },
    );
  };

  // L'EXEMPLE SUIT LE MÊME ENCHAÎNEMENT AUTOMATIQUE.
  const handlePlayExamplePauline = () => {
    clearHenriTimeout();

    if (playingSpeaker === "pauline") {
      stopCurrentAudio();
      setIsPaulineFinished(false);
      setIsHenriFinished(false);
      return;
    }

    stopCurrentAudio();
    setIsPaulineFinished(false);
    setIsHenriFinished(false);

    playAudioFile(
      EXAMPLE.audioSrc,
      "pauline",
      () => {
        setIsPaulineFinished(true);

        if (!EXAMPLE.professorAudioSrc) {
          setIsHenriFinished(true);
          return;
        }

        henriTimeoutRef.current = setTimeout(() => {
          henriTimeoutRef.current = null;

          playAudioFile(
            EXAMPLE.professorAudioSrc!,
            "henri",
            () => setIsHenriFinished(true),
          );
        }, 3000);
      },
    );
  };

  // DÉMARRAGE DE L'EXERCICE
  const handleStartExercise = () => {
    clearHenriTimeout();
    stopCurrentAudio();

    startedAtRef.current = new Date();

    setHasStarted(true);
    setCurrentIndex(0);
    setAnswer("");
    setValidated(false);
    setIsCorrect(false);
    setFeedback("");
    setIsPaulineFinished(false);
    setIsHenriFinished(false);
  };

  // VALIDATION DE LA RÉPONSE VOCALE
  const validateAnswer = useCallback(
    (spokenText: string) => {
      const cleanAnswer = spokenText.trim();

      if (!cleanAnswer || validated || submissionInProgress.current) {
        return;
      }

      const normalizedAnswer = normalizeAnswer(cleanAnswer);

      const correct = currentQuestion.acceptedAnswers.some(
        (acceptedAnswer) =>
          normalizeAnswer(acceptedAnswer) === normalizedAnswer,
      );

      setAnswer(cleanAnswer);
      setIsCorrect(correct);
      setValidated(true);
      setFeedback("");

      const historyItem: ExerciseHistoryItem = {
        questionId: currentQuestion.id,
        question: currentQuestion.sentence,
        selectedAnswer: cleanAnswer,
        correctAnswer: currentQuestion.expectedAnswer,
        isCorrect: correct,
        explanation: currentQuestion.explanation,
      };

      setHistory((previousHistory) => [
        ...previousHistory,
        historyItem,
      ]);
    },
    [currentQuestion, validated],
  );

  // CONSERVE TOUJOURS LA BONNE FONCTION DE VALIDATION
  useEffect(() => {
    recognitionCallbackRef.current = validateAnswer;
  }, [validateAnswer]);

  // MICROPHONE
  const handleSpeak = () => {
    if (validated || !isHenriFinished) return;

    stopCurrentAudio();

    if (isListening) {
      stopListening();
      return;
    }

    if (!isSupported) {
      setFeedback(
        "Ton navigateur ne permet pas d'accéder au microphone.",
      );
      return;
    }

    setFeedback("Parle maintenant...");

    void startListening();
  };

  // FIN DE L'EXERCICE
  const finishExercise = (
    finalHistory: ExerciseHistoryItem[],
  ) => {
    if (submissionInProgress.current) return;

    submissionInProgress.current = true;

    const finishedAt = new Date();

    const finalCorrectAnswers = finalHistory.filter(
      (item) => item.isCorrect,
    ).length;

    const result: ExerciseSessionResult = {
      score: Math.round(
        (finalCorrectAnswers / QUESTIONS.length) * 100,
      ),
      correctAnswers: finalCorrectAnswers,
      totalQuestions: QUESTIONS.length,
      history: finalHistory,
      startedAt: startedAtRef.current,
      finishedAt,
      duration: Math.round(
        (finishedAt.getTime() -
          startedAtRef.current.getTime()) /
          1000,
      ),
    };

    clearHenriTimeout();
    stopCurrentAudio();

    if (isListening) {
      stopListening();
    }

    setIsFinished(true);
    onComplete(result);
  };

  // QUESTION SUIVANTE
  const handleNext = () => {
    if (!validated) return;

    clearHenriTimeout();
    stopCurrentAudio();

    if (isListening) {
      stopListening();
    }

    if (currentIndex === QUESTIONS.length - 1) {
      finishExercise(history);
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);
    setIsPaulineFinished(false);
    setIsHenriFinished(false);
    setAnswer("");
    setValidated(false);
    setIsCorrect(false);
    setFeedback("");
  };

  if (isFinished) {
    return null;
  }

  return (
    <section
      id="reported-speech-exercise"
      className="box-border w-full min-w-0 max-w-full space-y-7 sm:space-y-9"
    >
      {/* EN-TÊTE */}
      <div className="w-full min-w-0">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-orange-600">
                Transformation morphosyntaxique
              </span>

              <span className="text-xs font-semibold text-gray-400">
                Exercice 3
              </span>
            </div>

            <h3 className="text-xl font-bold tracking-tight text-[#17243B] sm:text-2xl">
              Pauline a quelque chose à demander…
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Écoute, comprends et reformule au discours indirect.
            </p>
          </div>

          {/* COMPTEUR DES VIGNETTES */}
          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <span className="text-lg font-bold">♫</span>
            </div>

            <div>
              <p className="text-lg font-extrabold leading-none text-gray-900">
                {hasStarted ? (
                  <>
                    {currentQuestion.id}
                    <span className="text-gray-400">
                      {" "}
                      / {totalVignettes}
                    </span>
                  </>
                ) : (
                  "Exemple"
                )}
              </p>

              {hasStarted && (
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Vignette
                </p>
              )}
            </div>
          </div>
        </div>

        {/* PROGRESSION */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-orange-400 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* VIGNETTE 1 : EXEMPLE PÉDAGOGIQUE */}
      {!hasStarted && (
        <div className="w-full min-w-0 overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-[0_8px_35px_rgba(31,41,55,0.05)]">
          <div className="grid w-full min-w-0 grid-cols-1 md:grid-cols-[0.95fr_1.05fr]">
            {/* PHOTO DE PAULINE */}
            <div className="relative min-w-0 overflow-hidden bg-[#FCFBFA]">
              <div className="relative aspect-[573/436] w-full overflow-hidden bg-[#FCFBFA]">
                <Image
                  src={EXAMPLE.imageSrc}
                  alt="Pauline - Exemple"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-gray-200/70 bg-white/95 px-4 py-2 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-orange-400" />

                  <span className="text-[11px] font-extrabold uppercase tracking-[0.13em] text-gray-800">
                    Exemple
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                    L’amour est dans le pré
                  </p>

                  <p className="mt-1 font-serif text-3xl font-bold text-white drop-shadow-md sm:text-4xl">
                    Pauline
                  </p>
                </div>
              </div>
            </div>

            {/* CONTENU DE L'EXEMPLE */}
            <div className="flex min-w-0 flex-col p-5 sm:p-7 lg:p-9">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-orange-100 bg-orange-50 text-lg font-extrabold text-orange-600">
                    P
                  </div>

                  <div>
                    <p className="font-bold text-[#17243B]">
                      Pauline
                    </p>

                    <p className="text-xs text-gray-500">
                      Écoute sa phrase
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Exemple
                </span>
              </div>

              {/* PHRASE DE PAULINE */}
              <div className="relative mb-6 rounded-2xl border border-gray-200 bg-[#FAFAF9] p-5 sm:p-6">
                <div className="absolute right-5 top-3 font-serif text-4xl leading-none text-gray-200">
                  ”
                </div>

                <p className="relative z-10 pr-5 text-lg font-semibold leading-relaxed text-[#292044] sm:text-xl">
                  « {EXAMPLE.sentence} »
                </p>

                {/* BOUTON AUDIO DE PAULINE */}
                <div className="mt-5 flex items-center gap-3 border-t border-gray-200 pt-4">
                  <button
                    type="button"
                    onClick={handlePlayExamplePauline}
                    aria-label={
                      playingSpeaker === "pauline"
                        ? "Arrêter l'audio de Pauline"
                        : "Écouter Pauline"
                    }
                    aria-pressed={playingSpeaker === "pauline"}
                    className={`group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-orange-500 shadow-[0_4px_14px_rgba(31,41,55,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-100 ${
                      playingSpeaker === "pauline"
                        ? "border-orange-300 bg-orange-50"
                        : ""
                    }`}
                  >
                    {playingSpeaker === "pauline" ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-0.5 h-5 w-5 transition-transform group-hover:scale-110"
                        aria-hidden="true"
                      >
                        <path d="M8 5.5a1 1 0 0 1 1.5-.86l10 6a1.08 1.08 0 0 1 0 1.72l-10 6A1 1 0 0 1 8 17.5v-12Z" />
                      </svg>
                    )}
                  </button>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {playingSpeaker === "pauline"
                        ? "Lecture de Pauline en cours"
                        : "Écouter Pauline"}
                    </p>

                    <p className="text-xs text-gray-400">
                      {playingSpeaker === "pauline"
                        ? "Appuie pour arrêter"
                        : "Écoute la phrase de Pauline"}
                    </p>
                  </div>

                  {playingSpeaker === "pauline" && (
                    <div className="ml-auto flex items-center gap-1">
                      <span className="h-2 w-1 animate-pulse rounded-full bg-orange-300" />
                      <span className="h-4 w-1 animate-pulse rounded-full bg-orange-400 [animation-delay:150ms]" />
                      <span className="h-3 w-1 animate-pulse rounded-full bg-orange-500 [animation-delay:300ms]" />
                    </div>
                  )}
                </div>
              </div>

              {/* INTERVENTION AUTOMATIQUE D'HENRI */}
              {isPaulineFinished &&
                EXAMPLE.professorAudioSrc &&
                !isHenriFinished && (
                  <HenriIntervention
                    isVisible
                    isPlaying={playingSpeaker === "henri"}
                    isFinished={false}
                    isListening={false}
                    onSpeak={() => {}}
                  />
                )}

              {/* RÉPONSE ATTENDUE */}
              <div className="mb-4 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                  Au discours indirect
                </p>

                <p className="text-sm font-semibold leading-relaxed text-gray-900">
                  {EXAMPLE.expectedAnswer}
                </p>
              </div>

              {/* EXPLICATION */}
              <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-gray-500">
                  À retenir
                </p>

                <p className="text-sm leading-relaxed text-gray-700">
                  {EXAMPLE.explanation}
                </p>
              </div>

              {/* BOUTON COMMENCER */}
              <button
                type="button"
                onClick={handleStartExercise}
                className="group mt-auto flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-100"
              >
                Commencer

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <p className="mt-3 text-center text-[11px] text-gray-400">
                Cet exemple ne compte pas dans ta note.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* QUESTIONS NOTÉES : VIGNETTES 1 À 8 */}
      {hasStarted && currentQuestion && (
        <>
          {/* CARTE PRINCIPALE */}
          <div className="w-full min-w-0 overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-[0_8px_35px_rgba(31,41,55,0.05)]">
            <div className="grid w-full min-w-0 grid-cols-1 md:grid-cols-[0.95fr_1.05fr]">
              {/* PHOTO DE PAULINE */}
              <div className="relative min-w-0 overflow-hidden bg-[#FCFBFA]">
                <div className="relative aspect-[573/436] w-full overflow-hidden bg-[#FCFBFA]">
                  <Image
                    key={currentQuestion.id}
                    src={currentQuestion.imageSrc}
                    alt={`Pauline - Vignette ${currentQuestion.id}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-center transition-transform duration-500"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />

                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-gray-200/70 bg-white/95 px-4 py-2 shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-orange-400" />

                    <span className="text-[11px] font-extrabold uppercase tracking-[0.13em] text-gray-800">
                      Vignette {currentQuestion.id}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                      L’amour est dans le pré
                    </p>

                    <p className="mt-1 font-serif text-3xl font-bold text-white drop-shadow-md sm:text-4xl">
                      Pauline
                    </p>
                  </div>
                </div>
              </div>

              {/* CONTENU INTERACTIF */}
              <div className="flex min-w-0 flex-col p-5 sm:p-7 lg:p-9">
                {/* PAULINE */}
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-orange-100 bg-orange-50 text-lg font-extrabold text-orange-600">
                      P
                    </div>

                    <div>
                      <p className="font-bold text-[#17243B]">
                        Pauline
                      </p>

                      <p className="text-xs text-gray-500">
                        Écoute ses paroles
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Audio
                  </span>
                </div>

                {/* PHRASE DE PAULINE */}
                <div className="relative mb-7 rounded-2xl border border-gray-200 bg-[#FAFAF9] p-5 sm:p-6">
                  <div className="absolute right-5 top-3 font-serif text-4xl leading-none text-gray-200">
                    ”
                  </div>

                  <p className="relative z-10 pr-5 text-lg font-semibold leading-relaxed text-[#292044] sm:text-xl">
                    « {currentQuestion.sentence} »
                  </p>

                  {/* BOUTON AUDIO DE PAULINE */}
                  <div className="mt-5 flex items-center gap-3 border-t border-gray-200 pt-4">
                    <button
                      type="button"
                      onClick={handlePlayQuestionPauline}
                      aria-label={
                        playingSpeaker === "pauline"
                          ? "Arrêter l'audio de Pauline"
                          : "Écouter Pauline"
                      }
                      aria-pressed={playingSpeaker === "pauline"}
                      className={`group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-orange-500 shadow-[0_4px_14px_rgba(31,41,55,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-100 ${
                        playingSpeaker === "pauline"
                          ? "border-orange-300 bg-orange-50"
                          : ""
                      }`}
                    >
                      {playingSpeaker === "pauline" ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <rect x="6" y="5" width="4" height="14" rx="1" />
                          <rect x="14" y="5" width="4" height="14" rx="1" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="ml-0.5 h-5 w-5 transition-transform group-hover:scale-110"
                          aria-hidden="true"
                        >
                          <path d="M8 5.5a1 1 0 0 1 1.5-.86l10 6a1.08 1.08 0 0 1 0 1.72l-10 6A1 1 0 0 1 8 17.5v-12Z" />
                        </svg>
                      )}
                    </button>

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {playingSpeaker === "pauline"
                          ? "Lecture de Pauline en cours"
                          : "Écouter Pauline"}
                      </p>

                      <p className="text-xs text-gray-400">
                        {playingSpeaker === "pauline"
                          ? "Appuie pour arrêter"
                          : "Écoute attentivement la phrase"}
                      </p>
                    </div>

                    {playingSpeaker === "pauline" && (
                      <div className="ml-auto flex items-center gap-1">
                        <span className="h-2 w-1 animate-pulse rounded-full bg-orange-300" />
                        <span className="h-4 w-1 animate-pulse rounded-full bg-orange-400 [animation-delay:150ms]" />
                        <span className="h-3 w-1 animate-pulse rounded-full bg-orange-500 [animation-delay:300ms]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* INTERVENTION AUTOMATIQUE D'HENRI */}
                {isPaulineFinished && currentQuestion.professorAudioSrc && (
                  <HenriIntervention
                    isVisible
                    isPlaying={playingSpeaker === "henri"}
                    isFinished={isHenriFinished && !validated}
                    isListening={isListening}
                    onSpeak={handleSpeak}
                    disabled={validated}
                  />
                )}

                {/* SÉPARATEUR */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-gray-200" />

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gray-400">
                    À toi de jouer
                  </span>

                  <span className="h-px flex-1 bg-gray-200" />
                </div>

                {/* CONSIGNE */}
                <div className="mb-5 rounded-xl border border-gray-200 bg-[#FAFAF9] p-4">
                  <p className="text-sm leading-relaxed text-gray-700 sm:text-[15px]">
                    {currentQuestion.instruction}
                  </p>
                </div>

                {/* RÉPONSE RECONNUE */}
                <div className="mb-4">
                  <p className="mb-2 text-sm font-bold text-[#17243B]">
                    Ta réponse au discours indirect
                  </p>

                  <div
                    className={`min-h-[90px] rounded-xl border p-4 transition-all ${
                      validated
                        ? isCorrect
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-amber-200 bg-amber-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {answer ? (
                      <p className="text-sm leading-relaxed text-gray-800">
                        {answer}
                      </p>
                    ) : (
                      <p className="text-sm italic text-gray-400">
                        Ta réponse apparaîtra ici après l&apos;enregistrement...
                      </p>
                    )}
                  </div>
                </div>

                {!validated && !isHenriFinished && (
                  <div className="mt-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-center text-sm font-medium text-amber-800">
                    {playingSpeaker === "pauline"
                      ? "Écoute Pauline jusqu'au bout. Henri prendra la parole 3 secondes après."
                      : isPaulineFinished
                        ? "Henri va prendre la parole dans un instant..."
                        : "Clique sur le bouton de Pauline pour commencer."}
                  </div>
                )}

                {/* FEEDBACK MICROPHONE */}
                {feedback && !validated && (
                  <div className="mt-4 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-center text-sm font-medium text-orange-800">
                    {feedback}
                  </div>
                )}

                {/* CORRECTION */}
                {validated && (
                  <div
                    className={`mt-5 overflow-hidden rounded-2xl border ${
                      isCorrect
                        ? "border-emerald-200 bg-emerald-50/80"
                        : "border-amber-200 bg-amber-50/80"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 px-4 py-3 ${
                        isCorrect
                          ? "bg-emerald-100/70"
                          : "bg-amber-100/70"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          isCorrect
                            ? "bg-emerald-600 text-white"
                            : "bg-amber-500 text-white"
                        }`}
                      >
                        {isCorrect ? "✓" : "!"}
                      </div>

                      <p
                        className={`text-sm font-extrabold ${
                          isCorrect
                            ? "text-emerald-800"
                            : "text-amber-800"
                        }`}
                      >
                        {isCorrect
                          ? "Excellent ! Bonne réponse."
                          : "Pas tout à fait !"}
                      </p>
                    </div>

                    <div className="space-y-3 p-4">
                      {!isCorrect && (
                        <div>
                          <p className="mb-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                            Réponse attendue
                          </p>

                          <p className="text-sm font-semibold leading-relaxed text-gray-900">
                            {currentQuestion.expectedAnswer}
                          </p>
                        </div>
                      )}

                      <div>
                        <p
                          className={`mb-1 text-[10px] font-extrabold uppercase tracking-wider ${
                            isCorrect
                              ? "text-emerald-700"
                              : "text-amber-700"
                          }`}
                        >
                          À retenir
                        </p>

                        <p className="text-sm leading-relaxed text-gray-700">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* QUESTION SUIVANTE */}
                {validated && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="group mt-5 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-bold text-gray-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-100"
                  >
                    {currentIndex === QUESTIONS.length - 1
                      ? "Voir mes résultats"
                      : "Passer à la vignette suivante"}

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12h14m-6-6 6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* INDICATION EN BAS */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="1.7"
            />

            <path
              d="M12 11v5m0-8h.01"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>

          <span>
            {hasStarted
              ? "Écoute Pauline, puis réponds oralement à Henri."
              : "Découvre l'exemple avant de commencer l'exercice."}
          </span>
        </div>

        <span className="text-xs font-semibold text-orange-600">
          {Math.round(progress)} % terminé
        </span>
      </div>
    </section>
  );
}