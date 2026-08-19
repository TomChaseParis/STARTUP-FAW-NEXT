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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-amber-300">
      <div className="mb-3 text-3xl">
        {icon}
      </div>

      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}