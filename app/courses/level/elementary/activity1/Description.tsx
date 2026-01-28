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
      {/* En-tête */}
      <div className="container pt-16">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block text-[30px] rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-black">
            Compréhension orale
          </span>
          <h1 className="mt-3 text-[30px] text-black">Activité 1 — QCM vocal</h1>
          <p className="mx-auto mt-3 max-w-3xl text-base text-black/70 sm:text-lg">
            Appuie sur <strong>Démarrer</strong>. La prof pose la question à l&apos;oral.
            Réponds au <strong>micro</strong> par “A / B / C / D” ou en disant le texte du choix.
            La correction est donnée immédiatement à la voix.
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
  src="/videos/jeanactivity1.mp4"
  className="h-full w-full object-cover bg-black"
  controls={false}
  poster="/images/courses/teacher/wide-jean.png"
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
                Élémentaire • A1
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
