"use client";

import { Fragment } from "react";

import {
  FillGapsData,
  FillGapsSpeaker,
} from "@/types/fillGapsTypes";

import {
  ExerciseHistoryItem,
} from "@/components/courses/common/types/exerciseSessionTypes";

type Props = {
  data: FillGapsData;
  history: ExerciseHistoryItem[];
};

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

const SPEAKER_LABELS: Record<
  FillGapsSpeaker,
  string
> = {
  conseillere: "L’agence matrimoniale",
  xavier: "Xavier",
};

const normalizeText = (str: string) =>
  str
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .trim();

export default function FillGapsReport({
  data,
  history,
}: Props) {
  let globalInputIndex = 0;

  return (
    <div className="w-full min-w-0">

      {/* ===================================================== */}
      {/* TEXTE COMPLET                                        */}
      {/* ===================================================== */}

      <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6 md:p-7">

        <div className="break-words text-[16px] leading-8 text-slate-800 sm:text-[17px]">

          {data.sentences.map(
            (
              sentence,
              sentenceIndex,
            ) => {

              let currentSpeaker:
                | FillGapsSpeaker
                | null = null;

              return (
                <div
                  key={sentence.id}
                  className={
                    sentenceIndex > 0
                      ? "mt-6 border-t border-slate-200 pt-6"
                      : ""
                  }
                >

                  {sentence.parts.map(
                    (
                      part,
                      partIndex,
                    ) => {

                      /* ===================================== */
                      /* DIALOGUE                               */
                      /* ===================================== */

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

                        const speakerText =
                          part.value.replace(
                            /^([^:]+):\s*/,
                            "",
                          );

                        return (
                          <Fragment
                            key={partIndex}
                          >

                            {speakerChanged && (
                              <span className="block h-2" />
                            )}

                            <span
                              className={`
                                break-words
                                font-semibold
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

                              {speakerText}

                            </span>

                          </Fragment>
                        );
                      }

                      /* ===================================== */
                      /* TEXTE NORMAL                            */
                      /* ===================================== */

                      if (
                        part.type ===
                        "text"
                      ) {
                        return (
                          <span
                            key={partIndex}
                            className="break-words text-slate-800"
                          >
                            {part.value}
                          </span>
                        );
                      }

                      /* ===================================== */
                      /* RÉPONSE                                */
                      /* ===================================== */

                      const result =
                        history[
                          globalInputIndex
                        ];

                      const userAnswer =
                        result?.selectedAnswer ??
                        "";

                      const correctAnswer =
                        result?.correctAnswer ??
                        part.answer;

                      const answerIsCorrect =
                        result?.isCorrect ??
                        (
                          normalizeText(
                            userAnswer,
                          ) ===
                          normalizeText(
                            correctAnswer,
                          )
                        );

                      globalInputIndex++;

                      return (
                        <span
                          key={partIndex}
                          className="
                            mx-1
                            inline-flex
                            max-w-full
                            flex-col
                            align-middle
                          "
                        >

                          {/* ================================= */}
                          {/* RÉPONSE DE L'ÉLÈVE                 */}
                          {/* ================================= */}

                          <span
                            className={`
                              inline-flex
                              max-w-full
                              break-words
                              rounded-lg
                              border-2
                              px-2.5
                              py-1
                              text-[15px]
                              font-bold
                              leading-6
                              sm:px-3
                              ${
                                answerIsCorrect
                                  ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                                  : "border-red-300 bg-red-100 text-red-800"
                              }
                            `}
                          >
                            {userAnswer || "—"}
                          </span>

                          {/* ================================= */}
                          {/* BONNE RÉPONSE SI ERREUR            */}
                          {/* ================================= */}

                          {!answerIsCorrect && (
                            <span
                              className="
                                mt-1
                                inline-flex
                                max-w-full
                                break-words
                                rounded-lg
                                border
                                border-emerald-300
                                bg-emerald-50
                                px-2.5
                                py-1
                                text-[14px]
                                font-semibold
                                leading-6
                                text-emerald-700
                                sm:px-3
                              "
                            >
                              ✓ {correctAnswer}
                            </span>
                          )}

                          {/* ================================= */}
                          {/* HINT                                */}
                          {/* ================================= */}

                          {part.hint && (
                            <span
                              className="
                                mt-1
                                text-[12px]
                                font-medium
                                italic
                                text-amber-600
                              "
                            >
                              ({part.hint})
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

      </div>

      {/* ===================================================== */}
      {/* LÉGENDE                                              */}
      {/* ===================================================== */}

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs sm:justify-start">

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-emerald-100 ring-1 ring-emerald-300" />

          <span className="text-slate-600">
            Réponse correcte
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-red-100 ring-1 ring-red-300" />

          <span className="text-slate-600">
            Réponse incorrecte
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-emerald-50 ring-1 ring-emerald-300" />

          <span className="text-slate-600">
            Bonne réponse
          </span>
        </div>

      </div>

    </div>
  );
}