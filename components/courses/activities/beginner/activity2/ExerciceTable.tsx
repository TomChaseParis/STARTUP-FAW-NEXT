"use client";

import React, { useState } from "react";
import Image from "next/image";

/* ---------------- TYPES ---------------- */

type QuestionRow = {
  question: string;
  options: string[];
  correctIndex: number;
};

/* ---------------- QUESTIONS ---------------- */

const rows: QuestionRow[] = [
  {
    question: "« Xavier » est…",
    options: ["son nom de famille", "son prénom", "le nom de son chien"],
    correctIndex: 1,
  },
  {
    question: "« Plantu » est…",
    options: ["son nom de famille", "son prénom", "le nom de sa tortue"],
    correctIndex: 0,
  },
  {
    question: "Quelle est sa nationalité ?",
    options: ["Il est belge", "Il est français", "Il est canadien"],
    correctIndex: 2,
  },
  {
    question: "Est-ce qu’il sait parler français ?",
    options: ["Non, pas du tout", "Oui, un peu", "Oui, très bien"],
    correctIndex: 2,
  },
  {
    question: "Il a quel âge ?",
    options: ["45 ans", "46 ans", "47 ans"],
    correctIndex: 1,
  },
  {
    question: "Est-ce qu’il est… ?",
    options: ["divorcé", "marié", "veuf"],
    correctIndex: 0,
  },
  {
    question: "Est-ce qu’il a des enfants ?",
    options: [
      "Non, il n’a pas d’enfant",
      "Oui, il a un garçon et une fille",
      "Oui, il a deux garçons",
    ],
    correctIndex: 1,
  },
  {
    question: "Quel est son travail ?",
    options: ["Il est artiste", "Il est ingénieur", "Il n’a pas de travail"],
    correctIndex: 1,
  },
  {
    question: "Dans quelle ville est-ce qu’il habite ?",
    options: [
      "Il habite à Vancouver",
      "Il habite à Bruxelles",
      "Il habite à Paris",
    ],
    correctIndex: 2,
  },
  {
    question: "Dans quel arrondissement ?",
    options: [
      "Dans le sixième arrondissement",
      "Dans le seizième arrondissement",
      "Dans le quinzième arrondissement",
    ],
    correctIndex: 2,
  },
  {
    question: "Quel est son numéro de téléphone portable ?",
    options: ["01 20 00 76 88", "06 32 12 45 30", "06 33 82 72 24"],
    correctIndex: 1,
  },
  {
    question: "Quelle est son adresse email ?",
    options: [
      "plantu_xavier@gmail.com",
      "plantuxavier@gmail.com",
      "plantu.xavier@gmail.com",
    ],
    correctIndex: 2,
  },
  {
    question: "Quels sont ses hobbies ?",
    options: [
      "Les tortues et le bowling",
      "La musique et le sport",
      "Les jeux vidéo",
    ],
    correctIndex: 1,
  },
  {
    question: "Quel type de femme est-ce qu’il cherche ?",
    options: [
      "Une femme de 30 ans, sympathique et sportive",
      "Une femme de 85 ans, vieille et édentée",
      "Une femme de son âge, plutôt intellectuelle",
    ],
    correctIndex: 0,
  },
];

/* ---------------- IMAGE ---------------- */

const imageOptions = [
  "/images/courses/beginner/punkman.png",
  "/images/courses/beginner/classman.png",
  "/images/courses/beginner/oldman.png",
];

const IMAGE_CORRECT_INDEX = 1;
const TOTAL = rows.length + 1;

/* ---------------- SCORE ---------------- */

const computeScore = (correct: number, total: number) =>
  Math.round((correct / total) * 100);

const getScoreLevel = (score: number) => {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Bon";
  if (score >= 50) return "Moyen";
  return "À améliorer";
};

/* ---------------- COMPONENT ---------------- */

const ExerciceTable: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>(Array(rows.length).fill(-1));
  const [imageAnswer, setImageAnswer] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleSelect = (rowIndex: number, value: string) => {
    const updated = [...answers];
    updated[rowIndex] = Number(value);
    setAnswers(updated);
  };

  const handleValidate = () => {
    let correct = 0;

    answers.forEach((answer, index) => {
      if (answer === rows[index].correctIndex) {
        correct++;
      }
    });

    if (imageAnswer === IMAGE_CORRECT_INDEX) {
      correct++;
    }

    setFinalScore(computeScore(correct, TOTAL));
    setIsFinished(true);
  };

  const allAnswered =
    answers.every((answer) => answer !== -1) && imageAnswer !== null;

  /* ---------------- REPORT ---------------- */

  if (isFinished && showReport) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 text-black">
        <h2 className="mb-10 text-center text-4xl font-bold">
          📊 Détail des réponses
        </h2>

        <div className="space-y-5">
          {rows.map((row, index) => {
            const selected = answers[index];
            const isCorrect = selected === row.correctIndex;

            return (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
              >
                <p className="mb-3 text-lg font-semibold">
                  Question {index + 1}
                </p>

                <p className="mb-4 text-slate-800">{row.question}</p>

                <p className="mb-2">
                  Ta réponse :{" "}
                  <span
                    className={
                      isCorrect
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-600"
                    }
                  >
                    {selected >= 0 ? row.options[selected] : "Aucune réponse"}
                  </span>
                </p>

                {!isCorrect && (
                  <p className="font-semibold text-green-700">
                    Bonne réponse : {row.options[row.correctIndex]}
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

  /* ---------------- RESULT ---------------- */

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

  /* ---------------- UI ---------------- */

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
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5 text-base font-medium text-slate-900">
                    {row.question}
                  </td>

                  <td className="px-6 py-5">
                    <select
                      value={answers[index]}
                      onChange={(e) => handleSelect(index, e.target.value)}
                      className="
                        w-full rounded-2xl border border-slate-200
                        bg-white px-4 py-3 text-slate-800 shadow-sm
                        outline-none transition
                        focus:border-amber-400 focus:ring-4 focus:ring-amber-100
                      "
                    >
                      <option value={-1}>Choisir une réponse</option>
                      {row.options.map((option, optionIndex) => (
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
                    {imageOptions.map((src, index) => (
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

export default ExerciceTable;