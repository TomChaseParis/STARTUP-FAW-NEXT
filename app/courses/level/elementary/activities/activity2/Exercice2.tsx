"use client";

import React, { useState } from "react";
import Image from "next/image";

/* ========= Types ========= */
type Choice = {
  id: string;
  label: string;
  isCorrect: boolean;
  explanation: string;
};

type Question = {
  id: number;
  question: string;
  choices: Choice[];
  image: string;
};

/* ========= Questions ========= */
const questions: Question[] = [
  {
    id: 1,
    question: "Qu’est-ce qu’ils font ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/tennis.png",
    choices: [
      {
        id: "A",
        label: "Ils font du judo",
        isCorrect: false,
        explanation: "On voit clairement qu’ils ne pratiquent pas le judo.",
      },
      {
        id: "B",
        label: "Ils font du ping-pong",
        isCorrect: false,
        explanation: "Ce n’est pas du ping-pong.",
      },
      {
        id: "C",
        label: "Ils font du tennis",
        isCorrect: true,
        explanation: "Bonne réponse : ils jouent au tennis.",
      },
    ],
  },
  {
    id: 2,
    question: "Qu’est-ce qu’elles mangent ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/pizza.png",
    choices: [
      {
        id: "A",
        label: "Elles mangent une ratatouille",
        isCorrect: false,
        explanation: "Ce n’est pas une ratatouille.",
      },
      {
        id: "B",
        label: "Elles mangent une pizza",
        isCorrect: true,
        explanation: "Bonne réponse : elles mangent bien une pizza.",
      },
      {
        id: "C",
        label: "Elles mangent un couscous",
        isCorrect: false,
        explanation: "Ce n’est pas un couscous.",
      },
    ],
  },
  {
    id: 3,
    question: "Où est-ce qu’ils vont ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/beach.png",
    choices: [
      {
        id: "A",
        label: "Ils vont aux toilettes",
        isCorrect: false,
        explanation: "Ils ne vont pas aux toilettes.",
      },
      {
        id: "B",
        label: "Ils vont à la plage",
        isCorrect: true,
        explanation: "Bonne réponse : on les voit aller à la plage.",
      },
      {
        id: "C",
        label: "Ils vont au travail",
        isCorrect: false,
        explanation: "Ils ne vont pas au travail.",
      },
    ],
  },
  {
    id: 4,
    question: "Est-ce qu’ils aiment leur repas à la cantine ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/cantine.png",
    choices: [
      {
        id: "A",
        label: "Non, ils détestent leur repas",
        isCorrect: true,
        explanation: "Bonne réponse : ils n’aiment pas du tout leur repas.",
      },
      {
        id: "B",
        label: "Oui, ils adorent leur repas",
        isCorrect: false,
        explanation: "Ce n’est pas le cas.",
      },
      {
        id: "C",
        label: "Comme ci, comme ça",
        isCorrect: false,
        explanation: "Ils détestent leur repas : ce n’est pas neutre.",
      },
    ],
  },
  {
    id: 5,
    question: "À quel jeu est-ce qu’ils jouent ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/chess.png",
    choices: [
      {
        id: "A",
        label: "Ils jouent au poker",
        isCorrect: false,
        explanation: "Ce n’est pas du poker.",
      },
      {
        id: "B",
        label: "Ils jouent au scrabble",
        isCorrect: false,
        explanation: "Ils ne jouent pas au scrabble.",
      },
      {
        id: "C",
        label: "Ils jouent aux échecs",
        isCorrect: true,
        explanation: "Bonne réponse : ils jouent bien aux échecs.",
      },
    ],
  },
  {
    id: 6,
    question: "Qu’est-ce qu’elles font ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/teach.png",
    choices: [
      {
        id: "A",
        label: "Elles finissent leurs devoirs de classe",
        isCorrect: true,
        explanation: "Bonne réponse : elles sont en train de travailler.",
      },
      {
        id: "B",
        label: "Elles regardent la télévision",
        isCorrect: false,
        explanation: "Elles ne regardent pas la télévision.",
      },
      {
        id: "C",
        label: "Elles choisissent leurs habits",
        isCorrect: false,
        explanation: "Ce n’est pas ce qu’elles font.",
      },
    ],
  },
  {
    id: 7,
    question: "Dans quel pays est-ce qu’ils sont ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/maroc.png",
    choices: [
      {
        id: "A",
        label: "Ils sont en Islande",
        isCorrect: false,
        explanation: "Ce n’est pas l’Islande.",
      },
      {
        id: "B",
        label: "Ils sont en Australie",
        isCorrect: false,
        explanation: "Ce n’est pas l’Australie.",
      },
      {
        id: "C",
        label: "Ils sont au Maroc",
        isCorrect: true,
        explanation: "Bonne réponse : ils sont bien au Maroc.",
      },
    ],
  },
  {
    id: 8,
    question: "Quel est leur problème ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/tired.png",
    choices: [
      {
        id: "A",
        label: "Ils ont trop froid, ils ont besoin d’un abri",
        isCorrect: false,
        explanation: "Ce n’est pas le cas.",
      },
      {
        id: "B",
        label: "Ils sont trop fatigués, ils ne peuvent plus marcher",
        isCorrect: true,
        explanation:
          "Bonne réponse : ils n’en peuvent plus et sont épuisés.",
      },
      {
        id: "C",
        label: "Ils sont très contents, ils rient sans s’arrêter",
        isCorrect: false,
        explanation: "Ce n’est pas du tout ce qui se passe.",
      },
    ],
  },
];

