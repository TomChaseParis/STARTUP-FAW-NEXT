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
    communication: "bg-[#FFAFF0]",
    grammar: "bg-[#28C2FF]",
    thematic: "bg-[#43268C]",
    conjugation: "",
    pronunciation: "",
    comprehension: "",
    culture: "",
    phonetics: "",
  };

  const normalizedHref = href.toLowerCase();

  const isBeginner =
    normalizedHref.includes("beginner") ||
    normalizedHref.includes("debutant") ||
    normalizedHref.includes("débutant");

  const isIntermediate1 =
    normalizedHref.includes("intermediate-1") ||
    normalizedHref.includes("intermediate1") ||
    normalizedHref.includes("intermediaire-1") ||
    normalizedHref.includes("intermediaire1");

  const isElementary1 =
    normalizedHref.includes("elementary-1") ||
    normalizedHref.includes("elementary1") ||
    normalizedHref.includes("elementaire-1") ||
    normalizedHref.includes("elementaire1");

  const isElementary2 =
    normalizedHref.includes("elementary-2") ||
    normalizedHref.includes("elementary2") ||
    normalizedHref.includes("elementaire-2") ||
    normalizedHref.includes("elementaire2");

  const startButtonClass = isIntermediate1
    ? "bg-[rgb(56,189,248)] hover:bg-[rgb(14,165,233)] shadow-sky-300/50 hover:shadow-sky-400/60 text-white"
    : isElementary1
      ? "bg-[rgb(87,204,153)] hover:bg-[rgb(70,185,135)] shadow-emerald-300/50 hover:shadow-emerald-400/60 text-white"
      : isElementary2
        ? "bg-[rgb(49,87,44)] hover:bg-[rgb(39,70,35)] shadow-green-900/20 hover:shadow-green-900/40 text-white"
        : isBeginner
          ? "bg-[rgb(224,159,0)] hover:bg-[rgb(204,143,0)] shadow-amber-300/50 hover:shadow-amber-400/60 text-white"
          : "bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 group-hover:from-amber-400 group-hover:via-amber-500 group-hover:to-yellow-400 shadow-amber-300/50 group-hover:shadow-amber-400/60 text-slate-900";

  return (
    <Link href={href} className="group block w-full">
      <article
        className="
          relative flex h-[365px] w-full max-w-[480px]
          flex-col overflow-hidden rounded-[28px] border
          border-slate-200 bg-gradient-to-br from-white
          via-white to-slate-50 p-4 sm:p-5 md:p-6
          shadow-[0_3px_6px_rgba(0,0,0,0.05),0_12px_24px_rgba(15,23,42,0.08),0_28px_60px_rgba(15,23,42,0.10)]
          transition-all duration-300 hover:-translate-y-1
          hover:shadow-[0_5px_10px_rgba(0,0,0,0.06),0_18px_36px_rgba(15,23,42,0.12),0_40px_80px_rgba(15,23,42,0.14)]
        "
      >
        {/* Badge */}
        <div className="shrink-0">
          <span
            className={`
              inline-block max-w-full rounded-md px-2.5 py-1
              text-[10px] font-bold uppercase tracking-wider text-white
              ${badgeColors[categoryColor] ?? ""}
            `}
          >
            {category}
          </span>
        </div>

        {/* Titre */}
        <div className="mt-2 min-w-0 text-center">
          <h2
            className="
              break-words text-lg font-black uppercase
              leading-tight text-slate-900 sm:text-xl
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-1 break-words text-sm font-semibold
              leading-tight text-black sm:text-base
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
              object-contain object-bottom
              transition-transform duration-500
              group-hover:scale-110
            "
          />
        </div>

        {/* Bouton */}
        <div className="mt-3 flex shrink-0 justify-center">
          <div
            className={`
              rounded-xl px-5 py-2.5 text-xs font-extrabold
              uppercase tracking-[0.12em] shadow-lg
              transition-all duration-300
              group-hover:scale-105 group-hover:shadow-xl
              sm:px-7 sm:py-3 sm:text-sm sm:tracking-[0.15em]
              ${startButtonClass}
            `}
          >
            Commencer
          </div>
        </div>
      </article>
    </Link>
  );
}