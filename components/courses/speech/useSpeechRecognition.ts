"use client";

import { useRef, useState } from "react";

export function useSpeechRecognition() {
  const recognitionRef = useRef<any>(null);

  const [isListening, setIsListening] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  const start = (
    onFinished: (text: string) => void,
  ) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Reconnaissance vocale non supportée",
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "fr-FR";

    recognition.interimResults = true;

    recognition.continuous = false;

    let finalTranscript = "";

    recognition.onstart = () => {
      setTranscript("");
      setIsListening(true);
    };

    recognition.onresult = (
      event: any,
    ) => {
      let interim = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const text =
          event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += text;
        } else {
          interim += text;
        }
      }

      setTranscript(
        finalTranscript + interim,
      );
    };

    recognition.onend = () => {
      setIsListening(false);

      onFinished(finalTranscript.trim());
    };

    recognition.start();

    recognitionRef.current = recognition;
  };

  const stop = () => {
    recognitionRef.current?.stop();
  };

  return {
    start,
    stop,
    transcript,
    isListening,
  };
}