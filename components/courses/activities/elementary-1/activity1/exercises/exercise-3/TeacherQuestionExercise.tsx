"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import SpeechButton from "@/components/courses/components/SpeechButton";
import { useOpenAISpeechRecognition } from "@/components/courses/speech/useOpenAISpeechRecognition";
import { validateSentence } from "@/components/courses/speech/scoring";

import ActivityResults from "@/components/courses/common/ActivityResults/ActivityResults";
import {
  ExerciseHistoryItem,
  ExerciseSessionResult,
} from "@/components/courses/common/types/exerciseSessionTypes";

import { useProgress } from "@/components/courses/engines/ProgressEngine/useProgress";

import {
  teacherQuestionData,
  TeacherQuestionExerciseData,
} from "../../data/teacherQuestionData";

import TeacherQuestionExerciseHero from "./TeacherQuestionExerciseHero";

type TeacherQuestionExerciseProps = {
  onCompleted?: (result: ExerciseSessionResult) => void;
};

type ExerciseStatus =
  | "ready"
  | "listening"
  | "checking"
  | "retry"
  | "wrong"
  | "correct";

const MAX_ATTEMPTS_PER_QUESTION = 3;

const ACTIVITY_ID = "elementary-1-activity1";
const EXERCISE_ID = "exercise-3";

const TEACHER_ANSWER_AUDIO_BASE_PATH =
  "/audios/courses/elementary/activities/activity1/exercice3";

