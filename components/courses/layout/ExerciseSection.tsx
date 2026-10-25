"use client";

import type { ReactNode } from "react";

export type ExerciseWidth =
  | "narrow"
  | "normal"
  | "wide"
  | "full";

interface ExerciseSectionProps {
  children: ReactNode;
  width?: ExerciseWidth;
}

export default function ExerciseSection({
  children,
  width = "normal",
}: ExerciseSectionProps) {
  const widthMap: Record<ExerciseWidth, string> = {
    narrow: "max-w-3xl",
    normal: "max-w-5xl",
    wide: "max-w-[1280px]",
    full: "max-w-none",
  };

  return (
    <section className="w-full min-w-0 pt-0">
      <div
        className={`
          mx-auto
          w-full
          min-w-0
          ${widthMap[width]}
          space-y-12
          px-0
        `}
      >
        {children}
      </div>
    </section>
  );
}
