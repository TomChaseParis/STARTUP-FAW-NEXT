"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type UseOpenAISpeechRecognitionProps = {
  language?: string;

  onResult: (
    text: string,
  ) => void;
};

const SILENCE_DURATION = 1000;

const MAX_RECORDING_DURATION = 15000;

const SPEECH_THRESHOLD = 0.02;

const START_SPEECH_TIMEOUT = 5000;

export function useOpenAISpeechRecognition({
  language = "fr-FR",
  onResult,
}: UseOpenAISpeechRecognitionProps) {
  const mediaRecorderRef =
    useRef<MediaRecorder | null>(null);

  const mediaStreamRef =
    useRef<MediaStream | null>(null);

  const audioContextRef =
    useRef<AudioContext | null>(null);

  const analyserRef =
    useRef<AnalyserNode | null>(null);

  const animationFrameRef =
    useRef<number | null>(null);

  const chunksRef =
    useRef<Blob[]>([]);

  const silenceStartRef =
    useRef<number | null>(null);

  const speechDetectedRef =
    useRef(false);

  const startTimeRef =
    useRef<number | null>(null);

  const stoppingRef =
    useRef(false);

  const [
    isListening,
    setIsListening,
  ] = useState(false);

  const [
    isSupported,
    setIsSupported,
  ] = useState(true);

  const cleanupAudio =
    useCallback(() => {
      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current,
        );

        animationFrameRef.current =
          null;
      }

      if (
        audioContextRef.current
      ) {
        audioContextRef.current
          .close()
          .catch(() => {});

        audioContextRef.current =
          null;
      }

      analyserRef.current =
        null;
    }, []);

  const stopListening =
    useCallback(() => {
      if (stoppingRef.current) {
        return;
      }

      stoppingRef.current =
        true;

      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current,
        );

        animationFrameRef.current =
          null;
      }

      const recorder =
        mediaRecorderRef.current;

      if (
        recorder &&
        recorder.state !==
          "inactive"
      ) {
        console.log(
          "[OpenAI Speech] Arrêt automatique de l'enregistrement.",
        );

        recorder.stop();

        return;
      }

      cleanupAudio();

      const stream =
        mediaStreamRef.current;

      if (stream) {
        stream
          .getTracks()
          .forEach((track) =>
            track.stop(),
          );

        mediaStreamRef.current =
          null;
      }

      setIsListening(false);

      stoppingRef.current =
        false;
    }, [cleanupAudio]);

  const detectSilence =
    useCallback(() => {
      const analyser =
        analyserRef.current;

      if (!analyser) {
        return;
      }

      const recorder =
        mediaRecorderRef.current;

      if (
        !recorder ||
        recorder.state ===
          "inactive"
      ) {
        return;
      }

      const data =
        new Uint8Array(
          analyser.fftSize,
        );

      analyser.getByteTimeDomainData(
        data,
      );

      let sum = 0;

      for (
        let i = 0;
        i < data.length;
        i++
      ) {
        const normalized =
          (data[i] - 128) / 128;

        sum +=
          normalized *
          normalized;
      }

      const rms = Math.sqrt(
        sum / data.length,
      );

      const now = Date.now();

      /*
       * ==================================================
       * L'ÉLÈVE PARLE
       * ==================================================
       */

      if (
        rms >
        SPEECH_THRESHOLD
      ) {
        speechDetectedRef.current =
          true;

        silenceStartRef.current =
          null;
      } else {
        /*
         * ==================================================
         * SILENCE
         * ==================================================
         */

        if (
          speechDetectedRef.current
        ) {
          if (
            silenceStartRef.current ===
            null
          ) {
            silenceStartRef.current =
              now;
          }

          const silenceDuration =
            now -
            silenceStartRef.current;

          if (
            silenceDuration >=
            SILENCE_DURATION
          ) {
            console.log(
              "[OpenAI Speech] Silence détecté, transcription en cours...",
            );

            stopListening();

            return;
          }
        } else {
          /*
           * ==================================================
           * L'ÉLÈVE N'A PAS ENCORE PARLÉ
           * ==================================================
           */

          const startTime =
            startTimeRef.current;

          if (
            startTime !== null &&
            now - startTime >=
              START_SPEECH_TIMEOUT
          ) {
            console.log(
              "[OpenAI Speech] Aucun début de parole détecté.",
            );

            stopListening();

            return;
          }
        }
      }

      /*
       * ==================================================
       * DURÉE MAXIMALE
       * ==================================================
       */

      const startTime =
        startTimeRef.current;

      if (
        startTime !== null &&
        now - startTime >=
          MAX_RECORDING_DURATION
      ) {
        console.log(
          "[OpenAI Speech] Durée maximale atteinte.",
        );

        stopListening();

        return;
      }

      animationFrameRef.current =
        requestAnimationFrame(
          detectSilence,
        );
    }, [stopListening]);

  const startListening =
    useCallback(async () => {
      if (isListening) {
        return;
      }

      if (
        typeof window ===
          "undefined" ||
        !navigator.mediaDevices
          ?.getUserMedia ||
        typeof MediaRecorder ===
          "undefined"
      ) {
        setIsSupported(false);

        console.error(
          "[OpenAI Speech] MediaRecorder ou microphone non supporté.",
        );

        return;
      }

      try {
        stoppingRef.current =
          false;

        speechDetectedRef.current =
          false;

        silenceStartRef.current =
          null;

        startTimeRef.current =
          Date.now();

        chunksRef.current =
          [];

        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              audio: true,
            },
          );

        mediaStreamRef.current =
          stream;

        const mimeTypes = [
          "audio/webm;codecs=opus",
          "audio/webm",
          "audio/mp4",
          "audio/ogg;codecs=opus",
        ];

        const supportedMimeType =
          mimeTypes.find(
            (mimeType) =>
              MediaRecorder.isTypeSupported(
                mimeType,
              ),
          );

        const recorder =
          supportedMimeType
            ? new MediaRecorder(
                stream,
                {
                  mimeType:
                    supportedMimeType,
                },
              )
            : new MediaRecorder(
                stream,
              );

        mediaRecorderRef.current =
          recorder;

        recorder.ondataavailable =
          (event: BlobEvent) => {
            if (
              event.data.size > 0
            ) {
              chunksRef.current.push(
                event.data,
              );
            }
          };

        recorder.onstart = () => {
          setIsListening(true);

          console.log(
            "[OpenAI Speech] Enregistrement démarré.",
          );
        };

        recorder.onstop =
          async () => {
            console.log(
              "[OpenAI Speech] Enregistrement terminé.",
            );

            setIsListening(false);

            cleanupAudio();

            const currentStream =
              mediaStreamRef.current;

            if (currentStream) {
              currentStream
                .getTracks()
                .forEach(
                  (track) =>
                    track.stop(),
                );

              mediaStreamRef.current =
                null;
            }

            const blob =
              new Blob(
                chunksRef.current,
                {
                  type:
                    recorder.mimeType ||
                    "audio/webm",
                },
              );

            chunksRef.current =
              [];

            mediaRecorderRef.current =
              null;

            stoppingRef.current =
              false;

            if (
              blob.size === 0
            ) {
              console.warn(
                "[OpenAI Speech] Audio vide.",
              );

              return;
            }

            try {
              const formData =
                new FormData();

              const mimeType =
                recorder.mimeType ||
                "audio/webm";

              let extension =
                "webm";

              if (
                mimeType.includes(
                  "mp4",
                )
              ) {
                extension =
                  "m4a";
              } else if (
                mimeType.includes(
                  "ogg",
                )
              ) {
                extension =
                  "ogg";
              }

              formData.append(
                "audio",
                blob,
                `speech.${extension}`,
              );

              formData.append(
                "language",
                language,
              );

              console.log(
                "[OpenAI Speech] Envoi de l'audio à l'API...",
              );

              const response =
                await fetch(
                  "/api/speech/transcribe",
                  {
                    method: "POST",
                    body: formData,
                  },
                );

              const data =
                await response.json();

              if (
                !response.ok
              ) {
                throw new Error(
                  data?.error ??
                    "Erreur de transcription.",
                );
              }

              const text =
                typeof data?.text ===
                "string"
                  ? data.text.trim()
                  : "";

              console.log(
                "[OpenAI Speech] Transcription :",
                text,
              );

              if (text) {
                onResult(text);
              } else {
                console.warn(
                  "[OpenAI Speech] Aucune transcription retournée.",
                );
              }
            } catch (error) {
              console.error(
                "[OpenAI Speech] Erreur de transcription :",
                error,
              );
            }
          };

        recorder.onerror =
          (event) => {
            console.error(
              "[OpenAI Speech] Erreur MediaRecorder :",
              event,
            );

            setIsListening(false);

            cleanupAudio();

            const currentStream =
              mediaStreamRef.current;

            if (currentStream) {
              currentStream
                .getTracks()
                .forEach(
                  (track) =>
                    track.stop(),
                );

              mediaStreamRef.current =
                null;
            }

            mediaRecorderRef.current =
              null;

            stoppingRef.current =
              false;
          };

        /*
         * ==================================================
         * ANALYSE DU MICRO
         * ==================================================
         */

        const AudioContextClass =
          window.AudioContext ||
          (
            window as typeof window & {
              webkitAudioContext?: typeof AudioContext;
            }
          ).webkitAudioContext;

        if (!AudioContextClass) {
          throw new Error(
            "AudioContext non supporté.",
          );
        }

        const audioContext =
          new AudioContextClass();

        audioContextRef.current =
          audioContext;

        const source =
          audioContext.createMediaStreamSource(
            stream,
          );

        const analyser =
          audioContext.createAnalyser();

        analyser.fftSize = 2048;

        source.connect(
          analyser,
        );

        analyserRef.current =
          analyser;

        recorder.start();

        animationFrameRef.current =
          requestAnimationFrame(
            detectSilence,
          );
      } catch (error) {
        console.error(
          "[OpenAI Speech] Impossible de démarrer l'enregistrement :",
          error,
        );

        cleanupAudio();

        const stream =
          mediaStreamRef.current;

        if (stream) {
          stream
            .getTracks()
            .forEach((track) =>
              track.stop(),
            );

          mediaStreamRef.current =
            null;
        }

        mediaRecorderRef.current =
          null;

        setIsListening(false);

        stoppingRef.current =
          false;
      }
    }, [
      cleanupAudio,
      detectSilence,
      isListening,
      language,
      onResult,
    ]);

  useEffect(() => {
    return () => {
      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current,
        );
      }

      const recorder =
        mediaRecorderRef.current;

      if (
        recorder &&
        recorder.state !==
          "inactive"
      ) {
        recorder.stop();
      }

      const stream =
        mediaStreamRef.current;

      if (stream) {
        stream
          .getTracks()
          .forEach((track) =>
            track.stop(),
          );
      }

      cleanupAudio();
    };
  }, [cleanupAudio]);

  return {
    startListening,
    stopListening,
    isListening,
    isSupported,
  };
}