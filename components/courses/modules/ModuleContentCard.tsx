"use client";

import Link from "next/link";
import Image from "next/image";

type ModuleContentCardProps = {
  label: string;
  title?: string;
  description?: string;
  image?: string;
  href: string;
  locked?: boolean;
};

export default function ModuleContentCard({
  label,
  title,
  description,
  image,
  href,
  locked = false,
}: ModuleContentCardProps) {
  return (
    <Link href={href}>
      <div
        className="
          group relative
          h-[270px]
          rounded-3xl
          border-2 border-slate-200
          bg-white
          p-6
          shadow-lg
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <div className="flex items-center justify-between">
          <span className="rounded bg-yellow-200 px-3 py-1 text-sm font-bold uppercase">
            {label}
          </span>

          <span className="text-3xl">
            {locked ? "🔒" : "🔓"}
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center text-center">
          {image && (
            <div className="relative mb-4 h-20 w-20">
              <Image
                src={image}
                alt={title ?? label}
                fill
                className="object-contain"
              />
            </div>
          )}

          {title && (
            <h2 className="text-xl font-black">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-2 text-slate-600">
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}