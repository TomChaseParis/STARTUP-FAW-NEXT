"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

export type ExerciseLevel =
  | "beginner"
  | "elementary-1"
  | "elementary-2";

export type ExerciseInstructionStep = {
  title: string;
  description: string;
  icon: "sound" | "mic" | "keyboard" | "click";
};

export type ExercisePointAttention = {
  imageSrc: string;
  imageAlt: string;
  title: ReactNode;
  example?: ReactNode;
};

export type ExerciseInstructionProps = {
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
  example?: string;
  instruction?: string;
  steps: [ExerciseInstructionStep, ExerciseInstructionStep];
  pointAttention?: ExercisePointAttention;
  onStart?: () => void;
  started?: boolean;
  children?: ReactNode;
  beforeStartContent?: ReactNode;
  activityTitle?: string;
  level?: ExerciseLevel;
};

type LevelColors = {
  primary: string;
  hover: string;
  border: string;
  soft: string;
  softStrong: string;
  gradient: string;
  divider: string;
  ring: string;
};

const levelColors: Record<ExerciseLevel, LevelColors> = {
  beginner: {
    primary: "#E09F00",
    hover: "#C98D00",
    border: "#F5E7BD",
    soft: "#FFF0C9",
    softStrong: "#FFE9B5",
    gradient: "rgba(255, 211, 89, 0.13)",
    divider: "#F3D982",
    ring: "#FFD875",
  },
  "elementary-1": {
    primary: "#57CC99",
    hover: "#46B987",
    border: "#B9EAD2",
    soft: "#E0F5E9",
    softStrong: "#C9EEDB",
    gradient: "rgba(87, 204, 153, 0.13)",
    divider: "#A7E2C5",
    ring: "#B9EAD2",
  },
  "elementary-2": {
    primary: "#6C8FE5",
    hover: "#5276CD",
    border: "#CFDAF8",
    soft: "#EAF0FF",
    softStrong: "#DCE6FF",
    gradient: "rgba(108, 143, 229, 0.13)",
    divider: "#C2D0F5",
    ring: "#CFDAF8",
  },
};

function SoundIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
      <path
        d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MicIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="9" y="3" width="6" height="12" rx="3" fill="currentColor" />
      <path
        d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3m-4 0h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KeyboardIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2.5"
        y="5"
        width="19"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M6 9h.01M9 9h.01M12 9h.01M15 9h.01M18 9h.01M6 12h.01M9 12h.01M12 12h.01M15 12h.01M18 12h.01M8 15h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClickIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m6 3 12 10-6 .8 3.2 6.2-3.1 1.5-3.1-6.3L5 20 6 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstructionIcon({
  type,
  size = 24,
}: {
  type: ExerciseInstructionStep["icon"];
  size?: number;
}) {
  switch (type) {
    case "sound":
      return <SoundIcon size={size} />;
    case "mic":
      return <MicIcon size={size} />;
    case "keyboard":
      return <KeyboardIcon size={size} />;
    case "click":
      return <ClickIcon size={size} />;
  }
}

