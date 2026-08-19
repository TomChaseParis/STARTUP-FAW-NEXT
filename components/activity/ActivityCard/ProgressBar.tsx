"use client";

type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({
  current,
  total,
}: ProgressBarProps) {
  const progress = Math.min(
    100,
    Math.max(0, (current / total) * 100),
  );

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-sm font-medium text-slate-500">
        <span>
          Question {current} sur {total}
        </span>

        <span>{Math.round(progress)}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-amber-400
            via-amber-500
            to-yellow-400
            transition-all
            duration-500
            ease-out
            shadow-[0_0_12px_rgba(251,191,36,0.45)]
          "
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}