"use client";

import { useState, useRef } from "react";

type Props = {
  expectedSentences: string[];
  requiredPronoun: string;
  onResult: (results: { text: string; isCorrect: boolean }[]) => void;
};

export default function SpeechRecognitionEngine({
  expectedSentences,
  requiredPronoun,
  onResult,
}: Props) {
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);

  /* ---------------- NORMALIZE ---------------- */
  const normalize = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, " ")
      .replace(/[^a-z\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  /* ---------------- TOKENIZE ---------------- */
  const tokenize = (text: string) => normalize(text).split(" ");

  /* ---------------- LEVENSHTEIN ---------------- */
  const levenshtein = (a: string, b: string) => {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
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

  /* ---------------- WORD MATCH ---------------- */
  const isWordMatch = (expected: string, spoken: string) => {
    const dist = levenshtein(expected, spoken);
    const maxLen = Math.max(expected.length, spoken.length);

    return dist / maxLen < 0.4; // tolérance phonétique
  };

  /* ---------------- SENTENCE SCORE ---------------- */
  const scoreSentence = (expectedWords: string[], spokenWords: string[]) => {
    let matchCount = 0;

    expectedWords.forEach((expWord) => {
      const found = spokenWords.some((spWord) =>
        isWordMatch(expWord, spWord)
      );

      if (found) matchCount++;
    });

    return matchCount / expectedWords.length;
  };

  /* ---------------- SPLIT PHRASES ---------------- */
  const splitIntoChunks = (text: string) => {
    return text
      .split(/\.|\n/)
      .map((t) => t.trim())
      .filter(Boolean);
  };

  /* ---------------- START ---------------- */
  const start = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition non supportée");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.continuous = true;
    recognition.interimResults = false;

    let finalTranscript = "";

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript + " ";
      }
    };

    recognition.onend = () => {
      setIsListening(false);

      const chunks = splitIntoChunks(finalTranscript);

      const results = expectedSentences.map((sentence) => {
        const expectedWords = tokenize(sentence);
        const expectedPronoun = expectedWords[0];

        let bestScore = 0;
        let pronounValid = false;

        chunks.forEach((chunk) => {
          const spokenWords = tokenize(chunk);

          if (spokenWords.length === 0) return;

          // 🔥 PRONOM STRICT AU DÉBUT
          if (
            isWordMatch(expectedPronoun, spokenWords[0])
          ) {
            pronounValid = true;

            const score = scoreSentence(expectedWords, spokenWords);
            if (score > bestScore) bestScore = score;
          }
        });

        const isCorrect =
          pronounValid &&
          bestScore >= 0.75; // 🔥 très strict

        return {
          text: sentence,
          isCorrect,
        };
      });

      onResult(results);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  /* ---------------- STOP ---------------- */
  const stop = () => {
    recognitionRef.current?.stop();
  };

  return (
    <button
      onClick={isListening ? stop : start}
      className={`
        px-6 py-4 rounded-xl font-semibold transition
        ${
          isListening
            ? "bg-red-500 text-white scale-105"
            : "bg-amber-400 text-black hover:scale-105"
        }
      `}
    >
      {isListening ? "STOP" : "PARLER"}
    </button>
  );
}