"use client";

import { useState } from "react";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import { computeScore, getScoreLevel } from "@/utils/quizScoring";
import Image from "next/image";

type Word = {
  wrong: string;
  correct: string;
};

type Props = {
  text: (string | Word)[];
  title: string;
  instruction: string;
  teacherImage?: string;
};

const removeAccents = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const OrthographeInlineEngine: React.FC<Props> = ({
  text,
  title,
  instruction,
  teacherImage = '/images/teachers/default.png'
}) => {
  const safeText = text ?? [];

  const words: Word[] = safeText.filter(
    (t): t is Word => typeof t !== "string"
  );

  const [answers, setAnswers] = useState(
    words.map((w) => w.wrong)
  );

  const [showCorrection, setShowCorrection] = useState(false);

  // ===== scoring states =====

  const [isFinished, setIsFinished] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isTeacherAnnouncingScore, setIsTeacherAnnouncingScore] =
    useState(false);

  const [history, setHistory] = useState<
    { user: string; correct: string; isCorrect: boolean }[]
  >([]);

  const totalInputs = words.length;

  const handleChange = (index: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const checkAnswers = () => {
    const h = words.map((w, i) => {
      const user = answers[i];

      const ok =
        removeAccents(user.toLowerCase()) ===
        removeAccents(w.correct.toLowerCase());

      return {
        user,
        correct: w.correct,
        isCorrect: ok,
      };
    });

    setHistory(h);

    setShowCorrection(true);
    setIsFinished(true);

    setTimeout(() => {
      setIsTeacherAnnouncingScore(true);
    }, 800);
  };

  const correctCount = history.filter((h) => h.isCorrect).length;

  const finalScore = computeScore(correctCount, totalInputs);

  const reset = () => {
    setAnswers(words.map((w) => w.wrong));
    setShowCorrection(false);
    setIsFinished(false);
    setShowReport(false);
    setIsTeacherAnnouncingScore(false);
    setHistory([]);
  };

  let currentInput = 0;

  return (
    <section className="mt-12 bg-white pb-20">

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
          <InstructionBlock
            title={title}
            description={instruction}
          />

          <div className="container mx-auto max-w-5xl">

            <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-black/5">

              <div className="text-[18px] leading-relaxed text-slate-800 space-y-3">

                {safeText.map((part, i) => {
                  if (typeof part === "string") {
                    return <span key={i}>{part}</span>;
                  }

                  const index = currentInput;
                  currentInput++;

                  const value = answers[index];

                  const isCorrect =
                    removeAccents(value.toLowerCase()) ===
                    removeAccents(part.correct.toLowerCase());

                  return (
                    <span key={i} className="mx-1 inline-flex">

                      {!showCorrection ? (
                        <input
                          value={value}
                          onChange={(e) =>
                            handleChange(index, e.target.value)
                          }
                          className="
                            min-w-[110px]
                            border-b-2 border-red-400
                            bg-red-50
                            px-2
                            py-1
                            text-red-700
                            font-semibold
                            outline-none
                            rounded
                          "
                        />
                      ) : (
                        <span
                          className={`px-2 py-1 rounded font-semibold
                            ${
                              isCorrect
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {value}

                          {!isCorrect && (
                            <span className="ml-2 text-green-700">
                              ✔ {part.correct}
                            </span>
                          )}
                        </span>
                      )}

                    </span>
                  );
                })}

              </div>

              <div className="mt-8 text-center">

                {!showCorrection && (
                  <button
                    onClick={checkAnswers}
                    className="rounded-xl bg-black px-8 py-3 text-white"
                  >
                    Vérifier
                  </button>
                )}

              </div>

            </div>

          </div>
        </>
      )}

    </section>
  );
};

export default OrthographeInlineEngine;