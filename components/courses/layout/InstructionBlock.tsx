"use client";

import { ReactNode } from "react";
import { ActivityType } from "@/types/activityTypes";
import { activitySignals } from "@/data/courses/activitySignals";
import { Poppins } from "next/font/google";
import { courseThemes } from "../common/theme/courseThemes";
import Image from "next/image";

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
  level
}: InstructionBlockProps) {

  const theme = courseThemes[level ?? "beginner"];

  return (
    <div className="flex w-full justify-center">
      <div className="relative w-full max-w-5xl">
        {/* ================= TAMPON ================= */}

        <div className="absolute -left-6 -top-6 z-20 rotate-[-10deg] sm:-left-10 sm:-top-12">
          <div
            className={`${poppins.className} rounded-md border-2 border-white ${theme.badge} px-5 py-2 text-lg font-semibold tracking-wider text-black shadow-lg sm:px-8 sm:py-3 sm:text-2xl`}
          >
            {stampLabel || "EXERCICE"}
          </div>
        </div>

        {/* ================= BLOC ================= */}

        <div className={`
  relative
  z-10
  rounded-xl
  border
  ${theme.border}
  ${theme.background}
  p-5
  shadow-sm
  sm:p-8
`}>
          {/* ================= SIGNAL MOBILE ================= */}

          {activityType && (
            <div className="mb-4 flex justify-center md:hidden">
            <Image
  src={activitySignals[activityType]}
  alt="signal"
  width={80}
  height={80}
  className="h-20 w-auto drop-shadow-md"
/>
            </div>
          )}

          {/* ================= CONTENU ================= */}

          <div className="md:pr-40">
            {/* ================= TITRE ================= */}

            <div
              className={`${poppins.className} mb-3 flex items-start gap-3 text-xl font-semibold text-neutral-900 sm:text-xl`}
            >
              {icon && (
                <span className="text-xl">
                  {icon}
                </span>
              )}

              <span className="leading-snug">
                {title}
              </span>
            </div>

            {/* ================= SOUS-TITRE ================= */}

            {subtitle && (
              <p className="mb-3 text-[14px] leading-relaxed text-neutral-800 sm:text-[15px]">
                {subtitle}
              </p>
            )}

            {/* ================= DESCRIPTION ================= */}

            {description && (
              <div className="mb-5 max-w-3xl text-sm leading-relaxed text-neutral-700 sm:text-base">
                {description}
              </div>
            )}

            {/* ================= RAPPEL ================= */}

            {reminder && (
              <div className="mb-4 inline-block rounded-md border border-neutral-300 bg-white/80 px-4 py-2 text-sm text-neutral-700">
                {reminder}
              </div>
            )}

            {/* ================= CARTES ================= */}

    {/* ================= CARTES ================= */}

{cards && cards.length > 0 && (
  <div className="space-y-6">
    {cards.map((card, index) => {
      const isWarning =
        card.variant === "warning";

      const isSuccess =
        card.variant === "success";

      return (
        <div
          key={index}
          className={`
            relative overflow-hidden
            rounded-[30px]
            border
            p-6
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            transition-all duration-300

            ${
              isWarning
                ? `
                  border-amber-200
                  bg-gradient-to-br
                  from-amber-50
                  via-white
                  to-amber-100
                `
                : isSuccess
                  ? `
                    border-green-200
                    bg-gradient-to-br
                    from-green-50
                    via-white
                    to-green-100
                  `
                  : `
                    border-blue-200
                    bg-gradient-to-br
                    from-blue-50
                    via-white
                    to-cyan-50
                  `
            }
          `}
        >
          {/* Halo lumineux */}
          <div
            className={`
              absolute -right-12 -top-12
              h-40 w-40 rounded-full blur-3xl opacity-30

              ${
                isWarning
                  ? "bg-amber-300"
                  : isSuccess
                    ? "bg-green-300"
                    : "bg-blue-300"
              }
            `}
          />

          {/* Double bordure premium */}
          <div
            className="
              pointer-events-none
              absolute inset-2
              rounded-[24px]
              border border-white/70
            "
          />

          {/* Décoration coin */}
          <div
            className={`
              absolute right-5 top-5

              ${
                isWarning
                  ? "text-amber-300"
                  : isSuccess
                    ? "text-green-300"
                    : "text-blue-300"
              }
            `}
          >
            ✦
          </div>

          {/* Header */}
          <div className="relative z-10 mb-5 flex items-center gap-4">
            <div
              className={`
                flex h-14 w-14 shrink-0
                items-center justify-center
                rounded-2xl
                shadow-lg

                ${
                  isWarning
                    ? `
                      bg-gradient-to-br
                      from-amber-300
                      to-yellow-400
                    `
                    : isSuccess
                      ? `
                        bg-gradient-to-br
                        from-green-400
                        to-emerald-500
                      `
                      : `
                        bg-gradient-to-br
                        from-blue-400
                        to-cyan-500
                      `
                }
              `}
            >
              <span className="text-xl text-white">
                {isWarning
                  ? "⚠"
                  : isSuccess
                    ? "✓"
                    : "💡"}
              </span>
            </div>

            <div>
              <p
                className={`
                  text-xs
                  font-extrabold
                  uppercase
                  tracking-[0.25em]

                  ${
                    isWarning
                      ? "text-amber-700"
                      : isSuccess
                        ? "text-green-700"
                        : "text-blue-700"
                  }
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

          {/* Texte */}
          {card.content && (
            <p className="relative z-10 text-base leading-relaxed text-slate-800">
              {card.content}
            </p>
          )}

          {/* Liste */}
          {card.items && (
            <ul className="relative z-10 space-y-3">
              {card.items.map(
                (item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-3 text-slate-800"
                  >
                    <span
                      className={`
                        mt-2 h-2 w-2 rounded-full

                        ${
                          isWarning
                            ? "bg-amber-500"
                            : isSuccess
                              ? "bg-green-500"
                              : "bg-blue-500"
                        }
                      `}
                    />

                    <span>{item}</span>
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

            {/* ================= CONTENU LIBRE ================= */}

            {children}
          </div>

          {/* ================= SIGNAL DESKTOP ================= */}

          {activityType && (
            <div className="pointer-events-none absolute right-6 top-6 hidden md:block">
             {activityType && (
  <div className="pointer-events-none absolute right-6 top-6 hidden md:block">
    <Image
      src={activitySignals[activityType]}
      alt="signal"
      width={128}
      height={128}
      className="h-28 w-auto drop-shadow-md lg:h-32"
    />
  </div>
)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}