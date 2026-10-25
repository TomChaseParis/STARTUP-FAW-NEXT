"use client";

import Image from "next/image";
import React, {
  useRef,
  useState,
} from "react";

import { validateSentence } from "@/components/courses/speech/scoring";
import TeacherComicBubble from "@/components/courses/common/teacher/TeacherComicBubble";
import { useSpeechRecognition } from "@/components/courses/speech/useSpeechRecognition";

import type {
  ExerciseHistoryItem,
  ExerciseSessionResult,
} from "@/components/courses/common/types/exerciseSessionTypes";

import type { ActivityResult } from "@/core/activity/models/ActivityResult";

import { characterPresentationData } from "../../data/characterPresentationData";

type CharacterPresentationExerciseProps = {
  onComplete?: (
    result: ActivityResult,
  ) => void;
};

type CharacterResult = {
  status: "correct" | "correction";
  similarity: number;
  spokenText?: string;
};

export default function CharacterPresentationExercise({
  onComplete,
}: CharacterPresentationExerciseProps) {
  const [
    currentCharacterIndex,
    setCurrentCharacterIndex,
  ] = useState(0);

  const [
    currentSentenceIndex,
    setCurrentSentenceIndex,
  ] = useState(0);

  const [attempts, setAttempts] =
    useState(0);

  const [feedback, setFeedback] =
    useState("");

  const [currentResult, setCurrentResult] =
    useState<CharacterResult | null>(null);

  // La bulle d'aide du microphone ne s'affiche qu'une seule fois par exercice.
  const [hideTeacherBubble, setHideTeacherBubble] = useState(false);
  const [showTeacherPhoto, setShowTeacherPhoto] = useState(false);
  const [showTeacherBubble, setShowTeacherBubble] = useState(false);

  const [
    isPlayingFeedbackAudio,
    setIsPlayingFeedbackAudio,
  ] = useState(false);

  React.useEffect(() => {
    const photoTimeout = window.setTimeout(() => {
      if (!hideTeacherBubble) setShowTeacherPhoto(true);
    }, 500);

    const bubbleTimeout = window.setTimeout(() => {
      if (!hideTeacherBubble) setShowTeacherBubble(true);
    }, 1200);

    return () => {
      window.clearTimeout(photoTimeout);
      window.clearTimeout(bubbleTimeout);
    };
  }, [hideTeacherBubble]);

  /*
   * ============================================================
   * SESSION
   * ============================================================
   *
   * Même système que l'exercice de conjugaison.
   */

  const sessionStartedAt = useRef<Date>(
    new Date(),
  );

  const completedRef = useRef<
    boolean[][]
  >(
    characterPresentationData.map(
      (character) =>
        character.sentences.map(
          () => false,
        ),
    ),
  );

  const historyRef = useRef<
    ExerciseHistoryItem[]
  >([]);

  const {
    start,
    isListening,
  } = useSpeechRecognition();

  const currentCharacter =
    characterPresentationData[
      currentCharacterIndex
    ];

  const currentSentences =
    currentCharacter?.sentences ?? [];

  const currentSentence =
    currentSentences[
      currentSentenceIndex
    ];

  /*
   * ============================================================
   * PRONOM
   * ============================================================
   */

  const currentPronoun =
    currentCharacter?.buttonLabel ?? "";

  /*
   * ============================================================
   * PROGRESSION
   * ============================================================
   *
   * L'exemple n'est pas présent dans
   * characterPresentationData.
   *
   * Il n'est donc jamais comptabilisé.
   */

  const totalCharacters =
    characterPresentationData.length;

  const totalSentences =
    currentSentences.length;

  /*
   * ============================================================
   * TOTAL DES QUESTIONS
   * ============================================================
   */

  const totalQuestions =
    characterPresentationData.reduce(
      (total, character) =>
        total +
        character.sentences.length,
      0,
    );

  /*
   * ============================================================
   * NOMBRE DE QUESTIONS TERMINÉES
   * ============================================================
   */

  const getCompletedQuestionsCount =
    () => {
      return completedRef.current.reduce(
        (total, character) =>
          total +
          character.filter(Boolean)
            .length,
        0,
      );
    };

  /*
   * ============================================================
   * CALCUL DU SCORE
   * ============================================================
   */

  const calculateScore = () => {
    const correctAnswers =
      historyRef.current.filter(
        (item) => item.isCorrect,
      ).length;

    if (totalQuestions === 0) {
      return 0;
    }

    return Math.round(
      (correctAnswers /
        totalQuestions) *
        100,
    );
  };

  /*
   * ============================================================
   * ENREGISTRER UNE QUESTION
   * ============================================================
   */

  const saveQuestionResult = ({
    characterIndex,
    sentenceIndex,
    spokenText,
    isCorrect,
  }: {
    characterIndex: number;
    sentenceIndex: number;
    spokenText: string;
    isCorrect: boolean;
  }) => {
    /*
     * Identifiant global de la question.
     *
     * Exemple :
     *
     * ILS Q1 → 1
     * ILS Q9 → 9
     * ELLE Q1 → 10
     */

    const questionId =
      characterPresentationData
        .slice(
          0,
          characterIndex,
        )
        .reduce(
          (total, character) =>
            total +
            character.sentences.length,
          0,
        ) +
      sentenceIndex +
      1;

    const character =
      characterPresentationData[
        characterIndex
      ];

    const sentence =
      character.sentences[
        sentenceIndex
      ];

    const historyItem: ExerciseHistoryItem =
      {
        questionId,

        question:
          sentence.expectedSentence,

        selectedAnswer:
          spokenText,

        correctAnswer:
          sentence.expectedSentence,

        isCorrect,

        explanation: isCorrect
          ? "La phrase prononcée correspond à la réponse attendue."
          : "La phrase prononcée ne correspond pas à la réponse attendue.",

        duration: undefined,
      };

    /*
     * Une question ne doit apparaître
     * qu'une seule fois dans l'historique.
     */

    const existingIndex =
      historyRef.current.findIndex(
        (entry) =>
          entry.questionId ===
          questionId,
      );

    if (existingIndex === -1) {
      historyRef.current = [
        ...historyRef.current,
        historyItem,
      ];
    } else {
      historyRef.current[
        existingIndex
      ] = historyItem;
    }
  };

  /*
   * ============================================================
   * MARQUER UNE QUESTION COMME TERMINÉE
   * ============================================================
   */

  const markQuestionAsCompleted = ({
    characterIndex,
    sentenceIndex,
    spokenText,
    isCorrect,
  }: {
    characterIndex: number;
    sentenceIndex: number;
    spokenText: string;
    isCorrect: boolean;
  }) => {
    /*
     * Une question déjà terminée ne peut
     * plus être comptabilisée une seconde fois.
     */

    if (
      completedRef.current[
        characterIndex
      ][sentenceIndex]
    ) {
      return;
    }

    completedRef.current[
      characterIndex
    ][sentenceIndex] = true;

    saveQuestionResult({
      characterIndex,
      sentenceIndex,
      spokenText,
      isCorrect,
    });
  };

  /*
   * ============================================================
   * SCORE GLOBAL
   * ============================================================
   */

  const globalProgress = (() => {
    const total =
      characterPresentationData.reduce(
        (sum, character) =>
          sum +
          character.sentences.length,
        0,
      );

    let completed = 0;

    for (
      let index = 0;
      index < currentCharacterIndex;
      index++
    ) {
      completed +=
        characterPresentationData[
          index
        ].sentences.length;
    }

    completed += currentSentenceIndex;

    if (total === 0) {
      return 0;
    }

    return (
      (completed / total) *
      100
    );
  })();

  /*
   * ============================================================
   * AUDIO
   * ============================================================
   *
   * IMPORTANT :
   *
   * Les chemins audio viennent DIRECTEMENT
   * de characterPresentationData.
   *
   * Le composant ne construit aucun
   * chemin audio lui-même.
   *
   * wrong1  → ancien exercice 2
   * wrong2  → ancien exercice 2
   * solution → exercice 3
   */

  const currentAudio =
    currentSentence?.audio;

  /*
   * ============================================================
   * LECTURE AUDIO
   * ============================================================
   */

  const playAudio = (
    file: string,
  ) => {
    if (!file) {
      console.error(
        "❌ Aucun fichier audio fourni.",
      );

      return;
    }

    console.log(
      "🔊 AUDIO JOUÉ :",
      file,
    );

    setIsPlayingFeedbackAudio(true);

    const audio = new Audio(file);

    audio.onended = () => {
      setIsPlayingFeedbackAudio(false);
    };

    audio.onerror = () => {
      console.error(
        "❌ Impossible de lire l'audio :",
        file,
      );

      setIsPlayingFeedbackAudio(false);
    };

    void audio
      .play()
      .catch((error) => {
        console.error(
          "❌ Erreur lecture audio :",
          error,
        );

        setIsPlayingFeedbackAudio(false);
      });
  };

  /*
   * ============================================================
   * TERMINER L'EXERCICE
   * ============================================================
   */

  const completeExercise = () => {
    if (
      getCompletedQuestionsCount() !==
      totalQuestions
    ) {
      return;
    }

    const finishedAt = new Date();

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

    const correctAnswers =
      historyRef.current.filter(
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

    const history =
      historyRef.current;

    const session: ExerciseSessionResult =
      {
        score,

        correctAnswers,

        totalQuestions,

        history,

        startedAt,

        finishedAt,

        duration,
      };

    const result: ActivityResult = {
      session,

      bestScore: score,

      attempts: 1,
    };

    console.log(
      "🏆 EXERCICE 3 TERMINÉ",
    );

    console.log(
      "📊 SCORE :",
      score,
      "%",
    );

    console.log(
      "✅ BONNES RÉPONSES :",
      correctAnswers,
      "/",
      totalQuestions,
    );

    console.log(
      "⏱️ DURÉE :",
      duration,
      "secondes",
    );

    onComplete?.(result);
  };

  /*
   * ============================================================
   * PHRASE SUIVANTE
   * ============================================================
   */

  const handleNextSentence = () => {
    /*
     * Phrase suivante du même personnage.
     */

    if (
      currentSentenceIndex <
      totalSentences - 1
    ) {
      setCurrentSentenceIndex(
        (previous) =>
          previous + 1,
      );

      setAttempts(0);
      setFeedback("");
      setCurrentResult(null);

      return;
    }

    /*
     * Personnage suivant.
     */

    if (
      currentCharacterIndex <
      totalCharacters - 1
    ) {
      setCurrentCharacterIndex(
        (previous) =>
          previous + 1,
      );

      setCurrentSentenceIndex(0);
      setAttempts(0);
      setFeedback("");
      setCurrentResult(null);

      requestAnimationFrame(() => {
        document
          .getElementById(
            "click-and-speak-exercise",
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      });

      return;
    }

    /*
     * Tous les personnages sont terminés.
     *
     * Le score est maintenant calculé
     * à partir de historyRef.
     */

    completeExercise();
  };

  /*
   * ============================================================
   * RÉSULTAT RECONNAISSANCE VOCALE
   * ============================================================
   */

  const handleRecognitionResult = (
    spokenText: string,
  ) => {
    if (
      currentResult ||
      !currentSentence ||
      !currentAudio
    ) {
      return;
    }

    console.log(
      "🎤 RECONNU :",
      spokenText,
    );

    console.log(
      "🎯 ATTENDU :",
      currentSentence.expectedSentence,
    );

    console.log(
      "🎧 AUDIO ACTUEL :",
      currentAudio,
    );

    /*
     * IMPORTANT :
     *
     * On compare toujours la réponse
     * avec expectedSentence.
     */

    const result =
      validateSentence(
        spokenText,
        currentSentence.expectedSentence,
      );

    const similarity =
      result.similarity;

    const isCorrect =
      result.isCorrect;

    /*
     * ==========================================================
     * BONNE RÉPONSE
     * ==========================================================
     *
     * Une bonne réponse est comptabilisée
     * immédiatement comme correcte.
     *
     * Même si elle est obtenue au 2e ou 3e essai,
     * elle vaut 1 point.
     */

    if (isCorrect) {
      setFeedback(
        `✅ Bonne réponse (${similarity}%)`,
      );

      setCurrentResult({
        status: "correct",
        similarity,
        spokenText,
      });

      /*
       * La question est comptée comme correcte.
       */

      markQuestionAsCompleted({
        characterIndex:
          currentCharacterIndex,

        sentenceIndex:
          currentSentenceIndex,

        spokenText,

        isCorrect: true,
      });

      playAudio(
        currentAudio.correct,
      );

      return;
    }

    /*
     * ==========================================================
     * MAUVAISE RÉPONSE
     * ==========================================================
     */

    const nextAttempts =
      attempts + 1;

    setAttempts(nextAttempts);

    /*
     * ==========================================================
     * PREMIER ÉCHEC
     * ==========================================================
     */

    if (nextAttempts === 1) {
      playAudio(
        currentAudio.wrong1,
      );

      setFeedback(
        `❌ Mauvaise réponse (${similarity}%). Essaie encore.`,
      );

      return;
    }

    /*
     * ==========================================================
     * DEUXIÈME ÉCHEC
     * ==========================================================
     */

    if (nextAttempts === 2) {
      playAudio(
        currentAudio.wrong2,
      );

      setFeedback(
        `❌ Ce n'est pas encore ça (${similarity}%). Dernier essai.`,
      );

      return;
    }

    /*
     * ==========================================================
     * TROISIÈME ÉCHEC
     * ==========================================================
     *
     * La réponse est révélée.
     *
     * IMPORTANT :
     *
     * La question est considérée comme terminée,
     * mais elle est enregistrée comme FAUSSE.
     *
     * Elle vaut donc 0 point.
     */

    playAudio(
      currentAudio.solution,
    );

    setFeedback(
      `💡 Correction : « ${currentSentence.expectedSentence} »`,
    );

    setCurrentResult({
      status: "correction",
      similarity,
      spokenText,
    });

    /*
     * Enregistrement de la question comme FAUSSE.
     */

    markQuestionAsCompleted({
      characterIndex:
        currentCharacterIndex,

      sentenceIndex:
        currentSentenceIndex,

      spokenText,

      isCorrect: false,
    });
  };

  /*
   * ============================================================
   * BOUTON MICRO
   * ============================================================
   */

  const handleSpeak = () => {
    if (
      currentResult ||
      !currentSentence
    ) {
      return;
    }

    // Dès le premier clic, la bulle ne revient plus aux phrases suivantes.
    setHideTeacherBubble(true);
    setShowTeacherPhoto(false);
    setShowTeacherBubble(false);

    setFeedback(
      "🎤 Parle maintenant…",
    );

    start((spokenText) => {
      handleRecognitionResult(
        spokenText,
      );
    });
  };

  /*
   * ============================================================
   * SÉCURITÉ
   * ============================================================
   */

  if (
    !currentCharacter ||
    !currentSentence
  ) {
    return null;
  }

  /*
   * ============================================================
   * UI
   * ============================================================
   */

  return (
    <section
      id="click-and-speak-exercise"
      className="container mx-auto w-full min-w-0"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.08)]">

        {/* HEADER */}

        <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-4 sm:px-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-800">
                CONJUGAISON
              </p>

              <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                Présente le(s) personnage(s) avec le pronom indiqué
              </h3>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-xs font-semibold text-slate-400">
                PERSONNAGE
              </p>

              <p className="text-lg font-bold text-slate-900">
                {currentCharacterIndex + 1}{" "}
                <span className="font-medium text-slate-400">
                  / {totalCharacters}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{
                  width: `${globalProgress}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div className="px-4 py-4 sm:px-6 sm:py-5">
          <div className="w-full min-w-0">

            {/* CHARACTER CARD */}

            <div
              className="
                relative grid
                overflow-hidden
                rounded-2xl
                border border-slate-200
                bg-white
                shadow-sm
                md:grid-cols-[1.15fr_1fr]
              "
            >
              <div className="relative min-h-[260px] bg-slate-100 md:min-h-[340px]">
                <Image
                  src={
                    currentCharacter.image
                  }
                  alt={`Personnage ${currentCharacter.id}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-white p-6 text-center sm:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Pronom
                </p>

                <h2 className="mt-2 text-5xl font-extrabold tracking-wide text-slate-900">
                  {currentPronoun}
                </h2>

                <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-[#E09F00]" />

                <p className="mt-6 text-sm font-medium text-slate-500">
                  Phrase{" "}
                  {currentSentenceIndex +
                    1}{" "}
                  / {totalSentences}
                </p>
              </div>
            </div>

            {/* SENTENCE */}

            <div className="mt-5">
              <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/60 to-white px-5 py-6 text-center shadow-sm sm:px-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Dis cette phrase
                </p>

                <p
                  key={`${currentCharacter.id}-${currentSentenceIndex}`}
                  className="mt-4 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl"
                >
                  {currentSentence.prompt}
                </p>
              </div>
            </div>

            {/* ATTEMPTS */}

            {!currentResult && (
              <div className="mt-5 text-center">
                <p className="text-sm font-semibold text-slate-500">
                  Essai{" "}
                  {Math.min(
                    attempts + 1,
                    3,
                  )}{" "}
                  / 3
                </p>

                <div className="mx-auto mt-3 flex max-w-[180px] gap-2">
                  {[1, 2, 3].map(
                    (attempt) => (
                      <div
                        key={attempt}
                        className={`
                          h-2 flex-1 rounded-full transition-all duration-300
                          ${
                            attempt <=
                            attempts
                              ? "bg-red-400"
                              : "bg-slate-200"
                          }
                        `}
                      />
                    ),
                  )}
                </div>
              </div>
            )}

            {/* MICRO + BULLE DU PROFESSEUR À DROITE */}

            {!currentResult && (
              <div className="mt-6 flex flex-col items-center">
                <div className="relative flex min-h-[100px] w-full items-center justify-center overflow-visible">

                  {/* Bouton micro centré */}

                  <button
                    type="button"
                    onClick={handleSpeak}
                    aria-label={
                      isListening
                        ? "Arrêter l'enregistrement"
                        : "Commencer l'enregistrement"
                    }
                    aria-pressed={isListening}
                    disabled={Boolean(currentResult)}
                    className={`
                      relative z-10 flex h-14 w-14 shrink-0
                      items-center justify-center rounded-full
                      border shadow-xl transition-all duration-200
                      disabled:cursor-not-allowed disabled:opacity-60
                      ${
                        isListening
                          ? "scale-105 border-amber-500 bg-amber-400 text-black"
                          : !hideTeacherBubble
                            ? "animate-[audioAttention_1.4s_ease-in-out_infinite] border-amber-300 bg-white text-amber-600 hover:scale-105 hover:bg-amber-50"
                            : "border-amber-300 bg-white text-amber-600 hover:scale-105 hover:bg-amber-50"
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
                      aria-hidden="true"
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

                  {/* Bulle placée à droite du micro */}

                  {!hideTeacherBubble && (
                    <div
                      className="
                        pointer-events-none
                        absolute left-[calc(50%+42px)]
                        top-1/2 z-20
                        w-[calc(50%-58px)]
                        max-w-[280px]
                        -translate-y-1/2
                        sm:left-[calc(50%+48px)]
                        sm:w-[min(40%,280px)]
                      "
                      aria-hidden={
                        !showTeacherPhoto ||
                        !showTeacherBubble
                      }
                    >
                      <div
                        className={
                          showTeacherPhoto &&
                          showTeacherBubble
                            ? "visible"
                            : "invisible"
                        }
                      >
                        <TeacherComicBubble
                          className="w-full items-center gap-2"
                          message="Clique ici pour parler et prononcer la phrase"
                          showPhoto={
                            showTeacherPhoto &&
                            !hideTeacherBubble
                          }
                          showBubble={
                            showTeacherBubble &&
                            !hideTeacherBubble
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                <p className="mt-3 text-sm text-slate-500">
                  {isListening
                    ? "Je t'écoute..."
                    : "Clique sur le micro et prononce la phrase"}
                </p>
              </div>
            )}

            {/* RESULT */}

            {currentResult && (
              <div className="mt-8">

                {/* PHRASE RÉUSSIE */}

                {currentResult.status ===
                  "correct" && (
                  <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-center">
                    <p className="text-sm font-bold text-green-700">
                      🎉 Phrase réussie !
                    </p>

                    <p className="mt-3 text-2xl font-extrabold text-green-800 sm:text-3xl">
                      {
                        currentSentence.expectedSentence
                      }
                    </p>

                    <p className="mt-1 text-xs font-medium text-green-600">
                      Correspondance :{" "}
                      {
                        currentResult.similarity
                      }
                      %
                    </p>
                  </div>
                )}

                {/* CORRECTION */}

                {currentResult.status ===
                  "correction" && (
                  <div className="mb-5 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-5 text-center">
                    <p className="text-sm font-bold text-blue-700">
                      💡 Écoute la correction puis continue.
                    </p>

                    <p className="mt-4 text-2xl font-extrabold text-red-600 sm:text-3xl">
                      {
                        currentResult.spokenText
                      }
                    </p>

                    <p className="mt-3 text-2xl font-extrabold text-green-700 sm:text-3xl">
                      {
                        currentSentence.expectedSentence
                      }
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={
                    handleNextSentence
                  }
                  disabled={
                    isPlayingFeedbackAudio
                  }
                  className="
                    w-full
                    rounded-2xl
                    bg-slate-900
                    px-6
                    py-4
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:-translate-y-0.5
                    hover:bg-slate-800
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {isPlayingFeedbackAudio
                    ? "Écoute en cours..."
                    : currentCharacterIndex ===
                          totalCharacters - 1 &&
                        currentSentenceIndex ===
                          totalSentences - 1
                      ? "Terminer →"
                      : currentSentenceIndex ===
                          totalSentences - 1
                        ? "Personnage suivant →"
                        : "Phrase suivante →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}