"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type AudioPlayerProps = {
  src: string;
  badge?: string;
  title?: string;
  image?: string;
  accentClassName?: string;
};

export default function AudioPlayer({
  src,
  badge = "Dialogue",
  title = "Écouter le dialogue",
  image,
  accentClassName = "bg-amber-400",
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  /* ========================================================= */
  /* PLAY / PAUSE                                               */
  /* ========================================================= */

  const toggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error(
        "Impossible de lire l'audio :",
        error,
      );

      setIsPlaying(false);
    }
  };

  /* ========================================================= */
  /* ÉVÉNEMENTS AUDIO                                           */
  /* ========================================================= */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleLoadedMetadata = () => {
      if (
        Number.isFinite(audio.duration) &&
        audio.duration > 0
      ) {
        setDuration(audio.duration);
      }
    };

    const handleDurationChange = () => {
      if (
        Number.isFinite(audio.duration) &&
        audio.duration > 0
      ) {
        setDuration(audio.duration);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      audio.currentTime = 0;
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleError = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata,
    );

    audio.addEventListener(
      "durationchange",
      handleDurationChange,
    );

    audio.addEventListener(
      "play",
      handlePlay,
    );

    audio.addEventListener(
      "pause",
      handlePause,
    );

    audio.addEventListener(
      "ended",
      handleEnded,
    );

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate,
    );

    audio.addEventListener(
      "error",
      handleError,
    );

    /*
     * Si les métadonnées sont déjà chargées
     * au moment du montage.
     */
    if (
      Number.isFinite(audio.duration) &&
      audio.duration > 0
    ) {
      setDuration(audio.duration);
    }

    return () => {
      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata,
      );

      audio.removeEventListener(
        "durationchange",
        handleDurationChange,
      );

      audio.removeEventListener(
        "play",
        handlePlay,
      );

      audio.removeEventListener(
        "pause",
        handlePause,
      );

      audio.removeEventListener(
        "ended",
        handleEnded,
      );

      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate,
      );

      audio.removeEventListener(
        "error",
        handleError,
      );
    };
  }, []);

  /* ========================================================= */
  /* RESET SI LE SRC CHANGE                                     */
  /* ========================================================= */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;

    setIsPlaying(false);
    setProgress(0);
    setDuration(0);

    /*
     * Recharge les métadonnées du nouvel audio.
     */
    audio.load();
  }, [src]);

  /* ========================================================= */
  /* SEEK                                                       */
  /* ========================================================= */

  const handleSeek = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const audio = audioRef.current;

    if (!audio || !duration) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const percent = Math.max(
      0,
      Math.min(
        1,
        (event.clientX - rect.left) /
          rect.width,
      ),
    );

    const newTime = percent * duration;

    audio.currentTime = newTime;

    setProgress(newTime);
  };

  /* ========================================================= */
  /* FORMAT TEMPS                                               */
  /* ========================================================= */

  const formatTime = (time: number) => {
    if (
      !Number.isFinite(time) ||
      time <= 0
    ) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  /* ========================================================= */
  /* PROGRESSION                                                */
  /* ========================================================= */

  const progressPercent =
    duration > 0
      ? Math.min(
          100,
          Math.max(
            0,
            (progress / duration) * 100,
          ),
        )
      : 0;

  /* ========================================================= */
  /* RENDER                                                     */
  /* ========================================================= */

  return (
    <div
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-[24px]
        border
        border-slate-200/80
        bg-white
        shadow-[0_10px_30px_rgba(15,23,42,0.07)]
        transition-all
        duration-300
        hover:border-slate-300
        hover:shadow-[0_18px_45px_rgba(15,23,42,0.11)]
      "
    >
      {/* ===================================================== */}
      {/* LUEUR DÉCORATIVE                                      */}
      {/* ===================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          -right-20
          -top-24
          h-56
          w-56
          rounded-full
          ${accentClassName}
          opacity-[0.07]
          blur-3xl
        `}
      />

      {/* ===================================================== */}
      {/* LIGNE ACCENT                                           */}
      {/* ===================================================== */}

      <div
        className={`
          absolute
          inset-x-0
          top-0
          z-30
          h-[3px]
          ${accentClassName}
          opacity-80
        `}
      />

      {/* ===================================================== */}
      {/* CONTENU PRINCIPAL                                      */}
      {/* ===================================================== */}

      <div className="relative flex min-h-[126px] items-stretch">

        {/* =================================================== */}
        {/* IMAGE                                                */}
        {/* =================================================== */}

        {image && (
         <div
         className="
           relative
           w-[145px]
           shrink-0
           overflow-hidden
           border-r
           border-slate-200/80
           bg-slate-100
           sm:w-[180px]
           md:w-[200px]
           lg:w-[220px]
         "
       >
            <div
              className={`
                pointer-events-none
                absolute
                inset-0
                ${accentClassName}
                opacity-[0.05]
              `}
            />

            <Image
              src={image}
              alt="Professeure"
              fill
              unoptimized
              className="
                relative
                z-10
                h-full
                w-full
                object-cover
                object-center
                transition-transform
                duration-700
                group-hover:scale-[1.025]
              "
            />

            {/* Dégradé inférieur */}

            <div
              className="
                pointer-events-none
                absolute
                inset-x-0
                bottom-0
                z-20
                h-16
                bg-gradient-to-t
                from-black/25
                to-transparent
              "
            />

            {/* ================================================= */}
            {/* INDICATEUR DE LECTURE SUR L'IMAGE                */}
            {/* ================================================= */}

            {isPlaying && (
              <div
                className="
                  absolute
                  bottom-3
                  left-1/2
                  z-30
                  flex
                  -translate-x-1/2
                  items-center
                  gap-1
                  rounded-full
                  border
                  border-white/60
                  bg-white/90
                  px-2.5
                  py-1.5
                  shadow-[0_5px_15px_rgba(15,23,42,0.18)]
                  backdrop-blur-md
                "
              >
                <span
                  className={`
                    h-1.5
                    w-1.5
                    rounded-full
                    ${accentClassName}
                    animate-pulse
                  `}
                />

                <span
                  className={`
                    h-3
                    w-1.5
                    rounded-full
                    ${accentClassName}
                    animate-pulse
                  `}
                />

                <span
                  className={`
                    h-2
                    w-1.5
                    rounded-full
                    ${accentClassName}
                    animate-pulse
                  `}
                />

                <span
                  className={`
                    h-1.5
                    w-1.5
                    rounded-full
                    ${accentClassName}
                    animate-pulse
                  `}
                />
              </div>
            )}
          </div>
        )}

        {/* =================================================== */}
        {/* ZONE AUDIO                                          */}
        {/* =================================================== */}

        <div
          className="
            relative
            min-w-0
            flex-1
            p-4
            sm:p-5
            md:p-6
          "
        >

          {/* ================================================= */}
          {/* HEADER                                             */}
          {/* ================================================= */}

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">

              {/* Badge */}

              <div className="flex items-center gap-2">
                <span
                  className={`
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                    ${accentClassName}
                    ${
                      isPlaying
                        ? "animate-pulse"
                        : ""
                    }
                  `}
                />

                <p
                  className="
                    truncate
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.2em]
                    text-slate-400
                  "
                >
                  {badge}
                </p>
              </div>

              {/* Titre */}

              <p
                className="
                  mt-1
                  truncate
                  text-sm
                  font-bold
                  tracking-[-0.01em]
                  text-slate-900
                  sm:text-[15px]
                "
              >
                {isPlaying
                  ? "Lecture en cours"
                  : title}
              </p>
            </div>

            {/* Temps */}

            <div
              className={`
                shrink-0
                rounded-full
                border
                px-2.5
                py-1
                text-[10px]
                font-semibold
                tabular-nums
                transition-colors
                sm:text-[11px]
                ${
                  isPlaying
                    ? "border-slate-300 bg-slate-100 text-slate-700"
                    : "border-slate-200 bg-slate-50 text-slate-500"
                }
              `}
            >
              {formatTime(progress)} /{" "}
              {formatTime(duration)}
            </div>
          </div>

          {/* ================================================= */}
          {/* LECTEUR                                            */}
          {/* ================================================= */}

          <div className="mt-5 flex items-center gap-3">

            {/* ================================================= */}
            {/* PLAY / PAUSE                                      */}
            {/* ================================================= */}

            <button
              type="button"
              onClick={toggleAudio}
              aria-label={
                isPlaying
                  ? "Mettre en pause"
                  : "Lire le dialogue"
              }
              className={`
                group/play
                relative
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                ${accentClassName}
                text-slate-950
                shadow-[0_7px_18px_rgba(15,23,42,0.15)]
                transition-all
                duration-200
                hover:scale-105
                hover:shadow-[0_10px_24px_rgba(15,23,42,0.20)]
                active:scale-95
              `}
            >
              {/* Halo */}

              {isPlaying && (
                <span
                  className={`
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-full
                    ${accentClassName}
                    opacity-30
                    animate-ping
                  `}
                />
              )}

              {/* Icône pause */}

              {isPlaying ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="
                    relative
                    z-10
                    h-5
                    w-5
                  "
                  aria-hidden="true"
                >
                  <path d="M7 5.5A1.5 1.5 0 0 1 8.5 7v10a1.5 1.5 0 1 1-3 0V7A1.5 1.5 0 0 1 7 5.5Zm10 0A1.5 1.5 0 0 1 18.5 7v10a1.5 1.5 0 1 1-3 0V7A1.5 1.5 0 0 1 17 5.5Z" />
                </svg>
              ) : (
                /* Icône lecture */

                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="
                    relative
                    z-10
                    ml-0.5
                    h-5
                    w-5
                    transition-transform
                    duration-200
                    group-hover/play:scale-110
                  "
                  aria-hidden="true"
                >
                  <path d="M8.5 5.2a1.5 1.5 0 0 1 2.35-1.23l8.4 6.8a1.57 1.57 0 0 1 0 2.46L10.85 20.23A1.5 1.5 0 0 1 8.5 19V5.2Z" />
                </svg>
              )}
            </button>

            {/* ================================================= */}
            {/* PROGRESSION                                       */}
            {/* ================================================= */}

            <div
              onClick={handleSeek}
              role="slider"
              aria-label="Progression audio"
              aria-valuemin={0}
              aria-valuemax={duration || 0}
              aria-valuenow={progress}
              tabIndex={0}
              className="
                group/progress
                relative
                h-2
                min-w-0
                flex-1
                cursor-pointer
                rounded-full
                bg-slate-200
              "
            >
              {/* Fond */}

              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-slate-200
                "
              />

              {/* Progression */}

              <div
                className={`
                  absolute
                  left-0
                  top-0
                  h-full
                  rounded-full
                  ${accentClassName}
                  shadow-[0_2px_8px_rgba(15,23,42,0.12)]
                `}
                style={{
                  width: `${progressPercent}%`,
                }}
              />

              {/* Curseur */}

              <div
                className={`
                  pointer-events-none
                  absolute
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  rounded-full
                  border-[3px]
                  border-white
                  ${accentClassName}
                  shadow-[0_2px_7px_rgba(15,23,42,0.20)]
                  transition-[left,transform]
                  duration-100
                  group-hover/progress:scale-110
                `}
                style={{
                  left:
                    progressPercent === 0
                      ? "0px"
                      : `calc(${progressPercent}% - 8px)`,
                }}
              />
            </div>
          </div>

          {/* ================================================= */}
          {/* ÉTAT DU LECTEUR                                    */}
          {/* ================================================= */}

          <div className="mt-3 flex items-center justify-between">
            <span
              className={`
                text-[10px]
                font-medium
                transition-colors
                ${
                  isPlaying
                    ? "text-slate-600"
                    : "text-slate-400"
                }
              `}
            >
              {isPlaying
                ? "● Lecture en cours..."
                : "Clique sur ▶ pour écouter"}
            </span>

          
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* AUDIO HTML                                             */}
      {/* ===================================================== */}

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
      />
    </div>
  );
}