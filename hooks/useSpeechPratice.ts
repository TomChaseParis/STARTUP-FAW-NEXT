"use client";

import { useState, useRef } from "react";

export function useSpeechPractice(expected: string) {
  const recognitionRef = useRef<any>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState<number | null>(null);

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "");

  const computeScore = (a: string, b: string) => {
    const aa = normalize(a).split(" ");
    const bb = normalize(b).split(" ");

    let good = 0;

    aa.forEach((w, i) => {
      if (bb[i] === w) good++;
    });

    return Math.round((good / bb.length) * 100);
  };

  const start = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.lang = "fr-FR";
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;

      setTranscript(text);

      const s = computeScore(text, expected);

      setScore(s);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();

    recognitionRef.current = recognition;

    setIsRecording(true);
  };

  const stop = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  return {
    start,
    stop,
    isRecording,
    transcript,
    score,
  };
}