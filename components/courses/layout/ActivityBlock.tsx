"use client";

import { useRef, useState } from "react";

import InfoBlock from "./InfoBlock";

type ActivityBlockProps = {
  contentType?: "lesson" | "activity";
  level: string;
  title: string;
  description?: string;
  videoSrc: string;
  poster?: string;
  info?: {
    objectifs?: string[];
    competences?: string[];
    prerequis?: string[];
    duree?: string;
  };
  children?: React.ReactNode;
  onVideoEnded?: () => void;
};

const LEVEL_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
  }
> = {
  beginner: {
    label: "Débutant",
    color: "#E09F00",
  },
  "elementary-1": {
    label: "Élémentaire 1",
    color: "#57CC99",
  },
  "elementary-2": {
    label: "Élémentaire 2",
    color: "#31572C",
  },
  "intermediate-1": {
    label: "Intermédiaire 1",
    color: "#38BDF8",
  },
  "intermediate-2": {
    label: "Intermédiaire 2",
    color: "#B9A0F8",
  },
  advanced: {
    label: "Avancé",
    color: "#C7443E",
  },
};

export default function ActivityBlock({
  contentType = "lesson",
  level,
  title,
  description,
  videoSrc,
  poster,
  info,
  children,
  onVideoEnded,
}: ActivityBlockProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const levelConfig = LEVEL_CONFIG[level] ?? LEVEL_CONFIG.beginner;
  const isActivity = contentType === "activity";

  const handleVideoEnded = () => {
    setIsPlaying(false);
    onVideoEnded?.();
  };

  return (
    <section className="space-y-12 bg-[#FCFCFC] pb-4 sm:space-y-14">
      {/* HEADER */}

      <div className="container">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <div
            className="pointer-events-none absolute left-1/2 top-[-55px] -z-10 h-44 w-72 -translate-x-1/2 rounded-full blur-3xl"
            style={{
              backgroundColor: `${levelConfig.color}20`,
            }}
          />

          {/* IDENTITÉ DU CONTENU + TITRE */}

          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(260px,0.85fr)_minmax(0,1.5fr)] md:gap-8">
            {/* BLOC GAUCHE — TYPE ET NIVEAU */}

            <div className="flex justify-center md:justify-start">
              <div
                className="relative flex w-fit max-w-full items-center gap-4 overflow-hidden rounded-full py-3 pl-3 pr-6 sm:gap-5 sm:py-4 sm:pr-8"
                style={{
                  backgroundColor: `${levelConfig.color}20`,
                }}
              >
                {/* ICÔNE */}

                <div
                  className="relative z-10 flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full shadow-sm sm:h-[88px] sm:w-[88px]"
                  style={{
                    backgroundColor: levelConfig.color,
                  }}
                >
                  {isActivity ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-10 w-10 sm:h-12 sm:w-12"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="5" y="3" width="14" height="18" rx="1.5" />
                      <path d="M9 7h6M9 11h6M9 15h3" />
                      <path d="m8 3 1 2 2-2" />
                      <path d="m8 11 1 1 2-2" />
                      <path d="m8 15 1 1 2-2" />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-10 w-10 sm:h-12 sm:w-12"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                      <path d="M8 7h8M8 11h8M8 15h5" />
                    </svg>
                  )}
                </div>

                {/* LIBELLÉ ET NIVEAU */}

                <div className="relative z-10 flex min-w-0 flex-col items-start gap-2">
                  <span
                    className="text-xl font-black uppercase leading-none tracking-tight sm:text-2xl"
                    style={{
                      color: levelConfig.color,
                    }}
                  >
                    {isActivity ? "Activité" : "Leçon"}
                  </span>

                  <span
                    className="inline-flex max-w-full items-center rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase leading-tight tracking-[0.08em] text-white sm:px-4 sm:text-xs"
                    style={{
                      backgroundColor: levelConfig.color,
                    }}
                  >
                    {levelConfig.label}
                  </span>
                </div>

                {/* ACCENT DÉCORATIF */}

                <div
                  aria-hidden="true"
                  className="absolute right-5 top-1 h-5 w-5 rounded-full opacity-30 blur-md"
                  style={{
                    backgroundColor: levelConfig.color,
                  }}
                />
              </div>
            </div>

            {/* BLOC DROIT — NOM DE L'ACTIVITÉ OU DE LA LEÇON */}

            <div className="min-w-0 text-center md:pl-2 md:text-left">
              <h1 className="text-3xl font-black leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl">
                {title}
              </h1>

              {description && (
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  {description}
                </p>
              )}

              <div
                className="mx-auto mt-6 h-1 w-16 rounded-full md:mx-0"
                style={{
                  backgroundColor: levelConfig.color,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ENCADRÉ UNIQUE — VIDÉO + INFORMATIONS */}

      <div className="container">
        <div
          className="grid grid-cols-1 items-center gap-6 overflow-hidden rounded-[28px] border p-4 shadow-[0_16px_45px_rgba(15,23,42,0.07)] sm:p-6 lg:grid-cols-2 lg:gap-8 lg:p-8"
          style={{
            backgroundColor: `${levelConfig.color}12`,
            borderColor: `${levelConfig.color}45`,
          }}
        >
          {/* COLONNE GAUCHE — VIDÉO */}

          <div className="min-w-0">
            <div className="relative aspect-video overflow-hidden rounded-[20px] border border-black/10 bg-black shadow-md">
              <video
                ref={videoRef}
                src={videoSrc}
                poster={poster}
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={handleVideoEnded}
              >
                Ton navigateur ne supporte pas la lecture vidéo.
              </video>
            </div>
          </div>

          {/* COLONNE DROITE — INFORMATIONS PÉDAGOGIQUES */}

          {info && (
            <div className="min-w-0 lg:pl-2">
              <div className="mb-6 flex flex-col items-center">
                <div
                  className="mb-4 h-1 w-12 rounded-full"
                  style={{
                    backgroundColor: levelConfig.color,
                  }}
                />

                <h2
                  className="text-center text-xl font-black tracking-tight sm:text-2xl"
                  style={{
                    color: levelConfig.color,
                  }}
                >
                  Au programme
                </h2>
              </div>

              <InfoBlock {...info} accentColor={levelConfig.color} />
            </div>
          )}
        </div>
      </div>

      {/* CONTENU PÉDAGOGIQUE */}

      {children && <div className="container">{children}</div>}
    </section>
  );
}