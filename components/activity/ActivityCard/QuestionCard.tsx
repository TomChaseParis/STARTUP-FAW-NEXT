import { ReactNode } from "react";

type QuestionCardProps = {
  icon?: ReactNode;

  title: string;

  question: string;

  children: ReactNode;

  showTitle?: boolean;
};

export default function QuestionCard({
  icon,
  title,
  question,
  children,
  showTitle = true,
}: QuestionCardProps) {
  return (
    <section
      className="
        mx-auto
        max-w-4xl
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-10
        shadow-xl
        transition-all
        duration-300
        animate-in
        fade-in
      "
    >
      <header className="mb-10 text-center">
        {icon !== null && (
          <div
            className="
              mx-auto
              mb-6
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-amber-100
              to-yellow-50
              text-4xl
              shadow-md
            "
          >
            {icon ?? "❓"}
          </div>
        )}

        {showTitle && (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            {title}
          </p>
        )}

        <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-900">
          {question}
        </h2>
      </header>

      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}