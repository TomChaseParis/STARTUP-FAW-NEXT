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
  };
};

export default function LessonCard({
  level,
  lesson,
}: LessonCardProps) {
  return (
    <Link
      href={`/courses/${level}/lessons/${lesson.slug}`}
      className={lesson.locked ? "pointer-events-none opacity-60" : "group block"}
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
        {/* Badge */}
        <div>
          <span className="rounded-md bg-[#FFB133] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Leçon
          </span>
        </div>

        {/* Titre */}
        <div className="mt-4 text-center">
          <h2 className="truncate text-2xl font-black uppercase text-slate-900">
            {lesson.title}
          </h2>

          <p className="mt-1 text-base font-semibold text-black">
            Découverte
          </p>
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
        <p className="mt-4 line-clamp-2 text-center text-sm leading-5 text-slate-600">
          {lesson.description}
        </p>
      </article>
    </Link>
  );
}