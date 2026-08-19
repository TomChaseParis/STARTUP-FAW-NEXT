"use client";

type OptionCardProps = {
  label: string;

  selected: boolean;

  onClick: () => void;

  disabled?: boolean;
};

export default function OptionCard({
  label,
  selected,
  onClick,
  disabled = false,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        group
        relative
        flex
        w-full
        items-center
        justify-between
        rounded-2xl
        border-2
        px-6
        py-5
        text-left
        transition-all
        duration-200

        ${
          selected
            ? `
              -translate-y-1
              border-amber-400
              bg-amber-50
              shadow-xl
            `
            : `
              border-slate-200
              bg-white
              hover:-translate-y-1
              hover:border-amber-200
              hover:shadow-lg
            `
        }

        ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer"
        }
      `}
    >
      <span
        className={`
          text-lg
          font-medium
          transition-colors

          ${
            selected
              ? "text-slate-900"
              : "text-slate-700"
          }
        `}
      >
        {label}
      </span>

      <div
        className={`
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          border-2
          transition-all

          ${
            selected
              ? `
                border-amber-400
                bg-amber-400
                text-white
                scale-110
              `
              : `
                border-slate-300
                bg-white
                text-transparent
                group-hover:border-amber-300
              `
          }
        `}
      >
        ✓
      </div>
    </button>
  );
}