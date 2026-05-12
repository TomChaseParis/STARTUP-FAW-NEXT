"use client";

import React, { useState } from "react";
import Image from "next/image";
import { exercice2Data } from "./exercice2Data";

const Exercice: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<string[][]>(
    exercice2Data.map((cat) => cat.items.map(() => "")),
  );

  const [filled, setFilled] = useState<string[][]>(
    exercice2Data.map((cat) => cat.items.map(() => "")),
  );

  const [attempts, setAttempts] = useState<number[][]>(
    exercice2Data.map((cat) => cat.items.map(() => 0)),
  );

  const playAudio = (file: string) => new Audio(file).play();

  /* ---------------- NORMALIZE ---------------- */
  const normalize = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[^a-z]/g, "");
  };

  /* ---------------- LEVENSHTEIN ---------------- */
  const levenshtein = (a: string, b: string) => {
    const matrix = Array.from({ length: b.length + 1 }, () => []);

    for (let i = 0; i <= b.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        matrix[i][j] =
          b[i - 1] === a[j - 1]
            ? matrix[i - 1][j - 1]
            : Math.min(
                matrix[i - 1][j - 1] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j] + 1,
              );
      }
    }

    return matrix[b.length][a.length];
  };

  /* ---------------- RECOGNITION ---------------- */
  const startRecognition = (catIndex: number, itemIndex: number) => {
    const Recognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!Recognition) {
      alert("⚠️ Reconnaissance vocale non supportée");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;

    let finalTranscript = "";

    recognition.onstart = () => {
      const f = feedbacks.map((c) => [...c]);
      f[catIndex][itemIndex] = "🎤 Parlez maintenant…";
      setFeedbacks(f);
    };

    recognition.onresult = (event: any) => {
      finalTranscript = event.results[0][0].transcript;
    };

    recognition.onend = () => {
      const spoken = normalize(finalTranscript);
      const item = exercice2Data[catIndex].items[itemIndex];
      const expected = normalize(item.answer);
      const phrase = item.phrase;
      const audio = item.audio;

      const f = feedbacks.map((c) => [...c]);
      const a = attempts.map((c) => [...c]);
      const fi = filled.map((c) => [...c]);

      const isCorrect = (() => {
        if (spoken === expected) return true;

        if (expected.length <= 3) return false;

        if (expected.length <= 5) {
          return levenshtein(spoken, expected) <= 1;
        }

        return levenshtein(spoken, expected) <= 2;
      })();

      if (isCorrect) {
        playAudio(
          audio.correct[Math.floor(Math.random() * audio.correct.length)],
        );

        f[catIndex][itemIndex] = "✅ Bonne réponse !";
        fi[catIndex][itemIndex] = item.answer;
        a[catIndex][itemIndex] = 0;
      } else {
        a[catIndex][itemIndex]++;

        if (a[catIndex][itemIndex] === 1) {
          playAudio(
            audio.wrong1[Math.floor(Math.random() * audio.wrong1.length)],
          );
          f[catIndex][itemIndex] = "❌ Mauvaise réponse.";
        } else if (a[catIndex][itemIndex] === 2) {
          playAudio(
            audio.wrong2[Math.floor(Math.random() * audio.wrong2.length)],
          );
          f[catIndex][itemIndex] = "❌ Essaie encore.";
        } else {
          playAudio(audio.solution);

          f[catIndex][itemIndex] = `💡 Correction : « ${phrase.replace(
            ".......",
            item.answer,
          )} »`;

          fi[catIndex][itemIndex] = item.answer;
          a[catIndex][itemIndex] = 0;
        }
      }

      setFilled(fi);
      setFeedbacks(f);
      setAttempts(a);
    };

    recognition.start();
  };

  return (
    <section className="bg-white">
      <div className="mt-14 pb-20">
        <div className="grid gap-10 sm:grid-cols-2">
          {exercice2Data.map((cat, catIndex) => (
            <div
              key={cat.title}
              className="
                group overflow-hidden rounded-3xl
                border border-white/60 bg-white/95
                shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                backdrop-blur-sm
                transition-all duration-300
                hover:-translate-y-1.5
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.14)]
              "
            >
              {/* IMAGE */}
              <div className="relative flex h-[390px] w-full items-center justify-center bg-white">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover p-4"
                />
              </div>

              {/* TITLE */}
              <div
                className="
                  border-t border-amber-100
                  bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50
                  px-7 py-5
                "
              >
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Verbes essentiels
                </p>

                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                  {cat.title}
                </h3>
              </div>

              {/* ITEMS */}
              <div className="space-y-5 p-6">
                {cat.items.map((item, itemIndex) => {
                  const solved = filled[catIndex][itemIndex];
                  const isListening =
                    feedbacks[catIndex][itemIndex] === "🎤 Parlez maintenant…";

                  return (
                    <div
                      key={itemIndex}
                      className="
                        flex items-start gap-5
                        rounded-3xl
                        border border-slate-200/70
                        bg-slate-50/70
                        px-6 py-6
                        transition-all duration-300
                        hover:-translate-y-[2px]
                        hover:border-amber-200
                        hover:bg-white
                        hover:shadow-lg
                      "
                    >
                      {/* MICRO */}
                      <button
                        onClick={() => startRecognition(catIndex, itemIndex)}
                        aria-label="Parler"
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
                                bg-gradient-to-br from-white via-amber-50 to-yellow-50
                                border border-amber-100
                                shadow-[0_8px_20px_rgba(0,0,0,0.06)]
                                hover:-translate-y-1
                                hover:shadow-[0_16px_30px_rgba(245,158,11,0.18)]
                              `
                          }
                        `}
                      >
                        {isListening && (
                          <>
                            <span className="absolute h-12 w-12 rounded-full border-2 border-white/50 animate-ping" />
                            <span className="absolute h-16 w-16 rounded-full border border-white/30 animate-ping [animation-delay:300ms]" />
                          </>
                        )}

                        <div
                          className={`
                            relative text-slate-800 transition-transform duration-300
                            ${isListening ? "animate-pulse scale-110" : "group-hover/button:scale-110"}
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

                      {/* TEXTE */}
                      <div className="flex-1">
                        <p
                          className="text-[16px] font-medium leading-relaxed text-slate-800"
                          dangerouslySetInnerHTML={{
                            __html: item.phrase.replace(
                              ".......",
                              solved
                                ? `<span style="
                                    color:#16a34a;
                                    font-weight:700;
                                    background:#dcfce7;
                                    padding:4px 10px;
                                    border-radius:12px;
                                  ">${solved}</span>`
                                : `<span style="
                                    display:inline-flex;
                                    align-items:center;
                                    justify-content:center;
                                    min-width:90px;
                                    padding:6px 14px;
                                    border-radius:12px;
                                    background:#fffaf0;
                                    border:1px solid #fde68a;
                                    color:#92400e;
                                    font-weight:600;
                                  ">Réponse</span>`,
                            ),
                          }}
                        />

                        {/* FEEDBACK */}
                        {feedbacks[catIndex][itemIndex] && (
                          <div
                            className={`
                              mt-4 rounded-2xl px-4 py-3 text-sm font-medium
                              ${
                                feedbacks[catIndex][itemIndex].includes("Bonne")
                                  ? "border border-green-200 bg-green-50 text-green-700"
                                  : feedbacks[catIndex][itemIndex].includes("Correction")
                                    ? "border border-blue-200 bg-blue-50 text-blue-700"
                                    : feedbacks[catIndex][itemIndex].includes("Parlez")
                                      ? "border border-amber-200 bg-amber-50 text-amber-700"
                                      : "border border-red-200 bg-red-50 text-red-700"
                              }
                            `}
                          >
                            {feedbacks[catIndex][itemIndex]}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Exercice;