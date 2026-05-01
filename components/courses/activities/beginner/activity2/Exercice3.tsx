"use client";

import React, { useState } from "react";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

/* ---------------- DATA ---------------- */

type Question = {
  original: string;
  answer: string;
};

const questions: Question[] = [
  { original: "Est-ce que vous êtes célibataire ?", answer: "Est-ce que tu es célibataire ?" },
  { original: "Quel est votre nom ?", answer: "Quel est ton nom ?" },
  { original: "Vous vous appelez comment ?", answer: "Tu t’appelles comment ?" },
  { original: "Quel est votre prénom ?", answer: "Quel est ton prénom ?" },
  { original: "Est-ce que vous êtes français ?", answer: "Est-ce que tu es français ?" },
  { original: "D’où est-ce que vous venez ?", answer: "D’où est-ce que tu viens ?" },
  { original: "Vous avez quel âge ?", answer: "Tu as quel âge ?" },
  { original: "Est-ce que vous êtes marié ?", answer: "Est-ce que tu es marié ?" },
  { original: "Est-ce que vous avez des enfants ?", answer: "Est-ce que tu as des enfants ?" },
  { original: "Vous habitez où ?", answer: "Tu habites où ?" },
  { original: "Vous faites quoi dans la vie ?", answer: "Tu fais quoi dans la vie ?" },
];

/* ---------------- NORMALIZE ---------------- */

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z]/g, "");

/* ---------------- LEVENSHTEIN ---------------- */

const levenshtein = (a: string, b: string) => {
  const matrix = Array.from({ length: b.length + 1 }, () => []);

  for (let i = 0; i <= b.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] =
        b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
    }
  }

  return matrix[b.length][a.length];
};

/* ---------------- COMPONENT ---------------- */

const Exercice3: React.FC = () => {
  const [results, setResults] = useState<
    Record<number, { text: string; correct: boolean }>
  >({});

  const [listeningId, setListeningId] = useState<number | null>(null);

  /* ---------------- SPEECH ---------------- */

  const startRecognition = (index: number) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("⚠️ Reconnaissance vocale non supportée");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;

    let transcript = "";

    recognition.onstart = () => {
      setListeningId(index);
    };

    recognition.onresult = (event: any) => {
      transcript = event.results[0][0].transcript;
    };

    recognition.onend = () => {
      setListeningId(null);

      const spoken = normalize(transcript);
      const expected = normalize(questions[index].answer);

      const isCorrect =
        spoken === expected ||
        spoken.includes(expected) ||
        levenshtein(spoken, expected) <= 2;

      setResults((prev) => ({
        ...prev,
        [index]: {
          text: transcript,
          correct: isCorrect,
        },
      }));
    };

    recognition.start();
  };

  /* ---------------- SCORE ---------------- */

  const correctCount = Object.values(results).filter(
    (r) => r.correct
  ).length;

  const score = Math.round(
    (correctCount / questions.length) * 100
  );

  /* ---------------- RENDER ---------------- */

  return (
    <section className="mt-12">

      <InstructionBlock
        title="🎤 EXERCICE 3 : Tu vs Vous"
        activityType="click-speak"
        description={
          <div className="space-y-5 text-black">
            <p className="font-medium">
              👉 Transforme chaque question en utilisant <strong>tu</strong> au lieu de <strong>vous</strong>.
            </p>

            <div className="rounded-xl bg-slate-50 border p-4">
              <ul className="text-sm space-y-1">
                <li>• vous → tu</li>
                <li>• votre → ton</li>
                <li>• adapte le verbe</li>
              </ul>
            </div>

            <div className="rounded-xl bg-blue-50 border p-4">
              <p className="text-sm font-semibold mb-2">Exemple</p>
              <p className="text-sm">
                Est-ce que vous êtes célibataire ?<br />
                → Est-ce que tu es célibataire ?
              </p>
            </div>
          </div>
        }
      />

      {/* QUESTIONS */}
      <div className="mt-10 max-w-3xl mx-auto space-y-6 px-4">

        {questions.map((q, index) => {
          const result = results[index];

          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-black/5"
            >
              <p className="text-black font-medium mb-4">
                {q.original}
              </p>

              {/* MICRO */}
              <button
                onClick={() => startRecognition(index)}
                className={`
                  relative flex h-14 w-14 items-center justify-center
                  rounded-full shadow-md transition
                  ${
                    listeningId === index
                      ? "bg-amber-400 scale-105"
                      : "bg-white text-amber-600 hover:bg-amber-100"
                  }
                `}
              >
                🎤

                {listeningId === index && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-amber-300 opacity-70"></span>
                )}
              </button>

              {/* RESULT */}
              {result && (
                <div className="mt-4 text-sm space-y-2">
                  <p className="text-black">
                    {result.text}
                  </p>

                  {result.correct ? (
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

        {/* SCORE */}
        {Object.keys(results).length === questions.length && (
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