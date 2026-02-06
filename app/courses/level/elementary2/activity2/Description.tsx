
"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import AudioActivityCard from "@/components/Courses/Activity/AudioActivityCard";

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
            La famille déménage
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
                src="/videos/ireneactivity2.mp4"
                poster="/images/courses/teacher/wide-irene.png"
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
                <li>Parler d’un déménagement</li>
              </ul>
            </div>

            {/* Compétences */}
            <div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                🧠 Compétences mises en œuvre
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-black/80">
                <li>Compréhension orale</li>
                <li>Réécriture guidée / transformation grammaticale</li>
                <li>Phonie / graphie</li>
                <li>Phonétique</li>
              </ul>
            </div>

            {/* Prérequis */}
            <div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                📘 Prérequis
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-black/80">
                <li>Le vocabulaire du logement</li>
                <li>Verbes au présent, au passé composé et au futur simple</li>
              </ul>
            </div>

            {/* Durée */}
            <div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                ⏱ Durée estimée
              </h3>
              <p className="text-black/80">
                Environ <strong>35 minutes</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* -------- CONSIGNE -------- */}
      <div className="mx-auto mb-10 mt-[40px] max-w-5xl rounded-xl bg-amber-50 p-6 shadow-sm ring-1 ring-amber-200">
        <h3 className="mb-4 text-lg font-semibold text-black">
          ✍️ EPISODE 1 : « LE NOUVEAU LOGEMENT »
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* COLONNE GAUCHE : TEXTE */}
          <div>
            <p className="leading-relaxed text-black/80">
              Écoutez le texte et complétez avec les verbes suivants au bon
              temps et à la bonne personne :
            </p>

            <ul className="mt-4 list-disc space-y-1 pl-6 text-black/80">
              <li>Travailler (présent)</li>
              <li>Décider (passé composé)</li>
              <li>Demander (présent)</li>
              <li>Savoir (présent)</li>
              <li>Trouver (passé composé)</li>
              <li>Pouvoir (futur)</li>
              <li>Rentrer (présent)</li>
              <li>Avoir (futur)</li>
            </ul>
          </div>

          {/* COLONNE DROITE : IMAGE */}
          <div className="flex items-center justify-center">
            <div className="relative h-48 w-full md:h-60 md:w-[420px] lg:w-[500px]">
              <Image
                src="/images/courses/elementary2/activity2/header1.png"
                alt="Illustration logement"
                width={800}
                height={600}
                className="h-full w-full rounded-xl object-cover shadow-lg ring-1 ring-black/10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <AudioActivityCard
          title="La famille déménage — Écoute l&apos;audio"
          audioSrc="/audios/courses/elementary/audioloisirs.mp3"
        />
      </div>
    </section>
  );
};

export default Description;
