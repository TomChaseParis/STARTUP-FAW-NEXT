"use client";

import React from "react";

const ConceptBlock: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-b from-white to-slate-50 border border-slate-200 rounded-2xl p-8 text-black text-sm leading-relaxed shadow-sm">

      {/* HEADER */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold tracking-tight">
          📘 Le présent des verbes en -ER
        </h2>
      
      </div>

      {/* TROUVER */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-700 rounded-md">
            Exemple
          </span>
          <p className="font-semibold text-black">TROUVER</p>
        </div>

        <div className="grid grid-cols-2 gap-4">

          {/* AFFIRMATIF */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-green-700 mb-2 uppercase tracking-wide">
              Forme affirmative
            </p>

            <div className="space-y-1">
              <p>Je <span className="font-semibold">trouve</span></p>
              <p>Tu <span className="font-semibold">trouves</span></p>
              <p>Il / elle / on <span className="font-semibold">trouve</span></p>
              <p>Nous <span className="font-semibold">trouvons</span></p>
              <p>Vous <span className="font-semibold">trouvez</span></p>
              <p>Ils / elles <span className="font-semibold">trouvent</span></p>
            </div>
          </div>

          {/* NEGATIF */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-red-700 mb-2 uppercase tracking-wide">
              Forme négative
            </p>

            <div className="space-y-1">
              <p>Je ne <span className="font-semibold">trouve</span> pas</p>
              <p>Tu ne <span className="font-semibold">trouves</span> pas</p>
              <p>Il / elle / on ne <span className="font-semibold">trouve</span> pas</p>
              <p>Nous ne <span className="font-semibold">trouvons</span> pas</p>
              <p>Vous ne <span className="font-semibold">trouvez</span> pas</p>
              <p>Ils / elles ne <span className="font-semibold">trouvent</span> pas</p>
            </div>
          </div>

        </div>
      </div>

      {/* AIMER + HABITER */}
      <div className="grid grid-cols-2 gap-4 mb-8">

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-black/60 mb-2">AIMER</p>
          <p>j’<span className="font-semibold text-green-600">aime</span></p>
          <p>je n’<span className="font-semibold text-red-600">aime</span> pas</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-black/60 mb-2">HABITER</p>
          <p>j’<span className="font-semibold text-green-600">habite</span></p>
          <p>je n’<span className="font-semibold text-red-600">habite</span> pas</p>
        </div>

      </div>

      {/* PRONONCIATION */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
        <p className="text-xs font-semibold text-blue-700 mb-2">
          🔊 Prononciation
        </p>

        <p>
          Pas de différence de prononciation :
          <span className="font-semibold"> trouve</span> (je / il),
          <span className="font-semibold"> trouves</span> (tu),
          <span className="font-semibold"> trouvent</span> (ils).
        </p>

        <p className="mt-2">
          Pas de différence non plus :
          <span className="font-semibold"> trouver</span>,
          <span className="font-semibold"> trouvez</span> (vous).
        </p>
      </div>

      {/* LIAISON */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <p className="text-xs font-semibold text-purple-700 mb-2">
          ⚡ Élision
        </p>

        <p>
          Je + voyelle → <span className="font-semibold">j’</span>
        </p>
        <p>
          Ne + voyelle → <span className="font-semibold">n’</span>
        </p>

        <p className="text-xs text-black/60 mt-2">
          (a, e, i, o, u, y, h)
        </p>
      </div>

    </div>
  );
};

export default ConceptBlock;