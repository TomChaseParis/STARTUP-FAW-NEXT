"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import SpeechButton from "@/components/courses/components/SpeechButton";
import { useSpeechRecognition } from "@/components/courses/speech/useSpeechRecognition";
import {
  validateSentence,
} from "@/components/courses/speech/scoring";

import {
  teacherQuestionData,
  TeacherQuestionExerciseData,
} from "../data/teacherQuestionData";

import type {
  ExerciseHistoryItem,
  ExerciseSessionResult,
} from "@/components/courses/common/types/exerciseSessionTypes";

type TeacherQuestionExerciseProps = {
  onCompleted?: (
    result: ExerciseSessionResult,
  ) => void;
};

type ExerciseStatus =
  | "ready"
  | "listening"
  | "checking"
  | "wrong"
  | "correct";

/*
 * =========================================================
 * AUDIO DES RÉPONSES DE JEAN
 * =========================================================
 *
 * L'ordre correspond directement à l'ordre des questions
 * dans teacherQuestionData.
 *
 * Question 1 -> REP1.mp3
 * Question 2 -> REP2.mp3
 * ...
 * Question 9 -> REP9.mp3
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

  const totalQuestions = questions.length;

  const {
    start,
    isListening,
  } = useSpeechRecognition();

  const [status, setStatus] =
    useState<ExerciseStatus>("ready");

  const [transcript, setTranscript] =
    useState("");

  const [similarity, setSimilarity] =
    useState<number | null>(null);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [isTeacherSpeaking, setIsTeacherSpeaking] =
    useState(false);

  const [speechSupported, setSpeechSupported] =
    useState(true);

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
   * SUPPORT RECONNAISSANCE VOCALE
   * =========================================================
   */

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const SpeechRecognition =
      (window as Window & {
        SpeechRecognition?: unknown;
        webkitSpeechRecognition?: unknown;
      }).SpeechRecognition ??
      (window as Window & {
        SpeechRecognition?: unknown;
        webkitSpeechRecognition?: unknown;
      }).webkitSpeechRecognition;

    setSpeechSupported(
      Boolean(SpeechRecognition),
    );
  }, []);

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
   *
   * Utilise le fichier correspondant à la question :
   *
   * Question 1 -> REP1.mp3
   * Question 2 -> REP2.mp3
   * ...
   * Question 9 -> REP9.mp3
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

    start((spokenText: string) => {
      setStatus("checking");
      setTranscript(spokenText);

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
       *
       * La question est immédiatement enregistrée comme
       * incorrecte.
       *
       * L'élève ne peut pas recommencer cette question.
       */

      if (!isCorrect) {
        saveQuestionResult(
          spokenText,
          false,
        );

        setStatus("wrong");

        setErrorMessage(
          "Ce n'est pas la bonne question. Passe à la question suivante.",
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

      /*
       * Petit délai avant la réponse de Jean afin de laisser
       * apparaître visuellement la validation.
       */

      window.setTimeout(() => {
        speakTeacherAnswer();
      }, 500);
    });
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

      onCompleted?.(result);

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
    setIsTeacherSpeaking(false);
    setStatus("ready");
  };

  const expectedInterrogativeWord =
    question.expectedQuestion
      .split(" ")[0];

  /*
   * =========================================================
   * RENDU
   * =========================================================
   */

  return (
    <section className="w-full">
      <div className="mx-auto max-w-5xl">
        {/* =====================================================
            PROGRESSION
        ===================================================== */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
              Question{" "}
              {currentQuestionIndex + 1}
            </p>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Trouve le bon mot interrogatif
            </p>
          </div>

          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm">
            {currentQuestionIndex + 1} /{" "}
            {totalQuestions}
          </div>
        </div>

        {/* =====================================================
            QUESTION
        ===================================================== */}

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.10)]">
          {/* HEADER */}

          <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-6 py-8 sm:px-9">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-700">
                  {question.category}
                </span>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Pose la question à Jean
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Complète mentalement la question avec
                le bon mot interrogatif, puis prononce
                toute la question au micro.
              </p>
            </div>
          </div>

          {/* CORPS */}

          <div className="px-6 py-8 sm:px-9 sm:py-10">
            {/* MOTS DISPONIBLES */}

            <div className="mb-8">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />

                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                  Mots interrogatifs
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {question.interrogativeWords.map(
                  (word) => {
                    const isExpected =
                      normalizeText(word) ===
                      normalizeText(
                        expectedInterrogativeWord,
                      );

                    return (
                      <span
                        key={word}
                        className="
                          rounded-full
                          border
                          border-slate-200
                          bg-slate-50
                          px-4
                          py-2.5
                          text-sm
                          font-bold
                          text-slate-600
                          shadow-sm
                          transition-all
                        "
                      >
                        {word}
                      </span>
                    );
                  },
                )}
              </div>
            </div>

            {/* PHRASE À CONSTRUIRE */}

            <div className="rounded-[1.5rem] border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 shadow-sm sm:p-8">
              <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.18em] text-amber-700">
                Construis la question
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-3 text-xl font-bold leading-relaxed text-slate-900 sm:text-2xl">
                <span
                  className="
                    inline-flex
                    min-w-[105px]
                    items-center
                    justify-center
                    rounded-xl
                    border-2
                    border-dashed
                    border-amber-300
                    bg-white
                    px-4
                    py-2
                    text-amber-500
                    shadow-sm
                  "
                >
                  ?
                </span>

                <span>
                  {question.questionPrefix}
                  {question.questionSuffix}
                </span>
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-500">
                Tu dois prononcer la phrase complète,
                pas seulement le mot manquant.
              </p>
            </div>

            {/* =================================================
                ZONE MICRO
            ================================================= */}

            <div className="mt-10 flex flex-col items-center">
              {status === "ready" && (
                <>
                  <p className="mb-4 text-center text-sm font-bold text-slate-600">
                    À toi de parler
                  </p>

                  <SpeechButton
                    isListening={isListening}
                    onClick={handleRecognition}
                  />

                  <p className="mt-4 text-center text-xs font-medium text-slate-400">
                    Prononce :{" "}
                    « {question.expectedQuestion} »
                  </p>
                </>
              )}

              {status === "listening" && (
                <>
                  <p className="mb-4 text-center text-sm font-bold text-amber-700">
                    Je t&apos;écoute...
                  </p>

                  <SpeechButton
                    isListening={true}
                    onClick={() => undefined}
                  />

                  <div className="mt-5 flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                    <span className="text-sm font-semibold text-slate-500">
                      Parle maintenant
                    </span>
                  </div>
                </>
              )}

              {status === "checking" && (
                <div className="flex flex-col items-center py-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl shadow-sm">
                    🔎
                  </div>

                  <p className="mt-4 text-sm font-bold text-slate-700">
                    Je vérifie ta question...
                  </p>
                </div>
              )}

              {/* =================================================
                  MAUVAISE RÉPONSE
              ================================================= */}

              {status === "wrong" && (
                <div className="w-full">
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
                    <p className="text-base font-extrabold text-red-700">
                      ❌ Mauvaise réponse
                    </p>

                    <p className="mt-2 text-sm leading-6 text-red-600">
                      {errorMessage}
                    </p>

                    {transcript && (
                      <div className="mt-4 rounded-xl border border-red-100 bg-white px-4 py-3">
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                          J&apos;ai compris
                        </p>

                        <p className="mt-1 font-semibold text-slate-700">
                          « {transcript} »
                        </p>
                      </div>
                    )}

                    {similarity !== null && (
                      <p className="mt-3 text-xs font-semibold text-red-500">
                        Correspondance :{" "}
                        {similarity}%
                      </p>
                    )}
                  </div>

                  <div className="mt-5 flex justify-center">
                    <button
                      type="button"
                      onClick={handleContinue}
                      className="
                        group
                        inline-flex
                        items-center
                        justify-center
                        gap-3
                        rounded-xl
                        bg-emerald-500
                        px-6
                        py-3
                        text-sm
                        font-extrabold
                        text-white
                        shadow-[0_12px_30px_rgba(16,185,129,0.22)]
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:bg-emerald-600
                      "
                    >
                      <span>
                        {currentQuestionIndex ===
                        totalQuestions - 1
                          ? "Voir le résultat"
                          : "Question suivante"}
                      </span>

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* =================================================
                  BONNE RÉPONSE
              ================================================= */}

              {status === "correct" && (
                <div className="w-full">
                  {/* QUESTION CORRECTE */}

                  <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-2xl text-white shadow-sm">
                      ✓
                    </div>

                    <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
                      Très bien !
                    </p>

                    <p className="mt-2 text-lg font-black text-slate-900">
                      Tu as posé la bonne question.
                    </p>

                    {transcript && (
                      <p className="mt-3 text-sm font-medium text-slate-600">
                        « {transcript} »
                      </p>
                    )}
                  </div>

                  {/* JEAN */}

                  <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-emerald-50 p-6 shadow-sm sm:p-8">
                    <div className="flex items-start gap-4">
                    <div className="shrink-0">
  <img
    src="/images/courses/teacher/jeanbulle.png"
    alt="Jean"
    className="h-20 w-20 object-contain"
  />
</div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex items-center gap-3">
                          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-400">
                            Jean
                          </p>

                          {isTeacherSpeaking && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />

                              Jean parle
                            </span>
                          )}
                        </div>

                        <div className="relative rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-5 py-4 shadow-sm">
                          <p className="text-base font-semibold leading-7 text-slate-800 sm:text-lg">
                            {question.teacherAnswer}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                      <button
                        type="button"
                        onClick={speakTeacherAnswer}
                        disabled={isTeacherSpeaking}
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-3
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          px-5
                          py-3
                          text-sm
                          font-bold
                          text-slate-700
                          shadow-sm
                          transition-all
                          duration-300
                          hover:-translate-y-0.5
                          hover:border-emerald-200
                          hover:bg-emerald-50
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        <span>
                          {isTeacherSpeaking
                            ? "Jean parle..."
                            : "Réécouter Jean"}
                        </span>

                        <span>
                          🔊
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={handleContinue}
                        className="
                          group
                          inline-flex
                          items-center
                          justify-center
                          gap-3
                          rounded-xl
                          bg-emerald-500
                          px-6
                          py-3
                          text-sm
                          font-extrabold
                          text-white
                          shadow-[0_12px_30px_rgba(16,185,129,0.22)]
                          transition-all
                          duration-300
                          hover:-translate-y-0.5
                          hover:bg-emerald-600
                        "
                      >
                        <span>
                          {currentQuestionIndex ===
                          totalQuestions - 1
                            ? "Voir le résultat"
                            : "Continuer"}
                        </span>

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!speechSupported && (
                <div className="mt-6 w-full rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
                  <p className="text-sm font-semibold leading-6 text-amber-800">
                    La reconnaissance vocale n&apos;est pas
                    disponible dans ce navigateur.
                    Utilise un navigateur compatible avec
                    la reconnaissance vocale.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}