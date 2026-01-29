"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const Description: React.FC = () => {
  /* ========= VIDEO ========= */
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

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = Number(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    videoRef.current.requestFullscreen?.();
  };

  return (
    <section className="bg-white">
      {/* En-tête */}
      <div className="container pt-16">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[30px] text-sm font-semibold text-black">
            Compréhension orale
          </span>
          <h1 className="mt-3 text-[30px] text-black">
            Activité 1 — QCM vocal
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-base text-black/70 sm:text-lg">
            Appuie sur <strong>Démarrer</strong>. La prof pose la question à
            l’oral. Réponds au <strong>micro</strong> par “A / B / C / D”.
          </p>
        </div>
      </div>

      {/* 🎯 Vidéo CENTRÉE, EXACTEMENT comme dans l’autre fichier */}
      <div className="container mt-10">
        <div className="flex justify-center">
          <div className="w-full max-w-[720px]">
            
            {/* VIDEO */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-lg ring-1 ring-black/5">
              <video
                ref={videoRef}
                src="/videos/jeanactivity1.mp4"
                poster="/images/courses/teacher/wide-jean.png"
                className="h-full w-full object-cover bg-black"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                controls={false}
              />

              {/* BOUTON CENTRAL */}
              <button
                onClick={togglePlayPause}
                className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center 
                           rounded-full bg-black/60 text-2xl text-white backdrop-blur
                           hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
            </div>

            {/* BARRE DE PROGRESSION */}
            <div className="mt-3 space-y-2">
              <input
                type="range"
                min={0}
                max={duration}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full"
              />

              <div className="flex items-center justify-between text-sm text-black">
                <span>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <button
                  onClick={handleFullscreen}
                  className="rounded-md bg-black px-3 py-1 text-white hover:bg-black/80"
                >
                  ⛶ Plein écran
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;