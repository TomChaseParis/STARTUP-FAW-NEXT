"use client";

import React, { useRef, useState, useEffect } from "react";

type AudioActivityCardProps = {
  title: string;
  audioSrc: string;
  hint?: string;
};

const AudioActivityCard: React.FC<AudioActivityCardProps> = ({
  title,
  audioSrc,
  hint = "Conseil : écoute une première fois, puis relance en notant les mots-clés utiles.",
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  /* ---- Lecture / Pause ---- */
  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);

      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  /* ---- Mise à jour du curseur ---- */
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);
  };

  const handleChangeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Number(e.target.value);
    setProgress(Number(e.target.value));
  };

  /* ---- Récupération durée ---- */
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  return (
    <div className="container mt-14">
      <div className="mx-auto w-full max-w-2xl">
        <div className="relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
            <h3 className="text-[18px] font-semibold text-black">
              {title}
            </h3>
            <span className="rounded-md bg-amber-400 px-2 py-1 text-xs font-semibold text-black shadow">
              Audio
            </span>
          </div>

          {/* Contenu */}
          <div className="px-5 py-5 space-y-4">

            {/* Button */}
            <button
              onClick={toggleAudio}
              className="inline-flex items-center justify-center rounded-lg bg-black/80 px-5 py-2.5 text-white hover:bg-black/70"
            >
              {isPlaying ? "⏸ Pause" : "▶ Écouter"}
            </button>

            {/* Audio */}
            <audio
              ref={audioRef}
              src={audioSrc}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />

            {/* Curseur */}
            <input
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={progress}
              onChange={handleChangeProgress}
              className="w-full"
            />

            <p className="text-sm text-black/60">{hint}</p>
          </div>

          {/* Badge */}
          <div className="absolute bottom-2 left-2 rounded bg-white/80 px-2 py-1 text-xs font-medium text-black backdrop-blur">
            Fichier audio
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioActivityCard;
