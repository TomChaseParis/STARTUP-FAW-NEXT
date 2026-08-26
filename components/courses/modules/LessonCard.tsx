import Link from "next/link";
import Image from "next/image";

type LessonCardProps = {
  level: string;
  lesson: {
    slug: string;
    title: string;
    description: string;
    image?: string;
    locked: boolean;
    label?: string;
    labelColor?: string;
  };
};

const LESSON_COLORS: Record<string, string> = {
  beginner: "#E09F00",
  "elementary-1": "#57cc99",
  "elementary-2": "#31572c",
  "intermediate-1": "#B79CED",
  "intermediate-2": "#F29BCB",
  advanced: "#F28B82",
};

export default function LessonCard({
  level,
  lesson,
}: LessonCardProps) {
  const lessonColor =
    LESSON_COLORS[level] ?? "#FFD166";

  return (
    <Link
      href={`/courses/${level}/lessons/${lesson.slug}`}
      className={
        lesson.locked
          ? "pointer-events-none opacity-60"
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
        {/* Badge */}
        <div>
          <span
            className="
              rounded-md
              px-3
              py-1
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-white
            "
            style={{
              backgroundColor: lessonColor,
            }}
          >
            Leçon
          </span>
        </div>

        {/* Titre */}
        <div className="mt-4 min-w-0 text-center">
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
            {lesson.title}
          </h2>

          {lesson.label && (
            <p className="mt-1 break-words font-semibold text-black">
              {lesson.label}
            </p>
          )}
        </div>

        {/* Illustration */}
        {lesson.image && (
          <div className="relative mt-4 min-h-0 flex-1">
            <Image
              src={lesson.image}
              alt={lesson.title}
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
        <p className="mt-4 line-clamp-2 text-center text-sm font-semibold text-black sm:text-base">
          {lesson.description}
        </p>
      </article>
    </Link>
  );
}