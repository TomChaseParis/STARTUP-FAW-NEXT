import Image from "next/image";
import Link from "next/link";

export interface LevelCardProps {
  slug: string;
  title: string;
  description: string;
  image: string;
  badge: string;
}

export default function LevelCard({
  slug,
  title,
  description,
  image,
  badge,
}: LevelCardProps) {
  return (
    <Link
      href={`/courses/${slug}`}
      className="group relative block h-full w-full overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl"
    >
      {/* IMAGE */}
      <div className="relative h-[65%] w-full">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
      </div>

      {/* TEXTE */}
      <div className="flex h-[35%] flex-col justify-between bg-white p-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {/* BADGE NIVEAU */}
      <span className="absolute bottom-3 right-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white shadow">
        {badge}
      </span>
    </Link>
  );
}
