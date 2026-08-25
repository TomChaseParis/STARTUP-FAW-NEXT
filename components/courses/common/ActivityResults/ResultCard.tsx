type ResultCardProps = {
  icon: string;

  label: string;

  value: string;
};

export default function ResultCard({
  icon,
  label,
  value,
}: ResultCardProps) {
  return (
    <div
      className="
        min-w-0
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4
        transition
        hover:border-amber-300
        sm:p-6
      "
    >
      <div className="mb-2 text-2xl sm:mb-3 sm:text-3xl">
        {icon}
      </div>

      <p className="break-words text-xs font-medium uppercase tracking-wide text-slate-500 sm:text-sm">
        {label}
      </p>

      <p className="mt-1 break-words text-xl font-bold text-slate-900 sm:mt-2 sm:text-2xl">
        {value}
      </p>
    </div>
  );
}