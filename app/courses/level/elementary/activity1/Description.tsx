"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

/* ========= Utilitaire format temps ========= */
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
      {/* ================= EN-TÊTE ================= */}
      <div className="container pt-16">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-black">
            Compréhension orale
          </span>
          <h1 className="mt-3 text-2xl font-bold text-black">
            Questions - Réponses
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-base text-black/70 sm:text-lg">
            Regarde la vidéo, puis écoute l&apos;audio et complète le texte.
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
                src="/videos/jean-preview1.mp4"
                poster="/images/courses/teacher/wide-jean.png"
                className="h-full w-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />

              {/* ===== BOUTON CENTRAL UNIQUE ===== */}
              <button
                onClick={togglePlayPause}
                className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center 
                           rounded-full bg-black/60 text-2xl text-white backdrop-blur
                           hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>

              <div className="absolute bottom-2 left-2 rounded bg-white/80 px-2 py-1 text-xs font-medium text-black backdrop-blur">
                Vidéo — Compréhension orale
              </div>
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

      {/* ================= OBJECTIFS & INFOS ================= */}
      <div className="container mt-12">
        <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-lg ring-1 ring-black/5">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Objectifs */}
            <div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                🎯 Objectifs
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-black/80">
                <li>Pratiquer les questions</li>
              </ul>
            </div>

            {/* Compétences */}
            <div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                🧠 Compétences mises en œuvre
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-black/80">
                <li>Compréhension écrite</li>
                <li>Compréhension orale</li>
              </ul>
            </div>

            {/* Prérequis */}
            <div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                📘 Prérequis
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-black/80">
                <li>Questions et mots interrogatifs</li>
                <li>Verbes au présent</li>
              </ul>
            </div>

            {/* Durée */}
            <div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                ⏱ Durée estimée
              </h3>
              <p className="text-black/80">
                Environ <strong>20 minutes</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONSIGNE EXERCICE 1 ================= */}
      <div className="mx-auto mb-10 mt-[140px] max-w-5xl rounded-xl bg-amber-50 p-6 text-left shadow-sm ring-1 ring-amber-200">
        <h3 className="mb-3 text-lg font-semibold text-black">
          ✍️ Exercice — Testez vos connaissances en choisissant la bonne réponse à chaque question.
        </h3>

        <p className="leading-relaxed text-black/80">
          Écoutez le texte et conjuguez tous les verbes à la troisième personne
          du pluriel.
          <br />
          Exemple : Les jeunes _______ (passer) beaucoup de temps sur internet.
        </p>

        <p className="mt-3 text-black/80">
          <strong>
            Attention : La marque du pluriel (–ent) ne s&apos;entend pas à
            l&apos;oral !
          </strong>
        </p>
      </div>
    </section>
  );
};

export default Description;
