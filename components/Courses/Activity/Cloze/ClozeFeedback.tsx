"use client";

import React from "react";

type ClozeFeedbackProps = {
  score: number;
  total: number;
  onRestart: () => void;
  corrections: { id: number; correct: string }[];
};

const ClozeFeedback: React.FC<ClozeFeedbackProps> = ({
  score,
  total,
  onRestart,
  corrections,
}) => {
  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-amber-50 p-8 shadow-lg ring-1 ring-amber-200">
      <h2 className="text-2xl font-bold text-black mb-4">🎉 Résultats</h2>

      <p className="text-lg text-black/80 mb-6">
        Tu as obtenu <strong>{score}</strong> bonnes réponses sur {total}.
      </p>

      <div className="mb-6 rounded-lg bg-white p-4 shadow ring-1 ring-black/5">
        <h3 className="font-semibold text-black mb-2">Corrections :</h3>
        <ul className="space-y-1 text-black/80">
          {corrections.map((c) => (
            <li key={c.id}>
              <strong>{c.id}.</strong> {c.correct}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onRestart}
        className="rounded-lg bg-black px-5 py-2.5 text-white hover:bg-black/80"
      >
        Recommencer
      </button>
    </div>
  );
};

export default ClozeFeedback;
