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
  const tokenize = (text: string) => {
    const normalized = normalize(text);

    return normalized ? normalized.split(" ") : [];
  };

  /* ---------------- LEVENSHTEIN ---------------- */
  const levenshtein = (a: string, b: string) => {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1,
          );
        }
      }
    }

    return matrix[b.length][a.length];
  };

  /* ---------------- WORD MATCH ---------------- */
  const isWordMatch = (expected: string, spoken: string) => {
    if (!expected || !spoken) return false;

    const dist = levenshtein(expected, spoken);
    const maxLen = Math.max(expected.length, spoken.length);

    if (maxLen === 0) return true;

    return dist / maxLen < 0.4;
  };

  /* ---------------- SENTENCE SCORE ---------------- */
  const scoreSentence = (
    expectedWords: string[],
    spokenWords: string[],
  ) => {
    if (expectedWords.length === 0) return 0;

    let matchCount = 0;

    expectedWords.forEach((expWord) => {
      const found = spokenWords.some((spWord) =>
        isWordMatch(expWord, spWord),
      );

      if (found) {
        matchCount++;
      }
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
    if (isListening) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition non supportée");
      return;
    }

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.lang = "fr-FR";

    /*
     * IMPORTANT :
     *
     * false = le navigateur considère cette prise de parole
     * comme une seule session.
     *
     * Après que l'utilisateur a terminé sa phrase et fait
     * une pause, le navigateur déclenche automatiquement
     * "onend".
     *
     * C'est ce qui permet d'afficher la correction sans
     * avoir besoin de rappuyer sur le micro.
     */
    recognition.continuous = false;

    recognition.interimResults = false;

    let finalTranscript = "";

    /* ---------------- ON START ---------------- */

    recognition.onstart = () => {
      setIsListening(true);
    };

    /* ---------------- ON RESULT ---------------- */

    recognition.onresult = (event: any) => {
      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const transcript = event.results[i][0]?.transcript;

        if (transcript) {
          finalTranscript += `${transcript} `;
        }
      }
    };

    /* ---------------- ON END ---------------- */

    recognition.onend = () => {
      setIsListening(false);

      /*
       * On libère immédiatement la référence.
       */
      recognitionRef.current = null;

      const chunks = splitIntoChunks(finalTranscript);

      const results = expectedSentences.map((sentence) => {
        const expectedWords = tokenize(sentence);

        /*
         * Le premier mot de la phrase attendue correspond
         * au pronom demandé.
         */
        const expectedPronoun = expectedWords[0];

        let bestScore = 0;
        let pronounValid = false;

        chunks.forEach((chunk) => {
          const spokenWords = tokenize(chunk);

          if (spokenWords.length === 0) return;

          /*
           * Vérification du pronom.
           */
          if (
            expectedPronoun &&
            isWordMatch(expectedPronoun, spokenWords[0])
          ) {
            pronounValid = true;

            const score = scoreSentence(
              expectedWords,
              spokenWords,
            );

            if (score > bestScore) {
              bestScore = score;
            }
          }
        });

        const isCorrect =
          pronounValid && bestScore >= 0.75;

        return {
          text: sentence,
          isCorrect,
        };
      });

      /*
       * La correction est envoyée automatiquement
       * dès que la reconnaissance se termine.
       */
      onResult(results);
    };

    /* ---------------- ON ERROR ---------------- */

    recognition.onerror = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    /* ---------------- START RECOGNITION ---------------- */

    try {
      recognition.start();
    } catch (error) {
      setIsListening(false);
      recognitionRef.current = null;

      console.error(
        "Impossible de démarrer la reconnaissance vocale :",
        error,
      );
    }
  };

  /* ---------------- STOP ---------------- */

  const stop = () => {
    recognitionRef.current?.stop();
  };

  return (
    <button
      type="button"
      onClick={isListening ? stop : start}
      aria-label={
        isListening
          ? "Arrêter l'écoute"
          : "Commencer à parler"
      }
      className={`
        group/button relative flex h-14 w-14 shrink-0
        items-center justify-center overflow-hidden rounded-2xl
        transition-all duration-300 active:scale-[0.97]
        ${
          isListening
            ? `
              bg-gradient-to-br from-amber-300 via-yellow-300 to-amber-400
              shadow-[0_16px_32px_rgba(245,158,11,0.28)]
              scale-105
            `
            : `
              bg-amber-300
              border border-amber-100
              shadow-[0_8px_20px_rgba(0,0,0,0.06)]
              hover:-translate-y-1
              hover:shadow-[0_16px_30px_rgba(245,158,11,0.18)]
            `
        }
      `}
    >
      {/* ONDES AUDIO */}
      {isListening && (
        <>
          <span className="absolute h-12 w-12 rounded-full border-2 border-white/50 animate-ping" />

          <span className="absolute h-16 w-16 rounded-full border border-white/30 animate-ping [animation-delay:300ms]" />
        </>
      )}

      {/* GLOW */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-300
          ${
            isListening
              ? "opacity-100"
              : "opacity-0 group-hover/button:opacity-100"
          }
        `}
      >
        <div className="absolute -left-10 top-0 h-full w-20 rotate-12 bg-white/30 blur-xl" />
      </div>

      {/* ICON */}
      <div
        className={`
          relative text-slate-800 transition-transform duration-300
          ${
            isListening
              ? "animate-pulse scale-110"
              : "group-hover/button:scale-110"
          }
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14a3 3 0 003-3V7a3 3 0 10-6 0v4a3 3 0 003 3z"
          />

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11a7 7 0 01-14 0M12 18v3"
          />
        </svg>
      </div>
    </button>
  );
}