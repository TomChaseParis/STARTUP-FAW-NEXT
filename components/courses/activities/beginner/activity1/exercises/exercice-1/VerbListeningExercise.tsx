"use client";

import { useRef, useState } from "react";
import VerbCard from "@/components/courses/blocks/VerbCard";

type VerbListeningExerciseProps = {
  category: {
    title: string;
    forms?: string[];
    timings?: number[];
    audioSrc?: string;
    audio?: string;
  };

  onFirstListenComplete?: () => void;
};

export default function VerbListeningExercise({
  category,
  onFirstListenComplete,
}: VerbListeningExerciseProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentlyPlayingId, setCurrentlyPlayingId] =
    useState<string | null>(null);

  const [currentTime, setCurrentTime] = useState(0);

  const [hasListenedOnce, setHasListenedOnce] =
    useState(false);

  const forms = category.forms ?? [];
  const timings = category.timings ?? [];
  const audioSrc = category.audioSrc ?? category.audio;

  const playVerbAudio = (
    id: string,
    src: string,
  ) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(src);

    audioRef.current = audio;

    setCurrentlyPlayingId(id);
    setCurrentTime(0);

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onended = () => {
      setCurrentlyPlayingId(null);
      setCurrentTime(0);
      audioRef.current = null;

      if (!hasListenedOnce) {
        setHasListenedOnce(true);
        onFirstListenComplete?.();
      }
    };

    audio.onerror = () => {
      setCurrentlyPlayingId(null);
      setCurrentTime(0);
      audioRef.current = null;
    };

    void audio.play().catch(() => {
      setCurrentlyPlayingId(null);
      setCurrentTime(0);
      audioRef.current = null;
    });
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      <VerbCard
        title={category.title}
        forms={forms}
        timings={timings}
        onPlay={() => {
          if (!audioSrc) {
            console.error(
              `Aucun audio trouvé pour le verbe "${category.title}".`,
            );
            return;
          }

          playVerbAudio(
            category.title,
            audioSrc,
          );
        }}
        isPlaying={
          currentlyPlayingId === category.title
        }
        currentTime={
          currentlyPlayingId === category.title
            ? currentTime
            : 0
        }
      />

      {!hasListenedOnce && (
        <div className="mt-5 text-center">
          <p className="text-sm font-medium text-slate-500">
            🎧 Écoute la conjugaison jusqu&apos;au bout
            avant de commencer l&apos;exercice.
          </p>
        </div>
      )}
    </div>
  );
}