"use client";

import { useCallback, useMemo } from "react";

import { useTeacherAudio } from "./useTeacherAudio";
import { useSpeechRecognition } from "./useSpeechRecognition";

type UseTeacherControllerProps = {
  language?: string;

  onSpeech: (text: string) => void;
};

export type TeacherState =
  | "idle"
  | "speaking"
  | "listening"
  | "thinking";

export function useTeacherController({
  language = "fr-FR",
  onSpeech,
}: UseTeacherControllerProps) {
  const {
    play,
    stop,
    isTeacherTalking,
  } = useTeacherAudio();

  const {
    isListening,
    isSupported,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    language,
    onResult: onSpeech,
  });

  /**
   * Lecture de la question
   */
  const playQuestion = useCallback(
    (audio?: string) => {
      play(audio);
    },
    [play],
  );

  /**
   * Lecture d'une correction
   */
  const playFeedback = useCallback(
    (audio?: string) => {
      play(audio);
    },
    [play],
  );

  /**
   * Lecture d'un message libre
   */
  const playMessage = useCallback(
    (audio?: string) => {
      play(audio);
    },
    [play],
  );

  /**
   * Arrêt global
   */
  const stopEverything = useCallback(() => {
    stop();
    stopListening();
  }, [stop, stopListening]);

  /**
   * Le professeur est occupé ?
   */
  const isBusy = isTeacherTalking || isListening;

  /**
   * Etat courant du professeur
   */
  const avatarState: TeacherState = useMemo(() => {
    if (isTeacherTalking) {
      return "speaking";
    }

    if (isListening) {
      return "listening";
    }

    return "idle";
  }, [isTeacherTalking, isListening]);

  const handleAnswer = useCallback(
    (
      isCorrect: boolean,
      correctAudio?: string,
      wrongAudio?: string,
    ) => {
      if (isCorrect) {
        playFeedback(correctAudio);
      } else {
        playFeedback(wrongAudio);
      }
    },
    [playFeedback],
  );

  return {
    /* ================= AUDIO ================= */

    playQuestion,

    playFeedback,

    playMessage,

    stopAudio: stop,

    /* ================= SPEECH ================= */

    startListening,

    stopListening,

    isSupported,

    /* ================= GLOBAL ================= */

    stopEverything,

    isTalking: isTeacherTalking,

    isListening,

    isBusy,

    avatarState,

    handleAnswer
  };
}