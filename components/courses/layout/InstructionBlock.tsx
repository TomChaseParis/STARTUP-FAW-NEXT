"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { ActivityType } from "@/types/activityTypes";
import { activitySignals } from "@/data/courses/activitySignals";
import { courseThemes } from "../common/theme/courseThemes";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type CourseLevel =
  | "beginner"
  | "elementary1"
  | "elementary2"
  | "intermediate1";

interface InfoCard {
  title: string;
  subtitle?: string;
  content?: string;
  items?: string[];
  variant?: "info" | "warning" | "success";
}

interface InstructionBlockProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  description?: ReactNode;
  reminder?: string;
  children?: ReactNode;
  activityType?: ActivityType;
  stampLabel?: string;
  typeLabel?: string;
  cards?: InfoCard[];
  level?: CourseLevel;

  audioSrc?: string;
  audioBadge?: string;

  onStart?: () => void;
  startLabel?: string;
  started?: boolean;
}

export default function InstructionBlock({
  icon,
  title,
  subtitle,
  description,
  reminder,
  children,
  activityType,
  stampLabel,
  typeLabel,
  cards,
  level,
  audioSrc,
  audioBadge = "Dialogue",
  onStart,
  startLabel = "Lancer l'exercice",
  started = false,
}: InstructionBlockProps) {
  const theme = courseThemes[level ?? "beginner"];

  const hasCards = Boolean(cards && cards.length > 0);

  /* =========================================================
     AUDIO
  ========================================================= */

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const animationFrameRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const stopProgressAnimation = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const updateProgress = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setProgress(audio.currentTime);

    if (!audio.paused && !audio.ended) {
      animationFrameRef.current =
        requestAnimationFrame(updateProgress);
    }
  };

  const startProgressAnimation = () => {
    stopProgressAnimation();

    animationFrameRef.current =
      requestAnimationFrame(updateProgress);
  };

  const toggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio) return;

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
      stopProgressAnimation();
    }
  };

  /* =========================================================
     EVENTS AUDIO
  ========================================================= */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !audioSrc) {
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
      startProgressAnimation();
    };

    const handlePause = () => {
      setIsPlaying(false);
      stopProgressAnimation();
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      stopProgressAnimation();
      setProgress(0);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleError = () => {
      setIsPlaying(false);
      stopProgressAnimation();
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

      stopProgressAnimation();
    };
  }, [audioSrc]);

  /* =========================================================
     RESET AUDIO WHEN SOURCE CHANGES
  ========================================================= */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    setIsPlaying(false);
    setProgress(0);
    setDuration(0);

    stopProgressAnimation();
  }, [audioSrc]);

  /* =========================================================
     SEEK
  ========================================================= */

  const handleSeek = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    const audio = audioRef.current;

    if (!audio || !duration) return;

    const rect =
      e.currentTarget.getBoundingClientRect();

    const percent = Math.max(
      0,
      Math.min(
        1,
        (e.clientX - rect.left) /
          rect.width,
      ),
    );

    const newTime =
      percent * duration;

    audio.currentTime = newTime;

    setProgress(newTime);
  };

  /* =========================================================
     TIME
  ========================================================= */

  const formatTime = (time: number) => {
    if (
      !Number.isFinite(time) ||
      time <= 0
    ) {
      return "0:00";
    }

    const minutes =
      Math.floor(time / 60);

    const seconds =
      Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  const progressPercent =
    duration > 0
      ? Math.min(
          100,
          (progress / duration) * 100,
        )
      : 0;

  return (
    <div className="flex w-full justify-center px-4 sm:px-6">
      <div className="relative w-full max-w-5xl">

        {/* ========================================================= */}
        {/* HALO EXTÉRIEUR */}
        {/* ========================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            -inset-4
            rounded-[2.5rem]
            bg-black/[0.025]
            blur-2xl
          "
        />

        {/* ========================================================= */}
        {/* TAMPON EXERCICE */}
        {/* ========================================================= */}

        <div
          className="
            absolute
            -left-2
            -top-5
            z-30
            sm:-left-7
            sm:-top-7
          "
        >
          <div
            className={`
              ${poppins.className}
              relative
              rotate-[-6deg]
              overflow-hidden
              rounded-xl
              border-2
              border-white/90
              px-5
              py-2.5
              text-sm
              font-extrabold
              uppercase
              tracking-[0.18em]
              text-slate-900
              shadow-[0_12px_30px_rgba(0,0,0,0.14)]
              sm:px-7
              sm:py-3
              sm:text-base
            `}
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.92))",
            }}
          >
            <div
              className={`
                absolute
                inset-x-0
                bottom-0
                h-1
                ${theme.badge}
                opacity-80
              `}
            />

            <span className="relative z-10">
              {stampLabel || "EXERCICE"}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BLOC PRINCIPAL */}
        {/* ========================================================= */}

        <div
          className={`
            relative
            z-10
            overflow-hidden
            rounded-[2rem]
            border
            ${theme.border}
            ${theme.background}
            shadow-[0_25px_80px_rgba(15,23,42,0.10)]
            transition-all
            duration-500
            text-black
          `}
        >
          {/* ======================================================= */}
          {/* DÉCORATIONS */}
          {/* ======================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              bg-white/70
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              -left-24
              h-72
              w-72
              rounded-full
              bg-white/50
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.85),transparent_35%)]
            "
          />

          <div
            className={`
              absolute
              left-0
              right-0
              top-0
              h-1
              ${theme.badge}
              opacity-80
            `}
          />

          {/* ======================================================= */}
          {/* CONTENU */}
          {/* ======================================================= */}

          <div className="relative z-10 p-6 sm:p-9 lg:p-11">

            {/* ===================================================== */}
            {/* HEADER */}
            {/* ===================================================== */}

            <div className="relative min-h-[110px] pr-0 md:pr-40">

              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`
                    h-2
                    w-2
                    rounded-full
                    ${theme.badge}
                    shadow-sm
                  `}
                />

                <span
                  className={`
                    ${poppins.className}
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.28em]
                    text-slate-500
                    sm:text-xs
                  `}
                >
                  {typeLabel || "Avant de commencer"}
                </span>
              </div>

              <div className="flex items-start gap-3">
                {icon && (
                  <div
                    className="
                      mt-0.5
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/80
                      bg-white/75
                      text-xl
                      shadow-sm
                      backdrop-blur-sm
                    "
                  >
                    {icon}
                  </div>
                )}

                <div>
                  <h2
                    className={`
                      ${poppins.className}
                      text-2xl
                      font-bold
                      leading-tight
                      tracking-[-0.025em]
                      text-slate-900
                      sm:text-3xl
                    `}
                  >
                    {title}
                  </h2>

                  {subtitle && (
                    <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* SIGNAL DESKTOP */}

              {activityType && (
                <div
                  className="
                    pointer-events-none
                    absolute
                    right-0
                    top-[-8px]
                    hidden
                    h-32
                    w-32
                    items-center
                    justify-center
                    md:flex
                  "
                >
                  <div
                    className="
                      absolute
                      inset-3
                      rounded-full
                      bg-white/60
                      blur-xl
                    "
                  />

                  <Image
                    src={activitySignals[activityType]}
                    alt="Signalétique de l'exercice"
                    width={128}
                    height={128}
                    className="
                      relative
                      h-28
                      w-auto
                      object-contain
                      drop-shadow-[0_12px_18px_rgba(15,23,42,0.16)]
                    "
                  />
                </div>
              )}
            </div>

            {/* ===================================================== */}
            {/* SIGNAL MOBILE */}
            {/* ===================================================== */}

            {activityType && (
              <div className="mb-7 flex justify-center md:hidden">
                <div
                  className="
                    relative
                    flex
                    h-28
                    w-28
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/80
                    bg-white/60
                    shadow-[0_15px_35px_rgba(15,23,42,0.08)]
                    backdrop-blur-sm
                  "
                >
                  <div
                    className="
                      absolute
                      inset-3
                      rounded-full
                      bg-white/70
                      blur-xl
                    "
                  />

                  <Image
                    src={activitySignals[activityType]}
                    alt="Signalétique de l'exercice"
                    width={96}
                    height={96}
                    className="
                      relative
                      h-20
                      w-auto
                      object-contain
                      drop-shadow-md
                    "
                  />
                </div>
              </div>
            )}

            {/* ===================================================== */}
            {/* SÉPARATEUR */}
            {/* ===================================================== */}

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-900/10" />

              <div
                className={`
                  h-1.5
                  w-1.5
                  rounded-full
                  ${theme.badge}
                `}
              />

              <div className="h-px flex-1 bg-slate-900/10" />
            </div>

            {/* ===================================================== */}
            {/* DESCRIPTION / CONSIGNE */}
            {/* ===================================================== */}

            {description && (
              <div
                className="
                  relative
                  mb-6
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/80
                  bg-white/65
                  p-5
                  shadow-[0_10px_30px_rgba(15,23,42,0.05)]
                  backdrop-blur-sm
                  sm:p-6
                "
              >
                <div
                  className={`
                    absolute
                    bottom-0
                    left-0
                    top-0
                    w-1
                    ${theme.badge}
                  `}
                />

                <div className="pl-3">
                  {description}
                </div>
              </div>
            )}

            {/* ===================================================== */}
            {/* AUDIO INTÉGRÉ */}
            {/* ===================================================== */}

            {audioSrc && (
              <div
                className="
                  mb-7
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200/80
                  bg-white/80
                  shadow-[0_8px_25px_rgba(15,23,42,0.06)]
                  backdrop-blur-sm
                  transition-all
                  duration-300
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    px-4
                    py-4
                    sm:px-5
                    sm:py-4
                  "
                >
                  {/* ================================================= */}
                  {/* BOUTON PLAY */}
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
                      relative
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      ${theme.badge}
                      shadow-[0_6px_18px_rgba(15,23,42,0.16)]
                      transition-all
                      duration-300
                      hover:scale-105
                      active:scale-95
                    `}
                  >
                    {/* Halo animé */}

                    {isPlaying && (
                      <span
                        className={`
                          pointer-events-none
                          absolute
                          inset-0
                          rounded-full
                          ${theme.badge}
                          opacity-20
                          animate-ping
                        `}
                      />
                    )}

                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="relative z-10 h-5 w-5"
                        aria-hidden="true"
                      >
                        <path d="M7 5.5A1.5 1.5 0 0 1 8.5 7v10a1.5 1.5 0 1 1-3 0V7A1.5 1.5 0 0 1 7 5.5Zm10 0A1.5 1.5 0 0 1 18.5 7v10a1.5 1.5 0 1 1-3 0V7A1.5 1.5 0 0 1 17 5.5Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="relative z-10 ml-0.5 h-5 w-5"
                        aria-hidden="true"
                      >
                        <path d="M8.5 5.2a1.5 1.5 0 0 1 2.35-1.23l8.4 6.8a1.57 1.57 0 0 1 0 2.46L10.85 20.23A1.5 1.5 0 0 1 8.5 19V5.2Z" />
                      </svg>
                    )}
                  </button>

                  {/* ================================================= */}
                  {/* INFORMATIONS */}
                  {/* ================================================= */}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
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
                          {audioBadge}
                        </p>

                        <p
                          className="
                            mt-0.5
                            truncate
                            text-sm
                            font-semibold
                            text-slate-800
                          "
                        >
                          {isPlaying
                            ? "Lecture en cours"
                            : "Écouter le dialogue"}
                        </p>
                      </div>

                      {/* ================================================= */}
                      {/* TEMPS */}
                      {/* ================================================= */}

                      <span
                        className="
                          shrink-0
                          text-xs
                          font-medium
                          tabular-nums
                          text-slate-400
                        "
                      >
                        {formatTime(progress)} /{" "}
                        {formatTime(duration)}
                      </span>
                    </div>

                    {/* ================================================= */}
                    {/* BARRE DE PROGRESSION */}
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
                        mt-3
                        h-1.5
                        w-full
                        cursor-pointer
                        overflow-visible
                        rounded-full
                        bg-slate-200
                      "
                    >
                      {/* Barre remplie */}

                      <div
                        className={`
                          absolute
                          left-0
                          top-0
                          h-full
                          rounded-full
                          ${theme.badge}
                          transition-[width]
                          duration-100
                        `}
                        style={{
                          width: `${progressPercent}%`,
                        }}
                      />

                      {/* Curseur */}

                      {progressPercent > 0 && (
                        <div
                          className={`
                            pointer-events-none
                            absolute
                            top-1/2
                            h-3
                            w-3
                            -translate-y-1/2
                            rounded-full
                            border-2
                            border-white
                            ${theme.badge}
                            shadow-[0_2px_5px_rgba(15,23,42,0.18)]
                            transition-[left]
                            duration-100
                          `}
                          style={{
                            left: `calc(${progressPercent}% - 6px)`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* ================================================= */}
                {/* AUDIO HTML */}
                {/* ================================================= */}

                <audio
                  ref={audioRef}
                  src={audioSrc}
                  preload="metadata"
                />
              </div>
            )}

            {/* ===================================================== */}
            {/* RAPPEL */}
            {/* ===================================================== */}

            {reminder && (
              <div
                className="
                  mb-7
                  flex
                  items-start
                  gap-3
                  rounded-2xl
                  border
                  border-slate-200/80
                  bg-white/70
                  px-4
                  py-4
                  shadow-sm
                "
              >
                <div
                  className={`
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    ${theme.badge}
                    text-sm
                    font-bold
                    text-slate-900
                  `}
                >
                  i
                </div>

                <p className="pt-1 text-sm leading-relaxed text-slate-600">
                  {reminder}
                </p>
              </div>
            )}

            {/* ===================================================== */}
            {/* CARTES */}
            {/* ===================================================== */}

            {hasCards && (
              <div className="space-y-5">
                {cards?.map((card, index) => {
                  const isWarning =
                    card.variant === "warning";

                  const isSuccess =
                    card.variant === "success";

                  const accentBackground =
                    isWarning
                      ? "from-amber-50 via-white to-amber-100"
                      : isSuccess
                        ? "from-green-50 via-white to-green-100"
                        : "from-blue-50 via-white to-cyan-50";

                  const accentBorder =
                    isWarning
                      ? "border-amber-200/80"
                      : isSuccess
                        ? "border-green-200/80"
                        : "border-blue-200/80";

                  const accentText =
                    isWarning
                      ? "text-amber-700"
                      : isSuccess
                        ? "text-green-700"
                        : "text-blue-700";

                  const accentDot =
                    isWarning
                      ? "bg-amber-500"
                      : isSuccess
                        ? "bg-green-500"
                        : "bg-blue-500";

                  const accentIcon =
                    isWarning
                      ? "⚠"
                      : isSuccess
                        ? "✓"
                        : "💡";

                  return (
                    <div
                      key={index}
                      className={`
                        group
                        relative
                        overflow-hidden
                        rounded-[1.5rem]
                        border
                        ${accentBorder}
                        bg-gradient-to-br
                        ${accentBackground}
                        p-5
                        shadow-[0_15px_45px_rgba(15,23,42,0.06)]
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:shadow-[0_20px_55px_rgba(15,23,42,0.09)]
                        sm:p-6
                      `}
                    >
                      <div
                        className={`
                          pointer-events-none
                          absolute
                          -right-10
                          -top-10
                          h-32
                          w-32
                          rounded-full
                          blur-3xl
                          ${
                            isWarning
                              ? "bg-amber-300/30"
                              : isSuccess
                                ? "bg-green-300/30"
                                : "bg-blue-300/30"
                          }
                        `}
                      />

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-2
                          rounded-[1.25rem]
                          border
                          border-white/70
                        "
                      />

                      <div className="relative z-10 mb-5 flex items-center gap-4">
                        <div
                          className={`
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-white/80
                            shadow-sm
                            backdrop-blur-sm
                            ${accentText}
                          `}
                        >
                          <span className="text-lg">
                            {accentIcon}
                          </span>
                        </div>

                        <div>
                          <p
                            className={`
                              text-xs
                              font-extrabold
                              uppercase
                              tracking-[0.22em]
                              ${accentText}
                            `}
                          >
                            {card.title}
                          </p>

                          {card.subtitle && (
                            <p className="mt-1 text-sm font-medium text-slate-500">
                              {card.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {card.content && (
                        <p className="relative z-10 text-sm leading-7 text-slate-700 sm:text-base">
                          {card.content}
                        </p>
                      )}

                      {card.items && (
                        <ul className="relative z-10 space-y-3">
                          {card.items.map(
                            (
                              item,
                              itemIndex,
                            ) => (
                              <li
                                key={itemIndex}
                                className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-base"
                              >
                                <span
                                  className={`
                                    mt-2
                                    h-2
                                    w-2
                                    shrink-0
                                    rounded-full
                                    ${accentDot}
                                  `}
                                />

                                <span>
                                  {item}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ===================================================== */}
            {/* CONTENU LIBRE */}
            {/* ===================================================== */}

            {children}

            {/* ===================================================== */}
            {/* ZONE DE LANCEMENT */}
            {/* ===================================================== */}

            {onStart && !started && (
              <div className="mt-9">
                <div
                  className="
                    mb-4
                    flex
                    items-center
                    justify-center
                    gap-3
                    text-center
                  "
                >
                  <div className="h-px flex-1 bg-slate-900/10" />

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.22em]
                      text-slate-400
                    "
                  >
                    Prêt ?
                  </span>

                  <div className="h-px flex-1 bg-slate-900/10" />
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={onStart}
                    className="
                      group
                      relative
                      inline-flex
                      min-w-[230px]
                      items-center
                      justify-center
                      gap-4
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/80
                      px-8
                      py-4
                      text-sm
                      font-bold
                      text-slate-900
                      shadow-[0_15px_40px_rgba(15,23,42,0.12)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-[0_20px_50px_rgba(15,23,42,0.17)]
                      active:translate-y-0
                      sm:text-base
                    "
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.92))",
                    }}
                  >
                    <span
                      className={`
                        absolute
                        -right-8
                        -top-8
                        h-24
                        w-24
                        rounded-full
                        blur-2xl
                        opacity-40
                        transition-opacity
                        duration-300
                        group-hover:opacity-70
                        ${theme.badge}
                      `}
                    />

                    <span className="relative z-10">
                      {startLabel}
                    </span>

                    <span
                      className={`
                        relative
                        z-10
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        ${theme.badge}
                        text-lg
                        font-bold
                        shadow-sm
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      `}
                    >
                      →
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}