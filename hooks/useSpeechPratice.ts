"use client";

import { useState, useRef } from "react";

/* ===== FIX TYPESCRIPT ===== */
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
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  /* ================= NORMALIZE ================= */
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, " ")
      .replace(/[^a-z\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const tokenize = (text: string) => normalize(text).split(" ");

  /* ================= LEVENSHTEIN ================= */
  const levenshtein = (a: string, b: string) => {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  };

  /* ================= SCORING PRO ================= */
  const computeScore = (spoken: string, expected: string) => {
    const expectedWords = tokenize(expected);
    const spokenWords = tokenize(spoken);

    if (!spokenWords.length) return 0;

    /* 🔥 PRONOM STRICT */
    if (spokenWords[0] !== expectedWords[0]) {
      return 0;
    }

    let matches = 0;

    expectedWords.forEach((word) => {
      const found = spokenWords.some(
        (sp) => levenshtein(word, sp) <= 1
      );
      if (found) matches++;
    });

    return Math.round((matches / expectedWords.length) * 100);
  };

  /* ================= START ================= */
  const start = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("⚠️ Reconnaissance vocale non supportée");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "fr-FR";
    recognition.interimResults = false;

    let finalTranscript = "";

    recognition.onresult = (event: any) => {
      finalTranscript = event.results[0][0].transcript;
      setTranscript(finalTranscript);

      /* 🔥 FEEDBACK IMMÉDIAT */
      const s = computeScore(finalTranscript, expected);
      setScore(s);
      setIsCorrect(s >= 85);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();

    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  /* ================= STOP ================= */
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
    isCorrect,
  };
}