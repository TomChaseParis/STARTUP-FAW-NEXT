
"use client";

import Image from "next/image";
import { useState } from "react";

export type PhraseSegment =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "input";
      id: string;
      expectedAnswer: string;
      placeholder?: string;
      width?: string;
    };

export type IllustratedTransformationEngineProps = {
  imageSrc: string;
  imageAlt: string;
  originalText: string;
  transformedPhrase: PhraseSegment[];
  answers: Record<string, string>;
  onAnswerChange: (id: string, value: string) => void;
  validated?: boolean;
  showCorrection?: boolean;
  className?: string;
};

const ACCENT_CHARACTERS = ["é", "è", "ê", "à", "ô", "ù", "û", "ï"];

const normalize = (value: string) =>
  value
    .trim()
    .toLocaleLowerCase("fr-FR")
    .replace(/[’‘`ʼ]/g, "'")
    .replace(/\s+/g, " ");

export default function IllustratedTransformationEngine({
  imageSrc,
  imageAlt,
  originalText,
  transformedPhrase,
  answers,
  onAnswerChange,
  validated = false,
  showCorrection = false,
  className = "",
}: IllustratedTransformationEngineProps) {
  const [copiedCharacter, setCopiedCharacter] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);

  const copyCharacter = async (character: string) => {
    setCopyError(false);

    try {
      await navigator.clipboard.writeText(character);
      setCopiedCharacter(character);
    } catch {
      setCopiedCharacter(null);
      setCopyError(true);
    }
  };

  return (
    <article
      className={`grid w-full min-w-0 grid-cols-1 items-center gap-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-[minmax(280px,0.95fr)_minmax(0,1.05fr)] lg:gap-8 lg:p-7 ${className}`}
    >
      {/* GRANDE ILLUSTRATION À GAUCHE */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F8F5EF] ring-1 ring-black/5">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          priority
          className="object-contain"
        />
      </div>

      {/* COLONNE DE DROITE */}
      <div className="flex min-w-0 flex-col justify-center gap-6 py-1 sm:gap-8 sm:py-3">
        {/* CLAVIER DES ACCENTS — AU-DESSUS DE LA PHRASE DE DÉPART */}
        <div className="rounded-xl border border-[#DDD6FE] bg-[#F5F0FF] p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="m-0 text-xs font-bold uppercase tracking-[0.12em] text-[#4C1D95]">
              Liste des accents
            </p>

            <span
              aria-live="polite"
              className="text-xs text-slate-600"
            >
              {copyError
                ? "Copie impossible. Vérifie les autorisations du navigateur."
                : copiedCharacter
                  ? `« ${copiedCharacter} » copié !`
                  : "Clique sur une lettre pour la copier."}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {ACCENT_CHARACTERS.map((character) => (
              <button
                key={character}
                type="button"
                onClick={() => copyCharacter(character)}
                aria-label={`Copier la lettre ${character}`}
                className={`flex h-11 min-w-11 items-center justify-center rounded-lg border px-3 text-lg font-bold shadow-sm transition active:scale-95 ${
                  copiedCharacter === character
                    ? "border-emerald-400 bg-emerald-100 text-emerald-800 ring-2 ring-emerald-200"
                    : "border-[#DDD6FE] bg-white text-[#4C1D95] hover:border-[#7C3AED] hover:bg-[#EDE9FE]"
                }`}
              >
                {character}
              </button>
            ))}
          </div>

          <p className="mb-0 mt-3 text-xs leading-relaxed text-slate-600">
            Clique sur une lettre pour la copier, puis colle-la dans ta
            réponse avec Ctrl + V ou ⌘ + V.
          </p>
        </div>

        {/* PHRASE DE DÉPART */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
            Phrase de départ
          </p>

          <p className="break-words text-lg font-medium leading-8 text-slate-800 sm:text-xl sm:leading-9">
            {originalText}
          </p>
        </div>

        {/* PHRASE À TRANSFORMER */}
        <div className="rounded-xl border border-[#E9DDFD] bg-gradient-to-br from-[#FAF8FF] to-white p-4 sm:p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#7C3AED]">
            Transforme la phrase
          </p>

          <div className="flex min-w-0 items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-xl font-bold text-[#B9A0F8]"
            >
              ➤
            </span>

            <p className="min-w-0 break-words text-lg leading-9 text-slate-800 sm:text-xl sm:leading-10">
              {transformedPhrase.map((segment, index) => {
                if (segment.type === "text") {
                  return (
                    <span key={`text-${index}`}>
                      {segment.value}
                    </span>
                  );
                }

                const answer = answers[segment.id] ?? "";

                const isCorrect =
                  normalize(answer) ===
                  normalize(segment.expectedAnswer);

                const inputClass = showCorrection
                  ? isCorrect
                    ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                    : "border-red-300 bg-red-50 text-red-800"
                  : "border-amber-300 bg-white text-[#102744] focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100";

                return (
                  <span
                    key={segment.id}
                    className="mx-1 inline-flex max-w-full flex-col align-middle"
                  >
                    <input
                      type="text"
                      value={answer}
                      placeholder={segment.placeholder ?? ""}
                      disabled={validated}
                      autoComplete="off"
                      spellCheck={false}
                      aria-label={`Réponse ${segment.id}`}
                      aria-invalid={
                        showCorrection ? !isCorrect : undefined
                      }
                      onChange={(event) =>
                        onAnswerChange(segment.id, event.target.value)
                      }
                      style={{
                        width: segment.width ?? "10rem",
                        maxWidth: "100%",
                      }}
                      className={`rounded-lg border-2 px-3 py-2 text-center text-base font-semibold leading-7 outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-90 sm:text-lg ${inputClass}`}
                    />

                    {showCorrection && !isCorrect && (
                      <span className="mt-2 text-sm font-semibold leading-6 text-emerald-700">
                        Réponse : {segment.expectedAnswer}
                      </span>
                    )}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
