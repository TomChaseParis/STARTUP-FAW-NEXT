"use client";

import { useEffect, useRef } from "react";

import confetti from "canvas-confetti";

type ScoreBadgeProps = {
  score: number;
  variant?: "activity" | "lesson";
};

export default function ScoreBadge({
  score,
  variant = "activity",
}: ScoreBadgeProps) {
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (score < 90) return;

    const duration =
      score === 100 ? 2500 : 1500;

    const animationEnd =
      Date.now() + duration;

    const defaults = {
      startVelocity: 35,
      spread: 360,
      ticks: 80,
      zIndex: 9999,
    };

    function randomInRange(
      min: number,
      max: number,
    ) {
      return (
        Math.random() * (max - min) + min
      );
    }

    const interval =
      window.setInterval(() => {
        const timeLeft =
          animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount =
          score === 100 ? 35 : 18;

        confetti({
          ...defaults,
          particleCount,
          origin: {
            x: randomInRange(0.1, 0.3),
            y: randomInRange(0.2, 0.5),
          },
        });

        confetti({
          ...defaults,
          particleCount,
          origin: {
            x: randomInRange(0.7, 0.9),
            y: randomInRange(0.2, 0.5),
          },
        });
      }, 220);

    return () =>
      clearInterval(interval);
  }, [score]);

  let emoji = "💪";
  let title = "";

  if (variant === "lesson") {
    if (score < 50) {
      emoji = "📚";
      title = "";
    } else if (score < 75) {
      emoji = "🔎";
      title = "";
    } else if (score < 100) {
      emoji = "👍";
      title = "";
    } else {
      emoji = "🏆";
      title = "";
    }
  } else {
    if (score < 50) {
      emoji = "😕";
      title = "Try again !";
    } else if (score < 75) {
      emoji = "👍";
      title = "Keep it up !";
    } else if (score < 100) {
      emoji = "👍";
      title = "Good work !";
    } else {
      emoji = "🏆";
      title = "You nailed it !";
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div
        ref={emojiRef}
        className={`mb-6 text-6xl transition-transform duration-500 ${
          score >= 90
            ? "animate-pulse"
            : ""
        }`}
      >
        {emoji}
      </div>

      <div className="flex h-44 w-44 items-center justify-center rounded-full border-[10px] border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-100 shadow-lg">
        <span className="text-5xl font-extrabold text-amber-600">
          {score}%
        </span>
      </div>

      {title && (
        <h3 className="mt-8 text-3xl font-bold text-slate-900">
          {title}
        </h3>
      )}
    </div>
  );
}
