"use client";

import { useState } from "react";

const accentChars = ["à", "â", "è", "ê", "é", "ô", "î", "'"];

export default function AccentHelper() {
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

  const copyChar = async (char: string) => {
    try {
      await navigator.clipboard.writeText(char);
      setCopiedChar(char);

      setTimeout(() => {
        setCopiedChar(null);
      }, 1200);
    } catch {
      alert("Impossible de copier ce caractère");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          ⌨️
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800">
            Aide clavier
          </p>

          <p className="text-sm text-slate-600">
            Clique sur un accent pour le copier.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {accentChars.map((char) => {
          const isCopied = copiedChar === char;

          return (
            <button
              key={char}
              type="button"
              onClick={() => copyChar(char)}
              className={`
                relative flex h-12 min-w-[52px]
                items-center justify-center
                rounded-2xl border px-4
                text-lg font-semibold
                transition-all duration-200
                active:scale-95
                ${
                  isCopied
                    ? `
                      border-green-200
                      bg-green-50
                      text-green-700
                      shadow-md
                      scale-105
                    `
                    : `
                      border-slate-200
                      bg-white
                      text-slate-800
                      shadow-sm
                      hover:-translate-y-0.5
                      hover:border-amber-200
                      hover:bg-amber-50
                      hover:shadow-md
                    `
                }
              `}
            >
              {isCopied ? "✓" : char}
            </button>
          );
        })}
      </div>
    </div>
  );
}