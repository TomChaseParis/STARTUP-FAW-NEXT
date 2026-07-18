"use client";

import Link from "next/link";
import Image from "next/image";

type ModuleCardProps = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  color?: "blue" | "amber";
};

export default function ModuleCard({
  title,
  subtitle,
  description,
  image,
  href,
  color = "blue",
}: ModuleCardProps) {
  const colors = {
    blue:
      "from-sky-400 via-blue-500 to-indigo-600 shadow-blue-300/40",
    amber:
      "from-amber-300 via-amber-400 to-orange-500 shadow-amber-300/40",
  };

  return (
    <Link href={href}>
      <div
        className={`
          group relative overflow-hidden rounded-3xl
          bg-gradient-to-br ${colors[color]}
          h-[420px]
          shadow-2xl
          transition-all duration-500
          hover:-translate-y-2
          hover:scale-[1.02]
        `}
      >
       <Image
  src={image}
  alt={title}
  fill
  className="absolute inset-0 object-cover opacity-20 transition duration-700 group-hover:scale-110"
/>

        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-80">
              {subtitle}
            </p>

            <h2 className="mt-5 text-5xl font-black">
              {title}
            </h2>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/90">
              {description}
            </p>
          </div>

          <div>
            <button className="rounded-2xl bg-white px-8 py-4 text-lg font-bold text-black transition hover:scale-105">
              Commencer →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}