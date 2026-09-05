"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type AudioBlockProps = {
  audioSrc: string;
  badge?: string;
  tip?: string;
  imageSrc?: string;
  imageAlt?: string;
  levelColor?: "amber" | "blue" | "violet";
};

const themes = {
  amber: {
    bg: "bg-gradient-to-br from-amber-50 via-white to-amber-100",
    border: "border-amber-200",
    badge:
      "bg-gradient-to-r from-amber-300 to-yellow-400 text-slate-900",
    progress:
      "bg-gradient-to-r from-amber-400 to-yellow-500",
    glow:
      "shadow-[0_20px_50px_rgba(245,158,11,0.18)]",
    button:
      "bg-gradient-to-br from-amber-300 via-yellow-300 to-amber-400 text-slate-900 shadow-[0_15px_35px_rgba(245,158,11,0.35)]",
    pulse: "bg-amber-300/40",
    overlay:
      "from-black/40 via-black/10 to-transparent",
  },

  blue: {
    bg: "bg-gradient-to-br from-blue-50 via-white to-blue-100",
    border: "border-blue-200",
    badge:
      "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
    progress:
      "bg-gradient-to-r from-blue-500 to-cyan-500",
    glow:
      "shadow-[0_20px_50px_rgba(59,130,246,0.18)]",
    button:
      "bg-gradient-to-br from-blue-400 to-cyan-500 text-white shadow-[0_15px_35px_rgba(59,130,246,0.35)]",
    pulse: "bg-blue-300/40",
    overlay:
      "from-black/40 via-black/10 to-transparent",
  },

  violet: {
    bg: "bg-gradient-to-br from-violet-50 via-white to-violet-100",
    border: "border-violet-200",
    badge:
      "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white",
    progress:
      "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    glow:
      "shadow-[0_20px_50px_rgba(139,92,246,0.18)]",
    button:
      "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-[0_15px_35px_rgba(139,92,246,0.35)]",
    pulse: "bg-violet-300/40",
    overlay:
      "from-black/40 via-black/10 to-transparent",
  },
};

