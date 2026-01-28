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

const Exercice: React.FC = () => {
  const [answers, setAnswers] = useState<
    Record<number, { selected: number; correct: boolean }>
  >({});
  const [imageAnswer, setImageAnswer] = useState<{
    selected: number;
    correct: boolean;
  } | null>(null);

  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const handleSelect = (rowIndex: number, optionIndex: number) => {
    if (answers[rowIndex]) return;

    const isCorrect = rows[rowIndex].correctIndex === optionIndex;

    setAnswers((prev) => ({
      ...prev,
      [rowIndex]: { selected: optionIndex, correct: isCorrect },
    }));

    setAnsweredCount((prev) => prev + 1);

    if (isCorrect) {
      setScore((prev) => prev + POINTS_PER_QUESTION);
    }
  };

  const handleImageSelect = (index: number) => {
    if (imageAnswer) return;

    const isCorrect = index === 1; // ✅ 2e image = bonne réponse

    setImageAnswer({
      selected: index,
      correct: isCorrect,
    });

    setAnsweredCount((prev) => prev + 1);

    if (isCorrect) {
      setScore((prev) => prev + POINTS_PER_QUESTION);
    }
  };

  return (
    <section className="bg-white">
      <div className="container mt-16 pb-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">
          {/* Header */}
          <div className="border-b border-black/5 px-6 py-4">
            <h3 className="text-lg font-semibold text-black">
              À l’agence matrimoniale — Choisis à chaque fois la bonne réponse
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                    Questions
                  </th>
                  <th className="px-6 py-3 text-center">A</th>
                  <th className="px-6 py-3 text-center">B</th>
                  <th className="px-6 py-3 text-center">C</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-black/5">
                    <td className="px-6 py-4 font-medium text-black">
                      {row.question}
                    </td>

                    {row.options.map((opt, optIndex) => {
                      const state = answers[rowIndex];
                      const isSelected = state?.selected === optIndex;

                      return (
                        <td
                          key={optIndex}
                          className="px-4 py-3 text-center text-black"
                        >
                          <button
                            onClick={() =>
                              handleSelect(rowIndex, optIndex)
                            }
                            className={[
                              "w-full rounded-md border px-3 py-2 text-sm font-semibold transition",
                              !state &&
                                "border-slate-300 bg-slate-50 hover:bg-amber-100",
                              isSelected &&
                                state?.correct &&
                                "border-green-600 bg-green-200 text-green-900",
                              isSelected &&
                                !state?.correct &&
                                "border-red-600 bg-red-200 text-red-900",
                              "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* --- QUESTION IMAGE --- */}
                <tr className="border-t-2 border-black/10 bg-slate-50">
                  <td className="px-6 py-6 font-semibold text-black">
                    Qui ressemble le plus à Monsieur Dupont ?
                  </td>

                  {imageOptions.map((src, index) => {
                    const isSelected = imageAnswer?.selected === index;

                    return (
                      <td key={index} className="px-4 py-6 text-center">
                        <button
                          onClick={() => handleImageSelect(index)}
                          className={[
                            "rounded-lg border-2 p-1 transition",
                            !imageAnswer &&
                              "border-transparent hover:border-amber-400",
                            isSelected &&
                              imageAnswer.correct &&
                              "border-green-600 bg-green-100",
                            isSelected &&
                              !imageAnswer.correct &&
                              "border-red-600 bg-red-100",
                          ].join(" ")}
                        >
                          <Image
                            src={src}
                            alt={`Personnage ${index + 1}`}
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

          {/* Footer */}
          {answeredCount === TOTAL_QUESTIONS && (
  <div className="mt-10 flex justify-center">
    <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl ring-1 ring-black/5">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber-500">
        Résultat final
      </p>

      <p className="text-5xl font-extrabold text-black">
        {Math.round(score)}
        <span className="text-2xl font-semibold text-black/60"> / 100</span>
      </p>

      <p className="mt-4 text-base text-black/70">
        Bravo, tu as terminé cet exercice.
      </p>
    </div>
  </div>
)}
        </div>
      </div>
    </section>
  );
};

export default Exercice;

