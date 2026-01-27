"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

// --- Test principal avec verbes ---
const Test: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoPlaying(true);
      videoRef.current.onended = () => setVideoPlaying(false);
    }
  };

  // Fonction pour jouer un audio
  const playAudio = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

  return (
    <>
    <section>
          <h1 className="text-black text-center font-semibold text-[40px] pb-12">GRAMMAIRE</h1>

  {/* --- Vidéo gauche et photo Benoittime droite alignées 50/50 --- */}
      <div className="mt-10 flex flex-col lg:flex-row justify-center items-start px-6 gap-6">
        
        {/* Colonne vidéo */}
        <div className="w-full lg:w-1/2 flex justify-center items-start">
          <div className="relative aspect-video w-full max-w-[300px]">
            <video
              ref={videoRef}
              src="/videos/videoexo.mp4"
              className="w-full h-auto rounded-lg shadow-lg"
              controls={false}
            />
            {!videoPlaying && (
              <button
                onClick={playVideo}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold rounded-lg hover:bg-opacity-30 transition"
              >
                ▶ Play
              </button>
            )}
          </div>
        </div>

        {/* Colonne photo */}
        <div className="w-full lg:w-1/2 flex justify-center items-start">
          <Image
            src="/images/courses/benoittime.png"
            alt="benoittime"
            width={400}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      {/* VERBES */}
      <div className="flex flex-col items-center pt-10 space-y-10">
        <h1 className="text-2xl font-bold text-black">ÊTRE, AVOIR, ALLER, FAIRE</h1>

        <div className="grid grid-cols-2 gap-20 justify-items-center text-lg">
          {/* ÊTRE */}
          <div className="text-center">
            <h4 className="text-black font-bold mb-4 text-[20px]">ÊTRE</h4>
            <ul className="list-decimal text-black space-y-1">
              <li>Je <span className="font-bold">suis</span></li>
              <li>Tu <span className="font-bold">es</span></li>
              <li>Il <span className="font-bold">est</span></li>
              <li>Nous <span className="font-bold">sommes</span></li>
              <li>Vous <span className="font-bold">êtes</span></li>
              <li>Ils <span className="font-bold">sont</span></li>
            </ul>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
              onClick={() => playAudio("/audios/etre.mp3")}
            >
              ÉCOUTER
            </button>
          </div>

          {/* AVOIR */}
          <div className="text-center">
            <h4 className="text-black font-bold mb-4 text-[20px]">AVOIR</h4>
            <ul className="list-decimal text-black space-y-1">
              <li>J<span className="font-bold">ai</span></li>
              <li>Tu <span className="font-bold">as</span></li>
              <li>Il <span className="font-bold">a</span></li>
              <li>Nous <span className="font-bold">avons</span></li>
              <li>Vous <span className="font-bold">avez</span></li>
              <li>Ils <span className="font-bold">ont</span></li>
            </ul>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
              onClick={() => playAudio("/audios/avoir.mp3")}
            >
              ÉCOUTER
            </button>
          </div>

          {/* FAIRE */}
          <div className="text-center">
            <h4 className="text-black font-bold mb-4 text-[20px]">FAIRE</h4>
            <ul className="list-decimal text-black space-y-1">
              <li>Je <span className="font-bold">fais</span></li>
              <li>Tu <span className="font-bold">fais</span></li>
              <li>Il <span className="font-bold">fait</span></li>
              <li>Nous <span className="font-bold">faisons</span></li>
              <li>Vous <span className="font-bold">faites</span></li>
              <li>Ils <span className="font-bold">font</span></li>
            </ul>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
              onClick={() => playAudio("/audios/faire.mp3")}
            >
              ÉCOUTER
            </button>
          </div>

          {/* ALLER */}
          <div className="text-center">
            <h4 className="text-black font-bold mb-4 text-[20px]">ALLER</h4>
            <ul className="list-decimal text-black space-y-1">
              <li>Je <span className="font-bold">vais</span></li>
              <li>Tu <span className="font-bold">vas</span></li>
              <li>Il <span className="font-bold">va</span></li>
              <li>Nous <span className="font-bold">allons</span></li>
              <li>Vous <span className="font-bold">allez</span></li>
              <li>Ils <span className="font-bold">vont</span></li>
            </ul>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
              onClick={() => playAudio("/audios/aller.mp3")}
            >
              ÉCOUTER
            </button>
          </div>
        </div>
      </div>

      {/* On insère TestTwo en bas */}
      <div className="mt-20 w-full">
      </div>
    </section>
    
    </>
  );
};

export default Test;
