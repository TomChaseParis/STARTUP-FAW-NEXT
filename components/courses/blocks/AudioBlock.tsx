"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

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
    badge: "bg-gradient-to-r from-amber-300 to-yellow-400 text-slate-900",
    progress: "bg-gradient-to-r from-amber-400 to-yellow-500",
    glow: "shadow-[0_20px_50px_rgba(245,158,11,0.18)]",
    button:
      "bg-gradient-to-br from-amber-300 via-yellow-300 to-amber-400 text-slate-900 shadow-[0_15px_35px_rgba(245,158,11,0.35)]",
    pulse: "bg-amber-300/40",
    overlay: "from-black/40 via-black/10 to-transparent",
  },
  blue: {
    bg: "bg-gradient-to-br from-blue-50 via-white to-blue-100",
    border: "border-blue-200",
    badge: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
    progress: "bg-gradient-to-r from-blue-500 to-cyan-500",
    glow: "shadow-[0_20px_50px_rgba(59,130,246,0.18)]",
    button:
      "bg-gradient-to-br from-blue-400 to-cyan-500 text-white shadow-[0_15px_35px_rgba(59,130,246,0.35)]",
    pulse: "bg-blue-300/40",
    overlay: "from-black/40 via-black/10 to-transparent",
  },
  violet: {
    bg: "bg-gradient-to-br from-violet-50 via-white to-violet-100",
    border: "border-violet-200",
    badge: "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white",
    progress: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    glow: "shadow-[0_20px_50px_rgba(139,92,246,0.18)]",
    button:
      "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-[0_15px_35px_rgba(139,92,246,0.35)]",
    pulse: "bg-violet-300/40",
    overlay: "from-black/40 via-black/10 to-transparent",
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const theme = themes[levelColor];

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      setProgress(audio.currentTime);
    };

    const setMeta = () => {
      setDuration(audio.duration);
    };

    const onEnd = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", setMeta);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", setMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;

    audio.currentTime = percent * duration;
  };

  const formatTime = (time: number) => {
    if (!time) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="mx-auto max-w-5xl  pb-10">
      <div
        className={`
          group overflow-hidden rounded-3xl border
          ${theme.border}
          ${theme.bg}
          ${theme.glow}
          transition-all duration-300
          hover:-translate-y-1
        `}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
          {/* IMAGE */}
          <div className="relative h-[260px] overflow-hidden md:h-full md:min-h-[420px]">
            {imageSrc ? (
              <>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="
                    object-cover
                    transition-transform duration-700
                    group-hover:scale-105
                  "
                />

                <div
                  className={`
                    absolute inset-0 bg-gradient-to-t
                    ${theme.overlay}
                  `}
                />

                {/* Equalizer décoratif */}
                {isPlaying && (
                  <div className="absolute bottom-6 left-6 flex items-end gap-1">
                    {[18, 30, 22, 36, 26].map((h, i) => (
                      <span
                        key={i}
                        className="w-1.5 rounded-full bg-white/80 animate-pulse"
                        style={{
                          height: `${h}px`,
                          animationDelay: `${i * 150}ms`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div
                className="
                  flex h-full items-center justify-center
                  bg-gradient-to-br from-slate-100 to-slate-200
                "
              >
                <div className="text-7xl opacity-40">🎧</div>
              </div>
            )}
          </div>

          {/* PLAYER */}
          <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
            {/* HEADER */}
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Ressource audio
                </p>

              
              </div>

              <span
                className={`
                  rounded-full px-4 py-2
                  text-xs font-bold uppercase tracking-wide
                  shadow-sm
                  ${theme.badge}
                `}
              >
                {badge}
              </span>
            </div>

            {/* PLAYER CENTER */}
            <div className="flex flex-col items-center gap-8">
              <button
                onClick={toggleAudio}
                aria-label="Lecture audio"
                className={`
                  relative flex h-24 w-24 items-center justify-center
                  rounded-full transition-all duration-300
                  active:scale-95
                  ${theme.button}
                  ${isPlaying ? "scale-110" : "hover:scale-105"}
                `}
              >
                {/* pulse */}
                {isPlaying && (
                  <>
                    <span
                      className={`
                        absolute inset-0 rounded-full animate-ping
                        ${theme.pulse}
                      `}
                    />
                    <span
                      className={`
                        absolute -inset-3 rounded-full animate-ping
                        ${theme.pulse}
                      `}
                      style={{ animationDelay: "250ms" }}
                    />
                  </>
                )}

                <div className="relative z-10 text-3xl">
                  {isPlaying ? "⏸" : "▶"}
                </div>
              </button>

              {/* PROGRESS */}
              <div className="w-full">
                <div
                  onClick={handleSeek}
                  className="
                    relative h-3 w-full cursor-pointer overflow-hidden
                    rounded-full bg-white/80 shadow-inner
                  "
                >
                  <div
                    className={`
                      h-full rounded-full transition-all duration-200
                      ${theme.progress}
                    `}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="mt-3 flex justify-between text-sm font-medium text-slate-500">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* STATUS */}
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700">
                  {isPlaying ? "🎧 Lecture en cours" : "Prêt à écouter"}
                </p>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {tip}
                </p>
              </div>
            </div>

            <audio ref={audioRef} src={audioSrc} />
          </div>
        </div>
      </div>
    </div>
  );
}