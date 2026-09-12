"use client";

import {
  Fragment,
  useEffect,
  useState,
} from "react";

import {
  FillGapsData,
  FillGapsSpeaker,
} from "@/types/fillGapsTypes";

import { useFillGapsEngine } from "@/hooks/useFillGapsEngine";

import ExerciseResult from "@/components/courses/common/result/ExerciseResult";
import ExerciseReport from "@/components/courses/common/result/ExerciseReport";

import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type Props = {
  data: FillGapsData;
  teacherImage?: string;
  onComplete?: (
    result: ExerciseSessionResult,
  ) => void;
};

/* ========================================================= */
/* NORMALISATION                                             */
/* ========================================================= */

/*
 * Les accents sont obligatoires.
 *
 * "a" !== "à"
 * "e" !== "é"
 * "ete" !== "été"
 *
 * On accepte :
 * - majuscules / minuscules
 * - apostrophe droite ou typographique
 * - espaces multiples
 */

const normalizeText = (str: string) =>
  str
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .trim();

/* ========================================================= */
/* COULEURS DES LOCUTEURS                                    */
/* ========================================================= */

const SPEAKER_STYLES: Record<
  FillGapsSpeaker,
  {
    text: string;
  }
> = {
  conseillere: {
    text: "text-pink-700",
  },

  xavier: {
    text: "text-blue-700",
  },
};

/* ========================================================= */
/* NOM DES LOCUTEURS                                         */
/* ========================================================= */

const SPEAKER_LABELS: Record<
  FillGapsSpeaker,
  string
> = {
  conseillere: "L’agence matrimoniale",
  xavier: "Xavier",
};

/* ========================================================= */
/* COMPOSANT                                                  */
/* ========================================================= */

