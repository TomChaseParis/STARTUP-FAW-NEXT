import { ReactNode } from "react";

type ExerciseWidth = "narrow" | "normal" | "wide" | "full";

interface ExerciseSectionProps {
  children: ReactNode;
  width?: ExerciseWidth;
}

export default function ExerciseSection({
  children,
  width = "normal",
}: ExerciseSectionProps) {
  const widthMap: Record<ExerciseWidth, string> = {
    narrow: "max-w-3xl",
    normal: "max-w-5xl",
    wide: "max-w-[1280px]",
    full: "max-w-none",
  };

  return (
    <section className="border-t border-neutral-200 pt-20">
      <div className={`mx-auto w-full ${widthMap[width]} px-6 space-y-12`}>
        {children}
      </div>
    </section>
  );
}
