"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import TeacherComicBubble from "../common/teacher/TeacherComicBubble";

type VerbCardProps = {
  title: string;
  forms: string[];
  onPlay: () => void;
  isPlaying?: boolean;
  currentTime?: number;
  timings?: number[];
  hasListenedOnce?: boolean;
};

const verbImages: Record<string, string> = {
  ÊTRE: "/images/courses/beginner/activities/activity1/asset-etre.png",
  AVOIR: "/images/courses/beginner/activities/activity1/asset-avoir.png",
  FAIRE: "/images/courses/beginner/activities/activity1/asset-faire.png",
  ALLER: "/images/courses/beginner/activities/activity1/asset-aller.png",
};

const imagePositions: Record<string, string> = {
  ÊTRE: "50% center",
  AVOIR: "43% center",
  FAIRE: "36% center",
  ALLER: "50% center",
};

const VerbCard: React.FC<VerbCardProps> = ({
  title,
  forms,
  onPlay,
  isPlaying = false,
  currentTime = 0,
  timings = [0, 2, 4, 6, 8, 10],
  hasListenedOnce = false,
}) => {
  const [showPhoto, setShowPhoto] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [hideTeacher, setHideTeacher] = useState(false);

  const normalizedTitle = title.trim().toUpperCase();
  const imageSrc = verbImages[normalizedTitle];

  const showMarie =
    normalizedTitle === "ÊTRE" && !hasListenedOnce && !hideTeacher;

    useEffect(() => {
      setShowPhoto(false);
      setShowBubble(false);
    
      if (!showMarie) return;
    
      // Marie et sa bulle apparaissent simultanément.
      const timeout = window.setTimeout(() => {
        setShowPhoto(true);
        setShowBubble(true);
      }, 500);
    
      return () => {
        window.clearTimeout(timeout);
      };
    }, [showMarie]);
  useEffect(() => {
    setHideTeacher(false);
  }, [normalizedTitle]);

  const activeIndex = (() => {
    if (!isPlaying) return -1;

    return timings.findIndex((start, index) => {
      const next = timings[index + 1];

      return (
        currentTime >= start &&
        (next === undefined || currentTime < next)
      );
    });
  })();

  const handleAudioClick = () => {
    setHideTeacher(true);
    onPlay();
  };

  return (
    <div
    className="
    group relative mx-auto w-full min-w-0 max-w-full
    overflow-visible rounded-3xl
    border border-white/80 bg-white/95
    shadow-[0_8px_30px_rgba(15,23,42,0.06)]
    backdrop-blur-md
    transition-all duration-300
    hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]
  "
    >
      {/* DÉCORATION */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-slate-100/60 blur-2xl" />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="relative grid w-full min-w-0 max-w-full grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* IMAGE DU VERBE */}
        {imageSrc && (
          <div className="relative aspect-[0.86] w-full min-w-0 overflow-hidden bg-slate-100 lg:aspect-auto lg:min-h-[320px]">
            <Image
              src={imageSrc}
              alt={`Illustration du verbe ${title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-700"
              style={{
                objectPosition:
                  imagePositions[normalizedTitle] ?? "50% center",
              }}
              priority
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        )}

        {/* PARTIE DROITE */}
        <div className="relative w-full min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-7">
          {/* HEADER */}
          <div className="flex w-full min-w-0 items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Verbe
              </p>

              <h3 className="break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {title}
              </h3>
            </div>

            {/* MARIE ET BOUTON AUDIO */}
            <div className="relative flex w-[min(58%,280px)] shrink-0 flex-col items-center">
              {/* MARIE ET SA BULLE EN SUPERPOSITION */}
              <div
                className="pointer-events-none absolute bottom-full right-0 z-20 mb-2 w-full"
                aria-hidden={!showMarie}
              >
                <div className={showMarie ? "visible" : "invisible"}>
                  <TeacherComicBubble
                    className="w-full items-center gap-2"
                    message="Clique ici pour écouter la conjugaison"
                    showPhoto={showPhoto && showMarie}
                    showBubble={showBubble && showMarie}
                  />
                </div>
              </div>

              {/* BOUTON AUDIO : POSITION INITIALE CONSERVÉE */}
              <div className="mt-2 flex w-full items-center justify-center gap-2">
             

                <button
                  type="button"
                  onClick={handleAudioClick}
                  disabled={isPlaying}
                  aria-label={
                    isPlaying
                      ? `Lecture de ${title} en cours`
                      : `Écouter ${title}`
                  }
                  aria-busy={isPlaying}
                  className={`
                    group/audio relative flex h-14 w-14 shrink-0
                    items-center justify-center rounded-full border
                    transition-all duration-300
                    ${
                      isPlaying
                        ? "cursor-not-allowed border-amber-200 bg-amber-50 text-amber-600"
                        : showMarie
                          ? "animate-[audioAttention_1.4s_ease-in-out_infinite] border-amber-300 bg-amber-50 text-amber-500 hover:border-amber-400 hover:bg-amber-100"
                          : "border-slate-200 bg-white text-amber-500 shadow-[0_8px_25px_rgba(15,23,42,0.10)] hover:-translate-y-1 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600 hover:shadow-[0_14px_35px_rgba(245,158,11,0.20)] active:translate-y-0"
                    }
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className={`relative z-10 h-6 w-6 transition-transform duration-300 ${
                      isPlaying
                        ? "scale-90 opacity-70"
                        : "ml-0.5 group-hover/audio:scale-110"
                    }`}
                  >
                    <path d="M8.5 5.2a1 1 0 0 1 1.54-.84l8.4 6.8a1.08 1.08 0 0 1 0 1.68l-8.4 6.8A1 1 0 0 1 8.5 18.8V5.2Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* SÉPARATEUR */}
          <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent sm:my-7" />

          {/* CONJUGAISON */}
          <div className="w-full min-w-0">
            <p className="mb-4 break-words text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Conjugaison au présent
            </p>

            <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
              {forms.map((form, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={index}
                    className={`
                      flex min-h-[62px] w-full min-w-0 items-center
                      rounded-2xl px-4 py-4 transition-all duration-300 sm:px-5
                      ${
                        isActive
                          ? "border border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 shadow-[0_8px_20px_rgba(34,197,94,0.18)]"
                          : "border border-slate-100 bg-gradient-to-br from-slate-50 to-white hover:border-amber-100 hover:shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
                      }
                    `}
                  >
                    <p
                      className={`
                        min-w-0 break-words text-base font-medium leading-relaxed
                        transition-all duration-300
                        ${
                          isActive
                            ? "font-bold text-green-700"
                            : "text-slate-700"
                        }
                      `}
                    >
                      {form}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ANIMATION DU BOUTON AUDIO */}
      <style jsx>{`
        @keyframes audioAttention {
          0%,
          100% {
            box-shadow:
              0 0 0 4px rgba(245, 158, 11, 0.12),
              0 0 12px rgba(245, 158, 11, 0.25);
            opacity: 1;
          }

          50% {
            box-shadow:
              0 0 0 8px rgba(245, 158, 11, 0.22),
              0 0 30px rgba(245, 158, 11, 0.55);
            opacity: 0.85;
          }
        }
      `}</style>
    </div>
  );
};

export default VerbCard;