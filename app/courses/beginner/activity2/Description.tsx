"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Exercice from "@/app/courses/beginner/activity2/Exercice";

/**
 * Description (Actaivité 2) — Cohérente avec l'activité 1
 * - Header avec badge amber, titre noir, sous-titre gris
 * - Carte vidéo avec overlay Play (custom), chip “Tutoriel vidéo”
 * - Carte image avec chip amber
 * - Cadre audio stylé (bouton noir/80 comme Play)
 * - Exercice importé en bas avec la même grammaire visuelle
 */

const Description: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const playVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
    setVideoPlaying(true);
    videoRef.current.onended = () => setVideoPlaying(false);
  };

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
          <span className="inline-block text-[30px] rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-black">
            Compréhension orale
          </span>
          <h1 className="mt-3 text-[30px] text-black">
            Activité 2 — Écoute et réponds
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-base text-black/70 sm:text-lg">
            Regarde la vidéo, écoute l’audio, puis réponds aux questions à l’oral ou par écrit.
          </p>
        </div>
      </div>

      {/* Vidéo + Image */}
      <div className="container mt-10">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* Vidéo */}
          <div className="flex justify-center">
            <div className="relative aspect-video w-full max-w-[640px] overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
              <video
  ref={videoRef}
  src="/videos/videoexo.mp4"
  className="h-full w-full object-contain bg-black"
  controls={false}
  poster="/images/courses/teacher/proffemme.png"
/>
                {!videoPlaying && (
                  <button
                    onClick={playVideo}
                    className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    aria-label="Lire la vidéo"
                  >
                    ▶
                  </button>
                )}
                <div className="absolute bottom-2 left-2 rounded bg-white/80 px-2 py-1 text-xs font-medium text-black backdrop-blur">
                  Tutoriel vidéo
                </div>
              </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[420px] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">
              <Image
                src="/images/courses/headeractivity.png"
                alt="professeur"
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
                className="inline-flex items-center justify-center rounded-lg bg-black/80 px-5 py-2.5 text-white backdrop-blur hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                {audioPlaying ? "⏸︎ Pause" : "▶ Écouter"}
              </button>
              <audio ref={audioRef} src="/audios/lunch.wav" />
              <p className="mt-3 text-sm text-black/60">
                Conseil : écoute une première fois, puis relance en notant les mots-clés utiles.
              </p>
            </div>
            <div className="absolute bottom-2 left-2 rounded bg-white/80 px-2 py-1 text-xs font-medium text-black backdrop-blur">
              Fichier audio
            </div>
          </div>
        </div>
      </div>

      {/* Exercice + Image latérale */}
      <div className="container mt-14 pb-20">
        <div className="flex flex-wrap">
          {/* Colonne Quiz */}
          <Exercice />

          {/* Colonne Image */}
          <div className="w-full lg:w-1/2 px-6 mt-8 lg:mt-0">
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
