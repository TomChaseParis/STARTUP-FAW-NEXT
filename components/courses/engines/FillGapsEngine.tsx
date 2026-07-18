"use client";

import { useState } from "react";
import { FillGapsData } from "@/types/fillGapsTypes";
import { useFillGapsEngine } from "@/hooks/useFillGapsEngine";
import { getScoreLevel } from "@/components/courses/common/utils/quizScoring";

type Props = {
  data: FillGapsData;
  teacherImage?: string;
};

const normalizeText = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const FillGapsEngine: React.FC<Props> = ({ data }) => {
  const {
    sentences,
    answers,
    setAnswer,
    showCorrection,
    score,
    checkAnswers,
    reset,
    progress,
    totalInputs,
    answeredCount,
    allAnswered,
    history,
  } = useFillGapsEngine(data);

  const [isFinished, setIsFinished] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleCheck = () => {
    checkAnswers();
    setIsFinished(true);
  };

  const finalScore = score ?? 0;

  if (isFinished && showReport) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 text-black">
        <h2 className="mb-10 text-center text-4xl font-bold">
          📊 Détail des réponses
        </h2>

        <div className="space-y-5">
          {history.map((h, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
            >
              <p className="mb-3 text-lg font-semibold">Question {index + 1}</p>

              <p className="mb-4 text-slate-800">{h.question}</p>

              <p className="mb-2">
                Ta réponse :{" "}
                <span
                  className={
                    h.isCorrect
                      ? "font-semibold text-green-600"
                      : "font-semibold text-red-600"
                  }
                >
                  {h.user || "Aucune réponse"}
                </span>
              </p>

              {!h.isCorrect && (
                <p className="font-semibold text-green-700">
                  Bonne réponse : {h.correct}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => {
              reset();
              setIsFinished(false);
              setShowReport(false);
            }}
            className="rounded-2xl bg-amber-400 px-8 py-4 font-semibold text-black shadow-lg transition hover:scale-105"
          >
            Recommencer
          </button>
        </div>
      </section>
    );
  }

  if (isFinished) {
    return (
      <section className="mx-auto max-w-4xl py-24 text-center text-black">
        <p className="text-7xl font-extrabold">{finalScore} / 100</p>

        <p className="mt-4 text-2xl font-semibold text-amber-600">
          Niveau : {getScoreLevel(finalScore)}
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setShowReport(true)}
            className="rounded-2xl bg-black px-8 py-4 font-semibold text-white shadow-lg"
          >
            Voir mes résultats
          </button>

          <button
            onClick={() => {
              reset();
              setIsFinished(false);
              setShowReport(false);
            }}
            className="rounded-2xl bg-amber-400 px-8 py-4 font-semibold text-black shadow-lg"
          >
            Recommencer
          </button>
        </div>
      </section>
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
