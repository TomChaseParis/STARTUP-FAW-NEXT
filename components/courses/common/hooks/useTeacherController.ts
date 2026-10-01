"use client";

import {
  useCallback,
  useMemo,
} from "react";

import { useTeacherAudio } from "./useTeacherAudio";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { useOpenAISpeechRecognition } from "@/components/courses/speech/useOpenAISpeechRecognition";

type UseTeacherControllerProps = {
  language?: string;

  onSpeech: (text: string) => void;

  speechEngine?:
    | "browser"
    | "openai";
};

export type TeacherState =
  | "idle"
  | "speaking"
  | "listening"
  | "thinking";

export function useTeacherController({
  language = "fr-FR",
  onSpeech,
  speechEngine = "browser",
}: UseTeacherControllerProps) {
  const {
    play,
    stop,
    isTeacherTalking,
  } = useTeacherAudio();

  const browserSpeech =
    useSpeechRecognition({
      language,
      onResult: onSpeech,
    });

  const openAISpeech =
    useOpenAISpeechRecognition({
      language,
      onResult: onSpeech,
    });

  const activeSpeech =
    speechEngine === "openai"
      ? openAISpeech
      : browserSpeech;

  const {
    isListening,
    isSupported,
    startListening,
    stopListening,
  } = activeSpeech;

  const playQuestion =
    useCallback(
      (audio?: string) => {
        play(audio);
      },
      [play],
    );

  const playFeedback =
    useCallback(
      (audio?: string) => {
        play(audio);
      },
      [play],
    );

  const playMessage =
    useCallback(
      (audio?: string) => {
        play(audio);
      },
      [play],
    );

  const stopEverything =
    useCallback(() => {
      stop();
      stopListening();
    }, [
      stop,
      stopListening,
    ]);

  const isBusy =
    isTeacherTalking ||
    isListening;

  const avatarState: TeacherState =
    useMemo(() => {
      if (isTeacherTalking) {
        return "speaking";
      }

      if (isListening) {
        return "listening";
      }

      return "idle";
    }, [
      isTeacherTalking,
      isListening,
    ]);

  const handleAnswer =
    useCallback(
      (
        isCorrect: boolean,
        correctAudio?: string,
        wrongAudio?: string,
      ) => {
        if (isCorrect) {
          playFeedback(
            correctAudio,
          );
        } else {
          playFeedback(
            wrongAudio,
          );
        }
      },
      [playFeedback],
    );

  return {
    playQuestion,

    playFeedback,

    playMessage,

    stopAudio: stop,

    startListening,

    stopListening,

    isSupported,

    stopEverything,

    isTalking:
      isTeacherTalking,

    isListening,

    isBusy,

    avatarState,

    handleAnswer,
  };
}