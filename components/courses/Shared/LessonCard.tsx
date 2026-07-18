import Link from "next/link";
import React from "react";

type Level =
  | "beginner"
  | "elementary-1"
  | "elementary-2"
  | "intermediate-1"
  | "intermediate-2"
  | "advanced";

type LessonCardProps = {
  title: string;
  subtitle?: string;
  description?: string;
  href?: string;
  className?: string;
  level?: Level;
  badgeOverride?: string;
};

const LessonCard: React.FC<LessonCardProps> = ({
  title,
  subtitle,
  description,
  href,
  className = "",
  level = "beginner",
  badgeOverride,
}) => {
  const levelGradients: Record<Level, string> = {
    beginner:
      "bg-gradient-to-br from-sky-100 via-sky-300 to-blue-500",
  
    "elementary-1":
      "bg-gradient-to-br from-sky-100 via-sky-300 to-blue-500",
  
    "elementary-2":
      "bg-gradient-to-br from-sky-100 via-sky-300 to-blue-500",
  
    "intermediate-1":
      "bg-gradient-to-br from-sky-100 via-sky-300 to-blue-500",
  
    "intermediate-2":
      "bg-gradient-to-br from-sky-100 via-sky-300 to-blue-500",
  
    advanced:
      "bg-gradient-to-br from-sky-100 via-sky-300 to-blue-500",
  };

  const levelBadge: Record<Level, string> = {
    beginner: "A1",
    "elementary-1": "A2",
    "elementary-2": "A2+",
    "intermediate-1": "B1",
    "intermediate-2": "B1+",
    advanced: "B2",
  };

  const gradient = levelGradients[level];
  const badgeText = badgeOverride ?? levelBadge[level];
  const isDisabled = !href;

  const Card = (
    <div
      className={[
        "group relative overflow-hidden rounded-3xl",
        "shadow-[0_12px_32px_rgba(0,0,0,0.12)]",
        "transition-all duration-500 ease-out",
        gradient,
        isDisabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
        "hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)]",
        className,
      ].join(" ")}
      aria-disabled={isDisabled}
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/40 opacity-40 blur-3xl transition duration-500 group-hover:opacity-60" />

      <div className="relative z-10 flex h-[320px] flex-col items-center justify-between p-8 text-center text-black">
        {/* HEADER */}
        <span className="text-xs font-bold uppercase tracking-widest text-black/70">
          LEÇON
        </span>

        {/* CONTENT */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold leading-tight">
            {title}
          </h2>

          {subtitle && (
            <p className="text-base font-semibold text-black/90">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="mx-auto max-w-[260px] text-sm font-medium leading-relaxed text-black/80">
              {description}
            </p>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex flex-col items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-md bg-black/80 px-3 py-1 text-xs font-bold text-white shadow">
            {badgeText}
          </span>

          <span className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow transition group-hover:bg-black/90">
            {isDisabled ? "(bientôt)" : "Voir la leçon →"}
          </span>
        </div>
      </div>
    </div>
  );

  return href && !isDisabled ? (
    <Link
      href={href}
      className="rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
    >
      {Card}
    </Link>
  ) : (
    Card
  );
};

export default LessonCard;