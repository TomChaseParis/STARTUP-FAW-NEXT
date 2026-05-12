"use client";

import React from "react";

type VerbCardProps = {
  title: string;
  forms: string[];
  onPlay: () => void;
  isPlaying?: boolean;
};

const VerbCard: React.FC<VerbCardProps> = ({
  title,
  forms,
  onPlay,
  isPlaying = false,
}) => {
  return (
    <div
      className="
        group relative overflow-hidden rounded-3xl
        border border-white/80 bg-white/95
        shadow-[0_8px_30px_rgba(15,23,42,0.06)]
        backdrop-blur-md
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]
      "
    >
      {/* glow décoratif */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500
          group-hover:opacity-100
        "
      >
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-slate-100/60 blur-2xl" />
      </div>

      {/* contenu */}
      <div className="relative px-7 py-7">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Verbe
            </p>

            <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {title}
            </h3>
          </div>

          {/* BOUTON AUDIO */}
          <button
            onClick={onPlay}
            aria-label={`Écouter ${title}`}
            className={`
              group/button relative inline-flex items-center justify-center
              overflow-hidden rounded-2xl
              px-5 py-4
              transition-all duration-300
              active:scale-[0.98]

              ${
                isPlaying
                  ? `
                    bg-gradient-to-br
                    from-amber-100
                    via-yellow-100
                    to-amber-200
                    shadow-[0_12px_28px_rgba(251,191,36,0.18)]
                    scale-105
                  `
                  : `
                  bg-amber-300
                  shadow-[0_8px_20px_rgba(0,0,0,0.06)]
                  hover:-translate-y-1
                  hover:shadow-[0_16px_30px_rgba(245,158,11,0.18)]
                  `
              }
            `}
          >
            {/* glow subtil */}
            <div
              className={`
                absolute inset-0 transition-opacity duration-300
                ${
                  isPlaying
                    ? "opacity-100"
                    : "opacity-0 group-hover/button:opacity-100"
                }
              `}
            >
              <div
                className={`
                  absolute -left-10 top-0 h-full w-20 rotate-12 bg-white/40 blur-xl
                  ${isPlaying ? "animate-pulse" : ""}
                `}
              />
            </div>

            {/* ondes audio */}
            {isPlaying && (
              <>
                <span className="absolute h-12 w-12 rounded-full border border-amber-300/50 animate-ping" />
                <span className="absolute h-16 w-16 rounded-full border border-amber-200/40 animate-ping [animation-delay:300ms]" />
              </>
            )}

            {/* icon */}
            <div
              className={`
                relative flex items-center justify-center transition-transform duration-300
                ${
                  isPlaying
                    ? "animate-pulse scale-110 text-amber-700"
                    : "text-black group-hover/button:scale-110 group-hover/button:rotate-3"
                }
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5L6 9H3v6h3l5 4V5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.5 8.5a5 5 0 010 7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 6a8.5 8.5 0 010 12"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* séparateur */}
        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* CONJUGAISONS */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {forms.map((form, index) => (
            <div
              key={index}
              className="
                flex items-center
                rounded-2xl
                border border-slate-100
                bg-gradient-to-br from-slate-50 to-white
                px-5 py-4
                transition-all duration-200
                hover:border-amber-100
                hover:shadow-[0_8px_18px_rgba(15,23,42,0.06)]
              "
            >
              <p className="text-base font-medium leading-relaxed text-slate-700">
                {form}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerbCard;