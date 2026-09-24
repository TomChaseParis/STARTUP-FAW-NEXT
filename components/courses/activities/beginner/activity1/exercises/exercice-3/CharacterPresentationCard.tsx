"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import SpeechRecognitionEngine from "@/components/courses/engines/SpeechRecognitionEngine";

type Character = {
  id: number;
  image: string;
  audio: string;
  buttonLabel?: string;
  sentences: string[];
};

type CharacterPresentationCardProps = {
  character: Character;
  pronoun: string;
  sentence: string;
  recognitionSentence?: string;
  isExample?: boolean;
  speechResults?: {
    text: string;
    correct: boolean;
  }[];
  onSpeechResult?: (
    results: { text: string; isCorrect: boolean }[],
  ) => void;
};

export default function CharacterPresentationCard({
  character,
  pronoun,
  sentence,
  recognitionSentence,
  isExample = false,
  speechResults,
  onSpeechResult,
}: CharacterPresentationCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playingId, setPlayingId] = useState<number | null>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(character.audio);

    audioRef.current = audio;
    setPlayingId(character.id);

    audio.play().catch(() => {
      setPlayingId(null);
      audioRef.current = null;
    });

    audio.onended = () => {
      setPlayingId(null);
      audioRef.current = null;
    };
  };

  return (
    <div
      className="
        relative grid h-auto
        overflow-hidden rounded-2xl bg-white shadow-lg
        ring-1 ring-black/5
        md:h-[450px]
        md:grid-cols-[1.15fr_1fr]
      "
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}
      <div className="relative h-[220px] w-full md:h-full">
        <Image
          src={character.image}
          alt="Illustration du personnage"
          fill
          className="object-cover"
        />
      </div>

      {/* =====================================================
          PARTIE DROITE
      ===================================================== */}
      <div className="relative flex flex-col bg-slate-50 p-8">
        <div className="flex h-full w-full flex-col items-center justify-center">
          {/* =================================================
              PRONOM
          ================================================= */}
          <div className="mb-6 w-full text-center">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              {isExample ? "Pronom" : "Pronom à utiliser"}
            </p>

            <h2 className="text-5xl font-extrabold tracking-wide text-slate-900">
              {pronoun}
            </h2>

            <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#E09F00]" />
          </div>

          {isExample ? (
            <>
              {/* =================================================
                  EXEMPLE — ÉCOUTE
              ================================================= */}
              <div className="mb-4 flex items-center justify-center gap-2">
                <span className="text-lg" aria-hidden="true">
                  🎧
                </span>

                <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#C98D00]">
                  Écoute l&apos;exemple
                </p>
              </div>

              {/* =================================================
                  PHRASE DE L'EXEMPLE
              ================================================= */}
              <div className="mb-7 w-full rounded-2xl border-2 border-amber-200 bg-white px-5 py-5 text-center shadow-sm">
                <p className="text-2xl font-extrabold leading-tight text-slate-900">
                  {sentence}
                </p>
              </div>

              {/* =================================================
                  BOUTON AUDIO
              ================================================= */}
              <button
                type="button"
                onClick={handlePlay}
                className={`
                  flex items-center gap-2
                  rounded-xl
                  px-6 py-3
                  text-sm font-bold
                  shadow-md
                  transition-all duration-200
                  ${
                    playingId === character.id
                      ? "scale-105 bg-green-500 text-white"
                      : "bg-black text-white hover:bg-green-600"
                  }
                `}
              >
                <span aria-hidden="true">▶</span>

                {playingId === character.id
                  ? "ÉCOUTE EN COURS..."
                  : "ÉCOUTER"}
              </button>

              <p className="mt-3 text-xs font-medium text-slate-400">
                Écoute attentivement la phrase.
              </p>
            </>
          ) : (
            <>
              {/* =================================================
                  EXPRESSION À PRODUIRE
              ================================================= */}
              <div className="mb-5 w-full rounded-2xl border-2 border-amber-200 bg-white px-5 py-5 text-center shadow-sm">
                <p className="text-2xl font-extrabold leading-tight text-slate-900">
                  {sentence}
                </p>
              </div>

              {/* =================================================
                  MICRO
              ================================================= */}
              <div className="flex flex-col items-center">
                <SpeechRecognitionEngine
                  key={character.id}
                  expectedSentences={
                    recognitionSentence
                      ? [recognitionSentence]
                      : []
                  }
                  requiredPronoun={pronoun.toLowerCase()}
                  onResult={(results) => {
                    onSpeechResult?.(results);
                  }}
                />

                <p className="mt-3 text-xs font-medium text-slate-400">
                  Appuie sur le micro et prononce la phrase.
                </p>
              </div>

              {/* =================================================
                  CORRECTION
              ================================================= */}
              {speechResults && speechResults.length > 0 && (
                <div className="mt-4 w-full rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                    Correction
                  </p>

                  <div className="space-y-2">
                    {speechResults.map((result, index) => (
                      <p
                        key={index}
                        className={`
                          rounded-lg px-3 py-2 text-sm font-medium
                          ${
                            result.correct
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {result.text}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}