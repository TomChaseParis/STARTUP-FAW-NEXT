
"use client";

import { useRef, useState } from "react";

type FloatingVideoPlayerProps = {
  videoSrc: string;
  poster?: string;
  title?: string;
  hint?: string;
};

export default function FloatingVideoPlayer({
  videoSrc,
  poster,
  title = "La journée de Clara",
  hint = "Revois la vidéo à tout moment pendant les exercices.",
}: FloatingVideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMinimize = () => {
    // Met en pause sans réinitialiser la position de lecture.
    videoRef.current?.pause();
    setIsOpen(false);
  };

  const handleReopen = () => {
    setIsOpen(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] w-auto max-w-[calc(100vw-2rem)] sm:bottom-6 sm:right-6">
      {/* LECTEUR VIDÉO */}
      <section
        aria-label="Lecteur vidéo flottant"
        aria-hidden={!isOpen}
        className={`w-[min(380px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#C8D6C3] bg-white shadow-[0_12px_40px_rgba(9,38,74,0.20)] ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {/* EN-TÊTE */}
        <div className="flex items-center justify-between gap-3 border-b border-[#D9E4D4] bg-[#F3F7F0] px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#31572C] text-white">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="m10 9 5 3-5 3V9Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="m-0 truncate text-sm font-extrabold text-[#09264a]">
                {title}
              </p>
              <p className="m-0 text-xs text-[#748198]">
                Lecteur vidéo
              </p>
            </div>
          </div>

          {/* RÉDUIRE */}
          <button
            type="button"
            onClick={handleMinimize}
            aria-label="Réduire le lecteur vidéo"
            title="Réduire"
            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-[#C8D6C3] bg-white text-[#31572C] transition-colors hover:bg-[#EAF0E7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31572C]"
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

        {/* VIDÉO */}
        <div className="p-3 sm:p-4">
          <p className="mb-3 text-xs leading-relaxed text-[#748198]">
            {hint}
          </p>

          <div className="overflow-hidden rounded-xl bg-black shadow-sm">
            <video
              ref={videoRef}
              controls
              playsInline
              preload="metadata"
              poster={poster}
              className="block aspect-video w-full"
              aria-label={`Regarder : ${title}`}
            >
              <source src={videoSrc} type="video/mp4" />
              Ton navigateur ne prend pas en charge la lecture vidéo.
            </video>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs font-medium text-[#31572C]">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            Disponible pendant toute l&apos;activité
          </div>
        </div>
      </section>

      {/* BOUTON POUR ROUVRIR */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleReopen}
          aria-label={`Rouvrir le lecteur vidéo : ${title}`}
          title={`Rouvrir ${title}`}
          className="flex cursor-pointer items-center gap-3 rounded-full border border-[#C8D6C3] bg-white px-4 py-3 text-[#09264a] shadow-[0_8px_28px_rgba(9,38,74,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#F3F7F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31572C]"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#31572C] text-white">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m9 6 10 6-10 6V6Z"
                fill="currentColor"
              />
            </svg>
          </span>

          <span className="text-left">
            <span className="block text-sm font-extrabold">
              {title}
            </span>
            <span className="block text-xs text-[#748198]">
              Rouvrir la vidéo
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
