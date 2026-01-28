"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import ImgTop from "@/public/images/courses/intermediate/vacancespicheader.png";

const Exercice: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);

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
    <section className="mt-12 bg-white pb-20">
      <div className="container mx-auto max-w-5xl text-center">
        {/* ================= CONSIGNE EXERCICE 1 ================= */}
        <div className="mx-auto mb-10 max-w-5xl rounded-xl bg-amber-50 p-6 text-left shadow-sm ring-1 ring-amber-200">
          <h3 className="mb-3 text-lg font-semibold text-black">
            ✍️ Exercice 1 — Compléter le tableau
          </h3>

          <p className="leading-relaxed text-black/80">
            Complétez le tableau en choisissant à chaque ligne parmi les trois
            réponses proposées
          </p>
        </div>
      </div>
    </section>
  );
};

export default Exercice;
