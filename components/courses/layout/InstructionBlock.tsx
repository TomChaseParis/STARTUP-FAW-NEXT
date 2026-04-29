"use client";

import { ReactNode } from "react";
import { ActivityType } from "@/types/activityTypes";
import { activitySignals } from "@/data/courses/activitySignals";

interface InstructionBlockProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  description?: ReactNode;
  reminder?: string;
  children?: ReactNode;
  activityType?: ActivityType;
}

export default function InstructionBlock({
  icon,
  title,
  subtitle,
  description,
  reminder,
  children,
  activityType,
}: InstructionBlockProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="relative w-full max-w-5xl">

        {/* ================= TAMPON ================= */}

        <div className="absolute -left-6 -top-6 z-20 rotate-[-10deg] sm:-left-10 sm:-top-8">
          <div className="rounded-md border-2 border-white bg-amber-400 px-4 py-1 text-sm sm:px-6 sm:py-2 sm:text-lg font-bold tracking-wide text-white shadow-lg">
            À toi de jouer !
          </div>
        </div>

        {/* ================= BLOC ================= */}

        <div className="relative z-10 rounded-xl border border-amber-200 bg-[#f7f4ea] p-5 sm:p-8 shadow-sm">

          {/* ===== SIGNAL MOBILE (AU DESSUS) ===== */}
          {activityType && (
            <div className="flex justify-center mb-4 md:hidden">
              <img
                src={activitySignals[activityType]}
                alt="signal"
                className="h-20 w-auto drop-shadow-md"
              />
            </div>
          )}

          {/* ===== CONTENU ===== */}
          <div className="md:pr-40">

            {/* ===== TITLE ===== */}
            <div className="mb-3 flex items-start gap-3 text-xl sm:text-2xl font-semibold text-neutral-900">
              {icon && <span className="text-xl">{icon}</span>}

              <span className="leading-snug">
                {title}
              </span>
            </div>

            {/* ===== SUBTITLE ===== */}
            {subtitle && (
              <p className="mb-3 text-[14px] sm:text-[15px] leading-relaxed text-neutral-800">
                {subtitle}
              </p>
            )}

            {/* ===== DESCRIPTION ===== */}
            {description && (
              <div className="mb-5 max-w-3xl leading-relaxed text-neutral-700 text-sm sm:text-base">
                {description}
              </div>
            )}

            {/* ===== REMINDER ===== */}
            {reminder && (
              <div className="mb-4 inline-block rounded-md border border-neutral-300 bg-white/80 px-4 py-2 text-sm text-neutral-700">
                {reminder}
              </div>
            )}

            {children}
          </div>

          {/* ===== SIGNAL DESKTOP (A DROITE) ===== */}
          {activityType && (
            <div className="pointer-events-none hidden md:block absolute right-6 top-6">
              <img
                src={activitySignals[activityType]}
                alt="signal"
                className="h-28 lg:h-32 w-auto drop-shadow-md"
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}