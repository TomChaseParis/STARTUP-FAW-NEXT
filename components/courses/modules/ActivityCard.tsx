import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";

type ActivityCardProps = {
  level: string;
  activity: {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    image?: string;
    locked: boolean;
  };
};

export default function ActivityCard({ level, activity }: ActivityCardProps) {
  return (
    <Link
      href={`/courses/${level}/activities/${activity.slug}`}
      className={
        activity.locked ? "pointer-events-none opacity-60" : "group block"
      }
    >
      <article
      
      className="
      relative
      flex
      h-[365px]
      w-[420px]
      flex-col
      overflow-hidden
      rounded-[28px]
      border
      border-slate-200
      bg-gradient-to-br
      from-white
      via-white
      to-slate-50
      p-6
    
      shadow-[0_3px_6px_rgba(0,0,0,0.05),0_12px_24px_rgba(15,23,42,0.08),0_28px_60px_rgba(15,23,42,0.10)]
      hover:shadow-[0_5px_10px_rgba(0,0,0,0.06),0_18px_36px_rgba(15,23,42,0.12),0_40px_80px_rgba(15,23,42,0.14)]    
      transition-all
      duration-300
    
      hover:-translate-y-1
    "
      >
        <div className="pointer-events-none absolute inset-[2px] rounded-[24px] border border-white/90" />
        <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-2px_6px_rgba(15,23,42,0.04)]" />
        <div className="pointer-events-none absolute left-6 right-6 top-0 h-10 bg-gradient-to-b from-white/70 to-transparent" />
        {activity.locked && (
          <div className="absolute right-5 top-5 z-20">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg">
              <Lock className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
          </div>
        )}
        {/* Sous-titre */}
        <div>
          <span className="rounded-md bg-[#E6D629] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Activité
          </span>
        </div>

        {/* Titre */}
        <div className="mt-4 text-center">
          <h2 className="truncate text-2xl font-black uppercase text-slate-900">
            {activity.title}
          </h2>

          <p className="mt-1 text-base font-semibold text-black">
            {activity.subtitle}
          </p>
        </div>

        {/* Illustration */}
        {activity.image && (
          <div className="relative mt-4 flex-1">
            <Image
              src={activity.image}
              alt={activity.title}
              fill
              className="
                object-contain
                object-bottom
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          </div>
        )}

        {/* Description */}
        <p className="text-md mt-4 whitespace-pre-line text-center leading-5 text-black">
          {activity.description}
        </p>
      </article>
    </Link>
  );
}
