"use client";

import React, { useState } from "react";

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
};

/* ========= Questions ========= */
const questions: Question[] = [
  {
    id: 1,
    question: "Avec qui le chanteur passait-il ses vacances ?",
    choices: [
      {
        id: "A",
        label: "Avec des amis de sa classe",
        isCorrect: false,
        explanation: "La chanson ne parle jamais d’amis.",
      },
      {
        id: "B",
        label: "Il était en colonie de vacances",
        isCorrect: false,
        explanation: "Il n’est pas question d’une colonie.",
      },
      {
        id: "C",
        label: "Avec sa famille",
        isCorrect: true,
        explanation: "Il évoque clairement ses parents et sa sœur.",
      },
    ],
  },
  {
    id: 2,
    question: "Est-ce que sa famille avait de l’argent ?",
    choices: [
      {
        id: "A",
        label: "Oui, sa famille était très riche",
        isCorrect: false,
        explanation: "La famille devait faire attention à ses dépenses.",
      },
      {
        id: "B",
        label: "Non, ses parents n’avaient pas beaucoup d’argent",
        isCorrect: true,
        explanation: "Ils surveillaient leurs dépenses pendant les vacances.",
      },
    ],
  },
  {
    id: 3,
    question:
      "Quelles étaient les activités de la famille pendant les vacances ?",
    choices: [
      {
        id: "A",
        label: "Ils faisaient du bateau tous les jours",
        isCorrect: false,
        explanation:
          "Le bateau n’est pas présenté comme une activité principale.",
      },
      {
        id: "B",
        label: "Ils allaient surtout à la plage",
        isCorrect: true,
        explanation:
          "La plage est décrite comme le lieu central des journées.",
      },
      {
        id: "C",
        label: "Ils restaient à l’hôtel toute la journée",
        isCorrect: false,
        explanation: "Ils passaient leurs journées dehors.",
      },
    ],
  },
  {
    id: 4,
    question:
      "Est-ce que la famille aimait bien rester tard au lit le matin ?",
    choices: [
      {
        id: "A",
        label: "Non, ils préféraient profiter de leur journée",
        isCorrect: true,
        explanation: "Ils se levaient tôt pour profiter de la journée.",
      },
      {
        id: "B",
        label: "Oui, ils ne sortaient jamais avant midi",
        isCorrect: false,
        explanation: "C’est l’inverse qui est décrit.",
      },
      {
        id: "C",
        label: "Oui, ils dormaient jusqu’à midi",
        isCorrect: false,
        explanation: "Ils se réveillaient tôt le matin.",
      },
    ],
  },
  {
    id: 5,
    question:
      "Quelles étaient les deux conditions pour aller aux îles ?",
    choices: [
      {
        id: "A",
        label: "Trouver un bateau qui accepte tout le monde",
        isCorrect: false,
        explanation: "Ce n’est pas évoqué dans la chanson.",
      },
      {
        id: "B",
        label: "De bonnes conditions météo et ne rien avoir à faire",
        isCorrect: false,
        explanation: "Il manquait une condition importante.",
      },
      {
        id: "C",
        label:
          "De bonnes conditions météo et avoir suffisamment d’argent",
        isCorrect: true,
        explanation:
          "La météo et l’argent étaient déterminants.",
      },
    ],
  },
];

const Exercice2: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = questions[currentIndex];

  /* ========= GARDE-FOU IMPORTANT ========= */
  if (!currentQuestion) {
    return (
      <section className="bg-white mt-16 pb-20">
        <div className="container max-w-4xl mx-auto text-center">
          <p className="text-black/70">
            Chargement de l’exercice…
          </p>
        </div>
      </section>
    );
  }

  const handleSelect = (id: string) => {
    if (showAnswer) return;
    setSelectedChoice(id);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    setSelectedChoice(null);
    setShowAnswer(false);
    setCurrentIndex((i) => i + 1);
  };

  return (
    <section className="bg-white mt-16 pb-20">
      <div className="container max-w-4xl mx-auto">
        <div className="mx-auto mb-10 max-w-5xl rounded-xl bg-amber-50 p-8 text-left shadow-sm ring-1 ring-amber-200">
          <h3 className="text-xl font-semibold text-black mb-6">
            🗣 Exercice 2 — Compréhension de la chanson
          </h3>

          {/* QUESTION */}
          <p className="text-black mb-6 text-lg">
            {currentQuestion.question}
          </p>

          {/* CHOIX */}
          <div className="space-y-3">
            {currentQuestion.choices.map((choice) => {
              const isSelected = selectedChoice === choice.id;
              const isCorrect = choice.isCorrect;

              return (
                <button
                key={choice.id}
                onClick={() => handleSelect(choice.id)}
                className={`
                w-full text-left px-4 py-3 rounded-lg border transition text-black
                ${
                !showAnswer
                ? "border-black/20 hover:bg-white"
                : isCorrect
                ? "border-green-500 bg-green-100 text-green-800"
                : isSelected
                ? "border-red-500 bg-red-100 text-red-800"
                : "border-black/10 text-black"
                }
                `}
                >
                <strong className="mr-2">{choice.id}.</strong>
                {choice.label}
                </button>
              );
            })}
          </div>

          {/* EXPLICATION */}
          {showAnswer && (
            <div className="mt-6 rounded-lg bg-white p-4 ring-1 ring-black/5">
              <p className="font-medium text-black mb-1">
                Réponse correcte :
              </p>
              <p className="text-black/80">
                {
                  currentQuestion.choices.find(
                    (c) => c.isCorrect
                  )?.explanation
                }
              </p>
            </div>
          )}

          {/* NAVIGATION */}
          {showAnswer && currentIndex < questions.length - 1 && (
            <div className="mt-8 text-right">
              <button
                onClick={nextQuestion}
                className="px-6 py-2.5 rounded-lg bg-black text-white hover:bg-black/90"
              >
                Question suivante →
              </button>
            </div>
          )}

          {showAnswer && currentIndex === questions.length - 1 && (
            <div className="mt-8 text-center text-green-700 font-semibold">
              🎉 Exercice terminé !
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Exercice2;