const Exercice2: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const handleSelect = (id: string) => {
    if (showAnswer) return;

    setSelectedChoice(id);
    setShowAnswer(true);

    const choice = currentQuestion.choices.find((c) => c.id === id);
    if (choice?.isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex === totalQuestions - 1) {
      setTimeout(() => setShowModal(true), 700);
    }
  };

  const nextQuestion = () => {
    setSelectedChoice(null);
    setShowAnswer(false);
    setCurrentIndex((i) => i + 1);
  };

  return (
    <section className="mt-16 bg-white pb-20">
      <div className="container mx-auto max-w-4xl">
        {/* BARRE DE PROGRESSION */}
        <div className="mb-6 h-2 w-full rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-amber-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* CONSIGNE */}
        <div className="mx-auto mb-10 mt-[60px] max-w-5xl rounded-xl bg-amber-50 p-6 shadow-sm ring-1 ring-amber-200">
          <h3 className="mb-3 text-lg font-semibold text-black">
            ✍️ Exercice — Compréhension
          </h3>
          <p className="leading-relaxed text-black/80">
            Choisissez la réponse qui correspond à l’image.
          </p>
        </div>

        {/* CARD */}
        <div className="mx-auto mb-10 max-w-5xl rounded-xl bg-amber-50 p-8 shadow-sm ring-1 ring-amber-200">
          <h3 className="mb-6 text-xl font-semibold text-black">
            🗣 Question {currentIndex + 1} / {totalQuestions}
          </h3>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* TEXTE */}
            <div className="flex-1">
              <p className="mb-6 text-lg text-black">
                {currentQuestion.question}
              </p>

              <div className="space-y-3">
                {currentQuestion.choices.map((choice) => {
                  const isSelected = selectedChoice === choice.id;

                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleSelect(choice.id)}
                      className={`
                        w-full rounded-lg border px-4 py-3 text-left text-black transition
                        ${
                          !showAnswer
                            ? "border-black/20 hover:bg-white"
                            : choice.isCorrect
                              ? "border-green-500 bg-green-100 text-green-800"
                              : isSelected
                                ? "border-red-500 bg-red-100 text-red-800"
                                : "border-black/10"
                        }
                      `}
                    >
                      <strong>{choice.id}. </strong>
                      {choice.label}
                    </button>
                  );
                })}
              </div>

              {showAnswer && (
                <div className="mt-6 rounded-lg bg-white p-4 ring-1 ring-black/5">
                  <p className="mb-1 font-medium text-black">
                    Réponse correcte :
                  </p>
                  <p className="text-black/80">
                    {
                      currentQuestion.choices.find((c) => c.isCorrect)
                        ?.explanation
                    }
                  </p>
                </div>
              )}
            </div>

            {/* IMAGE */}
            <div className="relative w-full lg:w-1/3">
              <div className="relative overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/10">
                <div className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                  Question {currentIndex + 1} / {totalQuestions}
                </div>

                <Image
                  src={currentQuestion.image}
                  alt="Illustration"
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover"
                />
              </div>
            </div>
          </div>

          {showAnswer && currentIndex < totalQuestions - 1 && (
            <div className="mt-8 text-right">
              <button
                onClick={nextQuestion}
                className="rounded-lg bg-black px-6 py-2.5 text-white hover:bg-black/90"
              >
                Question suivante →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODALE SCORE */}
      {showModal && (
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
              {Math.round((score / totalQuestions) * 100)}
              <span className="text-2xl text-black/60"> / 100</span>
            </p>

            <p className="mt-3 text-black/70">
              Score : {score} / {totalQuestions}
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

export default Exercice2;