const FillGapsEngine: React.FC<Props> = ({
  data,
  onComplete,
}) => {
  const {
    sentences,
    answers,
    setAnswer,
    showCorrection,
    checkAnswers,
    reset,
    progress,
    totalInputs,
    answeredCount,
    allAnswered,
    session,
  } = useFillGapsEngine(data);

  const [showReport, setShowReport] =
    useState(false);

  /* ========================================================= */
  /* FIN DE SESSION                                            */
  /* ========================================================= */

  useEffect(() => {
    if (session.isFinished) {
      onComplete?.(session.result);
    }
  }, [
    session.isFinished,
    session.result,
    onComplete,
  ]);

  const handleCheck = () => {
    checkAnswers();
  };

  /* ========================================================= */
  /* RÉSULTATS                                                 */
  /* ========================================================= */

  if (session.isFinished) {
    if (showReport) {
      return (
        <ExerciseReport
          history={session.history}
          onRestart={() => {
            setShowReport(false);
            reset();
          }}
          onBack={() =>
            setShowReport(false)
          }
        />
      );
    }

    return (
      <ExerciseResult
        result={session.result}
        onRestart={() => {
          setShowReport(false);
          reset();
        }}
        onShowReport={() =>
          setShowReport(true)
        }
      />
    );
  }

  /* ========================================================= */
  /* CONTENU                                                   */
  /* ========================================================= */

  return (
    <section className="mt-8 overflow-x-hidden bg-gradient-to-b from-white to-slate-50 pb-16 sm:mt-12 sm:pb-20">
      <div className="container mx-auto w-full max-w-5xl px-4 sm:px-6">

        {/* ===================================================== */}
        {/* PROGRESSION                                           */}
        {/* ===================================================== */}

        <div className="mb-4 flex items-center justify-between gap-4 text-sm text-slate-600">
          <span className="min-w-0">
            Progression : {answeredCount} /{" "}
            {totalInputs}
          </span>

          <span className="shrink-0 font-semibold text-amber-600">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="mb-5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 sm:mb-6 sm:h-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* ===================================================== */}
        {/* CONTENU                                               */}
        {/* ===================================================== */}

        <div className="w-full min-w-0 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 sm:rounded-2xl sm:p-6 md:p-8">

          <h3 className="mb-5 text-base font-semibold text-black sm:mb-6 sm:text-lg">
            ✍️ Complète le texte :
          </h3>

          {/* =================================================== */}
          {/* UN SEUL BLOC POUR TOUT LE DIALOGUE                  */}
          {/* =================================================== */}

          <div className="w-full min-w-0 rounded-2xl bg-slate-50 p-4 shadow-sm ring-1 ring-slate-200 sm:p-5 md:p-6">

            {sentences.map(
              (
                sentence,
                sentenceIndex,
              ) => {
                /*
                 * Index global des inputs
                 * avant cette phrase.
                 */

                const inputsBeforeSentence =
                  sentences
                    .slice(
                      0,
                      sentenceIndex,
                    )
                    .reduce(
                      (
                        total,
                        currentSentence,
                      ) =>
                        total +
                        currentSentence.parts.filter(
                          (part) =>
                            part.type ===
                            "input",
                        ).length,
                      0,
                    );

                let localInputIndex = 0;

                /*
                 * Locuteur actuellement affiché.
                 */

                let currentSpeaker:
                  | FillGapsSpeaker
                  | null = null;

                return (
                  <div
                    key={sentence.id}
                    className={`
                      ${
                        sentenceIndex >
                        0
                          ? "mt-5 border-t border-slate-200 pt-5"
                          : ""
                      }
                    `}
                  >
                    {sentence.parts.map(
                      (
                        part,
                        partIndex,
                      ) => {
                        /* ======================================= */
                        /* DIALOGUE                                 */
                        /* ======================================= */

                        if (
                          part.type ===
                          "dialogue"
                        ) {
                          const speakerChanged =
                            currentSpeaker !==
                            part.speaker;

                          currentSpeaker =
                            part.speaker;

                          const speakerStyle =
                            SPEAKER_STYLES[
                              part.speaker
                            ];

                          /*
                           * On enlève le nom du
                           * locuteur puisque nous
                           * allons l'afficher
                           * correctement.
                           */

                          const speakerText =
                            part.value.replace(
                              /^([^:]+):\s*/,
                              "",
                            );

                          return (
                            <Fragment
                              key={
                                partIndex
                              }
                            >
                              {speakerChanged && (
                                <div className="mt-3 first:mt-0" />
                              )}

                              <span
                                className={`
                                  whitespace-pre-line
                                  break-words
                                  text-[16px]
                                  font-semibold
                                  leading-relaxed
                                  sm:text-[17px]
                                  ${speakerStyle.text}
                                `}
                              >
                                {speakerChanged && (
                                  <span className="font-extrabold">
                                    {
                                      SPEAKER_LABELS[
                                        part.speaker
                                      ]
                                    }
                                    {" : "}
                                  </span>
                                )}

                                {
                                  speakerText
                                }
                              </span>
                            </Fragment>
                          );
                        }

                        /* ======================================= */
                        /* TEXTE NORMAL                              */
                        /* ======================================= */

                        if (
                          part.type ===
                          "text"
                        ) {
                          return (
                            <span
                              key={
                                partIndex
                              }
                              className="
                                break-words
                                text-[16px]
                                leading-relaxed
                                text-slate-800
                                sm:text-[17px]
                              "
                            >
                              {
                                part.value
                              }
                            </span>
                          );
                        }

                        /* ======================================= */
                        /* INPUT                                    */
                        /* ======================================= */

                        const globalIndex =
                          inputsBeforeSentence +
                          localInputIndex;

                        localInputIndex++;

                        const val =
                          answers[
                            globalIndex
                          ] || "";

                        const isCorrect =
                          normalizeText(
                            val,
                          ) ===
                          normalizeText(
                            part.answer,
                          );

                        /*
                         * Couleur du champ selon
                         * le locuteur.
                         */

                        const speakerStyle =
                          currentSpeaker
                            ? SPEAKER_STYLES[
                                currentSpeaker
                              ]
                            : null;

                        return (
                          <span
                            key={
                              partIndex
                            }
                            className="
                              mx-1
                              my-1
                              inline-flex
                              max-w-full
                              flex-col
                              align-middle
                              sm:mx-2
                              sm:my-0
                            "
                          >
                            <input
                              type="text"
                              value={val}
                              onChange={(
                                event,
                              ) =>
                                setAnswer(
                                  globalIndex,
                                  event
                                    .target
                                    .value,
                                )
                              }
                              disabled={
                                showCorrection
                              }
                              className={`
                                h-10
                                w-full
                                min-w-[90px]
                                max-w-full
                                rounded-lg
                                border-2
                                bg-white
                                px-2.5
                                text-[16px]
                                font-semibold
                                text-slate-900
                                shadow-sm
                                outline-none
                                transition
                                sm:min-w-[140px]
                                sm:px-3
                                ${
                                  showCorrection
                                    ? isCorrect
                                      ? "border-green-500 bg-green-100 text-green-800"
                                      : "border-red-500 bg-red-100 text-red-800"
                                    : speakerStyle
                                      ? `${speakerStyle.text.replace(
                                          "text-",
                                          "border-",
                                        )} focus:ring-2`
                                      : "border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400"
                                }
                              `}
                            />

                            {part.hint && (
                              <span
                                className="
                                  mt-0.5
                                  text-[13px]
                                  font-medium
                                  italic
                                  text-amber-600
                                "
                              >
                                (
                                {
                                  part.hint
                                }
                                )
                              </span>
                            )}
                          </span>
                        );
                      },
                    )}
                  </div>
                );
              },
            )}
          </div>

      
          {/* ===================================================== */}
          {/* BOUTON                                                */}
          {/* ===================================================== */}

          <div className="mt-8 flex justify-center sm:mt-10">
            <button
              type="button"
              onClick={
                handleCheck
              }
              disabled={
                !allAnswered
              }
              className="
                w-full
                max-w-xs
                rounded-2xl
                bg-black
                px-6
                py-3.5
                font-semibold
                text-white
                shadow-lg
                transition
                hover:scale-105
                disabled:cursor-not-allowed
                disabled:bg-slate-300
                disabled:text-slate-500
                sm:w-auto
                sm:max-w-none
                sm:px-8
                sm:py-4
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

export default FillGapsEngine;