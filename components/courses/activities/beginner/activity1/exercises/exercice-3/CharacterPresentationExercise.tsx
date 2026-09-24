"use client";

import Image from "next/image";
import React, {
  useRef,
  useState,
} from "react";

import SpeechButton from "@/components/courses/components/SpeechButton";
import { validateSentence } from "@/components/courses/speech/scoring";
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

  const [
    isPlayingFeedbackAudio,
    setIsPlayingFeedbackAudio,
  ] = useState(false);

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
            "character-presentation-exercise",
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
      id="character-presentation-exercise"
      className="mt-12 w-full"
    >
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)]">

        {/* HEADER */}

        <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Présentation
              </p>

              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Présente le personnage
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
                className="h-full rounded-full bg-amber-400 transition-all duration-500"
                style={{
                  width: `${globalProgress}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <div className="mx-auto max-w-5xl">

            {/* CHARACTER CARD */}

            <div
              className="
                relative grid
                overflow-hidden
                rounded-3xl
                border border-slate-200
                bg-white
                shadow-sm
                md:grid-cols-[1.1fr_1fr]
              "
            >
              <div className="relative min-h-[280px] bg-slate-100 md:min-h-[380px]">
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

              <div className="flex flex-col items-center justify-center bg-slate-50 p-8 text-center">
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

            <div className="mt-8">
              <div className="rounded-3xl border-2 border-amber-200 bg-white px-6 py-8 text-center shadow-sm sm:px-10">
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

            {/* MICRO */}

            {!currentResult && (
              <div className="mt-8 flex flex-col items-center">
                <SpeechButton
                  isListening={
                    isListening
                  }
                  onClick={
                    handleSpeak
                  }
                />

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