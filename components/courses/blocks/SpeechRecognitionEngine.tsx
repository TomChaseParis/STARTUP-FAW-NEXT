"use client";

import { useRef } from "react";

export default function useSpeechRecognition() {
  const recognitionRef = useRef<any>(null);

  /* ---------------- NORMALIZE ---------------- */
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

  /* ---------------- LEVENSHTEIN ---------------- */
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

  /* ---------------- STRICT MATCH ---------------- */
  const scoreSentence = (expected: string, spoken: string) => {
    const expectedWords = tokenize(expected);
    const spokenWords = tokenize(spoken);

    if (!spokenWords.length) return 0;

    /* 🔥 PRONOM STRICT */
    if (spokenWords[0] !== expectedWords[0]) return 0;

    let matches = 0;

    expectedWords.forEach((word) => {
      const found = spokenWords.some((sp) => levenshtein(word, sp) <= 1);
      if (found) matches++;
    });

    return matches / expectedWords.length;
  };

  /* ---------------- START ---------------- */
  const start = (
    expected: string,
    callback: (result: { transcript: string; isCorrect: boolean }) => void
  ) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("⚠️ Reconnaissance vocale non supportée");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;

    let transcript = "";

    recognition.onresult = (event: any) => {
      transcript = event.results[0][0].transcript;
    };

    recognition.onend = () => {
      const score = scoreSentence(expected, transcript);

      const isCorrect = score >= 0.85;

      callback({
        transcript,
        isCorrect,
      });
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  return { start };
}