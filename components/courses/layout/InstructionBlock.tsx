import { ReactNode } from "react";

interface InstructionBlockProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string; // ✅ devient optionnel
  description?: string;
  reminder?: string;
}

export default function InstructionBlock({
  icon,
  title,
  subtitle,
  description,
  reminder,
}: InstructionBlockProps) {
  return (
    <div className="w-full rounded-2xl border border-amber-200 bg-amber-50/70 p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        {icon && <div className="text-xl text-amber-600">{icon}</div>}
        <h2 className="text-lg font-semibold text-neutral-900 md:text-xl">
          {title}
        </h2>
      </div>

      {/* ✅ Subtitle affiché uniquement si présent */}
      {subtitle && (
        <h3 className="mb-4 text-xl font-medium text-neutral-900 md:text-2xl">
          {subtitle}
        </h3>
      )}

      {description && (
        <p className="mb-6 leading-relaxed text-neutral-700">{description}</p>
      )}

      {reminder && (
        <div className="inline-block rounded-lg border border-amber-200 bg-white/70 px-4 py-2 text-sm text-neutral-700">
          {reminder}
        </div>
      )}
    </div>
  );
}
