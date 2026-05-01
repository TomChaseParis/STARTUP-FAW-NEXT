"use client";

import { useRef, useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type Options = {
  lang?: string;
  threshold?: number; // ex: 0.85
  strictPronoun?: boolean; // vérifie le 1er mot
  continuous?: boolean;
};

type Result = {
  transcript: string;
  score: number;        // 0..100
  isCorrect: boolean;
  bestMatch?: string;   // phrase attendue la plus proche
};

export default function useUniversalSpeech(options?: Options) {
  const recognitionRef = useRef<any>(null);

  const [isListening, setIsListening] = useState(false);

  const {
    lang = "fr-FR",
    threshold = 0.85,
    strictPronoun = true,
    continuous = false,
  } = options || {};

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
    const matrix: number[][] = [];

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

  /* ================= WORD MATCH ================= */
  const isWordMatch = (expected: string, spoken: string) => {
    const dist = levenshtein(expected, spoken);
    return dist <= 1; // tolérance phonétique contrôlée
  };

  /* ================= SCORE SENTENCE ================= */
  const scoreSentence = (expected: string, spoken: string) => {
    const expectedWords = tokenize(expected);
    const spokenWords = tokenize(spoken);

    if (!spokenWords.length) return 0;

    // 🔥 PRONOM STRICT (optionnel)
    if (strictPronoun && spokenWords[0] !== expectedWords[0]) {
      return 0;
    }

    let matches = 0;

    expectedWords.forEach((word) => {
      const found = spokenWords.some((sp) => isWordMatch(word, sp));
      if (found) matches++;
    });

    return matches / expectedWords.length; // 0..1
  };

  /* ================= PICK BEST MATCH ================= */
  const computeBest = (expectedList: string[], spoken: string) => {
    let bestScore = 0;
    let bestMatch = "";

    expectedList.forEach((exp) => {
      const s = scoreSentence(exp, spoken);
      if (s > bestScore) {
        bestScore = s;
        bestMatch = exp;
      }
    });

    return { bestScore, bestMatch };
  };

  /* ================= START ================= */
  const start = (
    expected: string | string[],
    onResult: (r: Result) => void
  ) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("⚠️ Reconnaissance vocale non supportée");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.continuous = continuous;

    let transcript = "";

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      transcript = event.results[0][0].transcript;

      const expectedList = Array.isArray(expected)
        ? expected
        : [expected];

      const { bestScore, bestMatch } = computeBest(
        expectedList,
        transcript
      );

      const score = Math.round(bestScore * 100);
      const isCorrect = bestScore >= threshold;

      onResult({
        transcript,
        score,
        isCorrect,
        bestMatch,
      });
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
  };

  /* ================= STOP ================= */
  const stop = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  return {
    start,
    stop,
    isListening,
  };
}