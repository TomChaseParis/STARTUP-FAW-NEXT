
"use client";

import Image from "next/image";
import type { ReactNode } from "react";

export type ExerciseInstructionStep = {
  title: string;
  description: string;
  icon: "sound" | "mic" | "keyboard";
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
  example: string;
  steps: [ExerciseInstructionStep, ExerciseInstructionStep];
  pointAttention?: ExercisePointAttention;
  onStart?: () => void;
  started?: boolean;
  children?: ReactNode;
  beforeStartContent?: ReactNode;
  activityTitle?: string;
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
  steps,
  pointAttention,
  onStart,
  started = false,
  children,
  beforeStartContent,
  activityTitle,
}: ExerciseInstructionProps) {
  return (
    <main className="w-full min-w-0 bg-white p-0 font-[Arial,Helvetica,sans-serif] text-[#09264a]">
      <div className="container">
        <section
          aria-labelledby="exercise-instruction-title"
          className="relative isolate mx-auto grid min-h-0 w-full min-w-0 grid-cols-1 items-start gap-6 overflow-hidden rounded-[28px] border border-[#f5e7bd] bg-[linear-gradient(135deg,#fffefa_0%,#fffdf6_55%,#fff9e9_100%)] p-4 shadow-[0_8px_28px_rgba(15,23,42,0.045)] sm:gap-6 sm:p-6 lg:grid-cols-2 lg:gap-8 lg:p-8"
        >
          {/* Décorations du fond */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[110px] -top-[180px] -z-10 h-[440px] w-[58%] rotate-[-7deg] rounded-b-[55%_45%] bg-[linear-gradient(135deg,rgba(255,255,255,0.75),rgba(255,253,246,0.35))]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[210px] -right-[100px] -z-10 h-[400px] w-[55%] rounded-full bg-[radial-gradient(ellipse,rgba(255,211,89,0.13),rgba(255,247,221,0))]"
          />

          {/* Illustration et étapes pédagogiques */}
          <div className="relative flex min-w-0 flex-col items-center gap-5 self-start lg:row-span-2">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={640}
              height={750}
              priority
              className="block h-auto w-full max-w-[640px] object-contain"
            />

            {/* Étapes alignées en deux colonnes sous l'image */}
            <div className="mt-2 grid w-full grid-cols-2 items-stretch gap-2 min-[761px]:gap-3 max-[380px]:grid-cols-1">
              {steps.map((step, index) => (
                <article
                  key={`${step.title}-${index}`}
                  className="flex min-w-0 flex-col rounded-[14px] border border-[#172a4110] bg-white px-2.5 py-3 shadow-[0_3px_10px_#1a2c400a] min-[761px]:px-3 min-[761px]:py-3"
                >
                  {/* Icône, numéro et titre alignés */}
                  <div className="mb-2 flex min-w-0 items-center gap-1.5 min-[761px]:gap-2">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ffedbd] text-[#e99100] min-[761px]:h-9 min-[761px]:w-9">
                      <InstructionIcon type={step.icon} size={18} />
                    </div>

                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#ffb51c] text-[10px] font-bold text-[#ef9900]">
                      {index + 1}
                    </span>

                    <h3 className="m-0 min-w-0 font-serif text-sm font-semibold leading-tight text-[#09264a] min-[761px]:text-base">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description sous la ligne de titre */}
                  <p className="m-0 text-[11px] leading-[1.45] text-[#183352] min-[761px]:text-xs">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="min-w-0 px-1 py-5 sm:px-2 sm:py-6 lg:relative lg:py-[34px] lg:pr-2 lg:before:absolute lg:before:bottom-0 lg:before:left-[-17px] lg:before:top-0 lg:before:w-px lg:before:bg-[#f3d982]/70">
            <div className="mb-[22px] flex items-center gap-3 text-[11px] font-extrabold tracking-[0.22em] text-[#748198] sm:gap-[17px] sm:text-[13px]">
              <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-[#fff0c9] text-[#ef9900] sm:h-[58px] sm:w-[58px]" />
              <span>{category}</span>
            </div>

            <h2
              id="exercise-instruction-title"
              className="m-0 font-serif text-[clamp(32px,4vw,59px)] font-bold leading-[1.04] tracking-[-0.045em] text-[#09264a]"
            >
              {title}
            </h2>

            <div className="mb-[13px] mt-6 h-[6px] w-[100px] rounded-full bg-[#ffb91f]" />

            <p className="mb-6 mt-0 text-base leading-[1.55] text-[#152f50] sm:text-[clamp(16px,1.32vw,21px)]">
              {description}
            </p>

            {/* Exemple principal */}
            <div className="mb-[17px] flex min-h-[78px] flex-wrap items-center gap-[10px] rounded-xl border-l-[6px] border-[#ffb91f] bg-[linear-gradient(90deg,#fff5dd,#fffaf0)] px-[13px] py-[13px] text-[#152f50] sm:flex-nowrap sm:gap-[17px] sm:px-5">
              <span className="shrink-0 whitespace-nowrap rounded-[30px] bg-[#ffe9b5] px-4 py-[9px] text-base sm:px-[17px]">
                Exemple
              </span>

              <span className="basis-full text-sm leading-[1.4] sm:basis-auto sm:text-[clamp(14px,1.1vw,18px)]">
                {`« ${example} »`}
              </span>
            </div>

            {/* Encadré À découvrir */}
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-[#f3d982]/70 bg-white/70 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fff0c9] text-[#e99100]">
                <IdeaIcon size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="mb-1 mt-0 font-serif text-base font-semibold text-[#09264a]">
                  À découvrir
                </h3>

                <p className="m-0 text-sm leading-relaxed text-[#183352]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus posuere, neque at facilisis tincidunt, nunc sapien
                  consequat erat, vitae tincidunt lorem justo vel nisl.
                </p>
              </div>
            </div>

            {/* Point d'attention */}
            {pointAttention && (
              <aside
                aria-label="Point d’attention"
                className="mb-5 flex min-w-0 flex-col gap-3 rounded-2xl border border-[#f3d982] bg-white/90 p-4 shadow-[0_3px_12px_rgba(26,44,64,0.06)] sm:flex-row sm:items-start sm:gap-4 sm:p-5"
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
                    <div className="mt-2 rounded-lg bg-[#fff5dd] px-3 py-2 text-sm leading-relaxed text-[#183352] sm:text-base">
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
                  className="flex cursor-pointer items-center justify-center rounded-xl border-0 bg-[#E09F00] px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#C98D00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98D00]"
                >
                  Commencer l&apos;exercice
                </button>
              </div>
            )}
          </div>

          {/* L'exercice partage le cadre extérieur de l'énoncé */}
          {started && children && (
            <div className="col-span-full w-full min-w-0 border-t border-[#F3D982] pt-6 sm:pt-8">
              {children}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
