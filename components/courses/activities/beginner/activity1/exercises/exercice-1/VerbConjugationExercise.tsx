"use client";

import React, { useState } from "react";
import Image from "next/image";
import { verbConjugationData } from "../../data/verbConjugationData";

import {
  validateSentence,
  validateSingleWord,
} from "@/components/courses/speech/scoring";

import { useSpeechRecognition } from "@/components/courses/speech/useSpeechRecognition";
import SpeechButton from "@/components/courses/components/SpeechButton";

type VerbConjugationExerciseProps = {
  onComplete?: (score: number) => void;
};

const VerbConjugationExercise: React.FC<VerbConjugationExerciseProps> = ({
  onComplete,
}) => {
  const [feedbacks, setFeedbacks] = useState<string[][]>(
    verbConjugationData.map((cat) => cat.items.map(() => "")),
  );

  const [filled, setFilled] = useState<string[][]>(
    verbConjugationData.map((cat) => cat.items.map(() => "")),
  );

  const [attempts, setAttempts] = useState<number[][]>(
    verbConjugationData.map((cat) => cat.items.map(() => 0)),
  );

  const playAudio = (file: string) => new Audio(file).play();

  /**
   * Cette fonction sera utilisée dans la prochaine étape
   * pour calculer le score puis appeler :
   *
   * onComplete?.(score);
   */
  const isExerciseCompleted = (answers: string[][]) => {
    return answers.every((category) =>
      category.every((answer) => answer.trim() !== ""),
    );
  };

  const calculateScore = (answers: string[][]) => {
    let total = 0;
    let correct = 0;

    verbConjugationData.forEach((category, catIndex) => {
      category.items.forEach((item, itemIndex) => {
        total++;

        if (answers[catIndex][itemIndex] === item.answer) {
          correct++;
        }
      });
    });

    return Math.round((correct / total) * 100);
  };

  const completeExercise = (answers: string[][]) => {
    const score = calculateScore(answers);

    onComplete?.(score);
  };

  /* ---------------- RECOGNITION ---------------- */

  const startRecognition = (catIndex: number, itemIndex: number) => {
    const f = feedbacks.map((c) => [...c]);

    f[catIndex][itemIndex] = "🎤 Parlez maintenant…";

    setFeedbacks(f);

    start((spokenText) => {
      const item = verbConjugationData[catIndex].items[itemIndex];

      const phrase = item.phrase;

      const audio = item.audio;

      const sentenceResult = validateSentence(
        spokenText,
        item.expectedSentence,
      );

      const wordResult = validateSingleWord(spokenText, item.answer);

      const result = {
        similarity: Math.min(sentenceResult.similarity, wordResult.similarity),

        isCorrect: sentenceResult.isCorrect && wordResult.isCorrect,
      };

      console.log({
        expectedSentence: item.expectedSentence,

        transcript: spokenText,

        sentenceSimilarity: sentenceResult.similarity,

        wordSimilarity: wordResult.similarity,

        sentenceCorrect: sentenceResult.isCorrect,

        wordCorrect: wordResult.isCorrect,
      });

      const f = feedbacks.map((c) => [...c]);

      const a = attempts.map((c) => [...c]);

      const fi = filled.map((c) => [...c]);

      if (result.isCorrect) {
        playAudio(
          audio.correct[Math.floor(Math.random() * audio.correct.length)],
        );

        f[catIndex][itemIndex] = `✅ Bonne réponse (${result.similarity}%)`;

        fi[catIndex][itemIndex] = item.answer;

        a[catIndex][itemIndex] = 0;
      } else {
        a[catIndex][itemIndex]++;

        if (a[catIndex][itemIndex] === 1) {
          playAudio(
            audio.wrong1[Math.floor(Math.random() * audio.wrong1.length)],
          );

          f[catIndex][
            itemIndex
          ] = `❌ Mauvaise réponse (${result.similarity}%)`;
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

      const isExerciseCompleted = (answers: string[][]) => {
        return answers.every((category) =>
          category.every((answer) => answer.trim() !== ""),
        );
      };

      const calculateScore = (answers: string[][]) => {
        let total = 0;
        let correct = 0;

        verbConjugationData.forEach((category, catIndex) => {
          category.items.forEach((item, itemIndex) => {
            total++;

            if (answers[catIndex][itemIndex] === item.answer) {
              correct++;
            }
          });
        });

        return Math.round((correct / total) * 100);
      };

      const completeExercise = (answers: string[][]) => {
        const score = calculateScore(answers);

        onComplete?.(score);
      };

      console.log({
        expected: item.answer,
        transcript: spokenText,
        similarity: result.similarity,
      });
    });
  };

  const { start, isListening } = useSpeechRecognition();

  return (
    <section className="bg-white">
      <div className="mt-14 pb-20">
        <div className="grid gap-10 sm:grid-cols-2">
          {verbConjugationData.map((cat, catIndex) => (
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
              <div className="relative flex h-[390px] w-full items-center justify-center bg-white">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div
                className="
                    via-yellow-50 border-t
                    border-amber-100 bg-gradient-to-r from-amber-50 to-amber-50
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

              <div className="space-y-5 p-6">
                {cat.items.map((item, itemIndex) => {
                  const solved = filled[catIndex][itemIndex];

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
                      <SpeechButton
                        isListening={isListening}
                        onClick={() => startRecognition(catIndex, itemIndex)}
                      />

                      <div className="flex-1">
                        <p
                          className="text-[16px] font-medium leading-relaxed text-slate-800"
                          dangerouslySetInnerHTML={{
                            __html: item.phrase.replace(
                              ".......",
                              solved
                                ? `<span style="color:#16a34a;font-weight:700;background:#dcfce7;padding:4px 10px;border-radius:12px;">${solved}</span>`
                                : `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:90px;padding:6px 14px;border-radius:12px;background:#fffaf0;border:1px solid #fde68a;color:#92400e;font-weight:600;">...</span>`,
                            ),
                          }}
                        />

                        {feedbacks[catIndex][itemIndex] && (
                          <div
                            className={`
                                  mt-4 rounded-2xl px-4 py-3 text-sm font-medium
                                  ${
                                    feedbacks[catIndex][itemIndex].includes(
                                      "Bonne",
                                    )
                                      ? "border border-green-200 bg-green-50 text-green-700"
                                      : feedbacks[catIndex][itemIndex].includes(
                                          "Correction",
                                        )
                                      ? "border border-blue-200 bg-blue-50 text-blue-700"
                                      : feedbacks[catIndex][itemIndex].includes(
                                          "Parlez",
                                        )
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

export default VerbConjugationExercise;
