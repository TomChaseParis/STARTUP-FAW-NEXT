"use client";

type HenriInterventionProps = {
  isVisible: boolean;
  isPlaying: boolean;
  isFinished: boolean;
  isListening: boolean;
  onSpeak: () => void;
  imageSrc?: string;
  disabled?: boolean;
};

export default function HenriIntervention({
  isVisible,
  isPlaying,
  isFinished,
  isListening,
  onSpeak,
  imageSrc = "/images/bulles-QCM/intermediate-2/bulle-conseil/henribulleqcm.png",
  disabled = false,
}: HenriInterventionProps) {
  if (!isVisible) return null;

  return (
    <div className="mt-5 w-full min-w-0">
      {/* INTERVENTION D'HENRI */}
      <div className="flex w-full min-w-0 items-center gap-4 rounded-2xl border border-amber-100 bg-amber-50/40 p-4">
        {/* PHOTO RONDE D'HENRI */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_3px_12px_rgba(31,41,55,0.12)]">
          <img
            src={imageSrc}
            alt="Henri, professeur de français"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        {/* INDICATEUR AUDIO */}
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-8 items-center gap-1"
            aria-label={
              isPlaying
                ? "Audio d'Henri en cours de lecture"
                : "Audio d'Henri terminé"
            }
          >
            <span
              className={`h-2 w-1 rounded-full bg-orange-300 ${
                isPlaying ? "animate-pulse" : ""
              }`}
            />

            <span
              className={`h-4 w-1 rounded-full bg-orange-400 ${
                isPlaying
                  ? "animate-pulse [animation-delay:100ms]"
                  : ""
              }`}
            />

            <span
              className={`h-6 w-1 rounded-full bg-orange-500 ${
                isPlaying
                  ? "animate-pulse [animation-delay:200ms]"
                  : ""
              }`}
            />

            <span
              className={`h-4 w-1 rounded-full bg-orange-400 ${
                isPlaying
                  ? "animate-pulse [animation-delay:300ms]"
                  : ""
              }`}
            />

            <span
              className={`h-2 w-1 rounded-full bg-orange-300 ${
                isPlaying
                  ? "animate-pulse [animation-delay:400ms]"
                  : ""
              }`}
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-bold text-[#17243B]">
              {isPlaying
                ? "Henri parle"
                : isFinished
                  ? "Henri a terminé"
                  : "Henri arrive"}
            </p>

            <p className="mt-0.5 text-xs text-gray-500">
              {isPlaying
                ? "Écoute attentivement"
                : isFinished
                  ? "À toi de répondre"
                  : "Prépare-toi à écouter"}
            </p>
          </div>
        </div>
      </div>

      {/* MICROPHONE : APPARAÎT APRÈS L'AUDIO D'HENRI */}
      {isFinished && (
        <div className="mt-4 flex flex-col items-center">
          <button
            type="button"
            onClick={onSpeak}
            disabled={disabled}
            aria-label={
              isListening
                ? "Arrêter l'enregistrement"
                : "Commencer l'enregistrement"
            }
            aria-pressed={isListening}
            className={`relative flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-orange-500 shadow-[0_4px_16px_rgba(31,41,55,0.09)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-50 ${
              isListening
                ? "border-orange-300 bg-orange-50"
                : ""
            }`}
          >
            {isListening && (
              <span className="absolute inset-[-6px] animate-ping rounded-full border border-orange-300 opacity-50" />
            )}

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 h-6 w-6"
              aria-hidden="true"
            >
              <rect x="9" y="3" width="6" height="12" rx="3" />

              <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3m-4 0h8" />
            </svg>
          </button>

          <p
            className={`mt-3 text-center text-sm font-semibold ${
              isListening ? "text-orange-600" : "text-gray-500"
            }`}
          >
            {isListening
              ? "Je t'écoute... Parle maintenant !"
              : "Clique sur le micro et prononce ta réponse"}
          </p>

          {isListening && (
            <div className="mt-3 flex items-center gap-1.5">
              <span className="h-2 w-1 animate-pulse rounded-full bg-orange-300" />
              <span className="h-4 w-1 animate-pulse rounded-full bg-orange-400 [animation-delay:100ms]" />
              <span className="h-6 w-1 animate-pulse rounded-full bg-orange-500 [animation-delay:200ms]" />
              <span className="h-3 w-1 animate-pulse rounded-full bg-orange-400 [animation-delay:300ms]" />
              <span className="h-5 w-1 animate-pulse rounded-full bg-orange-300 [animation-delay:400ms]" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}