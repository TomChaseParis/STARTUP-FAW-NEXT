

import Link from "next/link";
import Image from "next/image";
import React from "react";

type Level =
  | "beginner"
  | "elementary-1"
  | "elementary-2"
  | "intermediate-1"
  | "intermediate-2"
  | "advanced";

type ActivityCardProps = {
  title: string;
  subtitle?: string;
  description?: string;
  additionalDescription?: string;
  image?: string;
  objectives?: string[];
  href?: string;
  className?: string;
  level?: Level;
  badgeOverride?: string;
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  subtitle,
  description,
  additionalDescription,
  image,
  objectives = [],
  href,
  className = "",
  level = "beginner",
  badgeOverride,
}) => {
  const levelGradients: Record<Level, string> = {
    beginner:
      "bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400",
    "elementary-1":
      "bg-gradient-to-br from-emerald-200 via-emerald-300 to-emerald-400",
    "elementary-2":
      "bg-gradient-to-br from-rose-200 via-rose-300 to-rose-400",
    "intermediate-1":
      "bg-gradient-to-br from-rose-200 via-rose-300 to-rose-400",
    "intermediate-2":
      "bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400",
    advanced:
      "bg-gradient-to-br from-indigo-200 via-indigo-300 to-indigo-400",
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

  const activityObjectives = [
    ...objectives,
    ...(description ? [description] : []),
    ...(additionalDescription ? [additionalDescription] : []),
  ].filter(Boolean);

  const Card = (
    <div
      className={[
        "group relative overflow-hidden rounded-3xl",
        "shadow-[0_12px_32px_rgba(0,0,0,0.12)]",
        "transition-all duration-500 ease-out",
        gradient,
        isDisabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
        "hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)]",
        className,
      ].join(" ")}
      aria-disabled={isDisabled}
    >
      {/* Glow effect */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/40 blur-3xl opacity-40 transition duration-500 group-hover:opacity-60" />

      <div className="relative z-10 flex min-h-[320px] flex-col items-center gap-3 p-6 text-center text-black sm:p-8">

        {/* TOP LABEL */}
        <span className="self-start rounded-md bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
          ACTIVITÉ
        </span>

        {/* TITLE AND SUBTITLE */}
        <div className="w-full space-y-2">
          <h2 className="text-xl font-bold uppercase leading-tight text-black sm:text-2xl">
            {title}
          </h2>

          {subtitle && (
            <p className="text-sm font-semibold text-black/90 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>

        {/* ACTIVITY IMAGE */}
        {image && (
          <div className="relative h-[130px] w-full max-w-[220px] overflow-hidden">
            <Image
              src={image}
              alt={`Illustration de ${title}`}
              fill
              sizes="220px"
              className="object-contain"
            />
          </div>
        )}

        {/* OBJECTIVES */}
        {activityObjectives.length > 0 && (
          <ul className="w-full max-w-[260px] list-disc space-y-1 pl-5 text-left text-sm font-medium text-black">
            {activityObjectives.map((objective, index) => (
              <li key={`${objective}-${index}`}>
                {objective}
              </li>
            ))}
          </ul>
        )}

        {/* BOTTOM */}
        <div className="mt-auto flex flex-col items-center gap-3 pt-2">
          <span className="inline-flex items-center justify-center rounded-md bg-black/80 px-3 py-1 text-xs font-bold text-white shadow">
            {badgeText}
          </span>

          <span className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow transition group-hover:bg-black/90">
            {isDisabled ? "(bientôt)" : "Voir l’activité →"}
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

export default ActivityCard;
