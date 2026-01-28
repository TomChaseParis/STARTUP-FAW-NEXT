"use client";

import { useRef, useState } from "react";

const Audio: React.FC = () => {
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
        {/* Image + Bouton Audio */}
        <div className="mb-12 flex flex-col items-center justify-center gap-10 md:flex-row">
          {/* Cadre Audio */}
          <div className="w-full max-w-md">
            <div className="relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">
              <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                <h3 className="text-[18px] font-semibold text-black">
                  Écoute la conversation
                </h3>
                <span className="rounded-md bg-red-400 px-2 py-1 text-xs font-semibold text-black shadow">
                  Audio
                </span>
              </div>
              <div className="px-5 py-5 text-center">
                <button
                  onClick={toggleAudio}
                  className="inline-flex items-center justify-center rounded-lg bg-black/80 px-6 py-2.5 text-[16px] font-medium text-white backdrop-blur hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                  {audioPlaying ? "⏸︎ Pause" : "▶ Écouter"}
                </button>
                <audio
                  ref={audioRef}
                  src="/audios/courses/beginner/audioactivity3.mp3"
                />
                <p className="mt-3 text-sm italic text-slate-500"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Audio;
