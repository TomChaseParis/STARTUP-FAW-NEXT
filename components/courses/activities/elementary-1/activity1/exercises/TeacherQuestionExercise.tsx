"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import SpeechButton from "@/components/courses/components/SpeechButton";
import { useOpenAISpeechRecognition } from "@/components/courses/speech/useOpenAISpeechRecognition";
import {
  validateSentence,
} from "@/components/courses/speech/scoring";

import ActivityResults from "@/components/courses/common/ActivityResults/ActivityResults";
import {
  ExerciseHistoryItem,
  ExerciseSessionResult,
} from "@/components/courses/common/types/exerciseSessionTypes";

import {
  useProgress,
} from "@/components/courses/engines/ProgressEngine/useProgress";

import {
  teacherQuestionData,
  TeacherQuestionExerciseData,
} from "../data/teacherQuestionData";

import TeacherQuestionExerciseHero from "./TeacherQuestionExerciseHero";
type TeacherQuestionExerciseProps = {
  onCompleted?: (
    result: ExerciseSessionResult,
  ) => void;
};
type ExerciseStatus =
  | "ready"
  | "listening"
  | "checking"
  | "retry"
  | "wrong"
  | "correct";

const MAX_ATTEMPTS_PER_QUESTION = 3;
/*
 * =========================================================
 * IDENTIFICATION DE L'EXERCICE
 * =========================================================
 */
const ACTIVITY_ID =
  "elementary-1-activity1";
const EXERCISE_ID =
  "exercise-3";
/*
 * =========================================================
 * AUDIO DES RÉPONSES DE JEAN
 * =========================================================
 */
const TEACHER_ANSWER_AUDIO_BASE_PATH =
  "/audios/courses/elementary/activities/activity1/exercice3";
const getTeacherAnswerAudio = (
  questionIndex: number,
) =>
  `${TEACHER_ANSWER_AUDIO_BASE_PATH}/REP${
    questionIndex + 1
  }.mp3`;
