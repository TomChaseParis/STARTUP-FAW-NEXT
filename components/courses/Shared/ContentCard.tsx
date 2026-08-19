"use client";

import Image from "next/image";
import Link from "next/link";

type ContentCardProps = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
};

export default function ContentCard({
  title,
  subtitle,
  description,
  image,
  href,
}: ContentCardProps) {
  return (
    <Link href={href} className="group block">
      <article
        className="
          flex
          h-[265px]
          w-[320px]
          flex-col
          overflow-hidden
          rounded-[28px]
          border-2
          border-slate-900
          bg-white
          p-5
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <h2 className="truncate text-xl font-black text-slate-900">
          {title}
        </h2>

        <p className="text-sm font-semibold text-amber-500">
          {subtitle}
        </p>

        <div className="relative my-2 flex-1">
          <Image
            src={image}
            alt={title}
            fill
            className="
              object-contain
              object-center
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        </div>

        <p className="line-clamp-2 text-sm leading-5 text-gray-600">
          {description}
        </p>
      </article>
    </Link>
  );
}