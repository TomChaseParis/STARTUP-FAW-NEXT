"use client";

import Link from "next/link";
import Image from "next/image";

type ModuleCardProps = {
  title: string;
  category: string;
  categoryColor?: string;
  description: string;
  image: string;
  href: string;
};

export default function ModuleCard({
  title,
  category,
  description,
  image,
  href,
  categoryColor = "pink",
}: ModuleCardProps) {
  const badgeColors: Record<string, string> = {
    yellow: "bg-[#E6D629]",
    red: "bg-red-600",
    purple: "bg-[#631275]",
    blue: "bg-sky-600",
    green: "bg-emerald-600",
    pink: "bg-[#FFAFF0]",
    violet: "bg-[#43268C]",
    lesson: "bg-[#FFB133]",
  };

  return (
    <Link
      href={href}
      className="group block w-full"
    >
      <article
        className="
          relative
          flex
          h-[365px]
          w-full
          max-w-[480px]
          flex-col
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200
          bg-gradient-to-br
          from-white
          via-white
          to-slate-50
          p-4
          sm:p-5
          md:p-6
          shadow-[0_3px_6px_rgba(0,0,0,0.05),0_12px_24px_rgba(15,23,42,0.08),0_28px_60px_rgba(15,23,42,0.10)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-[0_5px_10px_rgba(0,0,0,0.06),0_18px_36px_rgba(15,23,42,0.12),0_40px_80px_rgba(15,23,42,0.14)]
        "
      >
        {/* Badge */}
        <div className="shrink-0">
          <span
            className={`
              inline-block
              max-w-full
              rounded-md
              px-2.5
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-wider
              text-white
              ${
                badgeColors[categoryColor] ??
                badgeColors.yellow
              }
            `}
          >
            {category}
          </span>
        </div>

        {/* Titre */}
        <div className="mt-2 min-w-0 text-center">
          <h2
            className="
              break-words
              text-lg
              font-black
              uppercase
              leading-tight
              text-slate-900
              sm:text-xl
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-1
              break-words
              text-sm
              font-semibold
              leading-tight
              text-black
              sm:text-base
            "
          >
            {description}
          </p>
        </div>

        {/* Illustration */}
        <div className="relative mt-2 min-h-0 flex-1">
          <Image
            src={image}
            alt={title}
            fill
            sizes="
              (max-width: 640px) 90vw,
              (max-width: 1024px) 45vw,
              480px
            "
            className="
              object-contain
              object-bottom
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />
        </div>

        {/* Bouton */}
        <div className="mt-3 flex shrink-0 justify-center">
          <div
            className="
              rounded-xl
              bg-gradient-to-r
              from-amber-300
              via-amber-400
              to-yellow-500
              px-5
              py-2.5
              text-xs
              font-extrabold
              uppercase
              tracking-[0.12em]
              text-slate-900
              shadow-lg
              shadow-amber-300/50
              transition-all
              duration-300
              group-hover:scale-105
              group-hover:from-amber-400
              group-hover:via-amber-500
              group-hover:to-yellow-400
              group-hover:shadow-xl
              group-hover:shadow-amber-400/60
              sm:px-7
              sm:py-3
              sm:text-sm
              sm:tracking-[0.15em]
            "
          >
            Commencer
          </div>
        </div>
      </article>
    </Link>
  );
}