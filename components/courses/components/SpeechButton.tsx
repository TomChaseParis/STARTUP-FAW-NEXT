"use client";

interface SpeechButtonProps {
  isListening: boolean;
  onClick: () => void;
  ariaLabel?: string;
}

export default function SpeechButton({
  isListening,
  onClick,
  ariaLabel = "Parler",
}: SpeechButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        group/button
        relative
        flex
        h-14
        w-14
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        transition-all
        duration-300
        active:scale-[0.97]
        ${
          isListening
            ? `
              scale-105
              bg-gradient-to-br
              from-amber-300
              via-yellow-300
              to-amber-400
              shadow-[0_16px_32px_rgba(245,158,11,0.28)]
            `
            : `
              bg-amber-300
              shadow-[0_8px_20px_rgba(0,0,0,0.06)]
              hover:-translate-y-1
              hover:shadow-[0_16px_30px_rgba(245,158,11,0.18)]
            `
        }
      `}
    >
      {isListening && (
        <>
          <span
            className="
              absolute
              h-12
              w-12
              animate-ping
              rounded-full
              border-2
              border-white/50
            "
          />

          <span
            className="
              absolute
              h-16
              w-16
              animate-ping
              rounded-full
              border
              border-white/30
              [animation-delay:300ms]
            "
          />
        </>
      )}

      <div
        className={`
          relative
          text-slate-800
          transition-transform
          duration-300
          ${
            isListening
              ? "animate-pulse scale-110"
              : "group-hover/button:scale-110"
          }
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14a3 3 0 003-3V7a3 3 0 10-6 0v4a3 3 0 003 3z"
          />

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11a7 7 0 01-14 0M12 18v3"
          />
        </svg>
      </div>
    </button>
  );
}