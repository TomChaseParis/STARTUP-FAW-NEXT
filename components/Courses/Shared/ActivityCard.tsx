import Link from "next/link";
import Image from "next/image";
import React from "react";

type Level = "beginner" | "elementary" | "intermediate" | "advanced";

type ActivityCardProps = {
  title: string; // ex : "Activité 1"
  subtitle?: string; // ex : "Grammaire"
  description?: string; // ex : "Être / Avoir / Faire ..."
  href?: string;
  className?: string;
  width?: number;
  height?: number;
  level?: Level;
  duration?: string;
  progress?: number;
  teacherName?: string;
  teacherAvatarSrc?: string;
  badgeOverride?: string;
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  subtitle, // 👈 nouveau
  description,
  href,
  className = "",
  width = 320,
  height = 320,
  level = "beginner",
  duration,
  progress,
  teacherName,
  teacherAvatarSrc,
  badgeOverride,
}) => {
  const levelGradients: Record<Level, string> = {
    beginner:
      "bg-[radial-gradient(120%_120%_at_0%_0%,#FFF7D6_0%,#FBE189_35%,#F4B73E_70%,#E59F2A_100%)]",
    elementary:
      "bg-[radial-gradient(120%_120%_at_0%_0%,#E6F8EC_0%,#BFEFD2_40%,#64D8A7_85%)]",
    intermediate:
      "bg-[radial-gradient(120%_120%_at_0%_0%,#FDE7E9_0%,#F8B8BE_40%,#EE6C7E_85%)]",
    advanced:
      "bg-[radial-gradient(120%_120%_at_0%_0%,#E6ECFF_0%,#B6C4FF_40%,#6C82FF_85%)]",
  };

  const levelBadge: Record<Level, string> = {
    beginner: "A1",
    elementary: "A2",
    intermediate: "B1",
    advanced: "B2",
  };

  const gradient = levelGradients[level];
  const badgeText = badgeOverride ?? levelBadge[level];
  const isDisabled = !href;

  const Card = (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl",
        "shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
        "transition-all duration-300 ease-out",
        gradient,
        isDisabled ? "opacity-80 cursor-not-allowed" : "cursor-pointer",
        "will-change-transform hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.12)]",
        level === "beginner" ? "hover:ring-2 hover:ring-amber-500/60" : "",
        className,
      ].join(" ")}
      style={{ width, height }}
      aria-disabled={isDisabled}
      role={isDisabled ? "article" : "link"}
    >
      {/* Effet lumineux subtil */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/40 blur-3xl opacity-40 group-hover:opacity-60 transition-opacity" />

      {/* Contenu centré */}
      <div className="relative z-10 h-full p-6 flex flex-col justify-between items-center text-black text-center">
        {/* Titre */}
        <h3 className="text-xl font-medium tracking-tight">{title}</h3>

        {/* Sous-titre */}
        {subtitle && (
          <h4 className="mt-1 text-2xl font-semibold text-black/90">
            {subtitle}
          </h4>
        )}

        {/* Description */}
        {description && (
          <p className="mt-3 text-md  font-medium leading-6 text-black/90 line-clamp-4">
            {description}
          </p>
        )}

        {/* Footer */}
        <div className="mt-4 w-full flex flex-col items-center gap-2">
          {duration && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md bg-white/70 shadow-sm">
              ⏱ {duration}
            </span>
          )}

          <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-md bg-black/80 text-white shadow-sm">
            {badgeText}
          </span>

          <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold bg-black/85 text-white px-3 py-1 rounded-lg shadow transition-colors group-hover:bg-black">
            {isDisabled ? "(bientôt)" : "Voir l’activité →"}
          </span>

          {typeof progress === "number" && (
            <div className="mt-2 w-28 h-1.5 rounded-full bg-black/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-black/70 transition-all"
                style={{
                  width: `${Math.min(100, Math.max(0, progress))}%`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return href && !isDisabled ? (
    <Link
      href={href}
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 rounded-2xl"
    >
      {Card}
    </Link>
  ) : (
    Card
  );
};

export default ActivityCard;
