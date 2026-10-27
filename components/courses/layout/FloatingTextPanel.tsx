
"use client";

import { useState } from "react";

type FloatingTextPanelProps = {
  text: string;
  title?: string;
  hint?: string;
};

export default function FloatingTextPanel({
  text,
  title = "Texte de Bruno",
  hint = "Relis le texte pour transformer les phrases à la troisième personne.",
}: FloatingTextPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-4 right-4 z-[100] w-auto max-w-[calc(100vw-2rem)] sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section
          aria-label="Texte de référence flottant"
          className="w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#F3D982] bg-white shadow-[0_12px_40px_rgba(9,38,74,0.20)]"
        >
          {/* En-tête : même style que le lecteur audio */}
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
                    d="M6 3.75h8l4 4V20a1.25 1.25 0 0 1-1.25 1.25h-10.5A1.25 1.25 0 0 1 5 20V5a1.25 1.25 0 0 1 1-1.25Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 4v4h4M8 12h8M8 15.5h8M8 19h5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="min-w-0">
                <p className="m-0 truncate text-sm font-extrabold text-[#09264a]">
                  {title}
                </p>
                <p className="m-0 text-xs text-[#748198]">
                  Texte de référence
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Réduire le texte de référence"
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

          {/* Consigne */}
          <div className="border-b border-[#F3D982]/70 px-4 py-3">
            <p className="m-0 text-sm leading-relaxed text-[#183352]">
              {hint}
            </p>
          </div>

          {/* Texte défilant */}
          <div
            className="max-h-[min(48vh,420px)] overflow-y-auto overscroll-contain px-4 py-4 sm:max-h-[420px]"
            tabIndex={0}
            aria-label="Texte complet de Bruno à transformer"
          >
            <div className="space-y-3 text-sm leading-6 text-[#183352]">
              {text
                .split(/\n\s*\n/)
                .filter((paragraph) => paragraph.trim().length > 0)
                .map((paragraph, index) => (
                  <p key={index} className="m-0">
                    {paragraph.trim()}
                  </p>
                ))}
            </div>
          </div>
        </section>
      ) : (
        /* Bouton pour rouvrir le panneau */
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`Rouvrir le texte de référence : ${title}`}
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
                d="M6 3.75h8l4 4V20a1.25 1.25 0 0 1-1.25 1.25h-10.5A1.25 1.25 0 0 1 5 20V5a1.25 1.25 0 0 1 1-1.25Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M14 4v4h4M8 12h8M8 15.5h8M8 19h5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span className="text-left">
            <span className="block text-sm font-extrabold">
              {title}
            </span>
            <span className="block text-xs text-[#748198]">
              Rouvrir le texte
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
