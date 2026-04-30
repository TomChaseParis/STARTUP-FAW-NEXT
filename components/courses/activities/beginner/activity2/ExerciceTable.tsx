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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const [history, setHistory] = useState<
    { index: number; selected: number; isCorrect: boolean }[]
  >([]);

  const [imageAnswer, setImageAnswer] = useState<number | null>(null);

  const [isFinished, setIsFinished] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const isLast = currentIndex === rows.length;
  const currentQuestion = rows[currentIndex];

  const progress = ((currentIndex + 1) / TOTAL) * 100;

  /* ---------------- ACTIONS ---------------- */

  const handleSelect = (index: number) => {
    if (selectedChoice !== null) return;

    const isCorrect = index === currentQuestion.correctIndex;

    setSelectedChoice(index);

    setHistory((prev) => [
      ...prev,
      { index: currentIndex, selected: index, isCorrect },
    ]);
  };

  const nextQuestion = () => {
    setSelectedChoice(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleValidate = () => {
    let correct = history.filter((h) => h.isCorrect).length;

    if (imageAnswer === IMAGE_CORRECT_INDEX) correct++;

    setFinalScore(computeScore(correct, TOTAL));
    setIsFinished(true);
  };

  /* ---------------- RESULT ---------------- */

  if (isFinished && showReport) {
    return (
      <div className="py-20 max-w-4xl mx-auto text-black">
        <h2 className="text-3xl font-bold mb-10 text-center">
          📊 Détail des réponses
        </h2>

        <div className="space-y-6">
          {history.map((h, i) => {
            const q = rows[h.index];

            return (
              <div key={i} className="p-6 bg-white rounded-xl shadow">
                <p className="font-semibold mb-2">
                  Question {i + 1}
                </p>

                <p className="mb-3">{q.question}</p>

                <p>
                  Ta réponse :{" "}
                  <span
                    className={
                      h.isCorrect
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {q.options[h.selected]}
                  </span>
                </p>

                {!h.isCorrect && (
                  <p className="text-green-700 font-semibold">
                    ✔ {q.options[q.correctIndex]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-500 px-6 py-3 rounded-xl text-black"
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="py-20 text-center text-black">
        <p className="text-6xl font-bold">
          {finalScore} / 100
        </p>

        <p className="mt-2 text-lg">
          Niveau : {getScoreLevel(finalScore)}
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => setShowReport(true)}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Voir mes résultats
          </button>

          <button
            onClick={() => window.location.reload()}
            className="bg-amber-500 px-6 py-3 rounded-xl text-black"
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <section className="max-w-xl mx-auto py-16 text-black">

      {/* PROGRESS BAR */}
      <div className="mb-4 text-sm font-medium text-black text-center">
        Question {Math.min(currentIndex + 1, TOTAL)} / {TOTAL}
      </div>

      <div className="h-2 bg-slate-200 rounded-full mb-6">
        <div
          className="h-full bg-amber-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl">

        {!isLast ? (
          <>
            <h2 className="mb-6 text-xl font-semibold">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((opt, i) => {
                const isSelected = selectedChoice === i;
                const isCorrect = i === currentQuestion.correctIndex;

                let style = "border-black/20 text-black";

                if (selectedChoice !== null) {
                  if (isCorrect)
                    style = "border-green-500 bg-green-100 text-black";
                  else if (isSelected)
                    style = "border-red-500 bg-red-100 text-black";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={selectedChoice !== null}
                    className={`w-full border px-4 py-3 rounded-lg text-left ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedChoice !== null && (
              <div className="mt-6">
                {selectedChoice === currentQuestion.correctIndex ? (
                  <p className="text-green-600 font-semibold">
                    ✔ Bonne réponse
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold">
                    ❌ Bonne réponse :{" "}
                    {currentQuestion.options[currentQuestion.correctIndex]}
                  </p>
                )}
              </div>
            )}

            {selectedChoice !== null && (
              <div className="mt-8 text-right">
                <button
                  onClick={nextQuestion}
                  className="bg-black text-white px-6 py-3 rounded-xl"
                >
                  Question suivante →
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="mb-6">Choisis la bonne image</h2>

            <div className="grid grid-cols-3 gap-4">
              {imageOptions.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImageAnswer(i)}
                  className={`border-2 rounded-xl ${
                    imageAnswer === i ? "border-amber-500" : ""
                  }`}
                >
                  <Image src={src} alt="" width={200} height={160} />
                </button>
              ))}
            </div>

            <div className="mt-10 text-right">
              <button
                onClick={handleValidate}
                disabled={imageAnswer === null}
                className="bg-black text-white px-6 py-3 rounded-xl"
              >
                Valider
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ExerciceTable;