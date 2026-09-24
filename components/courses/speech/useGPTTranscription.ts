"use client";

import { useRef, useState } from "react";

type GPTTranscriptionCallback = (
  text: string,
) => void;

type UseGPTTranscriptionReturn = {
  start: (
    onResult: GPTTranscriptionCallback,
  ) => void;
  stop: () => void;
  isListening: boolean;
  transcript: string;
  error: string | null;
};

export function useGPTTranscription(): UseGPTTranscriptionReturn {
  const mediaRecorderRef =
    useRef<MediaRecorder | null>(null);

  const streamRef =
    useRef<MediaStream | null>(null);

  const chunksRef =
    useRef<Blob[]>([]);

  const callbackRef =
    useRef<GPTTranscriptionCallback | null>(
      null,
    );

  const [isListening, setIsListening] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  const [error, setError] =
    useState<string | null>(null);

  const start = async (
    onResult: GPTTranscriptionCallback,
  ) => {
    if (isListening) {
      return;
    }

    setError(null);
    setTranscript("");

    callbackRef.current = onResult;

    try {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        throw new Error(
          "Ton navigateur ne permet pas l'utilisation du microphone.",
        );
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      streamRef.current = stream;

      const mimeType =
        getSupportedMimeType();

      const recorder = mimeType
        ? new MediaRecorder(stream, {
            mimeType,
          })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      chunksRef.current = [];

      recorder.ondataavailable = (
        event: BlobEvent,
      ) => {
        if (event.data.size > 0) {
          chunksRef.current.push(
            event.data,
          );
        }
      };

      recorder.onstart = () => {
        setIsListening(true);
      };

      recorder.onstop = async () => {
        setIsListening(false);

        stopStream();

        const audioBlob = new Blob(
          chunksRef.current,
          {
            type:
              recorder.mimeType ||
              "audio/webm",
          },
        );

        chunksRef.current = [];

        await transcribeAudio(audioBlob);
      };

      recorder.onerror = () => {
        setIsListening(false);

        stopStream();

        setError(
          "Une erreur est survenue pendant l'enregistrement.",
        );
      };

      recorder.start();
    } catch (error) {
      console.error(
        "GPT transcription microphone error:",
        error,
      );

      setIsListening(false);

      stopStream();

      setError(
        error instanceof Error
          ? error.message
          : "Impossible d'accéder au microphone.",
      );
    }
  };

  const stop = () => {
    const recorder =
      mediaRecorderRef.current;

    if (
      recorder &&
      recorder.state !== "inactive"
    ) {
      recorder.stop();
    }
  };

  const transcribeAudio = async (
    audioBlob: Blob,
  ) => {
    try {
      if (audioBlob.size === 0) {
        throw new Error(
          "L'enregistrement audio est vide.",
        );
      }

      const formData = new FormData();

      const extension =
        audioBlob.type.includes("mp4")
          ? "mp4"
          : "webm";

      formData.append(
        "audio",
        audioBlob,
        `speech.${extension}`,
      );

      const response = await fetch(
        "/api/speech/transcribe",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "La transcription a échoué.",
        );
      }

      const text =
        typeof data.text === "string"
          ? data.text.trim()
          : "";

      if (!text) {
        throw new Error(
          "Aucune parole n'a été détectée.",
        );
      }

      setTranscript(text);

      callbackRef.current?.(text);
    } catch (error) {
      console.error(
        "GPT transcription error:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "Impossible de reconnaître la phrase.",
      );
    } finally {
      mediaRecorderRef.current = null;
      callbackRef.current = null;
    }
  };

  const stopStream = () => {
    if (!streamRef.current) {
      return;
    }

    streamRef.current
      .getTracks()
      .forEach((track) => {
        track.stop();
      });

    streamRef.current = null;
  };

  return {
    start,
    stop,
    isListening,
    transcript,
    error,
  };
}

function getSupportedMimeType():
  | string
  | null {
  if (
    typeof MediaRecorder ===
    "undefined"
  ) {
    return null;
  }

  const mimeTypes = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
  ];

  for (const mimeType of mimeTypes) {
    if (
      MediaRecorder.isTypeSupported(
        mimeType,
      )
    ) {
      return mimeType;
    }
  }

  return null;
}