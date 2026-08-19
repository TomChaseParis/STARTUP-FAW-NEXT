"use client";

type TeacherBubbleProps = {
  title: string;
  message: string;
};

export default function TeacherBubble({
  title,
  message,
}: TeacherBubbleProps) {
  return (
    <div className="relative flex-1">
      {/* Pointe de la bulle */}
      <div
        className="
          absolute
          -left-4
          top-24
          h-8
          w-8
          rotate-45
          rounded-sm
          border-l
          border-b
          border-slate-200
          bg-white
        "
      />

      {/* Bulle */}
      <div
        className="
          relative
          rounded-[36px]
          border
          border-slate-200
          bg-white
          p-10
          shadow-xl
        "
      >
        <h2 className="mb-5 text-4xl font-extrabold text-emerald-600">
          {title}
        </h2>

        <p className="text-xl leading-9 text-slate-700 whitespace-pre-line">
          {message}
        </p>
      </div>
    </div>
  );
}