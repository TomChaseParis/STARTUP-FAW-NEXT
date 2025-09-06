    import Link from "next/link";
import React from "react";

type ActivityCardProps = {
  title: string;
  description?: string;
  href?: string; // si non fourni, la card n'est pas cliquable
  className?: string; // option pour custom CSS ponctuel si besoin
  width?: number;
  height?: number;
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  href,
  className = "",
  width = 300,
  height = 300,
}) => {
  const CardInner = (
    <div
      className={`bg-amber-400 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-between p-5 text-center ${className}`}
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

  // Si href est fourni → card cliquable
  return href ? (
    <Link href={href} className="group">
      {CardInner}
    </Link>
  ) : (
    CardInner
  );
};

export default ActivityCard;
