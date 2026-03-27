"use client";

import { useState } from "react";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import { FillGapsData } from "@/types/fillGapsTypes";
import { useFillGapsEngine } from "@/hooks/useFillGapsEngine";
import { getScoreLevel } from "@/utils/quizScoring";
import Image from "next/image";

type Props = {
  data: FillGapsData;
  teacherImage?: string;
};

const removeAccents = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 

const FillGapsEngine: React.FC<Props> = ({ data, teacherImage = '/images/teachers/default.png' }) => {
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
  const [isTeacherAnnouncingScore, setIsTeacherAnnouncingScore] =
    useState(false);

  const handleCheck = () => {
    checkAnswers();
    setIsFinished(true);

    setTimeout(() => {
      setIsTeacherAnnouncingScore(true);
    }, 800);
  };

  const finalScore = score ?? 0;
  const correctCount = history.filter((h) => h.isCorrect).length;

  return (
    <section className="mt-12 bg-gradient-to-b from-white to-slate-50 pb-20">
      {/* ================= RESULT ================= */}

      {isFinished && !showReport && (
        <div className="bg-slate-50 py-24 text-slate-900">
          <div className="mx-auto max-w-3xl px-6 text-center">
            {isTeacherAnnouncingScore && (
              <div className="mb-10 flex flex-col items-center">
                <div className="relative h-32 w-32 animate-pulse overflow-hidden rounded-full shadow-xl ring-4 ring-amber-400">
                  <Image
                      src={teacherImage}
                    alt="Professeur"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>

                <div className="relative mt-6 max-w-md rounded-2xl bg-amber-100 px-6 py-4 text-black shadow-md">
                  <p className="text-lg font-semibold">
                    Ton score est de {finalScore} sur 100 !
                  </p>

                  <p className="mt-1 text-sm">
                    Tu as {correctCount} bonnes réponses sur {totalInputs}.
                  </p>

                  <p className="mt-2 font-semibold text-amber-700">
                    Niveau : {getScoreLevel(finalScore)}
                  </p>

                  <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-amber-100"></div>
                </div>
              </div>
            )}

            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-500">
              Résultat final
            </p>

            <p className="text-7xl font-extrabold">
              {finalScore}
              <span className="text-3xl text-slate-500"> / 100</span>
            </p>

            <p className="mt-4 text-lg text-slate-700">
              {correctCount} / {totalInputs} bonnes réponses
            </p>

            <p className="mt-2 text-lg font-semibold text-amber-600">
              Niveau : {getScoreLevel(finalScore)}
            </p>

            <div className="mt-12 flex justify-center gap-6">
              <button
                onClick={() => setShowReport(true)}
                className="rounded-xl bg-black px-8 py-3 text-white shadow-md transition hover:bg-black/90"
              >
                Voir mes résultats
              </button>

              <button
                onClick={() => {
                  reset();
                  setIsFinished(false);
                  setShowReport(false);
                  setIsTeacherAnnouncingScore(false);
                }}
                className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black shadow-md transition hover:bg-amber-400"
              >
                Recommencer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DETAIL ================= */}

      {isFinished && showReport && (
        <div className="bg-slate-50 py-20 text-slate-900">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-10 text-center text-3xl font-bold">
              📊 Détail de tes réponses
            </h2>

            <div className="space-y-8">
              {history.map((h, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200"
                >
                  <p className="mb-2 text-slate-700">
                    Ta réponse :
                    <span
                      className={
                        h.isCorrect
                          ? "font-semibold text-green-600"
                          : "font-semibold text-red-600"
                      }
                    >
                      {" "}
                      {h.user}
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
                  setIsTeacherAnnouncingScore(false);
                }}
                className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black shadow-md transition hover:bg-amber-400"
              >
                Recommencer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EXERCICE ================= */}

      {!isFinished && (
        <>
          <InstructionBlock title={data.title} description={data.instruction} activityType={data.activityType}>
            {data.verbs && (
              <ul className="mt-4 list-disc space-y-1 pl-6 text-black">
                {data.verbs.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            )}
          </InstructionBlock>

          <div className="container mx-auto max-w-5xl pt-4">
            {/* Progress + compteur */}

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

  sentence.parts.forEach((part, partIndex) => {
    if (part.type === "input") {
      const globalIndex =
        sentences
          .slice(0, sentenceIndex)
          .reduce(
            (sum, s) =>
              sum +
              s.parts.filter(p => p.type === "input").length,
            0
          ) + sentenceInputIndexes.length;

      sentenceInputIndexes.push(globalIndex);
    }
  });

  const isSentenceFilled = sentenceInputIndexes.some(
    i => answers[i] && answers[i].trim() !== ""
  );

  return (
    <div
      key={sentence.id}
      className={`
        rounded-xl px-5 py-4 ring-1 shadow-sm transition-all duration-300
        ${
          isSentenceFilled
            ? "bg-amber-50 border-l-4 border-amber-400"
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
                s.parts.filter(p => p.type === "input").length,
              0
            ) + localIndex;

        localIndex++;

        const val = answers[globalIndex] || "";

        const isCorrect =
          removeAccents(val.toLowerCase()) ===
          removeAccents(part.answer.toLowerCase());

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
                h-10 min-w-[140px] rounded-lg border-2 bg-white px-3 text-[16px] shadow-sm
                transition
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
              <span className="text-[15px] italic font-medium text-amber-500">
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
                  className="rounded-xl bg-black px-8 py-3 text-white shadow-md transition hover:bg-black/90 disabled:bg-black/30"
                >
                  Vérifier mes réponses
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default FillGapsEngine;
