"use client";

import React, { useState } from "react";
import ClozeInput from "./ClozeInput";
import ClozeFeedback from "./ClozeFeedback";

type Question = {
  id: number;
  correct: string;
  options: string[];
};

type ClozeVerbActivityProps = {
  text: string;
  questions: Question[];
  levelColor?: string;
};

const ClozeVerbActivity: React.FC<ClozeVerbActivityProps> = ({
  text,
  questions,
  levelColor = "amber",
}) => {
  const [answers, setAnswers] = useState<(string | null)[]>(
    questions.map(() => null),
  );
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  /* ========= Remplacement dynamique du texte ========= */
  const parsedText = text.split(/___(\d+)___/g);

  /* ========= Sélection d’un mot ========= */
  const handleSelect = (index: number, word: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = word;
    setAnswers(newAnswers);
    setShowMenu(null);
  };

  /* ========= Score ========= */
  const score = answers.filter((ans, i) => ans === questions[i].correct).length;

  const allFilled = answers.every((a) => a !== null);

  /* ========= Rendu final ========= */
  if (showResults) {
    return (
      <ClozeFeedback
        score={score}
        total={questions.length}
        corrections={questions.map((q) => ({
          id: q.id,
          correct: q.correct,
        }))}
        onRestart={() => {
          setAnswers(questions.map(() => null));
          setShowResults(false);
        }}
      />
    );
  }

  return (
    <div className="container mt-16 pb-20">
      <div className="mx-auto max-w-3xl text-lg leading-relaxed text-black">
        {/* ================= TEXTE AVEC TROUS ================= */}
        <div className="whitespace-pre-wrap">
          {parsedText.map((part, i) => {
            if (Number(part)) {
              const index = Number(part) - 1;
              const q = questions[index];

              return (
                <span key={i} className="mx-1">
                  <ClozeInput
                    id={q.id}
                    value={answers[index]}
                    isCorrect={
                      answers[index] === null
                        ? null
                        : answers[index] === q.correct
                    }
                    onClick={() => setShowMenu(showMenu === q.id ? null : q.id)}
                  />

                  {/* MENU OPTIONS */}
                  {showMenu === q.id && (
                    <div className="absolute z-50 mt-2 w-48 rounded-lg bg-white p-2 shadow-lg ring-1 ring-black/10">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelect(index, opt)}
                          className="block w-full rounded px-3 py-1 text-left text-sm hover:bg-black/5"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </span>
              );
            }

            return <span key={i}>{part}</span>;
          })}
        </div>

        {/* ================= VALIDATION ================= */}
        <div className="mt-10 text-right">
          <button
            disabled={!allFilled}
            onClick={() => setShowResults(true)}
            className={`
              rounded-lg px-5 py-2.5 font-semibold transition
              ${
                allFilled
                  ? `bg-${levelColor}-500 text-black hover:bg-${levelColor}-400`
                  : "cursor-not-allowed bg-black/10 text-black/40"
              }
            `}
          >
            Valider mes réponses
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClozeVerbActivity;
