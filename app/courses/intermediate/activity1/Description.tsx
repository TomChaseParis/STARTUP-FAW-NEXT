"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const Description: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const playVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
    setVideoPlaying(true);
    videoRef.current.onended = () => setVideoPlaying(false);
  };

  return (
    <section className="bg-white">
      {/* En-tête classique (comme avant) */}
      <div className="container pt-16">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block text-[30px] rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-black">
            Compréhension orale
          </span>
          <h1 className="mt-3 text-[30px] text-black font-bold">
            Activité 1 — Compréhension
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-base text-black/70 sm:text-lg">
            Regarde la vidéo, puis écoute la chanson et complète le texte.
          </p>
        </div>
      </div>

      {/* Vidéo */}
      <div className="container mt-10">
        <div className="flex justify-center">
          <div className="relative aspect-video w-full max-w-[640px] overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              controls={false}
              poster="/images/courses/video-poster.jpg"
            >
              <source src="/videos/holidays-sea.mp4" type="video/mp4" />
            </video>

            {!videoPlaying && (
              <button
                onClick={playVideo}
                className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                aria-label="Lire la vidéo"
                title="Lire la vidéo"
              >
                ▶
              </button>
            )}

            <div className="absolute bottom-2 left-2 rounded bg-white/80 px-2 py-1 text-xs font-medium text-black backdrop-blur">
              Tutoriel vidéo
            </div>
          </div>
        </div>
      </div>

      {/* Nouvelle section en dessous */}
      <div className="container mt-14">
        <div className="flex flex-col lg:flex-row items-start gap-6">
       

        
        </div>
      </div>
    </section>
  );
};

export default Description;
