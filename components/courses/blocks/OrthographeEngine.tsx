"use client";

import { useState } from "react";
import { getScoreLevel } from "@/utils/quizScoring";

type Word = {
  wrong: string;
  correct: string;
};

type Props = {
  text: (string | Word)[];
};

const OrthographeEngine: React.FC<Props> = ({ text }) => {
  const words = text.filter(
    (t): t is Word => typeof t !== "string"
  );

  const [answers, setAnswers] = useState<string[]>(
    Array(words.length).fill("")
  );

  const [showCorrection, setShowCorrection] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleChange = (i: number, value: string) => {
    const next = [...answers];
    next[i] = value;
    setAnswers(next);
  };

  let index = -1;

  const correctCount = answers.reduce((acc, a, i) => {
    if (a.toLowerCase().trim() === words[i].correct) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const score = Math.round(
    (correctCount / words.length) * 100
  );

  return (
    <section className="mt-12">

      {/* TEXTE */}

      <div className="rounded-xl bg-white p-8 shadow-lg ring-1 ring-black/5 text-[17px] leading-relaxed">

        {text.map((part, i) => {
          if (typeof part === "string") {
            return <span key={i}>{part}</span>;
          }

          index++;

          const isCorrect =
            answers[index]?.toLowerCase().trim() ===
            part.correct;

          return (
            <span key={i} className="mx-1 inline-block">

              {!showCorrection ? (
                <input
                  value={answers[index]}
                  onChange={(e) =>
                    handleChange(index, e.target.value)
                  }
                  placeholder={part.wrong}
                  className="min-w-[80px] border-b-2 border-red-400 text-center"
                />
              ) : (
                <span
                  className={
                    isCorrect
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {answers[index] || part.wrong}
                  {!isCorrect && (
                    <span className="ml-1 text-green-600">
                      ({part.correct})
                    </span>
                  )}
                </span>
              )}

            </span>
          );
        })}
      </div>

      {/* BUTTON */}

      {!showCorrection && (
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setShowCorrection(true);
              setShowResult(true);
            }}
            className="rounded-xl bg-black px-6 py-3 text-white"
          >
            Vérifier
          </button>
        </div>
      )}

      {/* RESULT */}

      {showResult && (
        <div className="mt-10 text-center">

          <p className="text-5xl font-bold">
            {score} / 100
          </p>

          <p className="mt-2">
            {correctCount} / {words.length}
          </p>

          <p className="text-amber-600 font-semibold">
            {getScoreLevel(score)}
          </p>

        </div>
      )}

    </section>
  );
};

export default OrthographeEngine;