"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import ImgTop from "@/public/images/courses/intermediate/vacancespicheader.png";
import ExerciceTable from "./ExerciceTable";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
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
    <>
      <section className="mt-12 bg-white pb-20">
        <div className="mx-auto max-w-5xl text-center"></div>
        {/* ================= EXERCICE 1 ================= */}

        <ExerciceTable />
      </section>
    </>
  );
};

export default Exercice;