export default function AudioBlock({
  audioSrc,
  badge = "Audio",
  tip = "Écoute attentivement avant de continuer.",
  imageSrc,
  imageAlt = "Illustration pédagogique",
  levelColor = "amber",
}: AudioBlockProps) {
  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const animationFrameRef =
    useRef<number | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const theme = themes[levelColor];

  /* =========================================================
     PROGRESSION FLUIDE
  ========================================================= */

  const updateProgress = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setProgress(audio.currentTime);

    if (!audio.paused && !audio.ended) {
      animationFrameRef.current =
        requestAnimationFrame(updateProgress);
    }
  };

  const startProgressAnimation = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(
        animationFrameRef.current,
      );
    }

    animationFrameRef.current =
      requestAnimationFrame(updateProgress);
  };

  const stopProgressAnimation = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(
        animationFrameRef.current,
      );

      animationFrameRef.current = null;
    }
  };

  /* =========================================================
     LECTURE / PAUSE
  ========================================================= */

  const toggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error(
        "Impossible de lire l'audio :",
        error,
      );

      setIsPlaying(false);
      stopProgressAnimation();
    }
  };

  /* =========================================================
     EVENTS AUDIO
  ========================================================= */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetadata = () => {
      if (
        Number.isFinite(audio.duration) &&
        audio.duration > 0
      ) {
        setDuration(audio.duration);
      }
    };

    const handleDurationChange = () => {
      if (
        Number.isFinite(audio.duration) &&
        audio.duration > 0
      ) {
        setDuration(audio.duration);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      startProgressAnimation();
    };

    const handlePause = () => {
      setIsPlaying(false);
      stopProgressAnimation();

      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      stopProgressAnimation();

      setProgress(0);
    };

    const handleError = () => {
      setIsPlaying(false);
      stopProgressAnimation();
    };

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata,
    );

    audio.addEventListener(
      "durationchange",
      handleDurationChange,
    );

    audio.addEventListener(
      "play",
      handlePlay,
    );

    audio.addEventListener(
      "pause",
      handlePause,
    );

    audio.addEventListener(
      "ended",
      handleEnded,
    );

    audio.addEventListener(
      "error",
      handleError,
    );

    /*
     * Au cas où les métadonnées sont déjà chargées
     * lorsque le composant monte.
     */
    if (
      Number.isFinite(audio.duration) &&
      audio.duration > 0
    ) {
      setDuration(audio.duration);
    }

    return () => {
      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata,
      );

      audio.removeEventListener(
        "durationchange",
        handleDurationChange,
      );

      audio.removeEventListener(
        "play",
        handlePlay,
      );

      audio.removeEventListener(
        "pause",
        handlePause,
      );

      audio.removeEventListener(
        "ended",
        handleEnded,
      );

      audio.removeEventListener(
        "error",
        handleError,
      );

      stopProgressAnimation();
    };
  }, []);

  /* =========================================================
     SEEK
  ========================================================= */

  const handleSeek = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    const audio = audioRef.current;

    if (!audio || !duration) return;

    const rect =
      e.currentTarget.getBoundingClientRect();

    const percent =
      (e.clientX - rect.left) /
      rect.width;

    const clampedPercent = Math.max(
      0,
      Math.min(1, percent),
    );

    const newTime =
      clampedPercent * duration;

    audio.currentTime = newTime;

    setProgress(newTime);
  };

  /* =========================================================
     TIME
  ========================================================= */

  const formatTime = (
    time: number,
  ) => {
    if (
      !Number.isFinite(time) ||
      time <= 0
    ) {
      return "0:00";
    }

    const minutes =
      Math.floor(time / 60);

    const seconds =
      Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  const progressPercent =
    duration > 0
      ? Math.min(
          100,
          (progress / duration) * 100,
        )
      : 0;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="mx-auto max-w-5xl pb-10">
      <div
        className={`
          group
          overflow-hidden
          rounded-3xl
          border
          ${theme.border}
          ${theme.bg}
          ${theme.glow}
          transition-all
          duration-300
          hover:-translate-y-1
        `}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="relative h-[260px] overflow-hidden md:h-full md:min-h-[420px]">
            {imageSrc ? (
              <>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="
                    (max-width: 768px) 100vw,
                    55vw
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div
                  className={`
                    absolute
                    inset-0
                    bg-gradient-to-t
                    ${theme.overlay}
                  `}
                />

                {/* =================================================
                    EQUALIZER
                ================================================= */}

                {isPlaying && (
                  <div
                    className="
                      absolute
                      bottom-6
                      left-6
                      z-20
                      flex
                      items-end
                      gap-1
                    "
                  >
                    {[18, 30, 22, 36, 26].map(
                      (height, index) => (
                        <span
                          key={index}
                          className="
                            w-1.5
                            animate-pulse
                            rounded-full
                            bg-white/80
                          "
                          style={{
                            height: `${height}px`,
                            animationDelay:
                              `${index * 150}ms`,
                          }}
                        />
                      ),
                    )}
                  </div>
                )}
              </>
            ) : (
              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                  bg-gradient-to-br
                  from-slate-100
                  to-slate-200
                "
              >
                <div className="text-7xl opacity-40">
                  🎧
                </div>
              </div>
            )}
          </div>

          {/* =================================================
              PLAYER
          ================================================= */}

          <div
            className="
              flex
              flex-col
              justify-center
              p-6
              sm:p-8
              md:p-10
            "
          >
            {/* =================================================
                HEADER
            ================================================= */}

            <div
              className="
                mb-8
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div>
                <p
                  className="
                    mb-3
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-slate-500
                  "
                >
                  Ressource audio
                </p>
              </div>

              <span
                className={`
                  rounded-full
                  px-4
                  py-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  shadow-sm
                  ${theme.badge}
                `}
              >
                {badge}
              </span>
            </div>

            {/* =================================================
                PLAYER CENTER
            ================================================= */}

            <div
              className="
                flex
                flex-col
                items-center
                gap-8
              "
            >
              {/* =================================================
                  PLAY / PAUSE
              ================================================= */}

              <button
                type="button"
                onClick={toggleAudio}
                aria-label={
                  isPlaying
                    ? "Mettre en pause"
                    : "Lire l'audio"
                }
                className={`
                  relative
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  transition-all
                  duration-300
                  active:scale-95
                  ${theme.button}
                  ${
                    isPlaying
                      ? "scale-110"
                      : "hover:scale-105"
                  }
                `}
              >
                {/* Pulsations */}

                {isPlaying && (
                  <>
                    <span
                      className={`
                        absolute
                        inset-0
                        animate-ping
                        rounded-full
                        ${theme.pulse}
                      `}
                    />

                    <span
                      className={`
                        absolute
                        -inset-3
                        animate-ping
                        rounded-full
                        ${theme.pulse}
                      `}
                      style={{
                        animationDelay:
                          "250ms",
                      }}
                    />
                  </>
                )}

                {/* Icône */}

                {isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="
                      relative
                      z-10
                      h-8
                      w-8
                    "
                    aria-hidden="true"
                  >
                    <path d="M6.5 5.5A1.5 1.5 0 0 1 8 7v10a1.5 1.5 0 0 1-3 0V7a1.5 1.5 0 0 1 1.5-1.5Zm11 0A1.5 1.5 0 0 1 19 7v10a1.5 1.5 0 0 1-3 0V7a1.5 1.5 0 0 1 1.5-1.5Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="
                      relative
                      z-10
                      ml-1
                      h-8
                      w-8
                    "
                    aria-hidden="true"
                  >
                    <path d="M8.5 5.2a1.5 1.5 0 0 1 2.35-1.23l8.4 6.8a1.57 1.57 0 0 1 0 2.46l-8.4 6.8A1.5 1.5 0 0 1 8.5 18.8V5.2Z" />
                  </svg>
                )}
              </button>

              {/* =================================================
                  PROGRESS
              ================================================= */}

              <div className="w-full">
                <div
                  onClick={handleSeek}
                  role="slider"
                  aria-label="Progression audio"
                  aria-valuemin={0}
                  aria-valuemax={duration || 0}
                  aria-valuenow={progress}
                  className="
                    relative
                    h-3
                    w-full
                    cursor-pointer
                    overflow-hidden
                    rounded-full
                    bg-white/80
                    shadow-inner
                  "
                >
                  <div
                    className={`
                      h-full
                      rounded-full
                      ${theme.progress}
                    `}
                    style={{
                      width: `${progressPercent}%`,
                    }}
                  />
                </div>

                {/* =================================================
                    TEMPS
                ================================================= */}

                <div
                  className="
                    mt-3
                    flex
                    justify-between
                    text-sm
                    font-medium
                    text-slate-500
                  "
                >
                  <span>
                    {formatTime(progress)}
                  </span>

                  <span>
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* =================================================
                  STATUS
              ================================================= */}

              <div className="text-center">
                <p
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  {isPlaying
                    ? "🎧 Lecture en cours"
                    : "Prêt à écouter"}
                </p>

             
              </div>
            </div>

            {/* =================================================
                AUDIO
            ================================================= */}

            <audio
              ref={audioRef}
              src={audioSrc}
              preload="metadata"
            />
          </div>
        </div>
      </div>
    </div>
  );
}