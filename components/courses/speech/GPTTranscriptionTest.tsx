"use client";

import { useGPTTranscription } from "./useGPTTranscription";

export default function GPTTranscriptionTest() {
  const {
    start,
    stop,
    isListening,
    transcript,
    error,
  } = useGPTTranscription();

  const handleStart = () => {
    start((text) => {
      console.log("🎤 Transcription GPT :", text);
    });
  };

  return (
    <section className="mx-auto mt-10 w-full max-w-6xl px-6">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
        <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-5 sm:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Test technique
          </p>

          <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Reconnaissance vocale GPT
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            Prononce une phrase en français pour
            tester la transcription.
          </p>
        </div>

        <div className="px-6 py-10 sm:px-10 sm:py-12">
          <div className="mx-auto max-w-2xl">
            <div className="flex justify-center">
              {!isListening ? (
                <button
                  type="button"
                  onClick={handleStart}
                  className="rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  🎤 Commencer l&apos;enregistrement
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stop}
                  className="rounded-2xl bg-red-600 px-8 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-red-700"
                >
                  ⏹ Arrêter l&apos;enregistrement
                </button>
              )}
            </div>

            {isListening && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-500" />
                  Je t&apos;écoute...
                </div>
              </div>
            )}

            {transcript && (
              <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-600">
                  GPT a compris
                </p>

                <p className="mt-2 text-lg font-semibold leading-relaxed text-slate-900">
                  « {transcript} »
                </p>
              </div>
            )}

            {error && (
              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-red-600">
                  Erreur
                </p>

                <p className="mt-2 text-sm font-semibold text-red-700">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}