function IdeaIcon({ size = 21 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 18h6M10 21h4M8.5 14.5a6 6 0 1 1 7 0c-.8.6-1.2 1.4-1.3 2.5h-4.4c-.1-1.1-.5-1.9-1.3-2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ExerciseInstruction({
  imageSrc,
  imageAlt,
  category,
  title,
  description,
  example,
  instruction,
  steps,
  pointAttention,
  onStart,
  started = false,
  children,
  beforeStartContent,
  activityTitle,
  level = "beginner",
}: ExerciseInstructionProps) {
  const colors = levelColors[level];

  const themeStyle = {
    "--level-primary": colors.primary,
    "--level-hover": colors.hover,
    "--level-border": colors.border,
    "--level-soft": colors.soft,
    "--level-soft-strong": colors.softStrong,
    "--level-gradient": colors.gradient,
    "--level-divider": colors.divider,
    "--level-ring": colors.ring,
  } as CSSProperties;

  return (
    <main
      className="w-full min-w-0 bg-white p-0 font-[Arial,Helvetica,sans-serif] text-[#09264a]"
      style={themeStyle}
    >
      <div className="container">
        <section
          aria-labelledby="exercise-instruction-title"
          className="relative isolate mx-auto grid min-h-0 w-full min-w-0 grid-cols-1 items-start gap-6 overflow-hidden rounded-[28px] border bg-[linear-gradient(135deg,#fffefa_0%,#fffdf6_55%,#fff9e9_100%)] p-4 shadow-[0_8px_28px_rgba(15,23,42,0.045)] sm:gap-6 sm:p-6 lg:grid-cols-2 lg:gap-8 lg:p-8"
          style={{ borderColor: colors.border }}
        >
          {/* Décorations du fond */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[110px] -top-[180px] -z-10 h-[440px] w-[58%] rotate-[-7deg] rounded-b-[55%_45%] bg-[linear-gradient(135deg,rgba(255,255,255,0.75),rgba(255,253,246,0.35))]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[210px] -right-[100px] -z-10 h-[400px] w-[55%] rounded-full"
            style={{
              background: `radial-gradient(ellipse, ${colors.gradient}, transparent)`,
            }}
          />

          {/* Colonne gauche : illustration et étapes */}
          <div className="relative flex min-w-0 flex-col items-center self-start lg:row-span-2">
            <div className="relative h-[300px] w-full sm:h-[380px] lg:h-[420px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="object-contain object-center"
              />
            </div>

            <div className="mt-1 grid w-full grid-cols-2 items-stretch gap-3 max-[380px]:grid-cols-1">
              {steps.map((step, index) => (
                <article
                  key={`${step.title}-${index}`}
                  className="flex min-w-0 flex-col rounded-[14px] border border-[#172a4110] bg-white px-3 py-3 shadow-[0_3px_10px_#1a2c400a]"
                >
                  <div className="mb-2 flex min-w-0 items-center gap-2">
                    <div
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                      style={{
                        backgroundColor: colors.soft,
                        color: colors.primary,
                      }}
                    >
                      <InstructionIcon type={step.icon} size={18} />
                    </div>

                    <span
                      className="grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold"
                      style={{
                        borderColor: colors.primary,
                        color: colors.primary,
                      }}
                    >
                      {index + 1}
                    </span>

                    <h3 className="m-0 min-w-0 font-serif text-sm font-semibold leading-tight text-[#09264a] sm:text-base">
                      {step.title}
                    </h3>
                  </div>

                  <p className="m-0 text-[11px] leading-[1.45] text-[#183352] sm:text-xs">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Colonne droite : instructions */}
          <div
            className="min-w-0 px-1 py-5 sm:px-2 sm:py-6 lg:relative lg:py-[34px] lg:pr-2 lg:before:absolute lg:before:bottom-0 lg:before:left-[-17px] lg:before:top-0 lg:before:w-px"
            style={{ "--tw-before-bg": colors.divider } as CSSProperties}
          >
            <div className="mb-[22px] flex items-center gap-3 text-[11px] font-extrabold tracking-[0.22em] text-[#748198] sm:gap-[17px] sm:text-[13px]">
              <span
                className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full sm:h-[58px] sm:w-[58px]"
                style={{
                  backgroundColor: colors.soft,
                  color: colors.primary,
                }}
              />
              <span>{category}</span>
            </div>

            <h2
              id="exercise-instruction-title"
              className="m-0 font-serif text-[clamp(32px,4vw,59px)] font-bold leading-[1.04] tracking-[-0.045em] text-[#09264a]"
            >
              {title}
            </h2>

            <div
              className="mb-[13px] mt-6 h-[6px] w-[100px] rounded-full"
              style={{ backgroundColor: colors.primary }}
            />

            <p className="mb-6 mt-0 text-base leading-[1.55] text-[#152f50] sm:text-[clamp(16px,1.32vw,21px)]">
              {description}
            </p>

            {/* Consigne */}
            {instruction && (
              <div
                className="mb-[17px] flex items-start gap-3 rounded-xl border px-4 py-4 sm:px-5"
                style={{
                  borderColor: colors.border,
                  background: `linear-gradient(90deg, ${colors.soft}, #fffaf0)`,
                }}
              >
                <div
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                  style={{
                    backgroundColor: colors.softStrong,
                    color: colors.primary,
                  }}
                  aria-hidden="true"
                >
                  <IdeaIcon size={19} />
                </div>

                <div className="min-w-0">
                  <h3
                    className="mb-1 mt-0 text-xs font-extrabold uppercase tracking-[0.12em]"
                    style={{ color: colors.primary }}
                  >
                    Consigne
                  </h3>

                  <p className="m-0 text-sm leading-relaxed text-[#152f50] sm:text-base">
                    {instruction}
                  </p>
                </div>
              </div>
            )}

            {/* Exemple principal : affiché uniquement si fourni */}
            {example && (
              <div
                className="mb-[17px] flex min-h-[78px] flex-wrap items-center gap-[10px] rounded-xl border-l-[6px] px-[13px] py-[13px] text-[#152f50] sm:flex-nowrap sm:gap-[17px] sm:px-5"
                style={{
                  borderLeftColor: colors.primary,
                  background: `linear-gradient(90deg, ${colors.soft}, #fffaf0)`,
                }}
              >
                <span
                  className="shrink-0 whitespace-nowrap rounded-[30px] px-4 py-[9px] text-base sm:px-[17px]"
                  style={{
                    backgroundColor: colors.softStrong,
                    color: colors.primary,
                  }}
                >
                  Exemple
                </span>

                <span className="basis-full text-sm leading-[1.4] sm:basis-auto sm:text-[clamp(14px,1.1vw,18px)]">
                  {`« ${example} »`}
                </span>
              </div>
            )}

         

            {/* Point d’attention */}
            {pointAttention && (
              <aside
                aria-label="Point d’attention"
                className="mb-5 flex min-w-0 flex-col gap-3 rounded-2xl border bg-white/90 p-4 shadow-[0_3px_12px_rgba(26,44,64,0.06)] sm:flex-row sm:items-start sm:gap-4 sm:p-5"
                style={{ borderColor: colors.border }}
              >
                <div className="w-[76px] shrink-0 self-center sm:w-[88px]">
                  <Image
                    src={pointAttention.imageSrc}
                    alt={pointAttention.imageAlt}
                    width={176}
                    height={176}
                    className="h-auto w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 mt-0 font-serif text-xl font-bold text-[#09264a] sm:text-2xl">
                    Point d’attention
                  </h3>

                  <div className="text-sm leading-relaxed text-[#183352] sm:text-base">
                    {pointAttention.title}
                  </div>

                  {pointAttention.example && (
                    <div
                      className="mt-2 rounded-lg px-3 py-2 text-sm leading-relaxed text-[#183352] sm:text-base"
                      style={{ backgroundColor: colors.soft }}
                    >
                      {pointAttention.example}
                    </div>
                  )}
                </div>
              </aside>
            )}

            {/* Contenu complémentaire avant le démarrage */}
            {beforeStartContent && (
              <div className="mb-5 w-full min-w-0">
                {beforeStartContent}
              </div>
            )}

            {/* Bouton de démarrage */}
            {!started && (
              <div className="mt-6 flex w-full flex-col items-center min-[761px]:mt-[90px]">
                <div className="mb-[17px] flex w-full max-w-[360px] items-center gap-3 text-[#748198]">
                  <span className="h-px flex-1 bg-[#cfd4dc]" />

                  <p className="m-0 whitespace-nowrap text-[9px] font-extrabold tracking-[0.12em] sm:text-xs sm:tracking-[0.15em]">
                    PRÊT À COMMENCER ?
                  </p>

                  <span className="h-px flex-1 bg-[#cfd4dc]" />
                </div>

                <button
                  type="button"
                  onClick={onStart}
                  style={{
                    backgroundColor: colors.primary,
                    outlineColor: colors.hover,
                  }}
                  className="flex cursor-pointer items-center justify-center rounded-xl border-0 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                  onMouseEnter={(event) => {
                    event.currentTarget.style.backgroundColor = colors.hover;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.backgroundColor = colors.primary;
                  }}
                >
                  Commencer l&apos;exercice
                </button>
              </div>
            )}
          </div>

          {/* L'exercice partage le cadre extérieur de l'énoncé */}
          {started && children && (
            <div
              className="col-span-full w-full min-w-0 border-t pt-6 sm:pt-8"
              style={{ borderColor: colors.divider }}
            >
              {children}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}