"use client";

import { useState, useEffect } from "react";
import { FillGapsData } from "@/types/fillGapsTypes";
import { useFillGapsEngine } from "@/hooks/useFillGapsEngine";
import ExerciseResult from "@/components/courses/common/result/ExerciseResult";
import ExerciseReport from "@/components/courses/common/result/ExerciseReport";

type Props = {
  data: FillGapsData;
  teacherImage?: string;
  onComplete?: (score: number) => void;
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
    history,
    session,
  } = useFillGapsEngine(data);

  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    if (session.isFinished) {
      onComplete?.(session.result.score);
    }
  }, [session.isFinished, session.result.score, onComplete]);

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
    <section className="mt-12 bg-gradient-to-b from-white to-slate-50 pb-20">
      <div className="container mx-auto max-w-5xl pt-4">
        <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
          <span>
            Progression : {answeredCount} / {totalInputs}
          </span>

          <span className="font-semibold text-amber-600">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="mb-6 h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
          <h3 className="mb-6 text-lg font-semibold text-black">
            ✍️ Complète le texte :
          </h3>

          <div className="space-y-8 text-[17px] leading-relaxed text-slate-800">
            {sentences.map((sentence, sentenceIndex) => {
              let localIndex = 0;

              const sentenceInputIndexes: number[] = [];

              sentence.parts.forEach((part) => {
                if (part.type === "input") {
                  const globalIndex =
                    sentences
                      .slice(0, sentenceIndex)
                      .reduce(
                        (sum, s) =>
                          sum +
                          s.parts.filter((p) => p.type === "input").length,
                        0,
                      ) + sentenceInputIndexes.length;

                  sentenceInputIndexes.push(globalIndex);
                }
              });

              const isSentenceFilled = sentenceInputIndexes.some(
                (i) => answers[i] && answers[i].trim() !== "",
              );

              return (
                <div
                  key={sentence.id}
                  className={`
                    rounded-xl px-5 py-4 shadow-sm ring-1 transition-all duration-300
                    ${
                      isSentenceFilled
                        ? "border-l-4 border-amber-400 bg-amber-50"
                        : "bg-slate-50 ring-slate-200"
                    }
                  `}
                >
                  {sentence.parts.map((part, partIndex) => {
                    if (part.type === "text") {
                      return <span key={partIndex}>{part.value}</span>;
                    }

                    const globalIndex =
                      sentences
                        .slice(0, sentenceIndex)
                        .reduce(
                          (sum, s) =>
                            sum +
                            s.parts.filter((p) => p.type === "input").length,
                          0,
                        ) + localIndex;

                    localIndex++;

                    const val = answers[globalIndex] || "";

                    const isCorrect =
                      normalizeText(val) === normalizeText(part.answer);

                    return (
                      <span
                        key={partIndex}
                        className="mx-2 inline-flex flex-col"
                      >
                        <input
                          type="text"
                          value={val}
                          onChange={(e) =>
                            setAnswer(globalIndex, e.target.value)
                          }
                          disabled={showCorrection}
                          className={`
                            h-10 min-w-[140px] rounded-lg border-2 bg-white px-3 text-[16px] shadow-sm transition
                            focus:border-amber-500 focus:ring-2 focus:ring-amber-400
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
                          <span className="text-[15px] font-medium italic text-amber-500">
                            ({part.hint})
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={handleCheck}
              disabled={!allAnswered}
              className="
                rounded-2xl bg-black px-8 py-4
                font-semibold text-white shadow-lg transition
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

export default FillGapsEngine;