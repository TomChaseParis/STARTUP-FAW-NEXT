import Link from "next/link";
import React from "react";

type ActivityCardProps = {
  title: string;
  description?: string;
  href?: string;
  className?: string;
  width?: number;
  height?: number;
  level?: "beginner" | "elementary" | "intermediate" | "advanced"; // ← nouvelle prop
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  href,
  className = "",
  width = 300,
  height = 300,
  level = "beginner", // valeur par défaut
}) => {
  // Couleurs selon niveau
  const levelColors: Record<string, string> = {
    beginner: "bg-amber-400",
    elementary: "bg-green-400",
    intermediate: "bg-red-400",
    advanced: "bg-blue-400",
  };

  const bgColor = levelColors[level] || "bg-gray-300";

  const CardInner = (
    <div
      className={`${bgColor} rounded-lg shadow-md transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-between p-5 text-center ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="space-y-3">
        <h3 className="text-black text-3xl font-bold">{title}</h3>
        {description ? (
          <p className="text-black font-semibold leading-relaxed line-clamp-5">
            {description}
          </p>
        ) : null}
      </div>

      {href ? (
        <span className="mt-3 text-sm font-semibold text-black/80 opacity-70">
          Voir l’activité →
        </span>
      ) : (
        <span className="mt-3 text-sm font-semibold text-black/60 opacity-70">
          (bientôt)
        </span>
      )}
    </div>
  );

  return href ? (
    <Link href={href} className="group">
      {CardInner}
    </Link>
  ) : (
    CardInner
  );
};

export default ActivityCard;
