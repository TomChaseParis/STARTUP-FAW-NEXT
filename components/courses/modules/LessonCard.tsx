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
  "elementary-1": "#132A13",
  "elementary-2": "#FFB133",
};

export default function LessonCard({
  level,
  lesson,
}: LessonCardProps) {
  const lessonColor =
    LESSON_COLORS[level] ?? "#132A13";

  return (
    <Link
      href={`/courses/${level}/lessons/${lesson.slug}`}
      className={
        lesson.locked
          ? "pointer-events-none opacity-60"
          : "group block"
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
        <div className="mt-4 text-center">
          <h2 className="whitespace-normal break-words text-2xl font-black uppercase leading-tight text-slate-900">
            {lesson.title}
          </h2>

          {lesson.label && (
            <p className="mt-1 font-semibold text-black">
              {lesson.label}
            </p>
          )}
        </div>

        {/* Illustration */}
        {lesson.image && (
          <div className="relative mt-4 flex-1">
            <Image
              src={lesson.image}
              alt={lesson.title}
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
        <p className="mt-4 line-clamp-2 text-center font-semibold text-black">
          {lesson.description}
        </p>
      </article>
    </Link>
  );
}