
"use client";

type InfoBlockProps = {
  objectifs?: string[];
  competences?: string[];
  prerequis?: string[];
  duree?: string;
  accentColor?: string;
};

function InfoIcon({
  type,
  color,
}: {
  type: "objectifs" | "competences" | "prerequis" | "duree";
  color: string;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      style={{ color }}
      aria-hidden="true"
    >
      {type === "objectifs" && (
        <g {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1" />
        </g>
      )}

      {type === "competences" && (
        <g {...common}>
          <path d="M12 3.5 14.5 5l3-.1.7 2.9 2.1 2.1-1.2 2.7.5 2.9-2.6 1.5-1.5 2.6-2.9-.5-2.7 1.2-2.1-2.1-2.9-.7.1-3L3.5 12l1.5-2.6-.1-3 2.9-.7 2.1-2.1Z" />
          <path d="m8.5 12 2.2 2.2 4.8-4.8" />
        </g>
      )}

      {type === "prerequis" && (
        <g {...common}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 1 4 16.5Z" />
          <path d="M4 16.5A2.5 2.5 0 0 1 6.5 14H20" />
          <path d="M8 7h8M8 10h6" />
        </g>
      )}

      {type === "duree" && (
        <g {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3.5 2" />
        </g>
      )}
    </svg>
  );
}

export default function InfoBlock({
  objectifs = [],
  competences = [],
  prerequis = [],
  duree,
  accentColor = "#B77900",
}: InfoBlockProps) {
  const hasContent =
    objectifs.length > 0 ||
    competences.length > 0 ||
    prerequis.length > 0 ||
    Boolean(duree);

  if (!hasContent) return null;

  const sections = [
    {
      key: "objectifs",
      title: "Objectifs",
      type: "objectifs" as const,
      items: objectifs,
    },
    {
      key: "competences",
      title: "Compétences mises en œuvre",
      type: "competences" as const,
      items: competences,
    },
    {
      key: "prerequis",
      title: "Prérequis",
      type: "prerequis" as const,
      items: prerequis,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2">
        {sections.map(
          (section) =>
            section.items.length > 0 && (
              <section key={section.key} className="min-w-0">
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${accentColor}18`,
                    }}
                  >
                    <InfoIcon
                      type={section.type}
                      color={accentColor}
                    />
                  </div>

                  <h3 className="text-sm font-bold leading-snug text-slate-900 sm:text-base">
                    {section.title}
                  </h3>
                </div>

                <ul className="space-y-2.5 pl-1">
                  {section.items.map((item, index) => (
                    <li
                      key={`${section.key}-${index}`}
                      className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
                    >
                      <span
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ),
        )}

        {duree && (
          <section className="min-w-0">
            <div className="mb-3 flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${accentColor}18`,
                }}
              >
                <InfoIcon type="duree" color={accentColor} />
              </div>

              <h3 className="text-sm font-bold leading-snug text-slate-900 sm:text-base">
                Durée estimée
              </h3>
            </div>

            <p className="flex items-center gap-2 pl-1 text-sm leading-6 text-slate-600">
              Environ{" "}
              <strong className="font-bold text-slate-900">
                {duree}
              </strong>
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
