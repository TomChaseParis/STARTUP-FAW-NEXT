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

const ACTIVITY_COLORS: Record<string, string> = {
  beginner: "#E09F00",
  "elementary-1": "#57cc99",
  "elementary-2": "#31572c",
  "intermediate-1": "#7650B8",
  "intermediate-2": "#C94F91",
  advanced: "#C7443E",
};

export default function ActivityCard({
  level,
  activity,
}: ActivityCardProps) {
  const activityColor =
    ACTIVITY_COLORS[level] ?? "#E09F00";

  return (
    <Link
      href={`/courses/${level}/activities/${activity.slug}`}
      className={
        activity.locked
          ? "pointer-events-none block w-full opacity-60"
          : "group block w-full"
      }
    >
      <article
        className="
          relative
          flex
          h-[365px]
          w-full
          max-w-[420px]
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
        <div className="pointer-events-none absolute inset-[2px] rounded-[24px] border border-white/90" />

        <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-2px_6px_rgba(15,23,42,0.04)]" />

        <div className="pointer-events-none absolute left-6 right-6 top-0 h-10 bg-gradient-to-b from-white/70 to-transparent" />

        {activity.locked && (
          <div className="absolute right-4 top-4 z-20 sm:right-5 sm:top-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg sm:h-10 sm:w-10">
              <Lock
                className="h-4 w-4 text-white sm:h-5 sm:w-5"
                strokeWidth={2.5}
              />
            </div>
          </div>
        )}

        {/* Badge */}
        <div className="shrink-0">
          <span
            className="
              inline-block
              rounded-md
              px-3
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-wider
              text-white
              sm:text-xs
            "
            style={{
              backgroundColor: activityColor,
            }}
          >
            Activité
          </span>
        </div>

        {/* Titre */}
        <div className="mt-3 min-w-0 text-center sm:mt-4">
          <h2
            className="
              whitespace-normal
              break-words
              text-xl
              font-black
              uppercase
              leading-tight
              text-slate-900
              sm:text-2xl
            "
          >
            {activity.title}
          </h2>

          {activity.subtitle && (
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
              {activity.subtitle}
            </p>
          )}
        </div>

        {/* Illustration */}
        {activity.image && (
          <div className="relative mt-3 min-h-0 flex-1 sm:mt-4">
            <Image
              src={activity.image}
              alt={activity.title}
              fill
              sizes="
                (max-width: 640px) 90vw,
                420px
              "
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
        <p
          className="
            mt-3
            line-clamp-3
            whitespace-pre-line
            text-center
            text-sm
            leading-5
            text-black
            sm:mt-4
            sm:text-base
          "
        >
          {activity.description}
        </p>
      </article>
    </Link>
  );
}