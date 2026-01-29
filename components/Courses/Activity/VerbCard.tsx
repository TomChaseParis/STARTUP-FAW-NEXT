"use client";

import React from "react";
import Image from "next/image";

type VerbCardProps = {
  title: string;
  forms: string[];
  onPlay: () => void;
};

const VerbCard: React.FC<VerbCardProps> = ({ title, forms, onPlay}) => {
  return (
    <div
      className="
        group overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 
        transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
        flex
      "
    >
   

      {/* ==== CONTENU À DROITE ==== */}
      <div className="flex-1 px-6 py-6 relative">
        {/* Titre + bouton audio */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-black">
            {title}
          </h3>

          <button
            onClick={onPlay}
            aria-label={`Écouter ${title}`}
            className="
              flex items-center gap-2 rounded-lg 
              bg-amber-400 px-4 py-2 text-sm font-semibold text-black shadow 
              transition hover:bg-amber-300 hover:scale-105
            "
          >
            🔊 Écouter
          </button>
        </div>

        {/* Conjugaisons */}
        <div className="mt-4 grid grid-cols-1 gap-y-2 text-black sm:grid-cols-2">
          {forms.map((form, index) => (
            <div
              key={index}
              className="text-base leading-7 transition group-hover:translate-x-1"
            >
              <span className="mr-2 font-semibold text-amber-600">
                {index + 1}.



                
              </span>
              {form}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerbCard;