"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";


import leisureConjugationData from "./data/leisureConjugationData";

import PremiumAudioPlayer from "@/components/courses/blocks/PremiumAudioPlayer";

import { useExerciseSession } from "@/components/courses/common/hooks/useExerciseSession";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type Answers = Record<string, string>;

type Result = {
  blankId: string;
  answer: string;
  expected: string;
  isCorrect: boolean;
};

type LeisureConjugationExerciseProps = {
  onComplete?: (
    result: ExerciseSessionResult,
  ) => void;
};

const normalizeText = (
  value: string,
) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const LeisureConjugationExercise: React.FC<
  LeisureConjugationExerciseProps
> = ({ onComplete }) => {
  /*
   * =========================================================
   * SESSION STANDARD DU PROJET
   * =========================================================
   *
   * Le score, l'historique, la durée,
   * le nombre de bonnes réponses et
   * l'état de fin sont gérés par
   * useExerciseSession.
   */

  const totalQuestions =
    leisureConjugationData.blanks.length;

  const session =
    useExerciseSession(
      totalQuestions,
    );

  /*
   * =========================================================
   * ÉTAT DES RÉPONSES
   * =========================================================
   */

  const [answers, setAnswers] =
    useState<Answers>({});

  const [
    activeInputId,
    setActiveInputId,
  ] =
    useState<string | null>(null);

  const [validated, setValidated] =
    useState(false);

  const [results, setResults] =
    useState<Result[]>([]);

  /*
   * =========================================================
   * RÉFÉRENCES DES INPUTS
   * =========================================================
   */

  const inputRefs = useRef<
    Record<
      string,
      HTMLInputElement | null
    >
  >({});

  /*
   * =========================================================
   * DONNÉES
   * =========================================================
   */

  const blanksById = useMemo(() => {
    return new Map(
      leisureConjugationData.blanks.map(
        (blank) => [
          blank.id,
          blank,
        ],
      ),
    );
  }, []);

  /*
   * =========================================================
   * PROGRESSION
   * =========================================================
   */

  const answeredCount =
    leisureConjugationData.blanks.filter(
      (blank) =>
        (
          answers[blank.id] ??
          ""
        ).trim() !== "",
    ).length;

  const progress =
    totalQuestions > 0
      ? (answeredCount /
          totalQuestions) *
        100
      : 0;

  const allAnswered =
    answeredCount ===
    totalQuestions;

  /*
   * =========================================================
   * TRANSMISSION AU SYSTÈME GLOBAL
   * =========================================================
   *
   * IMPORTANT :
   *
   * On ne rend PAS ActivityResults ici.
   *
   * On ne rend PAS ExerciseResult ici.
   *
   * On ne rend PAS ExerciseReport ici.
   *
   * Le résultat remonte :
   *
   * useExerciseSession
   *        ↓
   * session.result
   *        ↓
   * onComplete
   *        ↓
   * ExerciseContainer
   *        ↓
   * completeExercise
   *        ↓
   * ActivityFlow
   *        ↓
   * ActivityResults
   */

  useEffect(() => {
    if (!session.isFinished) {
      return;
    }

    onComplete?.(
      session.result,
    );
  }, [
    session.isFinished,
    session.result,
    onComplete,
  ]);

  /*
   * =========================================================
   * CHANGEMENT D'UNE RÉPONSE
   * =========================================================
   */

  const handleChange = (
    blankId: string,
    value: string,
  ) => {
    if (validated) {
      return;
    }

    session.start();

    setAnswers(
      (previous) => ({
        ...previous,
        [blankId]: value,
      }),
    );
  };

  /*
   * =========================================================
   * VALIDATION
   * =========================================================
   */

  const handleValidate = () => {
    if (!allAnswered) {
      return;
    }

    if (validated) {
      return;
    }

    const nextResults =
      leisureConjugationData.blanks.map(
        (blank, index) => {
          const userAnswer =
            answers[
              blank.id
            ] ?? "";

          const isCorrect =
            normalizeText(
              userAnswer,
            ) ===
            normalizeText(
              blank.answer,
            );

          /*
           * Chaque blanc constitue
           * une question du point de vue
           * de la session.
           */

          session.addAnswer({
            questionId: index,

            question:
              `Conjugaison du verbe ${blank.infinitive}`,

            selectedAnswer:
              userAnswer,

            correctAnswer:
              blank.answer,

            isCorrect,

            explanation:
              isCorrect
                ? `La conjugaison « ${userAnswer} » correspond à la réponse attendue.`
                : `La réponse attendue était « ${blank.answer} » pour le verbe ${blank.infinitive}.`,
          });

          return {
            blankId:
              blank.id,

            answer:
              userAnswer,

            expected:
              blank.answer,

            isCorrect,
          };
        },
      );

    setResults(
      nextResults,
    );

    setValidated(
      true,
    );

    setActiveInputId(
      null,
    );

    /*
     * Le moteur standard termine
     * maintenant la session.
     *
     * Le useEffect ci-dessus détectera
     * session.isFinished et appellera
     * onComplete(session.result).
     */

    session.complete();
  };

  /*
   * =========================================================
   * RECOMMENCER
   * =========================================================
   *
   * Le bouton "Recommencer" du nouveau
   * système de résultat est géré par
   * ActivityResults.
   *
   * Lorsque l'utilisateur clique dessus,
   * ActivityFlow remet l'exercice dans
   * son état initial.
   *
   * Cette fonction reste néanmoins utile
   * si le composant doit être réinitialisé
   * par son parent.
   */

  const handleReset = () => {
    setAnswers({});

    setResults([]);

    setValidated(false);

    setActiveInputId(null);

    inputRefs.current = {};

    session.reset();
  };

  /*
   * =========================================================
   * INSERTION DES ACCENTS
   * =========================================================
   */

  const insertCharacter = (
    character: string,
  ) => {
    if (validated) {
      return;
    }

    if (!activeInputId) {
      return;
    }

    const input =
      inputRefs.current[
        activeInputId
      ];

    if (!input) {
      return;
    }

    const currentValue =
      answers[
        activeInputId
      ] ?? "";

    const selectionStart =
      input.selectionStart ??
      currentValue.length;

    const selectionEnd =
      input.selectionEnd ??
      currentValue.length;

    const nextValue =
      currentValue.slice(
        0,
        selectionStart,
      ) +
      character +
      currentValue.slice(
        selectionEnd,
      );

    session.start();

    setAnswers(
      (previous) => ({
        ...previous,
        [activeInputId]:
          nextValue,
      }),
    );

    requestAnimationFrame(
      () => {
        input.focus();

        const nextCursorPosition =
          selectionStart +
          character.length;

        input.setSelectionRange(
          nextCursorPosition,
          nextCursorPosition,
        );
      },
    );
  };

  /*
   * =========================================================
   * RÉSULTAT D'UN BLANC
   * =========================================================
   */

  const getResultForBlank = (
    blankId: string,
  ) => {
    return results.find(
      (result) =>
        result.blankId ===
        blankId,
    );
  };

  /*
   * =========================================================
   * RENDU D'UN BLANC
   * =========================================================
   */

  const renderBlank = (
    blankId: string,
  ) => {
    const blank =
      blanksById.get(
        blankId,
      );

    if (!blank) {
      return null;
    }

    const value =
      answers[blankId] ??
      "";

    const result =
      getResultForBlank(
        blankId,
      );

    const isCorrect =
      result?.isCorrect ===
      true;

    const isIncorrect =
      result?.isCorrect ===
      false;

    return (
      <span
        key={blankId}
        className="mx-2 inline-flex align-middle"
      >
        <span className="inline-flex flex-col items-center">
          <input
            ref={(element) => {
              inputRefs.current[
                blankId
              ] = element;
            }}
            type="text"
            value={value}
            disabled={validated}
            aria-label={`Conjugaison du verbe ${blank.infinitive}`}
            onFocus={() =>
              setActiveInputId(
                blankId,
              )
            }
            onChange={(
              event,
            ) =>
              handleChange(
                blankId,
                event.target.value,
              )
            }
            className={`
              h-10
              min-w-[140px]
              rounded-lg
              border-2
              bg-white
              px-3
              text-center
              text-[16px]
              font-semibold
              shadow-sm
              outline-none
              transition

              ${
                !validated
                  ? "border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400"
                  : isCorrect
                  ? "border-green-500 bg-green-100"
                  : "border-red-500 bg-red-100"
              }
            `}
          />

          <span className="mt-1 text-[15px] font-medium italic text-amber-500">
            (
            {
              blank.infinitive
            }
            )
          </span>

          {validated &&
            isIncorrect && (
              <span className="mt-1 text-sm font-bold text-green-600">
                →
                {" "}
                {
                  blank.answer
                }
              </span>
            )}

          {validated &&
            isCorrect && (
              <span className="mt-1 text-xs font-bold text-green-600">
                ✓ Correct
              </span>
            )}
        </span>
      </span>
    );
  };

  /*
   * =========================================================
   * RENDU DE L'EXERCICE
   * =========================================================
   *
   * IMPORTANT :
   *
   * Même lorsque la session est terminée,
   * ce composant ne rend aucun écran de score.
   *
   * ActivityFlow prend la main dès que
   * ExerciseContainer appelle completeExercise().
   *
   * On conserve donc uniquement le rendu
   * de l'exercice ici.
   */

  return (
    <section className="mt-12 bg-gradient-to-b from-white to-slate-50 pb-20">
      <div className="container mx-auto max-w-5xl pt-4">
        {/* =====================================================
            PROGRESSION
        ===================================================== */}

        <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
          <span>
            Progression :{" "}
            {answeredCount} /{" "}
            {totalQuestions}
          </span>

          <span className="font-semibold text-amber-600">
            {Math.round(
              progress,
            )}
            %
          </span>
        </div>

        <div className="mb-6 h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* =====================================================
            CONTAINER PRINCIPAL
        ===================================================== */}

        <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
          {/* ===================================================
              TITRE
          =================================================== */}

          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Complète les verbes
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Écoute le texte puis
              complète les verbes
              conjugués à la troisième
              personne du pluriel.
            </p>
          </div>

          {/* ===================================================
              AUDIO
          =================================================== */}

          <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <PremiumAudioPlayer
              audioSrc={
                leisureConjugationData.audioSrc
              }
              badge="Compréhension orale"
              title="Les loisirs préférés des Français"
              tip="Écoute attentivement le texte. Fais particulièrement attention aux verbes conjugués à la troisième personne du pluriel."
            />
          </div>

          {/* ===================================================
              ACCENTS
          =================================================== */}

          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Accents
            </p>

            <div className="flex flex-wrap gap-2">
              {leisureConjugationData.accentCharacters.map(
                (
                  character,
                ) => (
                  <button
                    key={
                      character
                    }
                    type="button"
                    disabled={
                      validated ||
                      !activeInputId
                    }
                    onClick={() =>
                      insertCharacter(
                        character,
                      )
                    }
                    className="
                      min-w-9
                      flex
                      h-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-amber-200
                      bg-white
                      px-2
                      text-sm
                      font-bold
                      text-slate-700
                      shadow-sm
                      transition
                      hover:border-amber-400
                      hover:bg-amber-100
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    {
                      character
                    }
                  </button>
                ),
              )}
            </div>

            {!activeInputId &&
              !validated && (
                <p className="mt-3 text-xs text-slate-500">
                  Clique d&apos;abord
                  dans un champ
                  pour utiliser
                  les accents.
                </p>
              )}
          </div>

          {/* ===================================================
              TEXTE À COMPLÉTER
          =================================================== */}

          <div className="space-y-8 text-[17px] leading-relaxed text-slate-800">
            <div
              className="
                rounded-xl
                bg-slate-50
                px-5
                py-4
                shadow-sm
                ring-1
                ring-slate-200
              "
            >
              {leisureConjugationData.parts.map(
                (
                  part,
                  index,
                ) => {
                  if (
                    part.type ===
                    "text"
                  ) {
                    return (
                      <React.Fragment
                        key={
                          index
                        }
                      >
                        {
                          part.value
                        }
                      </React.Fragment>
                    );
                  }

                  return renderBlank(
                    part.blankId,
                  );
                },
              )}
            </div>
          </div>

          {/* ===================================================
              VALIDATION
          =================================================== */}

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={
                handleValidate
              }
              disabled={
                !allAnswered
              }
              className="
                rounded-2xl
                bg-black
                px-8
                py-4
                font-semibold
                text-white
                shadow-lg
                transition
                hover:scale-105
                disabled:cursor-not-allowed
                disabled:bg-slate-300
                disabled:text-slate-500
              "
            >
              Vérifier mes réponses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeisureConjugationExercise;