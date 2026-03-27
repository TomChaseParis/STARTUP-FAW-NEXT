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

        <div className="absolute -left-10 -top-8 z-20 rotate-[-10deg]">
          <div className="rounded-md border-2 border-white bg-amber-400 px-6 py-2 text-lg font-bold tracking-wide text-white shadow-lg">
            À toi de jouer !
          </div>
        </div>

        {/* ================= BLOC ================= */}

        <div className="relative z-10 min-h-[140px] rounded-xl border border-amber-200 bg-[#f7f4ea] p-8 shadow-sm">

          {/* ===== TITLE ===== */}

          <div className="mb-3 flex items-center gap-3 text-2xl font-semibold text-neutral-900">
            {icon && <span className="text-xl">{icon}</span>}

            <span className="leading-relaxed">{title}</span>
          </div>

          {/* ===== SUBTITLE ===== */}

          {subtitle && (
            <p className="mb-3 text-[15px] leading-relaxed text-neutral-800">
              {subtitle}
            </p>
          )}

          {/* ===== DESCRIPTION ===== */}

          {description && (
            <p className="mb-5 max-w-3xl leading-relaxed text-neutral-700">
              {description}
            </p>
          )}

          {/* ===== REMINDER ===== */}

          {reminder && (
            <div className="mb-4 inline-block rounded-md border border-neutral-300 bg-white/80 px-4 py-2 text-sm text-neutral-700">
              {reminder}
            </div>
          )}

          {/* ===== SIGNAL ===== */}

          {activityType && (
            <div className="pointer-events-none absolute right-4 top-4">
              <img
                src={activitySignals[activityType]}
                alt="signal"
                className="h-28 md:h-32 lg:h-36 w-auto drop-shadow-md"
              />
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}