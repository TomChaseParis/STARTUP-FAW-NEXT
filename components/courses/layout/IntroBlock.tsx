"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type MediaType = "video" | "audio" | "image";

type IntroBlockProps = {
  title: string;
  subtitle?: string;
  mediaType: MediaType;
  src: string;
  poster?: string;
};

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function IntroBlock({
  title,
  subtitle,
  mediaType,
  src,
  poster,
}: IntroBlockProps) {
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => {
    if (!mediaRef.current) return;

    if (mediaRef.current.paused) {
      mediaRef.current.play();
      setIsPlaying(true);
    } else {
      mediaRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!mediaRef.current) return;
    setCurrentTime(mediaRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!mediaRef.current) return;
    setDuration(mediaRef.current.duration);
  };

  return (
    <section className="container pt-16">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-2xl font-bold text-black">{title}</h1>
        {subtitle && <p className="mt-2 text-black/70">{subtitle}</p>}
      </div>

      <div className="mt-10 flex justify-center">
        <div className="w-full max-w-[720px]">
          {/* ================= VIDEO ================= */}
          {mediaType === "video" && (
            <>
              <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-lg">
                <video
                  ref={mediaRef as React.RefObject<HTMLVideoElement>}
                  src={src}
                  poster={poster}
                  className="h-full w-full object-cover"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                />

                <button
                  onClick={togglePlayPause}
                  className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-2xl text-white"
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
              </div>

              <div className="mt-3 space-y-2">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => {
                    if (!mediaRef.current) return;
                    const time = Number(e.target.value);
                    mediaRef.current.currentTime = time;
                    setCurrentTime(time);
                  }}
                  className="w-full"
                />

                <div className="text-sm text-black">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </>
          )}

          {/* ================= AUDIO ================= */}
          {mediaType === "audio" && (
            <div className="rounded-xl bg-white p-6 shadow">
              <audio
                ref={mediaRef as React.RefObject<HTMLAudioElement>}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />

              <button
                onClick={togglePlayPause}
                className="rounded-lg bg-black px-6 py-3 text-white"
              >
                {isPlaying ? "Pause" : "Écouter"}
              </button>
            </div>
          )}

          {/* ================= IMAGE ================= */}
          {mediaType === "image" && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src={src}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
