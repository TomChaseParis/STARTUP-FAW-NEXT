"use client";

import { ReactNode } from "react";
import { ActivityType } from "@/types/activityTypes";
import { activitySignals } from "@/data/courses/activitySignals";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

interface InstructionBlockProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  description?: ReactNode;
  reminder?: string;
  children?: ReactNode;
  activityType?: ActivityType;
  stampLabel?: string;
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
}: InstructionBlockProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="relative w-full max-w-5xl">
        {/* ================= TAMPON ================= */}

        <div className="absolute -left-6 -top-6 z-20 rotate-[-10deg] sm:-left-10 sm:-top-12">
          <div
            className={`${poppins.className} rounded-md border-2 border-white bg-amber-400 px-5 py-2 text-lg font-semibold tracking-wider text-black shadow-lg sm:px-8 sm:py-3 sm:text-2xl`}
          >
            {stampLabel || "EXERCICE"}
          </div>
        </div>

        {/* ================= BLOC ================= */}

        <div className="relative z-10 rounded-xl border border-amber-200 bg-[#f7f4ea] p-5 shadow-sm sm:p-8">
          {/* ===== SIGNAL MOBILE ===== */}
          {activityType && (
            <div className="mb-4 flex justify-center md:hidden">
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
            <div
              className={`${poppins.className} mb-3 flex items-start gap-3 text-xl font-semibold text-neutral-900 sm:text-xl`}
            >
              {icon && <span className="text-xl">{icon}</span>}

              <span className="leading-snug">{title}</span>
            </div>

            {/* ===== SUBTITLE ===== */}
            {subtitle && (
              <p className="mb-3 text-[14px] leading-relaxed text-neutral-800 sm:text-[15px]">
                {subtitle}
              </p>
            )}

            {/* ===== DESCRIPTION ===== */}
            {description && (
              <div className="mb-5 max-w-3xl text-sm leading-relaxed text-neutral-700 sm:text-base">
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

          {/* ===== SIGNAL DESKTOP ===== */}
          {activityType && (
            <div className="pointer-events-none absolute right-6 top-6 hidden md:block">
              <img
                src={activitySignals[activityType]}
                alt="signal"
                className="h-28 w-auto drop-shadow-md lg:h-32"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}