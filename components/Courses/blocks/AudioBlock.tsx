"use client";

import { useRef, useState } from "react";

type AudioBlockProps = {
  title: string;
  audioSrc: string;
  badge?: string;
  tip?: string;
  levelColor?: string; // amber | red | blue | etc
};

export default function AudioBlock({
  title,
  audioSrc,
  badge = "Audio",
  tip,
  levelColor = "amber",
}: AudioBlockProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={`
          relative overflow-hidden rounded-xl bg-white shadow-lg
          ring-1 ring-${levelColor}-200
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <h3 className="text-[18px] font-semibold text-black">
            {title}
          </h3>

          <span
            className={`
              rounded-md px-2 py-1 text-xs font-semibold text-black shadow
              bg-${levelColor}-400
            `}
          >
            {badge}
          </span>
        </div>

        {/* BODY */}
        <div className="px-5 py-5 text-center">
          <button
            onClick={toggleAudio}
            className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-2.5 text-[16px] font-medium text-white transition hover:bg-black/90"
          >
            {isPlaying ? "⏸ Pause" : "▶ Écouter"}
          </button>

          <audio ref={audioRef} src={audioSrc} />

          {tip && (
            <p className="mt-3 text-sm text-black/60">
              {tip}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
