"use client";

import React, { useState } from "react";

import {
  validateSentence,
  validateSingleWord,
} from "@/components/courses/speech/scoring";

import { useSpeechRecognition } from "@/components/courses/speech/useSpeechRecognition";
import SpeechButton from "@/components/courses/components/SpeechButton";

import verbSpeakingData from "../../data/verbSpeakingData";

const VerbSpeakingExercise: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<string[][]>(
    verbSpeakingData.map((category) =>
      category.items.map(() => ""),
    ),
  );

  const [filled, setFilled] = useState<string[][]>(
    verbSpeakingData.map((category) =>
      category.items.map(() => ""),
    ),
  );

  const [attempts, setAttempts] = useState<number[][]>(
    verbSpeakingData.map((category) =>
      category.items.map(() => 0),
    ),
  );

  const playAudio = (file: string) => {
    const audio = new Audio(file);
    void audio.play();
  };

  const startRecognition = (
    categoryIndex: number,
    itemIndex: number,
  ) => {
    const feedbackCopy = feedbacks.map((category) => [
      ...category,
    ]);

    feedbackCopy[categoryIndex][itemIndex] =
      "🎤 Parlez maintenant…";

    setFeedbacks(feedbackCopy);

    start((spokenText) => {
      const item =
        verbSpeakingData[categoryIndex].items[itemIndex];

      const sentenceResult = validateSentence(
        spokenText,
        item.expectedSentence,
      );

      const wordResult = validateSingleWord(
        spokenText,
        item.answer,
      );

      const result = {
        similarity: Math.min(
          sentenceResult.similarity,
          wordResult.similarity,
        ),

        isCorrect:
          sentenceResult.isCorrect &&
          wordResult.isCorrect,
      };

      const feedbacksCopy = feedbacks.map((category) => [
        ...category,
      ]);

      const attemptsCopy = attempts.map((category) => [
        ...category,
      ]);

      const filledCopy = filled.map((category) => [
        ...category,
      ]);

      if (result.isCorrect) {
        const correctAudio =
          item.audio.correct[
            Math.floor(
              Math.random() *
                item.audio.correct.length,
            )
          ];

        playAudio(correctAudio);

        feedbacksCopy[categoryIndex][itemIndex] =
          `✅ Bonne réponse (${result.similarity}%)`;

        filledCopy[categoryIndex][itemIndex] =
          item.answer;

        attemptsCopy[categoryIndex][itemIndex] = 0;
      } else {
        attemptsCopy[categoryIndex][itemIndex]++;

        if (
          attemptsCopy[categoryIndex][itemIndex] ===
          1
        ) {
          const wrongAudio =
            item.audio.wrong1[
              Math.floor(
                Math.random() *
                  item.audio.wrong1.length,
              )
            ];

          playAudio(wrongAudio);

          feedbacksCopy[categoryIndex][itemIndex] =
            `❌ Mauvaise réponse (${result.similarity}%)`;
        } else if (
          attemptsCopy[categoryIndex][itemIndex] ===
          2
        ) {
          const wrongAudio =
            item.audio.wrong2[
              Math.floor(
                Math.random() *
                  item.audio.wrong2.length,
              )
            ];

          playAudio(wrongAudio);

          feedbacksCopy[categoryIndex][itemIndex] =
            "❌ Essaie encore.";
        } else {
          playAudio(item.audio.solution);

          feedbacksCopy[categoryIndex][itemIndex] =
            `💡 Correction : « ${item.phrase.replace(
              ".......",
              item.answer,
            )} »`;

          filledCopy[categoryIndex][itemIndex] =
            item.answer;

          attemptsCopy[categoryIndex][itemIndex] = 0;
        }
      }

      setFilled(filledCopy);
      setFeedbacks(feedbacksCopy);
      setAttempts(attemptsCopy);
    });
  };

  const { start, isListening } =
    useSpeechRecognition();

  return (
    <section className="w-full">
      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
        "
      >
        {verbSpeakingData.map(
          (category, categoryIndex) => (
            <article
              key={category.title}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-[0_8px_30px_rgba(15,23,42,0.07)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_14px_40px_rgba(15,23,42,0.10)]
              "
            >
              {/* ================= IMAGE ================= */}

              <div className="w-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="
                    block
                    h-auto
                    w-full
                    object-cover
                  "
                />
              </div>

              {/* ================= TITLE ================= */}

              <div
                className="
                  border-t
                  border-amber-100
                  bg-gradient-to-r
                  from-amber-50
                  to-yellow-50
                  px-6
                  py-5
                "
              >
                <p
                  className="
                    mb-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-slate-400
                  "
                >
                  Verbes essentiels
                </p>

                <h3
                  className="
                    text-xl
                    font-bold
                    tracking-tight
                    text-slate-900
                  "
                >
                  {category.title}
                </h3>
              </div>

              {/* ================= QUESTIONS ================= */}

              <div className="space-y-3 p-5">
                {category.items.map(
                  (item, itemIndex) => {
                    const solved =
                      filled[categoryIndex][
                        itemIndex
                      ];

                    return (
                      <div
                        key={itemIndex}
                        className="
                          flex
                          items-start
                          gap-4
                          rounded-2xl
                          border
                          border-slate-200/80
                          bg-slate-50/70
                          px-4
                          py-4
                          transition-all
                          duration-200
                          hover:border-amber-200
                          hover:bg-white
                          hover:shadow-sm
                        "
                      >
                        {/* ================= MICRO ================= */}

                        <SpeechButton
                          isListening={
                            isListening
                          }
                          onClick={() =>
                            startRecognition(
                              categoryIndex,
                              itemIndex,
                            )
                          }
                        />

                        {/* ================= TEXTE ================= */}

                        <div className="min-w-0 flex-1">
                          <p
                            className="
                              text-sm
                              font-medium
                              leading-relaxed
                              text-slate-800
                            "
                            dangerouslySetInnerHTML={{
                              __html:
                                item.phrase.replace(
                                  ".......",
                                  solved
                                    ? `<span style="
                                        display:inline-flex;
                                        align-items:center;
                                        justify-content:center;
                                        min-width:70px;
                                        margin:0 3px;
                                        padding:4px 10px;
                                        border-radius:10px;
                                        background:#dcfce7;
                                        color:#15803d;
                                        font-weight:700;
                                      ">${solved}</span>`
                                    : `<span style="
                                        display:inline-flex;
                                        align-items:center;
                                        justify-content:center;
                                        min-width:60px;
                                        margin:0 3px;
                                        padding:4px 10px;
                                        border-radius:10px;
                                        background:#fffaf0;
                                        border:1px solid #fde68a;
                                        color:#92400e;
                                        font-weight:600;
                                      ">...</span>`,
                                ),
                            }}
                          />

                          {/* ================= FEEDBACK ================= */}

                          {feedbacks[
                            categoryIndex
                          ][itemIndex] && (
                            <div
                              className={`
                                mt-3
                                rounded-xl
                                border
                                px-3
                                py-2
                                text-xs
                                font-medium

                                ${
                                  feedbacks[
                                    categoryIndex
                                  ][
                                    itemIndex
                                  ].includes(
                                    "Bonne",
                                  )
                                    ? "border-green-200 bg-green-50 text-green-700"
                                    : feedbacks[
                                          categoryIndex
                                        ][
                                          itemIndex
                                        ].includes(
                                          "Correction",
                                        )
                                      ? "border-blue-200 bg-blue-50 text-blue-700"
                                      : feedbacks[
                                            categoryIndex
                                          ][
                                            itemIndex
                                          ].includes(
                                            "Parlez",
                                          )
                                        ? "border-amber-200 bg-amber-50 text-amber-700"
                                        : "border-red-200 bg-red-50 text-red-700"
                                }
                              `}
                            >
                              {
                                feedbacks[
                                  categoryIndex
                                ][itemIndex]
                              }
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  );
};

export default VerbSpeakingExercise;