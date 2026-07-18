"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useTeacherAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isTeacherTalking, setIsTeacherTalking] = useState(false);

  /**
   * Stoppe l'audio courant
   */
  const stop = useCallback(() => {
    if (!audioRef.current) {
      setIsTeacherTalking(false);
      return;
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current = null;

    setIsTeacherTalking(false);
  }, []);

  /**
   * Joue un audio du professeur
   */
  const play = useCallback(
    async (src?: string) => {
      if (!src) {
        stop();
        return;
      }

      stop();

      const audio = new Audio(src);

      audioRef.current = audio;

      setIsTeacherTalking(true);

      audio.onended = () => {
        setIsTeacherTalking(false);
      };

      audio.onerror = () => {
        setIsTeacherTalking(false);
      };

      try {
        await audio.play();
      } catch (error) {
        console.error("Impossible de lancer l'audio :", error);

        setIsTeacherTalking(false);
      }
    },
    [stop],
  );

  /**
   * Nettoyage lors du démontage du composant
   */
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    isTeacherTalking,

    play,

    stop,
  };
}