const getTeacherAnswerAudio = (questionIndex: number) =>
  `${TEACHER_ANSWER_AUDIO_BASE_PATH}/REP${questionIndex + 1}.mp3`;

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "'")
    .replace(/[?!.,;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export default function TeacherQuestionExercise({
  onCompleted,
}: TeacherQuestionExerciseProps) {
  const questions = useMemo(() => teacherQuestionData, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const question: TeacherQuestionExerciseData =
    questions[currentQuestionIndex];

  const totalQuestions = questions.length;

  const recognizedTextHandlerRef = useRef<(text: string) => void>(() => {});

  const {
    startListening,
    isListening,
    isSupported: speechSupported,
  } = useOpenAISpeechRecognition({
    language: "fr-FR",
    onResult: (text: string) => {
      recognizedTextHandlerRef.current(text);
    },
  });

  const { progress, refresh } = useProgress();

  const [status, setStatus] = useState<ExerciseStatus>("ready");
  const [transcript, setTranscript] = useState("");
  const [similarity, setSimilarity] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);

  const attemptCountRef = useRef(0);

  const [isTeacherSpeaking, setIsTeacherSpeaking] = useState(false);

  const [finalResult, setFinalResult] =
    useState<ExerciseSessionResult | null>(null);

  const teacherAudioRef = useRef<HTMLAudioElement | null>(null);

  const sessionStartedAt = useRef<Date>(new Date());
  const questionStartedAt = useRef<Date>(new Date());

  const historyRef = useRef<ExerciseHistoryItem[]>([]);

  useEffect(() => {
    return () => {
      if (teacherAudioRef.current) {
        teacherAudioRef.current.pause();
        teacherAudioRef.current.currentTime = 0;
        teacherAudioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    questionStartedAt.current = new Date();
  }, [currentQuestionIndex]);

  const stopTeacherAudio = () => {
    const audio = teacherAudioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsTeacherSpeaking(false);
  };

  const speakTeacherAnswer = () => {
    if (typeof window === "undefined") return;

    stopTeacherAudio();

    const audioPath = getTeacherAnswerAudio(currentQuestionIndex);
    const audio = new Audio(audioPath);

    teacherAudioRef.current = audio;

    audio.onplay = () => setIsTeacherSpeaking(true);
    audio.onended = () => setIsTeacherSpeaking(false);
    audio.onerror = () => setIsTeacherSpeaking(false);

    audio.play().catch(() => {
      setIsTeacherSpeaking(false);
    });
  };

  const saveQuestionResult = (
    spokenText: string,
    isCorrect: boolean,
  ) => {
    const duration = Math.max(
      0,
      Math.round(
        (Date.now() - questionStartedAt.current.getTime()) / 1000,
      ),
    );

    const historyItem: ExerciseHistoryItem = {
      questionId: currentQuestionIndex + 1,
      question: question.expectedQuestion,
      selectedAnswer: spokenText,
      correctAnswer: question.expectedQuestion,
      isCorrect,
      explanation: isCorrect
        ? "La question a été correctement prononcée."
        : "La question prononcée ne correspond pas à la question attendue.",
      duration,
    };

    const existingQuestionIndex = historyRef.current.findIndex(
      (item) => item.questionId === currentQuestionIndex + 1,
    );

    if (existingQuestionIndex === -1) {
      historyRef.current = [...historyRef.current, historyItem];
      return;
    }

    historyRef.current[existingQuestionIndex] = historyItem;
  };

  const handleRecognition = () => {
    if (
      status === "listening" ||
      status === "checking" ||
      status === "correct" ||
      status === "wrong"
    ) {
      return;
    }

    setTranscript("");
    setSimilarity(null);
    setErrorMessage("");
    setStatus("listening");

    recognizedTextHandlerRef.current = (spokenText: string) => {
      setStatus("checking");
      setTranscript(spokenText);

      const currentAttempt = attemptCountRef.current + 1;

      attemptCountRef.current = currentAttempt;
      setAttemptCount(currentAttempt);

      const result = validateSentence(
        spokenText,
        question.expectedQuestion,
      );

      setSimilarity(result.similarity);

      const normalizedSpoken = normalizeText(spokenText);
      const normalizedExpected = normalizeText(question.expectedQuestion);

      const isExactMatch = normalizedSpoken === normalizedExpected;
      const isCorrect = result.isCorrect || isExactMatch;

      if (!isCorrect) {
        if (currentAttempt < MAX_ATTEMPTS_PER_QUESTION) {
          setStatus("retry");

          const remainingAttempts =
            MAX_ATTEMPTS_PER_QUESTION - currentAttempt;

          setErrorMessage(
            `Ce n'est pas encore ça. Réessaie : il te reste ${remainingAttempts} tentative${
              remainingAttempts > 1 ? "s" : ""
            }.`,
          );

          return;
        }

        saveQuestionResult(spokenText, false);
        setStatus("wrong");

        setErrorMessage(
          `Tu as utilisé tes ${MAX_ATTEMPTS_PER_QUESTION} tentatives.`,
        );

        return;
      }

      saveQuestionResult(spokenText, true);
      setStatus("correct");

      window.setTimeout(() => {
        speakTeacherAnswer();
      }, 500);
    };

    void startListening();
  };

  const renderResult = (result: ExerciseSessionResult) => {
    const exercise = progress.getExercise(ACTIVITY_ID, EXERCISE_ID);
    const score = result.score;

    const scoreWillBeSubmittedByParent = Boolean(onCompleted);

    const bestScore = scoreWillBeSubmittedByParent
      ? Math.max(exercise?.bestScore ?? 0, score)
      : exercise?.bestScore ?? score;

    const attempts = scoreWillBeSubmittedByParent
      ? (exercise?.attempts ?? 0) + 1
      : exercise?.attempts ?? 1;

    return (
      <div className="box-border w-full min-w-0 max-w-full">
        <ActivityResults
          result={{
            session: result,
            bestScore,
            attempts,
          }}
          teacher="elementary-1"
          isLastExercise={true}
          finishLabel="Retourner aux modules"
          teacherFeedbackAudios={{
            bad: "/audios/teacher/jean/score/JEAN-0-50.mp3",
            middle: "/audios/teacher/jean/score/JEAN-50-75.mp3",
            good: "/audios/teacher/jean/score/JEAN-75-100.mp3",
            perfect:
              "/audios/teacher/jean/score/jean-100-end-activity.mp3",
          }}
          completionFeedback={{
            bad: "Tu as terminé l'activité. Reprends les questions tranquillement pour mieux comprendre tes erreurs.",
            middle:
              "Tu progresses ! Révise les réponses qui t'ont posé problème et tu feras encore mieux la prochaine fois.",
            good: "Très bon travail ! Tu as presque tout compris. Tu peux terminer l'activité et retourner aux modules.",
            perfect:
              "Tu as bien répondu à toutes les questions ! Tu peux terminer l'activité et retourner aux modules.",
          }}
          onRestart={() => {
            stopTeacherAudio();

            setCurrentQuestionIndex(0);
            setFinalResult(null);

            setTranscript("");
            setSimilarity(null);
            setErrorMessage("");
            setAttemptCount(0);
            attemptCountRef.current = 0;

            setStatus("ready");
            setIsTeacherSpeaking(false);

            historyRef.current = [];

            sessionStartedAt.current = new Date();
            questionStartedAt.current = new Date();
          }}
          onNext={() => {
            if (onCompleted) {
              onCompleted(result);
              return;
            }

            refresh();
          }}
        />
      </div>
    );
  };

  const handleContinue = () => {
    stopTeacherAudio();

    const isLastQuestion =
      currentQuestionIndex === totalQuestions - 1;

    if (isLastQuestion) {
      const finishedAt = new Date();
      const startedAt = sessionStartedAt.current;

      const duration = Math.max(
        0,
        Math.round(
          (finishedAt.getTime() - startedAt.getTime()) / 1000,
        ),
      );

      const history = historyRef.current;

      const correctAnswers = history.filter(
        (item) => item.isCorrect,
      ).length;

      const score =
        totalQuestions > 0
          ? Math.round((correctAnswers / totalQuestions) * 100)
          : 0;

      const result: ExerciseSessionResult = {
        score,
        correctAnswers,
        totalQuestions,
        history,
        startedAt,
        finishedAt,
        duration,
      };

      if (!onCompleted) {
        progress.submitScore(ACTIVITY_ID, EXERCISE_ID, score);
        refresh();
      }

      setFinalResult(result);
      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);

    setTranscript("");
    setSimilarity(null);
    setErrorMessage("");

    setAttemptCount(0);
    attemptCountRef.current = 0;

    setIsTeacherSpeaking(false);
    setStatus("ready");
  };

  if (finalResult) {
    return renderResult(finalResult);
  }

  const isAnswered = status === "correct" || status === "wrong";
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <section className="box-border w-full min-w-0 max-w-full">
      {/* ENCADRÉ UNIQUE POUR LA QUESTION ET LE MICRO */}
      <div className="box-border w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
        {/* CARTE DE QUESTION */}
        <TeacherQuestionExerciseHero
          question={question}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          questionPrefix={question.questionPrefix}
          questionSuffix={question.questionSuffix}
        />

        {/* MICRO ET INTERACTIONS DANS LE MÊME ENCADRÉ */}
        <div className="box-border w-full min-w-0 max-w-full space-y-4 border-t border-slate-200 p-4 sm:p-6">
          {(status === "ready" || status === "retry") && (
            <div className="flex w-full min-w-0 flex-col items-center px-1 py-5 sm:py-7">
              {status === "retry" ? (
                <div className="mb-5 box-border w-full min-w-0 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
                  <p className="text-sm font-bold text-amber-800">
                    Réessaie !
                  </p>

                  <p className="mt-1 text-sm text-amber-700">
                    {errorMessage}
                  </p>

                  <p className="mt-2 text-xs font-semibold text-amber-700">
                    Tentative {attemptCount} / {MAX_ATTEMPTS_PER_QUESTION}{" "}
                    utilisée{attemptCount > 1 ? "s" : ""}
                  </p>
                </div>
              ) : (
                <p className="mb-5 text-base font-bold text-slate-600">
                  À toi de parler
                </p>
              )}

              <SpeechButton
                isListening={isListening}
                onClick={handleRecognition}
              />

              <p className="mt-4 text-center text-sm font-medium text-slate-400">
                Appuie sur le micro et prononce la phrase complète.
              </p>
            </div>
          )}

          {status === "listening" && (
            <div className="flex w-full min-w-0 flex-col items-center py-5 sm:py-7">
              <p className="mb-5 text-base font-bold text-amber-700">
                Je t’écoute…
              </p>

              <SpeechButton
                isListening={true}
                onClick={() => undefined}
              />

              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Parle maintenant
              </div>
            </div>
          )}

          {status === "checking" && (
            <div className="flex w-full min-w-0 flex-col items-center py-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                🔎
              </div>

              <p className="mt-4 text-base font-bold text-slate-700">
                Je vérifie ta question…
              </p>
            </div>
          )}

          {status === "wrong" && (
            <div className="box-border w-full min-w-0 rounded-2xl border border-red-200 bg-red-50 px-4 py-6 text-center sm:px-8">
              <p className="text-base font-extrabold text-red-700">
                ❌ Pas tout à fait
              </p>

              <p className="mt-3 text-sm leading-6 text-red-600">
                {errorMessage}
              </p>

              <p className="mt-3 text-base font-bold text-red-700">
                Réponse attendue : « {question.expectedQuestion} »
              </p>

              {transcript && (
                <p className="mt-3 break-words text-sm text-slate-600">
                  Tu as dit : « {transcript} »
                </p>
              )}

              {similarity !== null && (
                <p className="mt-3 text-sm font-semibold text-red-500">
                  Correspondance : {similarity}%
                </p>
              )}
            </div>
          )}

          {status === "correct" && (
            <div className="box-border w-full min-w-0 rounded-xl border border-green-200 bg-green-50 px-4 py-6 text-center sm:px-8">
              <p className="text-sm font-extrabold text-green-700 sm:text-base">
                🎉 Phrase réussie !
              </p>

              <p className="mt-2 break-words text-2xl font-black text-green-800 sm:text-3xl">
                {question.expectedQuestion}
              </p>

              <p className="mt-2 text-sm font-medium text-green-700">
                Correspondance : {similarity ?? 100}%
              </p>
            </div>
          )}

          {isAnswered && status === "correct" && (
            <div className="box-border w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
              <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                <img
                  src="/images/courses/teacher/jeanbulle.png"
                  alt="Jean"
                  className="h-16 w-16 shrink-0 object-contain sm:h-24 sm:w-24"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-400">
                    RÉPONSE DE JEAN
                  </p>

                  <p className="mt-2 break-words text-lg font-semibold text-slate-800 sm:text-xl">
                    {question.teacherAnswer}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={speakTeacherAnswer}
                disabled={isTeacherSpeaking}
                className="mt-5 w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-base font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                {isTeacherSpeaking
                  ? "Jean parle…"
                  : "🔊 Réécouter Jean"}
              </button>
            </div>
          )}

          {!speechSupported && (
            <p className="box-border w-full min-w-0 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-sm font-medium text-amber-800">
              La reconnaissance vocale n’est pas disponible dans ce navigateur.
            </p>
          )}

          {isAnswered && (
            <button
              type="button"
              onClick={handleContinue}
              className="box-border w-full min-w-0 rounded-xl bg-slate-900 px-5 py-4 text-base font-extrabold text-white transition hover:bg-slate-800 sm:text-lg"
            >
              {isLastQuestion ? "Voir le résultat" : "Phrase suivante"}{" "}
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}