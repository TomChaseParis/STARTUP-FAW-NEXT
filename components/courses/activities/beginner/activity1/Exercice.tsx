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
                matrix[i - 1][j] + 1
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

      /* ---------------- MATCH ULTRA FIABLE ---------------- */
      const isCorrect = (() => {
        if (spoken === expected) return true;

        if (expected.length <= 3) return false;

        if (expected.length <= 5) {
          return levenshtein(spoken, expected) <= 1;
        }

        return levenshtein(spoken, expected) <= 2;
      })();

      /* ---------------- SUCCESS ---------------- */
      if (isCorrect) {
        playAudio(
          audio.correct[Math.floor(Math.random() * audio.correct.length)]
        );

        f[catIndex][itemIndex] = "✅ Bonne réponse !";
        fi[catIndex][itemIndex] = item.answer;
        a[catIndex][itemIndex] = 0;
      } else {
        a[catIndex][itemIndex]++;

        if (a[catIndex][itemIndex] === 1) {
          playAudio(
            audio.wrong1[Math.floor(Math.random() * audio.wrong1.length)]
          );
          f[catIndex][itemIndex] = "❌ Mauvaise réponse.";
        } else if (a[catIndex][itemIndex] === 2) {
          playAudio(
            audio.wrong2[Math.floor(Math.random() * audio.wrong2.length)]
          );
          f[catIndex][itemIndex] = "❌ Essaie encore.";
        } else {
          playAudio(audio.solution);

          f[catIndex][itemIndex] =
            `💡 Correction : « ${phrase.replace(".......", item.answer)} »`;

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

  /* ---------------- RENDER ---------------- */
  return (
    <section className="bg-white">
      <div className="mt-14 pb-20">
        <div className="grid gap-10 sm:grid-cols-2">

          {exercice2Data.map((cat, catIndex) => (
            <div
              key={cat.title}
              className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 hover:shadow-2xl transition"
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
              <div className="border-t border-black/10 bg-amber-50 px-6 py-4">
                <h3 className="text-xl font-semibold text-black">
                  {cat.title}
                </h3>
              </div>

              {/* ITEMS */}
              <div className="space-y-4 p-5">

                {cat.items.map((item, itemIndex) => {
                  const solved = filled[catIndex][itemIndex];

                  return (
                    <div
                      key={itemIndex}
                      className="
                        flex items-start gap-4
                        rounded-2xl bg-white px-5 py-5
                        shadow-sm ring-1 ring-black/5
                        hover:-translate-y-[2px] hover:shadow-lg transition
                      "
                    >

                      {/* MICRO */}
                      <button
                        onClick={() => startRecognition(catIndex, itemIndex)}
                        className={`
                          relative flex h-12 w-12 shrink-0 items-center justify-center
                          rounded-full shadow-md transition
                          ${
                            feedbacks[catIndex][itemIndex] === "🎤 Parlez maintenant…"
                              ? "bg-amber-400 text-black scale-105"
                              : "bg-white text-amber-600 hover:bg-amber-100"
                          }
                        `}
                      >
                        🎤

                        {feedbacks[catIndex][itemIndex] === "🎤 Parlez maintenant…" && (
                          <span className="absolute inset-0 rounded-full animate-ping bg-amber-300 opacity-70"></span>
                        )}
                      </button>

                      {/* TEXTE */}
                      <div className="flex-1">

                        <p
                          className="text-[16px] font-medium leading-relaxed text-black"
                          dangerouslySetInnerHTML={{
                            __html: item.phrase.replace(
                              ".......",
                              solved
                                ? `<span style="
                                    color:#22c55e;
                                    font-weight:bold;
                                  ">${solved}</span>`
                                : `<span style="
                                    display:inline-block;
                                    min-width:70px;
                                    border-bottom:3px solid #f59e0b;
                                    text-align:center;
                                    font-weight:600;
                                    letter-spacing:1px;
                                  ">___</span>`
                            ),
                          }}
                        />

                        {/* FEEDBACK */}
                        {feedbacks[catIndex][itemIndex] && (
                          <div
                            className={`
                              mt-3 text-sm px-3 py-2 rounded-lg
                              ${
                                feedbacks[catIndex][itemIndex].includes("Bonne")
                                  ? "bg-green-100 text-green-700"
                                  : feedbacks[catIndex][itemIndex].includes("Correction")
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-red-100 text-red-700"
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