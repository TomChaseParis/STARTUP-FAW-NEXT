"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  language?: string;
  onResult: (text: string) => void;
};

export function useSpeechRecognition({
  language = "fr-FR",
  onResult,
}: Props) {
  const recognitionRef = useRef<any>(null);

  const [isListening, setIsListening] = useState(false);

  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;

      onResult(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [language, onResult]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;

    setIsListening(true);

    recognitionRef.current.start();
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;

    recognitionRef.current.stop();

    setIsListening(false);
  }, []);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
  };
}