"use client";

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

export default function TeacherAudioButton({
  disabled,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        bg-amber-500
        text-white
        shadow-lg
        transition-all

        ${
          disabled
            ? "animate-pulse cursor-not-allowed opacity-50"
            : "hover:scale-105"
        }
      `}
    >
      🔊
    </button>
  );
}