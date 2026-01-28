"use client";

import { useRef, useState } from "react";

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
      <div className="container pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block text-[22px] rounded-full bg-amber-100 px-3 py-1 font-semibold text-black">
            Niveau Élémentaire 2
          </span>
          <h1 className="mt-3 text-[28px] text-black font-bold">
            Activité 1 — L’emploi du temps mouvementé de Clara
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-black/70 sm:text-lg">
            Dans cette activité, vous allez découvrir la journée quotidienne de Clara, une jeune Parisienne.
            Ce sera l’occasion de revoir les heures, les moments de la journée, les verbes pronominaux et la conjugaison
            au présent, puis de pratiquer les questions.
          </p>
        </div>
      </div>

      {/* Vidéo du professeur */}
      <div className="container mt-10">
        <div className="flex justify-center">
          <div className="relative aspect-video w-full max-w-[720px] overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
            <video
              ref={videoRef}
              src="/videos/ireneactivity1.mp4"
              className="h-full w-full object-cover bg-black"
              controls={false}
              poster="/images/courses/teacher/wide-irene.png"
            />
            {!videoPlaying && (
              <button
                onClick={playVideo}
                className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/50"
              >
                ▶
              </button>
            )}
            <div className="absolute bottom-2 left-2 rounded bg-white/80 px-2 py-1 text-xs font-medium text-black">
              Tutoriel vidéo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
