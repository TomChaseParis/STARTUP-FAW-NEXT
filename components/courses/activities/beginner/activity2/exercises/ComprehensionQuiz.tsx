"use client";

import React, { useState } from "react";
import Image from "next/image";

import {
  comprehensionQuizData,
  comprehensionQuizImageOptions,
  COMPREHENSION_QUIZ_IMAGE_CORRECT_INDEX,
} from "../data/comprehensionQuizData";

const TOTAL = comprehensionQuizData.length + 1;

const computeScore = (correct: number, total: number) =>
  Math.round((correct / total) * 100);

const getScoreLevel = (score: number) => {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Bon";
  if (score >= 50) return "Moyen";
  return "À améliorer";
};

const ComprehensionQuiz: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>(
    Array(comprehensionQuizData.length).fill(-1),
  );

  const [imageAnswer, setImageAnswer] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleSelect = (questionIndex: number, value: string) => {
    const updated = [...answers];
    updated[questionIndex] = Number(value);
    setAnswers(updated);
  };

  const handleValidate = () => {
    let correct = 0;

    answers.forEach((answer, index) => {
      if (answer === comprehensionQuizData[index].correctIndex) {
        correct++;
      }
    });

    if (imageAnswer === COMPREHENSION_QUIZ_IMAGE_CORRECT_INDEX) {
      correct++;
    }

    setFinalScore(computeScore(correct, TOTAL));
    setIsFinished(true);
  };

  const allAnswered =
    answers.every((answer) => answer !== -1) && imageAnswer !== null;

  if (isFinished && showReport) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 text-black">
        <h2 className="mb-10 text-center text-4xl font-bold">
          📊 Détail des réponses
        </h2>

        <div className="space-y-5">
          {comprehensionQuizData.map((question, index) => {
            const selected = answers[index];
            const isCorrect = selected === question.correctIndex;

            return (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
              >
                <p className="mb-3 text-lg font-semibold">
                  Question {index + 1}
                </p>

                <p className="mb-4 text-slate-800">{question.question}</p>

                <p className="mb-2">
                  Ta réponse :{" "}
                  <span
                    className={
                      isCorrect
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-600"
                    }
                  >
                    {selected >= 0
                      ? question.options[selected]
                      : "Aucune réponse"}
                  </span>
                </p>

                {!isCorrect && (
                  <p className="font-semibold text-green-700">
                    Bonne réponse : {question.options[question.correctIndex]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => window.location.reload()}
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
            onClick={() => window.location.reload()}
            className="rounded-2xl bg-amber-400 px-8 py-4 font-semibold text-black shadow-lg"
          >
            Recommencer
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 text-black">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider text-slate-700">
                  Question
                </th>

                <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider text-slate-700">
                  Réponse
                </th>
              </tr>
            </thead>

            <tbody>
              {comprehensionQuizData.map((question, index) => (
                <tr
                  key={index}
                  className="border-t border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5 text-base font-medium text-slate-900">
                    {question.question}
                  </td>

                  <td className="px-6 py-5">
                    <select
                      value={answers[index]}
                      onChange={(e) => handleSelect(index, e.target.value)}
                      className="
                          w-full rounded-2xl border border-slate-200
                          bg-white px-4 py-3 text-slate-800 shadow-sm
                          outline-none transition
                          focus:border-amber-400
                          focus:ring-4
                          focus:ring-amber-100
                        "
                    >
                      <option value={-1}>Choisir une réponse</option>

                      {question.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={optionIndex}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}

              <tr className="border-t border-slate-100">
                <td className="px-6 py-6 text-base font-medium text-slate-900">
                  A ton avis, quelle image correspond le mieux à Xavier Plantu ?
                </td>

                <td className="px-6 py-6">
                  <div className="flex flex-col items-center gap-4 sm:grid sm:grid-cols-3">
                    {comprehensionQuizImageOptions.map((src, index) => (
                      <button
                        key={index}
                        onClick={() => setImageAnswer(index)}
                        className={`
                            w-full max-w-[220px]
                            overflow-hidden rounded-2xl border-4 transition
                            ${
                              imageAnswer === index
                                ? "scale-105 border-amber-400 shadow-xl"
                                : "border-transparent hover:scale-105"
                            }
                          `}
                      >
                        <Image
                          src={src}
                          alt="Choix"
                          width={220}
                          height={180}
                          className="h-44 w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 bg-slate-50 px-6 py-6">
          <div className="flex justify-center">
            <button
              onClick={handleValidate}
              disabled={!allAnswered}
              className={`
                rounded-2xl px-8 py-4 font-semibold shadow-lg transition
                ${
                  allAnswered
                    ? "bg-black text-white hover:scale-105"
                    : "cursor-not-allowed bg-slate-300 text-slate-500"
                }
              `}
            >
              Valider mes réponses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComprehensionQuiz;