/*
 * =========================================================
 * NORMALISATION
 * =========================================================
 */
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
  const questions = useMemo(
    () => teacherQuestionData,
    [],
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);
  const question: TeacherQuestionExerciseData =
    questions[currentQuestionIndex];
  const totalQuestions =
    questions.length;
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
  const {
    progress,
    refresh,
  } = useProgress();
  const [status, setStatus] =
    useState<ExerciseStatus>("ready");
  const [transcript, setTranscript] =
    useState("");
  const [similarity, setSimilarity] =
    useState<number | null>(null);
  const [errorMessage, setErrorMessage] =
    useState("");
  const [attemptCount, setAttemptCount] =
    useState(0);
  const attemptCountRef = useRef(0);
  const [isTeacherSpeaking, setIsTeacherSpeaking] =
    useState(false);
  /*
   * =========================================================
   * ÉTAT RÉSULTAT
   * =========================================================
   */
  const [finalResult, setFinalResult] =
    useState<ExerciseSessionResult | null>(
      null,
    );
  /*
   * =========================================================
   * AUDIO DE JEAN
   * =========================================================
   */
  const teacherAudioRef =
    useRef<HTMLAudioElement | null>(null);
  /*
   * =========================================================
   * SESSION
   * =========================================================
   */
  const sessionStartedAt = useRef<Date>(
    new Date(),
  );
  const questionStartedAt = useRef<Date>(
    new Date(),
  );
  const historyRef = useRef<
    ExerciseHistoryItem[]
  >([]);
  /*
   * =========================================================
   * NETTOYAGE AUDIO
   * =========================================================
   */
  useEffect(() => {
    return () => {
      if (teacherAudioRef.current) {
        teacherAudioRef.current.pause();
        teacherAudioRef.current.currentTime = 0;
        teacherAudioRef.current = null;
      }
    };
  }, []);
  /*
   * =========================================================
   * RÉINITIALISATION DU CHRONOMÈTRE DE QUESTION
   * =========================================================
   */
  useEffect(() => {
    questionStartedAt.current =
      new Date();
  }, [currentQuestionIndex]);
  /*
   * =========================================================
   * ARRÊTER JEAN
   * =========================================================
   */
  const stopTeacherAudio = () => {
    const audio =
      teacherAudioRef.current;
    if (!audio) {
      return;
    }
    audio.pause();
    audio.currentTime = 0;
    setIsTeacherSpeaking(false);
  };
  /*
   * =========================================================
   * RÉPONSE DE JEAN
   * =========================================================
   */
  const speakTeacherAnswer = () => {
    if (
      typeof window === "undefined"
    ) {
      return;
    }
    stopTeacherAudio();
    const audioPath =
      getTeacherAnswerAudio(
        currentQuestionIndex,
      );
    const audio =
      new Audio(audioPath);
    teacherAudioRef.current =
      audio;
    audio.onplay = () => {
      setIsTeacherSpeaking(true);
    };
    audio.onended = () => {
      setIsTeacherSpeaking(false);
    };
    audio.onerror = () => {
      setIsTeacherSpeaking(false);
    };
    audio
      .play()
      .catch(() => {
        setIsTeacherSpeaking(false);
      });
  };
  /*
   * =========================================================
   * ENREGISTRER LE RÉSULTAT DE LA QUESTION
   * =========================================================
   */
  const saveQuestionResult = (
    spokenText: string,
    isCorrect: boolean,
  ) => {
    const duration = Math.max(
      0,
      Math.round(
        (Date.now() -
          questionStartedAt.current.getTime()) /
          1000,
      ),
    );
    const historyItem: ExerciseHistoryItem = {
      questionId:
        currentQuestionIndex + 1,
      question:
        question.expectedQuestion,
      selectedAnswer:
        spokenText,
      correctAnswer:
        question.expectedQuestion,
      isCorrect,
      explanation: isCorrect
        ? "La question a été correctement prononcée."
        : "La question prononcée ne correspond pas à la question attendue.",
      duration,
    };
    const existingQuestionIndex =
      historyRef.current.findIndex(
        (item) =>
          item.questionId ===
          currentQuestionIndex + 1,
      );
    if (
      existingQuestionIndex === -1
    ) {
      historyRef.current = [
        ...historyRef.current,
        historyItem,
      ];
      return;
    }
    historyRef.current[
      existingQuestionIndex
    ] = historyItem;
  };
  /*
   * =========================================================
   * RECONNAISSANCE DE LA QUESTION
   * =========================================================
   */
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
      setSimilarity(
        result.similarity,
      );
      const normalizedSpoken =
        normalizeText(spokenText);
      const normalizedExpected =
        normalizeText(
          question.expectedQuestion,
        );
      const isExactMatch =
        normalizedSpoken ===
        normalizedExpected;
      const isCorrect =
        result.isCorrect ||
        isExactMatch;
      /*
       * =====================================================
       * MAUVAISE RÉPONSE
       * =====================================================
       */
      if (!isCorrect) {
        if (currentAttempt < MAX_ATTEMPTS_PER_QUESTION) {
          setStatus("retry");
          const remainingAttempts =
            MAX_ATTEMPTS_PER_QUESTION - currentAttempt;
          setErrorMessage(
            `Ce n'est pas encore ça. Réessaie : il te reste ${remainingAttempts} tentative${remainingAttempts > 1 ? "s" : ""}.`,
          );
          return;
        }

        saveQuestionResult(
          spokenText,
          false,
        );
        setStatus("wrong");
        setErrorMessage(
          `Tu as utilisé tes ${MAX_ATTEMPTS_PER_QUESTION} tentatives.`,
        );
        return;
      }
      /*
       * =====================================================
       * BONNE RÉPONSE
       * =====================================================
       */
      saveQuestionResult(
        spokenText,
        true,
      );
      setStatus("correct");
      window.setTimeout(() => {
        speakTeacherAnswer();
      }, 500);
    };
    void startListening();
  };
  /*
   * =========================================================
   * RENDU DU SCORE
   * =========================================================
   */
  const renderResult = (
    result: ExerciseSessionResult,
  ) => {
    const exercise =
      progress.getExercise(
        ACTIVITY_ID,
        EXERCISE_ID,
      );
    const score = result.score;
    const scoreWillBeSubmittedByParent = Boolean(onCompleted);
    const bestScore = scoreWillBeSubmittedByParent
      ? Math.max(exercise?.bestScore ?? 0, score)
      : exercise?.bestScore ?? score;
    const attempts = scoreWillBeSubmittedByParent
      ? (exercise?.attempts ?? 0) + 1
      : exercise?.attempts ?? 1;
    return (
      <ActivityResults
        result={{
          session: result,
          bestScore,
          attempts,
        }}
        teacher="elementary-1"
        isLastExercise={true}
        onRestart={() => {
          // Une session terminée doit être enregistrée avant de recommencer.
          if (onCompleted) {
            onCompleted(result);
          }
          window.location.reload();
        }}
        onNext={() => {
          if (onCompleted) {
            onCompleted(result);
            return;
          }

          refresh();
        }}
      />
    );
  };
  /*
   * =========================================================
   * CONTINUER / TERMINER
   * =========================================================
   */
  const handleContinue = () => {
    stopTeacherAudio();
    const isLastQuestion =
      currentQuestionIndex ===
      totalQuestions - 1;
    /*
     * =====================================================
     * DERNIÈRE QUESTION
     * =====================================================
     */
    if (isLastQuestion) {
      const finishedAt =
        new Date();
      const startedAt =
        sessionStartedAt.current;
      const duration = Math.max(
        0,
        Math.round(
          (finishedAt.getTime() -
            startedAt.getTime()) /
            1000,
        ),
      );
      const history =
        historyRef.current;
      const correctAnswers =
        history.filter(
          (item) => item.isCorrect,
        ).length;
      const score =
        totalQuestions > 0
          ? Math.round(
              (correctAnswers /
                totalQuestions) *
                100,
            )
          : 0;
      const result: ExerciseSessionResult =
        {
          score,
          correctAnswers,
          totalQuestions,
          history,
          startedAt,
          finishedAt,
          duration,
        };
      /*
       * =====================================================
       * ENREGISTREMENT DU SCORE
       * =====================================================
       */
      // Si le parent fournit onCompleted, il est responsable de
      // l'enregistrement du score via ExerciseContainer.
      // Sinon, cet exercice enregistre lui-même le score.
      if (!onCompleted) {
        progress.submitScore(
          ACTIVITY_ID,
          EXERCISE_ID,
          score,
        );
        refresh();
      }
      /*
       * =====================================================
       * AFFICHAGE DU RÉSULTAT
       * =====================================================
       */
      setFinalResult(result);
      return;
    }
    /*
     * =====================================================
     * QUESTION SUIVANTE
     * =====================================================
     */
    setCurrentQuestionIndex(
      (previousIndex) =>
        previousIndex + 1,
    );
    setTranscript("");
    setSimilarity(null);
    setErrorMessage("");
    setAttemptCount(0);
    attemptCountRef.current = 0;
    setIsTeacherSpeaking(false);
    setStatus("ready");
  };
  /*
   * =========================================================
   * AFFICHAGE DU SCORE
   * =========================================================
   */
  if (finalResult) {
    return renderResult(
      finalResult,
    );
  }
  const isAnswered = status === "correct" || status === "wrong";
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-5xl space-y-5">
        {/* Carte principale : illustration à gauche, pronom à droite */}
        <TeacherQuestionExerciseHero
          question={question}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          questionPrefix={question.questionPrefix}
          questionSuffix={question.questionSuffix}
        />

        {/* Reconnaissance vocale et retours */}
        <div className="space-y-4">
          {(status === "ready" || status === "retry") && (
            <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-5 py-6">
              {status === "retry" ? (
                <div className="mb-4 w-full rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
                  <p className="text-sm font-bold text-amber-800">Réessaie !</p>
                  <p className="mt-1 text-sm text-amber-700">{errorMessage}</p>
                  <p className="mt-2 text-xs font-semibold text-amber-700">
                    Tentative {attemptCount} / {MAX_ATTEMPTS_PER_QUESTION} utilisée{attemptCount > 1 ? "s" : ""}
                  </p>
                </div>
              ) : (
                <p className="mb-4 text-sm font-bold text-slate-600">À toi de parler</p>
              )}
              <SpeechButton isListening={isListening} onClick={handleRecognition} />
              <p className="mt-3 text-center text-xs font-medium text-slate-400">Appuie sur le micro et prononce la phrase complète.</p>
            </div>
          )}

          {status === "listening" && (
            <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-5 py-6">
              <p className="mb-4 text-sm font-bold text-amber-700">Je t’écoute…</p>
              <SpeechButton isListening={true} onClick={() => undefined} />
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Parle maintenant
              </div>
            </div>
          )}

          {status === "checking" && (
            <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-5 py-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">🔎</div>
              <p className="mt-3 text-sm font-bold text-slate-700">Je vérifie ta question…</p>
            </div>
          )}

          {status === "wrong" && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-5 text-center">
              <p className="text-sm font-extrabold text-red-700">❌ Pas tout à fait</p>
              <p className="mt-2 text-sm leading-6 text-red-600">{errorMessage}</p>
              <p className="mt-2 text-sm font-bold text-red-700">Réponse attendue : « {question.expectedQuestion} »</p>
              {transcript && <p className="mt-2 text-sm text-slate-600">Tu as dit : « {transcript} »</p>}
              {similarity !== null && <p className="mt-2 text-xs font-semibold text-red-500">Correspondance : {similarity}%</p>}
            </div>
          )}

          {status === "correct" && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-center">
              <p className="text-[10px] font-extrabold text-green-700">🎉 Phrase réussie !</p>
              <p className="mt-1 text-xl font-black text-green-800">{question.expectedQuestion}</p>
              <p className="mt-1 text-xs font-medium text-green-700">Correspondance : {similarity ?? 100}%</p>
            </div>
          )}

          {isAnswered && status === "correct" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-4">
                <img src="/images/courses/teacher/jeanbulle.png" alt="Jean" className="h-16 w-16 object-contain" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">RÉPONSE DE JEAN</p>
                  <p className="mt-1 text-base font-semibold text-slate-800">{question.teacherAnswer}</p>
                </div>
              </div>
              <button type="button" onClick={speakTeacherAnswer} disabled={isTeacherSpeaking} className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
                {isTeacherSpeaking ? "Jean parle…" : "🔊 Réécouter Jean"}
              </button>
            </div>
          )}

          {!speechSupported && (
            <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-sm font-medium text-amber-800">
              La reconnaissance vocale n’est pas disponible dans ce navigateur.
            </p>
          )}

          {isAnswered && (
            <button type="button" onClick={handleContinue} className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800">
              {isLastQuestion ? "Voir le résultat" : "Phrase suivante"} <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
