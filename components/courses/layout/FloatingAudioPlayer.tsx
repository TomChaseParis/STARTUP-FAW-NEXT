"use client";

import { useState } from "react";
import Image from "next/image";

type FloatingAudioPlayerProps = {
  audioSrc: string;
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  hint?: string;
};

export default function FloatingAudioPlayer({
  audioSrc,
  imageSrc,
  imageAlt = "Illustration du dialogue audio",
  title = "Dialogue",
  hint = "Écoute attentivement le dialogue.",
}: FloatingAudioPlayerProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-4 right-4 z-[100] w-auto max-w-[calc(100vw-2rem)] sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section
          aria-label="Lecteur audio flottant"
          className="w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#F3D982] bg-white shadow-[0_12px_40px_rgba(9,38,74,0.20)]"
        >
          {/* En-tête du lecteur */}
          <div className="flex items-center justify-between gap-3 border-b border-[#F3D982] bg-[#fff9e9] px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ffedbd] text-[#09264a]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 14v-3a8 8 0 0 1 16 0v3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <rect
                    x="3"
                    y="12"
                    width="5"
                    height="7"
                    rx="2"
                    fill="currentColor"
                  />
                  <rect
                    x="16"
                    y="12"
                    width="5"
                    height="7"
                    rx="2"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <div className="min-w-0">
                <p className="m-0 truncate text-sm font-extrabold text-[#09264a]">
                  {title}
                </p>
                <p className="m-0 text-xs text-[#748198]">
                  Lecteur audio
                </p>
              </div>
            </div>

            {/* Réduire le lecteur */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Réduire le lecteur audio"
              title="Réduire"
              className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-[#f3d982] bg-white text-[#09264a] transition-colors hover:bg-[#fff0c9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98D00]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Contenu du lecteur */}
          <div className="p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-xl bg-[#fff5dd]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="76px"
                  className="object-cover"
                />
              </div>

              <p className="m-0 min-w-0 text-sm leading-relaxed text-[#183352]">
                {hint}
              </p>
            </div>

            <audio
              controls
              preload="metadata"
              className="block w-full"
              aria-label={`Écouter : ${title}`}
            >
              <source src={audioSrc} type="audio/mpeg" />
              Ton navigateur ne prend pas en charge la lecture audio.
            </audio>
          </div>
        </section>
      ) : (
        /* Bouton permettant de rouvrir le lecteur */
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`Rouvrir le lecteur audio : ${title}`}
          title={`Rouvrir ${title}`}
          className="flex cursor-pointer items-center gap-3 rounded-full border border-[#F3D982] bg-white px-4 py-3 text-[#09264a] shadow-[0_8px_28px_rgba(9,38,74,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#fff9e9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98D00]"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ffedbd] text-[#09264a]">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 14v-3a8 8 0 0 1 16 0v3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <rect
                x="3"
                y="12"
                width="5"
                height="7"
                rx="2"
                fill="currentColor"
              />
              <rect
                x="16"
                y="12"
                width="5"
                height="7"
                rx="2"
                fill="currentColor"
              />
            </svg>
          </span>

          <span className="text-left">
            <span className="block text-sm font-extrabold">
              {title}
            </span>
            <span className="block text-xs text-[#748198]">
              Rouvrir le lecteur
            </span>
          </span>
        </button>
      )}
    </div>
  );
}