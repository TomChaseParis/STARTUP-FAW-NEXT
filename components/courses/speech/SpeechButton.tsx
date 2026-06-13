"use client";

type Props = {
  isListening: boolean;
  onClick: () => void;
};

export default function SpeechButton({
  isListening,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex h-14 w-14 shrink-0
        items-center justify-center
        overflow-hidden rounded-2xl
        transition-all duration-300

        ${
          isListening
            ? `
              bg-gradient-to-br
              from-amber-300
              via-yellow-300
              to-amber-400
              scale-105
              shadow-[0_16px_32px_rgba(245,158,11,0.28)]
            `
            : `
              bg-amber-300
              shadow-[0_8px_20px_rgba(0,0,0,0.06)]
            `
        }
      `}
    >
      {isListening && (
        <>
          <span className="absolute h-12 w-12 rounded-full border-2 border-white/50 animate-ping" />
          <span className="absolute h-16 w-16 rounded-full border border-white/30 animate-ping [animation-delay:300ms]" />
        </>
      )}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-7 w-7 text-slate-800"
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
    </button>
  );
}