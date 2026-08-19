"use client";

type ActivityStartButtonProps = {
  onClick: () => void;
};

export default function ActivityStartButton({
  onClick,
}: ActivityStartButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:scale-105 hover:bg-blue-700"
    >
      ▶ Commencer l'activité
    </button>
  );
}