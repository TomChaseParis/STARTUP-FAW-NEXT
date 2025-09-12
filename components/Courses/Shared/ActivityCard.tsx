import Link from "next/link";
import Image from "next/image";
import React from "react";

type Level = "beginner" | "elementary" | "intermediate" | "advanced";

type ActivityCardProps = {
  title: string;
  description?: string;
  href?: string;
  className?: string;
  width?: number;
  height?: number;
  level?: Level;
  /** ⏱️ Affiche la durée estimée de l’activité (ex: "8 min") */
  duration?: string;
  /** 🧭 Progrès de l’utilisateur (0–100) pour une barre discrète */
  progress?: number;
  /** 👩‍🏫 Afficher l’avatar du prof (optionnel) */
  teacherName?: string;
  teacherAvatarSrc?: string;
  /** 🔖 Remplace le badge par défaut (ex: "A1") */
  badgeOverride?: string;
};

/**
 * ActivityCard — version UI/UX améliorée pour "Beginner"
 * - Dégradé premium + lueur douce
 * - Micro-interactions (hover: léger tilt + shadow + ring)
 * - Footer informatif (durée, niveau, progression)
 * - Avatar prof optionnel
 * - Entièrement cliquable si href fourni, sinon état "bientôt"
 */
const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
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
  // Palettes et badges par niveau (accentuées pour Beginner)
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

  // Icône simple par niveau (SVG inline pour éviter dépendances)
  const Icons: Record<Level, JSX.Element> = {
    beginner: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 opacity-80"
        fill="currentColor"
      >
        <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-2H6.5a.5.5 0 0 1 0-1H20v-2H6.5A2.5 2.5 0 0 0 4 19.5ZM4 4h16v10H4z" />
      </svg>
    ),
    elementary: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 opacity-80" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 14h-2v-2h2v2Zm0-4h-2V6h2v6Z"/>
      </svg>
    ),
    intermediate: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 opacity-80" fill="currentColor" aria-hidden="true">
        <path d="M3 3h18v2H3zm2 4h14v2H5zm3 4h8v2H8zm-3 4h14v2H5zm-2 4h18v2H3z"/>
      </svg>
    ),
    advanced: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 opacity-80" fill="currentColor" aria-hidden="true">
        <path d="M12 3l9 4.5v9L12 21 3 16.5v-9L12 3Zm0 2.236L5 8.118v7.764L12 18.9l7-3.018V8.118L12 5.236Z"/>
      </svg>
    ),
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
        // anneau d’accentuation au survol (uniquement beginner pour l’instant)
        level === "beginner" ? "hover:ring-2 hover:ring-amber-500/60" : "",
        className,
      ].join(" ")}
      style={{ width, height }}
      aria-disabled={isDisabled}
      role={isDisabled ? "article" : "link"}
    >
      {/* Lueur douce animée */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/40 blur-3xl opacity-40 group-hover:opacity-60 transition-opacity" />
      {/* Trame subtile */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(120deg,transparent_0_48%,#000_50%,transparent_52%)] bg-[length:12px_12px]" />

      {/* Contenu */}
      <div className="relative z-10 h-full p-5 flex flex-col justify-between text-black">
        {/* Header titre + icône + avatar */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 shadow-sm">
              {Icons[level]}
            </div>
            <h3 className="text-[1.6rem] leading-7 font-extrabold tracking-tight">
              {title}
            </h3>
          </div>

          {teacherAvatarSrc ? (
            <div className="flex items-center gap-2">
              <Image
                src={teacherAvatarSrc}
                alt={teacherName ? `Prof ${teacherName}` : "Professeur"}
                width={32}
                height={32}
                className="rounded-full ring-1 ring-black/10"
              />
            </div>
          ) : null}
        </div>

        {/* Description */}
        {description ? (
          <p className="mt-2 text-[15px] leading-6 text-black/80 line-clamp-4">
            {description}
          </p>
        ) : (
          <div className="mt-2 h-6" />
        )}

        {/* Footer : durée • badge • CTA + progression */}
        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-center gap-2">
            {duration ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md bg-white/70 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M12 1.5a10.5 10.5 0 1 0 .001 21.001A10.5 10.5 0 0 0 12 1.5Zm.75 10.125V6.75h-1.5v5.625l4.5 2.625.75-1.299-3.75-2.081Z"/>
                </svg>
                {duration}
              </span>
            ) : null}

            <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md bg-black/80 text-white shadow-sm">
              {badgeText}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="inline-flex items-center gap-1 text-sm font-semibold bg-black/85 text-white px-3 py-1 rounded-lg shadow transition-colors group-hover:bg-black">
              {isDisabled ? "(bientôt)" : "Voir l’activité →"}
            </span>

            {typeof progress === "number" ? (
              <div className="mt-2 w-28 h-1.5 rounded-full bg-black/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-black/70 transition-all"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  // Wrapping conditionnel
  return href && !isDisabled ? (
    <Link href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 rounded-2xl">
      {Card}
    </Link>
  ) : (
    Card
  );
};

export default ActivityCard;
