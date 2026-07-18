"use client";

import {
  getScoreColor,
  getScoreLevel,
  getStars,
} from "../../utils/exerciseScoring";

type Props = {
  score: number;
};

export default function ScoreBadge({ score }: Props) {
  const level = getScoreLevel(score);
  const stars = getStars(score);
  const color = getScoreColor(score);

  const colors = {
    green: "bg-green-100 text-green-700 border-green-300",
    emerald: "bg-emerald-100 text-emerald-700 border-emerald-300",
    amber: "bg-amber-100 text-amber-700 border-amber-300",
    orange: "bg-orange-100 text-orange-700 border-orange-300",
    red: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <div
      className={`rounded-2xl border p-6 text-center shadow-sm ${colors[color]}`}
    >
      <p className="text-5xl font-extrabold">
        {score}
        <span className="text-xl"> /100</span>
      </p>

      <p className="mt-3 text-xl font-bold">{level}</p>

      <div className="mt-4 flex justify-center gap-1 text-2xl">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>{index < stars ? "⭐" : "☆"}</span>
        ))}
      </div>
    </div>
  );
}
