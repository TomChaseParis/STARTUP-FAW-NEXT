"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Exercice from "@/app/courses/level/beginner/activities/activity2/Exercice";

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

  /* ========= AUDIO ========= */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play();
      setAudioPlaying(true);
      audioRef.current.onended = () => setAudioPlaying(false);
    }
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
            Activité 2 — Écoute et réponds
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-base text-black/70 sm:text-lg">
            Regarde la vidéo, écoute l’audio, puis réponds aux questions à
            l’oral ou par écrit.
          </p>
        </div>
      </div>

      {/* 🎯 VIDÉO CENTRÉE EXACTEMENT COMME L’AUTRE FICHIER */}
      <div className="container mt-10">
        <div className="flex justify-center">
          <div className="w-full max-w-[720px]">
            {/* --- VIDEO CARD --- */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-lg ring-1 ring-black/5">
              <video
                ref={videoRef}
                src="/videos/marieactivity1.mp4"
                className="h-full w-full bg-black object-cover"
                controls={false}
                poster="/images/courses/teacher/wide-marie.png"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Bouton central Play / Pause */}
              <button
                onClick={togglePlayPause}
                className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-2xl text-white backdrop-blur hover:bg-black/50"
              >
                {isPlaying ? "⏸" : "▶"}
              </button>

              {/* Badge Tutoriel */}
              <div className="absolute bottom-2 left-2 rounded bg-white/80 px-2 py-1 text-xs font-medium text-black backdrop-blur">
                Tutoriel vidéo
              </div>
            </div>

            {/* --- Barre de progression --- */}
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

      {/* Cadre Audio */}
      <div className="container mt-14">
        <div className="mx-auto w-full max-w-2xl">
          <div className="relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">
            <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
              <h3 className="text-[18px] font-semibold text-black">
                ACTIVITÉ 1 — Écoute la conversation et choisis la bonne réponse
              </h3>
              <span className="rounded-md bg-amber-400 px-2 py-1 text-xs font-semibold text-black shadow">
                Audio
              </span>
            </div>

            <div className="px-5 py-5">
              <button
                onClick={toggleAudio}
                className="inline-flex items-center justify-center rounded-lg bg-black/80 px-5 py-2.5 text-white hover:bg-black/70"
              >
                {audioPlaying ? "⏸ Pause" : "▶ Écouter"}
              </button>
              <audio ref={audioRef} src="/audios/lunch.wav" />
              <p className="mt-3 text-sm text-black/60">
                Conseil : écoute une première fois, puis relance en notant les
                mots-clés utiles.
              </p>
            </div>

            <div className="absolute bottom-2 left-2 rounded bg-white/80 px-2 py-1 text-xs font-medium text-black backdrop-blur">
              Fichier audio
            </div>
          </div>
        </div>
      </div>

      {/* Exercice + Image */}
      <div className="container mt-14 pb-20">
        <div className="flex flex-wrap">
          <Exercice />

          <div className="mt-8 w-full px-6 lg:mt-0 lg:w-1/2">
            <div className="relative w-full overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">
              <Image
                src="/images/courses/breaklunch.png"
                alt="break lunch"
                width={900}
                height={600}
                className="h-auto w-full object-cover"
              />
              <div className="absolute left-3 top-3 rounded-md bg-amber-400 px-2 py-1 text-xs font-semibold text-black shadow">
                Contexte visuel
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
