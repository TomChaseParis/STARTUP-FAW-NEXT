"use client";

import React from "react";

type VerbCardProps = {
  title: string;
  forms: string[]; // ex: ["Je suis","Tu es",...]
  onPlay: () => void;
};

const VerbCard: React.FC<VerbCardProps> = ({ title, forms, onPlay }) => {
  return (
    <div className="group rounded-xl bg-white/90 shadow-lg ring-1 ring-black/5 transition hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-xl bg-amber-100 px-5 py-3">
        <h3 className="text-xl font-semibold text-black">{title}</h3>
        <button
          onClick={onPlay}
          aria-label={`Écouter la conjugaison de ${title}`}
          className="inline-flex items-center gap-2 rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold text-black transition hover:bg-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          🔊 Écouter
        </button>
      </div>

      {/* Corps : conjugaisons en grille 2 colonnes */}
      <div className="px-6 py-5">
        <div className="grid grid-cols-1 gap-y-2 text-black sm:grid-cols-2">
          {forms.map((f, i) => (
            <div key={i} className="text-base leading-7">
              <span className="font-medium">{i + 1}.</span> {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerbCard;
