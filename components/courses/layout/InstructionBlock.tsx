"use client";

import { ReactNode } from "react";
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
  cards?: InfoCard[];
  level?: CourseLevel;

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
  cards,
  level,
  onStart,
  startLabel = "Lancer l'exercice",
  started = false,
}: InstructionBlockProps) {
  const theme = courseThemes[level ?? "beginner"];

  const hasCards = Boolean(cards && cards.length > 0);

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
        {/* TAMpon EXERCICE */}
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
          {/* DÉCORATIONS DE FOND */}
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

          {/* Ligne supérieure décorative */}

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
              {/* Petit label */}

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
                  Avant de commencer
                </span>
              </div>

              {/* Titre */}

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

              {/* =================================================== */}
              {/* SIGNAL DESKTOP */}
              {/* =================================================== */}

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
                      transition-transform
                      duration-500
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
                {/* Accent gauche */}

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

                  const accentBackground = isWarning
                    ? "from-amber-50 via-white to-amber-100"
                    : isSuccess
                      ? "from-green-50 via-white to-green-100"
                      : "from-blue-50 via-white to-cyan-50";

                  const accentBorder = isWarning
                    ? "border-amber-200/80"
                    : isSuccess
                      ? "border-green-200/80"
                      : "border-blue-200/80";

                  const accentText = isWarning
                    ? "text-amber-700"
                    : isSuccess
                      ? "text-green-700"
                      : "text-blue-700";

                  const accentDot = isWarning
                    ? "bg-amber-500"
                    : isSuccess
                      ? "bg-green-500"
                      : "bg-blue-500";

                  const accentIcon = isWarning
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
                      {/* Halo */}

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

                      {/* Bordure interne */}

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

                      {/* Header */}

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

                      {/* Content */}

                      {card.content && (
                        <p className="relative z-10 text-sm leading-7 text-slate-700 sm:text-base">
                          {card.content}
                        </p>
                      )}

                      {/* Liste */}

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
                    {/* Glow */}

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

                    {/* Contenu */}

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