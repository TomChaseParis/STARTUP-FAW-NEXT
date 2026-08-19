"use client";

import { useRef, useState } from "react";
import InfoBlock from "./InfoBlock";

type LessonBlockProps = {
  badge?: string; // ✅ optionnel
  title: string;
  description?: string;
  videoSrc: string;
  poster?: string;
  badgeColor?: string;
  info?: {
    objectifs?: string[];
    competences?: string[];
    prerequis?: string[];
    duree?: string;
  };
  children?: React.ReactNode;
};

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function LessonBlock({
  badge,
  badgeColor = "bg-amber-100",
  title,
  description,
  videoSrc,
  poster,
  info,
  children,
}: LessonBlockProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="space-y-14 bg-white">
      {/* HEADER */}
      <div className="container">
        <div className="mx-auto max-w-5xl text-center">
          {badge && (
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-white ${badgeColor}`}
            >
              {badge}
            </span>
          )}
          <h1 className="mt-3 text-2xl font-semibold text-black">{title}</h1>

          {description && (
            <p className="mx-auto mt-3 max-w-3xl text-base text-black/70">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* VIDEO */}
      <div className="container">
        <div className="flex justify-center">
          <div className="w-full max-w-[720px]">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-lg ring-1 ring-black/5">
              <video
                ref={videoRef}
                src={videoSrc}
                poster={poster}
                className="h-full w-full object-cover"
                onTimeUpdate={() =>
                  setCurrentTime(videoRef.current?.currentTime || 0)
                }
                onLoadedMetadata={() =>
                  setDuration(videoRef.current?.duration || 0)
                }
                onEnded={() => setIsPlaying(false)}
              />

              <button
                onClick={togglePlayPause}
                className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-2xl text-white backdrop-blur hover:bg-black/50"
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
            </div>

            {/* PROGRESSION */}
            <div className="mt-3 space-y-2">
              <input
                type="range"
                min={0}
                max={duration}
                step={0.1}
                value={currentTime}
                onChange={(e) => {
                  if (!videoRef.current) return;
                  const time = Number(e.target.value);
                  videoRef.current.currentTime = time;
                  setCurrentTime(time);
                }}
                className="w-full"
              />

              <div className="flex items-center justify-between text-sm text-black">
                <span>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <button
                  onClick={() => videoRef.current?.requestFullscreen?.()}
                  className="rounded-md bg-black px-3 py-1 text-white hover:bg-black/80"
                >
                  ⛶ Plein écran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INFO BLOCK AUTOMATIQUE */}
      {info && (
        <div className="container">
          <InfoBlock {...info} />
        </div>
      )}

      {/* CONTENU PEDAGOGIQUE */}
      {children && <div className="container">{children}</div>}
    </section>
  );
}
