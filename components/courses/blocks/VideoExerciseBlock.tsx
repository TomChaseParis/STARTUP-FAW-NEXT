"use client";

import { useEffect, useRef, useState } from "react";

type VideoExerciseBlockProps = {
  videoSrc: string;
  poster: string;
};

export default function VideoExerciseBlock({
  videoSrc,
  poster,
}: VideoExerciseBlockProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showUi, setShowUi] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (time: number) => {
    if (!time || Number.isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  const revealUi = () => {
    setShowUi(true);

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    if (videoRef.current && !videoRef.current.paused) {
      hideTimeoutRef.current = setTimeout(() => {
        setShowUi(false);
      }, 1800);
    }
  };

  const play = async () => {
    if (!videoRef.current) return;

    await videoRef.current.play();
    setIsPlaying(true);
    revealUi();
  };

  const pause = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    setIsPlaying(false);
    setShowUi(true);
  };

  const togglePlay = async () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      await play();
    } else {
      pause();
    }
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;

    const next = Math.min(
      Math.max(videoRef.current.currentTime + seconds, 0),
      duration
    );

    videoRef.current.currentTime = next;
    setCurrentTime(next);
    revealUi();
  };

  const toggleFullscreen = async () => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      await videoRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current || !duration) return;

    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;

    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    revealUi();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => setDuration(video.duration || 0);
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => {
      setIsPlaying(false);
      setShowUi(true);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setShowUi(true);
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  const progressPercent = duration
    ? (currentTime / duration) * 100
    : 0;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div
        className="
          group relative overflow-hidden rounded-[2rem]
          bg-black
          shadow-[0_35px_100px_rgba(15,23,42,0.22)]
          ring-1 ring-black/5
        "
        onMouseMove={revealUi}
        onMouseEnter={revealUi}
        onClick={revealUi}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          className="h-[280px] w-full object-cover md:h-[620px]"
          playsInline
          onClick={togglePlay}
        />

        <div
          className={`
            pointer-events-none absolute inset-0
            bg-gradient-to-t from-black/35 via-transparent to-black/10
            transition-opacity duration-500
            ${showUi ? "opacity-100" : "opacity-40"}
          `}
        />

        {/* DOUBLE TAP ZONES */}
        <div className="absolute inset-0 grid grid-cols-2">
          <button
            onDoubleClick={() => skip(-10)}
            className="h-full w-full"
            aria-label="Reculer"
          />
          <button
            onDoubleClick={() => skip(10)}
            className="h-full w-full"
            aria-label="Avancer"
          />
        </div>

        {/* CENTRAL PLAY / PAUSE */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center
            transition-all duration-500
            ${
              showUi
                ? "opacity-100 scale-100"
                : "pointer-events-none opacity-0 scale-90"
            }
          `}
        >
          <button
            onClick={togglePlay}
            className="
              flex h-24 w-24 items-center justify-center
              rounded-full
              border border-white/20
              bg-white/10
              backdrop-blur-2xl
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
              transition-all duration-300
              hover:scale-110
            "
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5h3v14H8zM13 5h3v14h-3z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-10 w-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* BOTTOM UI */}
        <div
          className={`
            absolute bottom-0 left-0 right-0 px-6 pb-6
            transition-all duration-500
            ${
              showUi
                ? "opacity-100 translate-y-0"
                : "pointer-events-none opacity-0 translate-y-6"
            }
          `}
        >
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium tracking-wide text-white/90">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <div
              ref={progressRef}
              onClick={handleSeek}
              className="
                h-2.5 flex-1 cursor-pointer overflow-hidden
                rounded-full bg-white/20
                backdrop-blur-sm
              "
            >
              <div
                className="
                  relative h-full rounded-full
                  bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500
                "
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-lg" />
              </div>
            </div>

            <button
              onClick={toggleFullscreen}
              className="
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-2xl
                border border-white/15
                bg-black/20
                backdrop-blur-xl
                transition hover:scale-105
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}