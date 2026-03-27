"use client";

import { useState, useRef } from "react";

/* ===== FIX TYPESCRIPT POUR WEB SPEECH API ===== */
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function useSpeechPractice(expected: string) {
  const recognitionRef = useRef<any>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState<number | null>(null);

  /* ===== NORMALISATION TEXTE ===== */
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "");

  /* ===== SCORING SIMPLE ===== */
  const computeScore = (a: string, b: string) => {
    const aa = normalize(a).split(" ").filter(Boolean);
    const bb = normalize(b).split(" ").filter(Boolean);

    let good = 0;

    aa.forEach((w, i) => {
      if (bb[i] === w) good++;
    });

    return Math.round((good / bb.length) * 100);
  };

  /* ===== START RECORD ===== */
  const start = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("⚠️ La reconnaissance vocale n'est pas supportée par ce navigateur.");
      return;
    }

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

  /* ===== STOP RECORD ===== */
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