
"use client";

import TeacherComicBubble, {
  type TeacherLevel,
} from "../teacher/TeacherComicBubble";

type Props = {
  current: number;
  total: number;
  onPlay: () => void;
  disabled?: boolean;
  teacherLevel?: TeacherLevel;
  teacherBubbleImage?: string;
  showBubble: boolean;
};

export default function QuestionHeader({
  current,
  total,
  onPlay,
  disabled = false,
  teacherLevel = "beginner",
  teacherBubbleImage,
  showBubble,
}: Props) {
  const teacherAlt =
    teacherLevel === "beginner"
      ? "Marie, professeure de français"
      : teacherLevel === "elementary-1"
        ? "Jean, professeur de français"
        : "Professeur de français du niveau Élémentaire 2";

  return (
    <div className="mb-6 flex flex-col gap-4">
      {showBubble && (
        <div className="w-full max-w-xl">
          <TeacherComicBubble
            message="Clique sur ce bouton pour écouter la question à l'oral !"
            level={teacherLevel}
            imageSrc={teacherBubbleImage}
            imageAlt={teacherAlt}
          />
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onPlay}
          disabled={disabled}
          aria-label="Écouter la question"
          className={`
            group relative flex h-14 w-14 shrink-0
            items-center justify-center rounded-full
            border border-slate-200 bg-white text-amber-500
            shadow-[0_8px_25px_rgba(15,23,42,0.10)]
            transition-all duration-300
            hover:-translate-y-1 hover:border-amber-200
            hover:bg-amber-50 hover:text-amber-600
            hover:shadow-[0_14px_35px_rgba(245,158,11,0.20)]
            active:translate-y-0
            disabled:cursor-not-allowed disabled:opacity-50
            ${
              showBubble && !disabled
                ? "animate-pulse ring-4 ring-amber-300/50"
                : ""
            }
          `}
        >
          <span className="absolute inset-0 rounded-full bg-amber-400/0 transition-all duration-300 group-hover:bg-amber-400/10" />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="relative z-10 ml-0.5 h-6 w-6 transition-transform duration-300 group-hover:scale-110"
          >
            <path d="M8.5 5.2a1 1 0 0 1 1.54-.84l8.4 6.8a1.08 1.08 0 0 1 0 1.68l-8.4 6.8A1 1 0 0 1 8.5 18.8V5.2Z" />
          </svg>
        </button>

        <h3 className="text-xl font-semibold text-black">
          Question {current} / {total}
        </h3>
      </div>
    </div>
  );
}
