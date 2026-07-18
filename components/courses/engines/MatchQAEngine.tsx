"use client";

import { useState } from "react";

type Pair = {
  id: number;
  question: string;
  answer: string;
};

type Props = {
  data: {
    pairs: Pair[];
  };
};

export default function MatchQAEngine({ data }: Props) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const answersPool = [...data.pairs]
    .map((p) => p.answer)
    .sort(() => Math.random() - 0.5);

  const handleSelect = (id: number, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const correctCount = data.pairs.filter(
    (p) => selected[p.id] === p.answer
  ).length;

  const score = Math.round(
    (correctCount / data.pairs.length) * 100
  );

  return (
    <section className="max-w-3xl mx-auto space-y-6">

      {data.pairs.map((pair) => (
        <div
          key={pair.id}
          className="p-5 rounded-xl bg-white border shadow-sm space-y-3 transition hover:shadow-md"
        >
          {/* QUESTION */}
          <p className="font-medium text-black text-[16px]">
            {pair.question}
          </p>

          {/* SELECT CUSTOM STYLE */}
          <div className="relative">
            <select
              value={selected[pair.id] || ""}
              onChange={(e) =>
                handleSelect(pair.id, e.target.value)
              }
              className="
                w-full
                appearance-none
                rounded-lg
                px-4 py-2.5
                bg-amber-50
                border border-amber-300
                text-black
                text-[15px]
                shadow-sm
                transition
                focus:outline-none
                focus:ring-2 focus:ring-amber-400
                focus:bg-white
                hover:bg-amber-100
              "
            >
              <option value="">Choisir une réponse</option>

              {answersPool.map((ans, i) => (
                <option key={i} value={ans}>
                  {ans}
                </option>
              ))}
            </select>

            {/* ICON CUSTOM (flèche) */}
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/50">
              ▼
            </div>
          </div>

          {/* FEEDBACK */}
          {showResult && (
            <p
              className={`text-sm font-medium ${
                selected[pair.id] === pair.answer
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {selected[pair.id] === pair.answer
                ? "✅ Correct"
                : `❌ Réponse : ${pair.answer}`}
            </p>
          )}
        </div>
      ))}

      {/* ACTIONS */}
      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={() => setShowResult(true)}
          className="
            bg-black text-white px-6 py-3 rounded-xl
            hover:bg-black/90 transition shadow
          "
        >
          Vérifier
        </button>

        <button
          onClick={() => {
            setSelected({});
            setShowResult(false);
          }}
          className="
            bg-amber-500 px-6 py-3 rounded-xl
            text-black font-semibold
            hover:bg-amber-400 transition shadow
          "
        >
          Reset
        </button>
      </div>

      {/* SCORE */}
      {showResult && (
        <div className="text-center pt-2">
          <p className="text-3xl font-bold text-black">
            {score}%
          </p>
        </div>
      )}
    </section>
  );
}