"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import VerbCard from "@/components/Courses/Activity/VerbCard";

/* ========= Utilitaire temps ========= */
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

  const ensureAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    return audioRef.current!;
  };

  const playAudio = async (src: string) => {
    try {
      const audio = ensureAudio();
      audio.src = src;
      audio.currentTime = 0;
      await audio.play();
    } catch (e) {
      console.warn("Audio play error:", e);
    }
  };

  return (
    <section className="bg-white">
      {/* ================= EN-TÊTE ================= */}
      <div className="container pt-16">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-black">
            Grammaire
          </span>
          <h1 className="mt-3 text-2xl font-semibold text-black">
            Les 4 verbes essentiels : Être – Avoir – Faire – Aller
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-base text-black/70">
            Regarde la vidéo d’abord, puis écoute et répète les conjugaisons.
          </p>
        </div>
      </div>

      {/* ================= VIDÉO ================= */}
      <div className="container mt-10">
        <div className="flex justify-center">
          <div className="w-full max-w-[720px]">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-lg ring-1 ring-black/5">
              <video
                ref={videoRef}
                src="/videos/marieactivity1.mp4"
                poster="/images/courses/teacher/wide-marie.png"
                className="h-full w-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />

              {/* ===== BOUTON CENTRAL UNIQUE ===== */}
              <button
                onClick={togglePlayPause}
                className="absolute  inset-0 m-auto flex h-16 w-16 items-center justify-center 
                           rounded-full bg-black/60 text-2xl text-white backdrop-blur
                           hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
            </div>

            {/* ================= PROGRESSION ================= */}
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

      {/* ================= IMAGE ================= */}
      <div className="container mt-10 flex justify-center">
        <div className="relative w-full max-w-[420px] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">
          <Image
            src="/images/courses/benoittime.png"
            alt="benoittime"
            width={420}
            height={420}
            className="h-auto w-full object-cover"
            priority
          />
          <div className="absolute left-3 top-3 rounded-md bg-amber-400 px-2 py-1 text-xs font-semibold text-black shadow">
            Débutant • A1
          </div>
        </div>
      </div>

      {/* ================= VERBES ================= */}
      <div className="container mt-14">
        <h2 className="mb-6 text-center text-2xl font-bold text-black">
          ÊTRE – AVOIR – FAIRE – ALLER
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <VerbCard
            title="ÊTRE"
            forms={[
              "Je suis",
              "Tu es",
              "Il/Elle est",
              "Nous sommes",
              "Vous êtes",
              "Ils/Elles sont",
            ]}
            onPlay={() => playAudio("/audios/etre.mp3")}
          />

          <VerbCard
            title="AVOIR"
            forms={[
              "J’ai",
              "Tu as",
              "Il/Elle a",
              "Nous avons",
              "Vous avez",
              "Ils/Elles ont",
            ]}
            onPlay={() => playAudio("/audios/avoir.mp3")}
          />

          <VerbCard
            title="FAIRE"
            forms={[
              "Je fais",
              "Tu fais",
              "Il/Elle fait",
              "Nous faisons",
              "Vous faites",
              "Ils/Elles font",
            ]}
            onPlay={() => playAudio("/audios/faire.mp3")}
          />

          <VerbCard
            title="ALLER"
            forms={[
              "Je vais",
              "Tu vas",
              "Il/Elle va",
              "Nous allons",
              "Vous allez",
              "Ils/Elles vont",
            ]}
            onPlay={() => playAudio("/audios/aller.mp3")}
          />
        </div>
      </div>
    </section>
  );
};

export default Description;
