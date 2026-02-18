import { ReactNode } from "react";

interface InstructionBlockProps {
  icon?: ReactNode;
  title: string;
  subtitle: string;
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

      <div className="flex items-center gap-3 mb-6">
        {icon && (
          <div className="text-xl text-amber-600">
            {icon}
          </div>
        )}
        <h2 className="text-lg md:text-xl font-semibold text-neutral-900">
          {title}
        </h2>
      </div>

      <h3 className="text-xl md:text-2xl font-medium text-neutral-900 mb-4">
        {subtitle}
      </h3>

      {description && (
        <p className="text-neutral-700 leading-relaxed mb-6">
          {description}
        </p>
      )}

      {reminder && (
        <div className="inline-block rounded-lg bg-white/70 border border-amber-200 px-4 py-2 text-sm text-neutral-700">
          {reminder}
        </div>
      )}

    </div>
  );
}
