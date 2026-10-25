
"use client";

type DialogueAudioPlayerProps = {
  audioSrc: string;
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  hint?: string;
};

export default function DialogueAudioPlayer({
  audioSrc,
  imageSrc,
  imageAlt = "Illustration du dialogue à écouter",
  title = "Dialogue",
  hint = "Écoute attentivement le dialogue avant de répondre.",
}: DialogueAudioPlayerProps) {
  return (
    <section
      aria-label={title}
      className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#F3D982] bg-white/95 p-3 shadow-[0_4px_16px_rgba(26,44,64,0.06)] sm:p-4"
    >
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
        {/* Illustration du dialogue */}
        <div className="w-full shrink-0 sm:w-32">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-40 w-full rounded-xl object-cover sm:h-28"
          />
        </div>

        {/* Informations et commandes audio */}
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF1FF] text-[#18366A]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
              >
                <path
                  d="M3 14v-3a9 9 0 0 1 18 0v3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <rect
                  x="3"
                  y="12"
                  width="4"
                  height="7"
                  rx="2"
                  fill="currentColor"
                />
                <rect
                  x="17"
                  y="12"
                  width="4"
                  height="7"
                  rx="2"
                  fill="currentColor"
                />
              </svg>
            </span>

            <div className="min-w-0">
              <p className="m-0 text-sm font-extrabold text-[#18366A]">
                {title}
              </p>

              <p className="m-0 mt-1 text-xs leading-relaxed text-[#64748B]">
                {hint}
              </p>
            </div>
          </div>

          <audio
            controls
            preload="metadata"
            className="block w-full"
            aria-label={`Écouter : ${title}`}
          >
            <source src={audioSrc} type="audio/mpeg" />
            Ton navigateur ne prend pas en charge la lecture audio.
          </audio>
        </div>
      </div>
    </section>
  );
}
