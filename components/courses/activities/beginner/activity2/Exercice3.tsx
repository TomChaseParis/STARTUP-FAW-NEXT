"use client";

import React, { useState } from "react";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

/* ---------------- DATA ---------------- */

type Question = {
  original: string;
  answer: string;
};

const questions: Question[] = [
  {
    original: "Est-ce que vous êtes célibataire ?",
    answer: "Est-ce que tu es célibataire ?",
  },
  {
    original: "Quel est votre nom ?",
    answer: "Quel est ton nom ?",
  },
  {
    original: "Vous vous appelez comment ?",
    answer: "Tu t’appelles comment ?",
  },
  {
    original: "Quel est votre prénom ?",
    answer: "Quel est ton prénom ?",
  },
  {
    original: "Est-ce que vous êtes français ?",
    answer: "Est-ce que tu es français ?",
  },
  {
    original: "D’où est-ce que vous venez ?",
    answer: "D’où est-ce que tu viens ?",
  },
  {
    original: "Vous avez quel âge ?",
    answer: "Tu as quel âge ?",
  },
  {
    original: "Est-ce que vous êtes marié ?",
    answer: "Est-ce que tu es marié ?",
  },
  {
    original: "Est-ce que vous avez des enfants ?",
    answer: "Est-ce que tu as des enfants ?",
  },
  {
    original: "Vous habitez où ?",
    answer: "Tu habites où ?",
  },
  {
    original: "Vous faites quoi dans la vie ?",
    answer: "Tu fais quoi dans la vie ?",
  },
];

/* ---------------- NORMALIZE ---------------- */

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z]/g, "");

/* ---------------- COMPONENT ---------------- */

const Exercice3: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>(questions.map(() => ""));
  const [validated, setValidated] = useState(false);

  const handleChange = (value: string, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const checkAnswer = (user: string, correct: string) => {
    return normalize(user) === normalize(correct);
  };

  const correctCount = answers.filter((ans, i) =>
    checkAnswer(ans, questions[i].answer)
  ).length;

  const score = Math.round((correctCount / questions.length) * 100);

  return (
    <section className="mt-12">

      {/* ================= INSTRUCTION ================= */}

      <InstructionBlock
        title="✍️ EXERCICE 3 : Tu vs Vous"
        activityType="type"
        description={
          <div className="space-y-5 text-black">

            <p className="font-medium">
              👉 Transforme chaque question du registre formel <strong>(vous)</strong> vers le registre informel <strong>(tu)</strong>.
            </p>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
              <p className="text-sm text-slate-700">
                Fais attention aux changements :
              </p>

              <ul className="text-sm text-slate-700 space-y-1">
                <li>• vous → tu</li>
                <li>• votre → ton</li>
                <li>• conjugaison du verbe</li>
              </ul>
            </div>

            <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm font-semibold text-blue-700 mb-2">
                Exemple
              </p>

              <p className="text-sm text-blue-900">
                Est-ce que vous êtes célibataire ?<br />
                → Est-ce que tu es célibataire ?
              </p>
            </div>

          </div>
        }
      />

      {/* ================= QUESTIONS ================= */}

      <div className="mt-10 max-w-3xl mx-auto space-y-6 px-4">

        {questions.map((q, index) => {
          const isCorrect = checkAnswer(answers[index], q.answer);

          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-black/5"
            >
              <p className="text-black font-medium mb-3">
                {q.original}
              </p>

              <input
                type="text"
                value={answers[index]}
                onChange={(e) => handleChange(e.target.value, index)}
                disabled={validated}
                className="w-full border rounded-lg px-4 py-3 text-black"
                placeholder="Ta réponse..."
              />

              {validated && (
                <div className="mt-3 text-sm">
                  {isCorrect ? (
                    <p className="text-green-600 font-semibold">
                      ✔ Bonne réponse
                    </p>
                  ) : (
                    <p className="text-red-600 font-semibold">
                      ❌ {q.answer}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* VALIDATION */}
        {!validated && (
          <div className="text-center mt-6">
            <button
              onClick={() => setValidated(true)}
              className="bg-black text-white px-8 py-3 rounded-xl"
            >
              Valider
            </button>
          </div>
        )}

        {/* SCORE */}
        {validated && (
          <div className="text-center mt-10">
            <p className="text-4xl font-bold text-black">
              {score} / 100
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Exercice3;