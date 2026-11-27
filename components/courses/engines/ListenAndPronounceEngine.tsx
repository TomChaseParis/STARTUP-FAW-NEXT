
"use client";

import Image from "next/image";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import SpeechButton from "@/components/courses/components/SpeechButton";

import { useOpenAISpeechRecognition } from "@/components/courses/speech/useOpenAISpeechRecognition";

import { validateSentence } from "@/components/courses/speech/scoring";

import type {
  ExerciseHistoryItem,
  ExerciseSessionResult,
} from "@/components/courses/common/types/exerciseSessionTypes";

import type { ListenAndPronouncePhrase } from "../activities/elementary-2/le-logement/exercise-5/episode4Data";

type ListenAndPronounceEngineProps = {
  phrases: ListenAndPronouncePhrase[];
  audioSrc: string;
  imageSrc: string;
  onComplete: (result: ExerciseSessionResult) => void;
};

type PhraseResult = {
  spokenText: string;
  similarity: number;
  isCorrect: boolean;
};

const MAX_ATTEMPTS = 3;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export default function ListenAndPronounceEngine({
  phrases,
  audioSrc,
  imageSrc,
  onComplete,
}: ListenAndPronounceEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [similarity, setSimilarity] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  const [results, setResults] = useState<(PhraseResult | null)[]>(
    phrases.map(() => null),
  );

  const [isPlayingPassage, setIsPlayingPassage] = useState(false);
  const [hasListenedToEnd, setHasListenedToEnd] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [finished, setFinished] = useState(false);

  const passageAudioRef = useRef<HTMLAudioElement | null>(null);
  const sessionStartedAt = useRef(new Date());
  const finishedRef = useRef(false);

  const recognitionCallbackRef = useRef<(text: string) => void>(() => {});

  const currentPhrase = phrases[currentIndex];
  const totalQuestions = phrases.length;

  const completedQuestions = results.filter(
    (result) => result !== null,
  ).length;

  const correctAnswers = results.filter(
    (result) => result?.isCorrect,
  ).length;

  const progress =
    totalQuestions > 0
      ? (completedQuestions / totalQuestions) * 100
      : 0;

  const {
    startListening,
    stopListening,
    isListening,
    isSupported,
  } = useOpenAISpeechRecognition({
    language: "fr-FR",
    onResult: (text: string) => {
      recognitionCallbackRef.current(text);
    },
  });

  useEffect(() => {
    const audio = passageAudioRef.current;

    return () => {
      audio?.pause();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const handlePlayPause = async () => {
    const audio = passageAudioRef.current;

    if (!audio) {
      setFeedback("Le lecteur audio n'est pas disponible.");
      return;
    }

    if (!audio.paused) {
      audio.pause();
      return;
    }

    window.speechSynthesis?.cancel();

    if (audio.ended) {
      audio.currentTime = 0;
    }

    try {
      await audio.play();
    } catch {
      setIsPlayingPassage(false);
      setFeedback(
        "Impossible de lire l'enregistrement audio. Vérifie le fichier.",
      );
    }
  };

  const handleSeek = (value: string) => {
    const audio = passageAudioRef.current;

    if (!audio) return;

    const nextTime = Number(value);

    if (!Number.isFinite(nextTime)) return;

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleAudioLoaded = () => {
    const audio = passageAudioRef.current;

    if (!audio) return;

    setDuration(
      Number.isFinite(audio.duration) ? audio.duration : 0,
    );

    setCurrentTime(audio.currentTime);
  };

  const handleAudioTimeUpdate = () => {
    const audio = passageAudioRef.current;

    if (!audio) return;

    setCurrentTime(audio.currentTime);
  };

  const handleAudioEnded = () => {
    setIsPlayingPassage(false);
    setHasListenedToEnd(true);

    const audio = passageAudioRef.current;

    if (audio) {
      setCurrentTime(audio.duration);
    }

    setFeedback("");
  };

  const speakText = (text: string) => {
    if (!hasListenedToEnd) return;

    if (
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    ) {
      setFeedback(
        "La lecture audio n'est pas disponible sur ce navigateur.",
      );
      return;
    }

    passageAudioRef.current?.pause();
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "fr-FR";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onerror = () => {
      setFeedback("Impossible de lire la phrase. Réessaie.");
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleRecognitionResult = (spokenText: string) => {
    if (
      !hasListenedToEnd ||
      !currentPhrase ||
      finishedRef.current
    ) {
      return;
    }

    const cleanText = spokenText.trim();

    if (!cleanText) {
      setFeedback("Je n'ai pas entendu ta réponse. Réessaie.");
      return;
    }

    const nextAttempts = attempts + 1;

    const validation = validateSentence(
      cleanText,
      currentPhrase.text,
    );

    setTranscript(cleanText);
    setSimilarity(validation.similarity);
    setAttempts(nextAttempts);

    if (validation.isCorrect) {
      setFeedback(`Bonne réponse ! (${validation.similarity}%)`);

      setResults((previous) => {
        const updated = [...previous];

        updated[currentIndex] = {
          spokenText: cleanText,
          similarity: validation.similarity,
          isCorrect: true,
        };

        return updated;
      });

      return;
    }

    if (nextAttempts < MAX_ATTEMPTS) {
      setFeedback(
        `Ce n'est pas encore ça (${validation.similarity}%). Essaie encore.`,
      );

      return;
    }

    setFeedback(
      `La phrase attendue était : « ${currentPhrase.text} »`,
    );

    setResults((previous) => {
      const updated = [...previous];

      updated[currentIndex] = {
        spokenText: cleanText,
        similarity: validation.similarity,
        isCorrect: false,
      };

      return updated;
    });
  };

  recognitionCallbackRef.current = handleRecognitionResult;

  const handleMicrophone = () => {
    if (!hasListenedToEnd || finished || !currentPhrase) {
      return;
    }

    if (isListening) {
      stopListening();
      return;
    }

    if (!isSupported) {
      setFeedback(
        "La reconnaissance vocale n'est pas prise en charge par ce navigateur.",
      );
      return;
    }

    setTranscript("");
    setSimilarity(null);
    setFeedback("Je t'écoute...");

    void startListening();
  };

  const playCurrentPhrase = () => {
    if (!hasListenedToEnd || !currentPhrase) return;

    speakText(currentPhrase.text);
  };

  const handleNext = () => {
    if (!hasListenedToEnd || !results[currentIndex]) {
      return;
    }

    if (currentIndex === totalQuestions - 1) {
      if (finishedRef.current) return;

      finishedRef.current = true;

      const finishedAt = new Date();

      const history: ExerciseHistoryItem[] = phrases.map(
        (phrase, index) => {
          const result = results[index];

          return {
            questionId: index + 1,
            question: phrase.text,
            selectedAnswer: result?.spokenText ?? "",
            correctAnswer: phrase.text,
            isCorrect: result?.isCorrect ?? false,
            explanation: phrase.pronunciationTip,
          };
        },
      );

      const finalCorrectAnswers = history.filter(
        (item) => item.isCorrect,
      ).length;

      const session: ExerciseSessionResult = {
        score: Math.round(
          (finalCorrectAnswers / totalQuestions) * 100,
        ),
        correctAnswers: finalCorrectAnswers,
        totalQuestions,
        history,
        startedAt: sessionStartedAt.current,
        finishedAt,
        duration: Math.max(
          0,
          Math.round(
            (finishedAt.getTime() -
              sessionStartedAt.current.getTime()) /
              1000,
          ),
        ),
      };

      setFinished(true);
      onComplete(session);

      return;
    }

    setCurrentIndex((previous) => previous + 1);
    setAttempts(0);
    setTranscript("");
    setSimilarity(null);
    setFeedback("");
  };

  if (totalQuestions === 0 || !currentPhrase) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-800">
        Aucune phrase n&apos;est disponible pour cet exercice.
      </div>
    );
  }

  if (finished) {
    return null;
  }

  const currentResult = results[currentIndex];

  const progressAudio =
    duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="mt-10 w-full">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* LECTEUR AUDIO */}

        <div className="overflow-hidden rounded-2xl border border-[#dcebdd] bg-white shadow-sm">
          <audio
            ref={passageAudioRef}
            src={audioSrc}
            preload="metadata"
            onLoadedMetadata={handleAudioLoaded}
            onDurationChange={handleAudioLoaded}
            onTimeUpdate={handleAudioTimeUpdate}
            onPlay={() => setIsPlayingPassage(true)}
            onPause={() => setIsPlayingPassage(false)}
            onEnded={handleAudioEnded}
            onError={() => {
              setIsPlayingPassage(false);
              setFeedback("Impossible de charger le fichier audio.");
            }}
          />

          {/* ILLUSTRATION */}

          <div className="relative flex h-52 w-full items-center justify-center overflow-hidden bg-[#f5faf4] sm:h-80">
            <Image
              src={imageSrc}
              alt="Illustration de la découverte du nouveau quartier"
              fill
              sizes="(max-width: 640px) 100vw, 800px"
              className="object-contain object-center"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/80">
                Listen & Pronounce
              </p>

              <h3 className="mt-1 text-xl font-extrabold sm:text-2xl">
                Découverte du nouveau quartier
              </h3>
            </div>
          </div>

          {/* COMMANDES AUDIO */}

          <div className="p-5 sm:p-7">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handlePlayPause}
                aria-label={
                  isPlayingPassage
                    ? "Mettre l'enregistrement en pause"
                    : "Écouter l'enregistrement"
                }
                className="
                  flex h-14 w-14 shrink-0 items-center
                  justify-center rounded-full
                  bg-[#31572C] text-white
                  shadow-md transition
                  hover:scale-105 hover:bg-[#254522]
                  focus:outline-none focus:ring-2
                  focus:ring-[#57CC99] focus:ring-offset-2
                "
              >
                {isPlayingPassage ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 fill-current"
                    aria-hidden="true"
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-1 h-6 w-6 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M7 4.8c0-.8.9-1.3 1.6-.9l11 6.7a1.6 1.6 0 0 1 0 2.8l-11 6.7c-.7.4-1.6-.1-1.6-.9V4.8Z" />
                  </svg>
                )}
              </button>

              <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-800">
                  {isPlayingPassage
                    ? "Lecture en cours"
                    : currentTime > 0 && currentTime < duration
                      ? "Lecture en pause"
                      : hasListenedToEnd
                        ? "Écoute terminée"
                        : "Écouter le texte"}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Enregistrement audio
                </p>
              </div>

              <span className="hidden rounded-full bg-[#f0f7ee] px-3 py-1 text-xs font-bold text-[#31572C] sm:inline-flex">
                FR
              </span>
            </div>

            {/* BARRE DE PROGRESSION */}

            <div className="mt-7">
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(currentTime, duration || 0)}
                onChange={(event) => handleSeek(event.target.value)}
                disabled={!duration}
                aria-label="Position dans l'enregistrement audio"
                className="
                  h-2 w-full cursor-pointer appearance-none
                  rounded-full bg-slate-200 accent-[#31572C]
                  disabled:cursor-not-allowed
                "
                style={{
                  background: `linear-gradient(to right, #31572C 0%, #31572C ${progressAudio}%, #e2e8f0 ${progressAudio}%, #e2e8f0 100%)`,
                }}
              />

              <div className="mt-2 flex items-center justify-between text-xs font-semibold tabular-nums text-slate-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <p className="mt-5 text-center text-sm text-slate-500">
              {hasListenedToEnd
                ? "Tu peux maintenant commencer l'exercice de prononciation."
                : "Écoute l'enregistrement jusqu'à la fin pour débloquer la prononciation."}
            </p>
          </div>
        </div>

        {/* PROGRESSION DE L'EXERCICE */}

        <div className="rounded-2xl border border-[#dcebdd] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#31572C]">
                Listen & Pronounce
              </p>

              <h3 className="mt-1 text-xl font-extrabold text-slate-800">
                À toi de prononcer !
              </h3>
            </div>

            <span className="rounded-full bg-[#31572C] px-4 py-2 text-sm font-bold text-white">
              Phrase {currentIndex + 1} / {totalQuestions}
            </span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#31572C] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-right text-xs font-semibold text-slate-500">
            {completedQuestions} / {totalQuestions} phrases terminées
          </p>
        </div>

        {/* VERROU AVANT LA FIN DE L'AUDIO */}

        {!hasListenedToEnd ? (
          <div className="rounded-2xl border-2 border-dashed border-[#dcebdd] bg-[#f5faf4] px-6 py-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-[#31572C]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                <circle cx="12" cy="15" r="1" />
              </svg>
            </div>

            <h4 className="mt-5 text-lg font-extrabold text-[#31572C]">
              Exercice verrouillé
            </h4>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
              Prends le temps d&apos;écouter l&apos;enregistrement dans son intégralité.
              Les phrases et le microphone seront disponibles dès la fin de l&apos;écoute.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#31572C] shadow-sm">
              <span aria-hidden="true">🎧</span>
              Écoute obligatoire
            </div>
          </div>
        ) : (
          <>
            {/* PHRASE À PRONONCER */}

            <div className="overflow-hidden rounded-2xl border border-[#dcebdd] bg-white shadow-sm">
              <div className="border-b border-[#dcebdd] bg-[#f5faf4] px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#31572C]">
                  À toi de prononcer
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  Prononce la phrase dans le microphone en articulant clairement.
                </p>
              </div>

              <div className="space-y-6 p-5 sm:p-8">
                <div className="rounded-2xl border-2 border-[#dcebdd] bg-white p-6 text-center sm:p-8">
                  <p className="text-2xl font-extrabold leading-relaxed text-slate-800 sm:text-3xl">
                    {currentPhrase.text}
                  </p>

                  <button
                    type="button"
                    onClick={playCurrentPhrase}
                    className="
                      mt-5 inline-flex items-center gap-2
                      rounded-full bg-[#f0f7ee] px-5 py-2.5
                      text-sm font-bold text-[#31572C]
                      transition hover:bg-[#e3f0df]
                    "
                  >
                    <span aria-hidden="true">🔊</span>
                    Écouter la phrase
                  </button>
                </div>

                {/* INDICATION PHONÉTIQUE */}

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="mb-2 text-sm font-bold text-amber-800">
                    Point de prononciation
                  </p>

                  <p className="text-sm leading-6 text-amber-900">
                    {currentPhrase.pronunciationTip}
                  </p>
                </div>

                {/* MICROPHONE */}

                {!currentResult && (
                  <div className="flex flex-col items-center gap-3">
                    <SpeechButton
                      isListening={isListening}
                      onClick={handleMicrophone}
                    />

                    <p className="text-sm font-medium text-slate-500">
                      {isListening
                        ? "Je t'écoute, prononce la phrase..."
                        : "Appuie sur le microphone pour parler."}
                    </p>

                    <p className="text-xs text-slate-400">
                      Tentative {Math.min(attempts + 1, MAX_ATTEMPTS)} / {MAX_ATTEMPTS}
                    </p>
                  </div>
                )}

                {/* TRANSCRIPTION */}

                {transcript && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Ce que tu as prononcé
                    </p>

                    <p className="mt-2 font-medium text-slate-700">
                      {transcript}
                    </p>
                  </div>
                )}

                {/* RETOUR */}

                {feedback && (
                  <div
                    className={`rounded-xl border p-4 text-sm font-semibold ${
                      currentResult?.isCorrect
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : currentResult
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-amber-200 bg-amber-50 text-amber-800"
                    }`}
                  >
                    {feedback}

                    {similarity !== null && (
                      <p className="mt-2 text-xs font-medium">
                        Correspondance textuelle : {similarity} %
                      </p>
                    )}
                  </div>
                )}

                {/* QUESTION SUIVANTE */}

                {currentResult && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="rounded-xl bg-[#31572C] px-6 py-3 font-bold text-white transition hover:bg-[#254522]"
                    >
                      {currentIndex === totalQuestions - 1
                        ? "Terminer l'exercice"
                        : "Phrase suivante →"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* SCORE PROVISOIRE */}

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#f5faf4] px-5 py-4">
          <span className="text-sm font-semibold text-[#31572C]">
            Phrases correctement prononcées
          </span>

          <span className="text-lg font-extrabold text-[#31572C]">
            {correctAnswers} / {totalQuestions}
          </span>
        </div>
      </div>
    </section>
  );
}
