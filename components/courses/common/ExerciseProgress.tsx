
"use client";

type Props = {
  current: number;
  total: number;
  color?: string;
};

export default function ExerciseProgress({
  current,
  total,
  color = "#E09F00",
}: Props) {
  const progress =
    total === 0 ? 0 : (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <p
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color }}
        >
          Progression
        </p>

        <p className="text-sm font-semibold text-slate-600">
          {current} / {total}
        </p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
