"use client";

import { useState, useEffect } from "react";

import { FillGapsData } from "@/types/fillGapsTypes";
import { useFillGapsEngine } from "@/hooks/useFillGapsEngine";

import ExerciseResult from "@/components/courses/common/result/ExerciseResult";
import ExerciseReport from "@/components/courses/common/result/ExerciseReport";

import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type Props = {
  data: FillGapsData;
  teacherImage?: string;
  onComplete?: (result: ExerciseSessionResult) => void;
};

const normalizeText = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .trim();

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

  const [showReport, setShowReport] = useState(false);

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

  if (session.isFinished) {
    if (showReport) {
      return (
        <ExerciseReport
          history={session.history}
          onRestart={() => {
            setShowReport(false);
            reset();
          }}
          onBack={() => setShowReport(false)}
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
        onShowReport={() => setShowReport(true)}
      />
    );
  }

  return (
    <section className="mt-8 overflow-x-hidden bg-gradient-to-b from-white to-slate-50 pb-16 sm:mt-12 sm:pb-20">
      <div className="container mx-auto w-full max-w-5xl px-4 sm:px-6">
        {/* ===================================================== */}
        {/* PROGRESSION */}
        {/* ===================================================== */}

        <div className="mb-4 flex items-center justify-between gap-4 text-sm text-slate-600">
          <span className="min-w-0">
            Progression : {answeredCount} / {totalInputs}
          </span>

          <span className="shrink-0 font-semibold text-amber-600">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="mb-5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 sm:mb-6 sm:h-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* ===================================================== */}
        {/* CONTENU */}
        {/* ===================================================== */}

        <div className="w-full min-w-0 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 sm:rounded-2xl sm:p-6 md:p-8">
          <h3 className="mb-5 text-base font-semibold text-black sm:mb-6 sm:text-lg">
            ✍️ Complète le texte :
          </h3>

          <div className="space-y-5 text-[16px] leading-relaxed text-slate-800 sm:space-y-8 sm:text-[17px]">
            {sentences.map(
              (sentence, sentenceIndex) => {
                let localIndex = 0;

                const sentenceInputIndexes: number[] =
                  [];

                sentence.parts.forEach((part) => {
                  if (part.type === "input") {
                    const globalIndex =
                      sentences
                        .slice(0, sentenceIndex)
                        .reduce(
                          (sum, s) =>
                            sum +
                            s.parts.filter(
                              (p) =>
                                p.type ===
                                "input",
                            ).length,
                          0,
                        ) +
                      sentenceInputIndexes.length;

                    sentenceInputIndexes.push(
                      globalIndex,
                    );
                  }
                });

                const isSentenceFilled =
                  sentenceInputIndexes.some(
                    (i) =>
                      answers[i] &&
                      answers[i].trim() !== "",
                  );

                return (
                  <div
                    key={sentence.id}
                    className={`
                      w-full
                      min-w-0
                      rounded-xl
                      px-3
                      py-4
                      shadow-sm
                      ring-1
                      transition-all
                      duration-300
                      sm:px-5
                      ${
                        isSentenceFilled
                          ? "border-l-4 border-amber-400 bg-amber-50"
                          : "bg-slate-50 ring-slate-200"
                      }
                    `}
                  >
                    <div className="w-full min-w-0 break-words">
                      {sentence.parts.map(
                        (part, partIndex) => {
                          if (part.type === "text") {
                            return (
                              <span
                                key={partIndex}
                                className="break-words"
                              >
                                {part.value}
                              </span>
                            );
                          }

                          const globalIndex =
                            sentences
                              .slice(
                                0,
                                sentenceIndex,
                              )
                              .reduce(
                                (
                                  sum,
                                  s,
                                ) =>
                                  sum +
                                  s.parts.filter(
                                    (p) =>
                                      p.type ===
                                      "input",
                                  ).length,
                                0,
                              ) +
                            localIndex;

                          localIndex++;

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

                          return (
                            <span
                              key={partIndex}
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
                                onChange={(e) =>
                                  setAnswer(
                                    globalIndex,
                                    e.target
                                      .value,
                                  )
                                }
                                disabled={
                                  showCorrection
                                }
                                className={`
                                  h-10
                                  w-full
                                  min-w-0
                                  max-w-full
                                  rounded-lg
                                  border-2
                                  bg-white
                                  px-2.5
                                  text-[16px]
                                  shadow-sm
                                  transition
                                  outline-none
                                  sm:min-w-[140px]
                                  sm:px-3
                                  focus:border-amber-500
                                  focus:ring-2
                                  focus:ring-amber-400
                                  ${
                                    showCorrection
                                      ? isCorrect
                                        ? "border-green-500 bg-green-100"
                                        : "border-red-500 bg-red-100"
                                      : "border-slate-300"
                                  }
                                `}
                              />

                              {part.hint && (
                                <span
                                  className="
                                    max-w-full
                                    break-words
                                    text-[14px]
                                    font-medium
                                    italic
                                    text-amber-500
                                    sm:text-[15px]
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
                  </div>
                );
              },
            )}
          </div>

          {/* ===================================================== */}
          {/* BOUTON */}
          {/* ===================================================== */}

          <div className="mt-8 flex justify-center sm:mt-10">
            <button
              type="button"
              onClick={handleCheck}
              disabled={!allAnswered}
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