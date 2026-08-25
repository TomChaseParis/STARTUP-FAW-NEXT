"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

type PremiumAudioPlayerProps = {
  audioSrc: string;
  badge?: string;
  title?: string;
  tip?: string;
};

export default function PremiumAudioPlayer({
  audioSrc,
  badge = "Compréhension orale",
  title = "Les loisirs préférés des Français",
  tip = "Écoute attentivement le texte avant de commencer l'exercice.",
}: PremiumAudioPlayerProps) {
  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const progressRef =
    useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [playbackRate, setPlaybackRate] =
    useState(1);

  const [showSpeedMenu, setShowSpeedMenu] =
    useState(false);

  /*
   * =========================================================
   * INITIALISATION AUDIO
   * =========================================================
   */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleLoadedMetadata = () => {
      if (
        Number.isFinite(audio.duration)
      ) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(
        audio.currentTime,
      );
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata,
    );

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate,
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

    return () => {
      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata,
      );

      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate,
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
    };
  }, []);

  /*
   * =========================================================
   * VITESSE
   * =========================================================
   */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.playbackRate =
      playbackRate;
  }, [playbackRate]);

  /*
   * =========================================================
   * PLAY / PAUSE
   * =========================================================
   */

  const toggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (!audio.paused) {
      audio.pause();

      return;
    }

    try {
      await audio.play();
    } catch (error) {
      console.error(
        "Impossible de lire le fichier audio :",
        error,
      );
    }
  };

  /*
   * =========================================================
   * PROGRESSION
   * =========================================================
   */

  const handleSeek = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const audio = audioRef.current;

    const progress =
      progressRef.current;

    if (!audio || !progress) {
      return;
    }

    if (!duration) {
      return;
    }

    const rect =
      progress.getBoundingClientRect();

    const position =
      event.clientX - rect.left;

    const percentage =
      Math.max(
        0,
        Math.min(
          1,
          position / rect.width,
        ),
      );

    audio.currentTime =
      percentage * duration;

    setCurrentTime(
      percentage * duration,
    );
  };

  /*
   * =========================================================
   * FORMAT TEMPS
   * =========================================================
   */

  const formatTime = (
    time: number,
  ) => {
    if (
      !Number.isFinite(time) ||
      time < 0
    ) {
      return "0:00";
    }

    const minutes =
      Math.floor(time / 60);

    const seconds =
      Math.floor(time % 60);

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  /*
   * =========================================================
   * POURCENTAGE
   * =========================================================
   */

  const progressPercent =
    duration > 0
      ? Math.min(
          100,
          (currentTime / duration) *
            100,
        )
      : 0;

  /*
   * =========================================================
   * CHANGEMENT VITESSE
   * =========================================================
   */

  const changeSpeed = (
    speed: number,
  ) => {
    setPlaybackRate(speed);
    setShowSpeedMenu(false);
  };

  return (
    <section className="mx-auto w-full max-w-5xl pb-10">
      <div
        className="
          relative
          overflow-hidden
          rounded-[2rem]
          border
          border-amber-200/80
          bg-gradient-to-br
          from-amber-50
          via-white
          to-yellow-50
          shadow-[0_20px_60px_rgba(245,158,11,0.16)]
          transition-all
          duration-500
          hover:-translate-y-1
          hover:shadow-[0_28px_70px_rgba(245,158,11,0.20)]
        "
      >
        {/* =====================================================
            DÉCORATIONS
        ===================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-72
            w-72
            rounded-full
            bg-amber-300/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-32
            h-80
            w-80
            rounded-full
            bg-yellow-300/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-72
            w-72
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-amber-200/10
            blur-3xl
          "
        />

        {/* =====================================================
            CONTENU
        ===================================================== */}

        <div className="relative px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12">

          {/* ===================================================
              HEADER
          =================================================== */}

          <div className="flex items-start justify-between gap-6">

            <div>
              <p
                className="
                  mb-3
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-amber-600
                "
              >
                Ressource audio
              </p>

              <h3
                className="
                  text-2xl
                  font-extrabold
                  tracking-tight
                  text-slate-900
                  sm:text-3xl
                "
              >
                {title}
              </h3>
            </div>

            <span
              className="
                shrink-0
                rounded-full
                bg-gradient-to-r
                from-amber-300
                to-yellow-400
                px-4
                py-2
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.12em]
                text-slate-900
                shadow-sm
                sm:px-5
                sm:py-2.5
                sm:text-xs
              "
            >
              {badge}
            </span>
          </div>

          {/* ===================================================
              PLAYER
          =================================================== */}

          <div className="mt-10 flex flex-col items-center">

            {/* =================================================
                BOUTON PRINCIPAL
            ================================================= */}

            <div className="relative">

              {isPlaying && (
                <>
                  <span
                    className="
                      absolute
                      -inset-5
                      rounded-full
                      bg-amber-300/20
                      animate-ping
                    "
                  />

                  <span
                    className="
                      absolute
                      -inset-10
                      rounded-full
                      border
                      border-amber-300/20
                    "
                  />

                  <span
                    className="
                      absolute
                      -inset-16
                      rounded-full
                      border
                      border-amber-300/10
                    "
                  />
                </>
              )}

              <button
                type="button"
                onClick={
                  toggleAudio
                }
                aria-label={
                  isPlaying
                    ? "Mettre en pause"
                    : "Lire l'audio"
                }
                className={`
                  relative
                  z-10
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-amber-300
                  via-yellow-300
                  to-amber-400
                  text-slate-900
                  shadow-[0_18px_45px_rgba(245,158,11,0.35)]
                  transition-all
                  duration-300
                  active:scale-95

                  ${
                    isPlaying
                      ? "scale-110"
                      : "hover:scale-105"
                  }
                `}
              >
                {isPlaying ? (
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      x="6"
                      y="5"
                      width="4"
                      height="14"
                      rx="1"
                      fill="currentColor"
                    />

                    <rect
                      x="14"
                      y="5"
                      width="4"
                      height="14"
                      rx="1"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M8 5.5L19 12L8 18.5V5.5Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* =================================================
                WAVEFORM
            ================================================= */}

            <div
              className="
                mt-9
                flex
                h-10
                items-end
                justify-center
                gap-1
              "
              aria-hidden="true"
            >
              {[
                10,
                18,
                26,
                14,
                30,
                20,
                34,
                16,
                25,
                38,
                22,
                30,
                15,
                27,
                35,
                19,
                28,
                13,
                23,
                17,
                31,
                20,
                14,
                26,
                18,
                32,
                15,
                24,
                12,
                20,
              ].map(
                (
                  height,
                  index,
                ) => (
                  <span
                    key={index}
                    className={`
                      w-1
                      rounded-full
                      bg-amber-400
                      transition-all
                      duration-300
                      ${
                        isPlaying
                          ? "animate-pulse opacity-100"
                          : "opacity-40"
                      }
                    `}
                    style={{
                      height: `${height}px`,
                      animationDelay: `${index * 60}ms`,
                    }}
                  />
                ),
              )}
            </div>

            {/* =================================================
                PROGRESSION
            ================================================= */}

            <div className="mt-8 w-full">

              <div
                ref={progressRef}
                onClick={
                  handleSeek
                }
                role="slider"
                aria-label="Progression audio"
                aria-valuemin={0}
                aria-valuemax={
                  duration
                }
                aria-valuenow={
                  currentTime
                }
                tabIndex={0}
                className="
                  group
                  relative
                  h-3
                  w-full
                  cursor-pointer
                  overflow-visible
                  rounded-full
                  bg-white/90
                  shadow-[inset_0_1px_4px_rgba(15,23,42,0.10)]
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-amber-400
                    via-yellow-400
                    to-amber-500
                    transition-[width]
                    duration-150
                  "
                  style={{
                    width: `${progressPercent}%`,
                  }}
                />

                <div
                  className="
                    absolute
                    top-1/2
                    h-5
                    w-5
                    -translate-y-1/2
                    rounded-full
                    border-[3px]
                    border-white
                    bg-amber-500
                    shadow-[0_3px_10px_rgba(245,158,11,0.35)]
                    opacity-0
                    transition-opacity
                    duration-200
                    group-hover:opacity-100
                  "
                  style={{
                    left: `calc(${progressPercent}% - 10px)`,
                  }}
                />
              </div>

              <div
                className="
                  mt-3
                  flex
                  justify-between
                  text-xs
                  font-semibold
                  tabular-nums
                  text-slate-400
                "
              >
                <span>
                  {formatTime(
                    currentTime,
                  )}
                </span>

                <span>
                  {formatTime(
                    duration,
                  )}
                </span>
              </div>
            </div>

         

            {/* =================================================
                STATUT
            ================================================= */}

            <div className="mt-7 text-center">

              <div className="flex items-center justify-center gap-2">

                {isPlaying && (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />

                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
                  </span>
                )}

                <p className="text-sm font-bold text-slate-700">
                  {isPlaying
                    ? "Lecture en cours"
                    : "Prêt à écouter"}
                </p>

              </div>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                {tip}
              </p>
            </div>

          </div>

          {/* ===================================================
              AUDIO NATIF
          =================================================== */}

          <audio
            ref={audioRef}
            src={audioSrc}
            preload="metadata"
          />

        </div>
      </div>
    </section>
  );
}