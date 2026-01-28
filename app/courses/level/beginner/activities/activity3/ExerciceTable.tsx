"use client";

import React, { useState } from "react";
import Image from "next/image";

type QuestionRow = {
  question: string;
  options: string[];
  correctIndex: number;
};

/* ---------------- QUESTIONS ---------------- */

const rows: QuestionRow[] = [
  {
    question: "« Fabien » est…",
    options: ["son nom de famille", "son prénom", "le nom de son chien"],
    correctIndex: 1,
  },
  {
    question: "« Delpêche » est…",
    options: ["son nom de famille", "son prénom", "le nom de sa tortue"],
    correctIndex: 0,
  },
  {
    question: "Quelle est sa nationalité ?",
    options: ["Il est belge", "Il est français", "Il est canadien"],
    correctIndex: 1,
  },
  {
    question: "Est-ce qu’il sait parler français ?",
    options: ["Non, pas du tout", "Oui, un peu", "Oui, très bien"],
    correctIndex: 2,
  },
  {
    question: "Il a quel âge ?",
    options: ["45 ans", "46 ans", "47 ans"],
    correctIndex: 2,
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
      "Dans le troisième arrondissement",
    ],
    correctIndex: 0,
  },
  {
    question: "Quel est son numéro de téléphone portable ?",
    options: ["01 20 00 76 88", "06 23 92 62 34", "06 33 82 72 24"],
    correctIndex: 1,
  },
  {
    question: "Quelle est son adresse email ?",
    options: [
      "delpêche43@yahoo.fr",
      "delpêche23@gmail.com",
      "delpêche23@yahoo.fr",
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

const TOTAL_QUESTIONS = 15;
const POINTS_PER_QUESTION = 100 / TOTAL_QUESTIONS;

const imageOptions = [
  "/images/courses/beginner/punkman.png",
  "/images/courses/beginner/classman.png",
  "/images/courses/beginner/oldman.png",
];

const IMAGE_CORRECT_INDEX = 1;

const Exercice: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [imageAnswer, setImageAnswer] = useState<number | null>(null);

  const [isValidated, setIsValidated] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  /* ---------------- HANDLERS ---------------- */

  const handleSelect = (rowIndex: number, optionIndex: number) => {
    if (isValidated) return;
    setAnswers((prev) => ({ ...prev, [rowIndex]: optionIndex }));
  };

  const handleImageSelect = (index: number) => {
    if (isValidated) return;
    setImageAnswer(index);
  };

  const handleValidate = () => {
    let correctCount = 0;

    rows.forEach((row, index) => {
      if (answers[index] === row.correctIndex) {
        correctCount++;
      }
    });

    if (imageAnswer === IMAGE_CORRECT_INDEX) {
      correctCount++;
    }

    setScore(Math.round(correctCount * POINTS_PER_QUESTION));
    setIsValidated(true);
    setShowModal(true);
  };

  /* ---------------- RENDER ---------------- */

  return (
    <section className="bg-white">
      <div className="container mt-16 pb-20">
        <div className="mx-auto max-w-6xl rounded-xl bg-white shadow-lg ring-1 ring-black/5">
          <div className="border-b border-black/5 px-6 py-4">
            <h3 className="text-lg font-semibold text-black">
              À l’agence matrimoniale — Choisis la bonne réponse
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-black/5">
                    <td className="px-6 py-4 font-medium text-black">
                      {row.question}
                    </td>

                    {row.options.map((opt, optIndex) => {
                      const selected = answers[rowIndex] === optIndex;
                      const isCorrect = optIndex === row.correctIndex;

                      let style = "border-slate-300 bg-slate-50";

                      if (!isValidated && selected) {
                        style = "border-amber-500 bg-amber-100";
                      }

                      if (isValidated && isCorrect) {
                        style = "border-green-600 bg-green-200 text-green-900";
                      }

                      if (isValidated && selected && !isCorrect) {
                        style = "border-red-600 bg-red-200 text-red-900";
                      }

                      return (
                        <td key={optIndex} className="px-4 py-3 text-center text-black">
                          <button
                            onClick={() =>
                              handleSelect(rowIndex, optIndex)
                            }
                            className={`w-full rounded-md border px-3 py-2 text-sm font-semibold transition ${style}`}
                          >
                            {opt}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* IMAGE QUESTION */}
                <tr className="border-t-2 border-black/10 bg-slate-50">
                  <td className="px-6 py-6 font-semibold text-black">
                    Qui ressemble le plus à Monsieur Dupont ?
                  </td>

                  {imageOptions.map((src, index) => {
                    const selected = imageAnswer === index;
                    const isCorrect = index === IMAGE_CORRECT_INDEX;

                    let style = "border-transparent";

                    if (!isValidated && selected) {
                      style = "border-amber-500 bg-amber-100";
                    }

                    if (isValidated && isCorrect) {
                      style = "border-green-600 bg-green-100";
                    }

                    if (isValidated && selected && !isCorrect) {
                      style = "border-red-600 bg-red-100";
                    }

                    return (
                      <td key={index} className="px-4 py-6 text-center">
                        <button
                          onClick={() => handleImageSelect(index)}
                          className={`rounded-lg border-2 p-1 transition ${style}`}
                        >
                          <Image
                            src={src}
                            alt=""
                            width={200}
                            height={160}
                            className="rounded-md shadow-md"
                          />
                        </button>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          {!isValidated && (
            <div className="flex justify-center py-8">
              <button
                onClick={handleValidate}
                className="rounded-xl bg-black px-8 py-3 font-semibold text-white hover:bg-black/80"
              >
                Valider
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODALE SCORE */}
      {showModal && score !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber-500">
              Résultat final
            </p>

            <p className="text-5xl font-extrabold text-black">
              {score}
              <span className="text-2xl text-black/60"> / 100</span>
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-black hover:bg-amber-400"
            >
              Voir mes résultats
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Exercice;