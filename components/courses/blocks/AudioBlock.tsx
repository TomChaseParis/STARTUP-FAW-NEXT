"use client";

import { useRef, useState, useEffect } from "react";

type AudioBlockProps = {
  title: string;
  audioSrc: string;
  badge?: string;
  tip?: string;
  levelColor?: string;
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
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // ▶️ play / pause
  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // ⏱ update progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      setProgress(audio.currentTime);
    };

    const setMeta = () => {
      setDuration(audio.duration);
    };

    const onEnd = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", setMeta);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", setMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  // 🎯 seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;

    audio.currentTime = percent * duration;
  };

  // 🕒 format time
  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progressPercent = duration
    ? (progress / duration) * 100
    : 0;

  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={`
          rounded-3xl p-6
          bg-gradient-to-br from-${levelColor}-50 via-white to-${levelColor}-100
          shadow-xl border border-${levelColor}-200
        `}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-black">
            {title}
          </h3>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold bg-${levelColor}-400`}
          >
            {badge}
          </span>
        </div>

        {/* PLAYER */}
        <div className="flex flex-col items-center gap-6">

          {/* BUTTON */}
          <button
            onClick={toggleAudio}
            className={`
              w-20 h-20 rounded-full text-2xl
              flex items-center justify-center
              shadow-lg transition-all
              ${
                isPlaying
                  ? "bg-black text-white scale-110"
                  : "bg-white text-black hover:scale-105"
              }
            `}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          {/* PROGRESS BAR */}
          <div className="w-full max-w-md">

            <div
              onClick={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-full cursor-pointer overflow-hidden"
            >
              <div
                className="h-full bg-black transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* TIME */}
            <div className="flex justify-between text-xs text-black/60 mt-2">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* STATUS */}
          <div className="text-sm text-black/70">
            {isPlaying ? "Lecture en cours..." : "Clique pour écouter"}
          </div>

        </div>

        <audio ref={audioRef} src={audioSrc} />

     
      </div>
    </div>
  );
}