"use client";

import { useEffect, useMemo, useState } from "react";
import { MatchingData } from "../types/matchingTypes";

type Props = {
  data: MatchingData;
};

export default function MatchingEngine({ data }: Props) {
  const shuffledAnswers = useMemo(() => {
    return [...data.answers].sort(() => Math.random() - 0.5);
  }, [data]);

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setSelectedAnswers({});
    setValidated(false);
  }, [data]);

  const handleSelect = (questionId: number, answerId: string) => {
    if (validated) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleValidate = () => {
    setValidated(true);
  };

  return (
    <section className="mx-auto max-w-6xl py-16">
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
  {data.questions.map((question, index) => {
    const selected = selectedAnswers[question.id];

    const correctAnswer = data.answers.find(
      (a) => a.id === question.answerId
    );

    const isCorrect = selected === question.answerId;

    return (
      <div
        key={question.id}
        className={`border-b border-slate-200 p-6 last:border-b-0 ${
          validated
            ? isCorrect
              ? "bg-green-50"
              : "bg-red-50"
            : ""
        }`}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          {/* QUESTION */}

          <div className="flex flex-1 items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black font-bold text-white">
              {index + 1}
            </div>

            <p className="text-lg font-medium text-slate-900">
              {question.text}
            </p>
          </div>

          {/* SELECT */}

          <div className="w-full lg:w-[520px]">
            <select
              disabled={validated}
              value={selected ?? ""}
              onChange={(e) =>
                handleSelect(question.id, e.target.value)
              }
              className={`
                w-full
                rounded-xl
                border
                bg-white
                px-5
                py-3
                text-slate-800
                shadow-sm
                transition

                ${
                  !validated
                    ? "border-slate-300"
                    : isCorrect
                    ? "border-green-500 bg-green-100 text-green-700"
                    : "border-red-500 bg-red-100 text-red-700"
                }
              `}
            >
              <option value="">
                -- Choisir une réponse --
              </option>

              {shuffledAnswers.map((answer) => (
                <option
                  key={answer.id}
                  value={answer.id}
                >
                  {answer.text}
                </option>
              ))}
            </select>

            {validated && (
              <div className="mt-4">
                {isCorrect ? (
                  <div className="rounded-xl border border-green-300 bg-green-100 px-4 py-3">
                    <p className="font-semibold text-green-700">
                      ✔ Bonne réponse !
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-red-300 bg-red-100 px-4 py-3">
                      <p className="font-semibold text-red-700">
                        ✘ Mauvaise réponse
                      </p>
                    </div>

                    <div className="rounded-xl border border-green-300 bg-green-50 p-4">
                      <p className="font-semibold text-green-700">
                        Bonne réponse
                      </p>

                      <p className="mt-2 text-green-800">
                        {correctAnswer?.text}
                      </p>
                    </div>
                    
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  })}
</div>
{!validated && (
  <div className="mt-10 text-right">
    <button
      onClick={handleValidate}
      className="rounded-xl bg-black px-8 py-3 font-semibold text-white shadow-md transition hover:bg-black/90"
    >
      Valider mes réponses
    </button>
  </div>
)}

{validated && (
  <div className="mt-10 text-center">
    <button
      onClick={() => {
        setSelectedAnswers({});
        setValidated(false);
      }}
      className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black shadow-md transition hover:bg-amber-400"
    >
      Recommencer
    </button>
  </div>
)}
    </section>
  );
}