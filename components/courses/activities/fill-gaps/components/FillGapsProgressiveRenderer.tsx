
"use client";

import { motion } from "framer-motion";

import FillGapsRenderer from "./FillGapsRenderer";

import { FillGapsData } from "@/types/fillGapsTypes";

type Props = {
  sentences: FillGapsData["sentences"];
  currentIndex: number;
  answers: string[];
  validated: boolean;
  onChange: (index: number, value: string) => void;
};

export default function FillGapsProgressiveRenderer({
  sentences,
  currentIndex,
  answers,
  validated,
  onChange,
}: Props) {
  const visibleSentences = sentences.slice(0, currentIndex + 1);

  return (
    <div className="space-y-6">
      {visibleSentences.map((sentence, index) => {
        const isCurrent = index === currentIndex;
        const sentenceAnswer = answers[index] ?? "";

        const input = sentence.parts.find(
          (
            part,
          ): part is (typeof sentence.parts)[number] & {
            type: "input";
          } => part.type === "input",
        );

        const normalize = (text: string) =>
          text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ")
            .trim();

        const isCorrect =
          input !== undefined &&
          normalize(sentenceAnswer) ===
            normalize(input.answer);

        const isValidated =
          index < currentIndex || validated;

        return (
          <motion.div
            key={sentence.id}
            initial={
              isCurrent
                ? {
                    opacity: 0,
                    y: 30,
                  }
                : false
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <div
              className={`
                relative
                rounded-3xl
                border
                p-5
                transition-all
                duration-300
                ${
                  isCurrent
                    ? "border-amber-300 bg-amber-50/40 shadow-md"
                    : isValidated
                      ? isCorrect
                        ? "border-emerald-200 bg-emerald-50/30"
                        : "border-red-200 bg-red-50/30"
                      : "border-slate-200 bg-white"
                }
              `}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      text-sm
                      font-bold
                      ${
                        isCurrent
                          ? "bg-amber-500 text-white"
                          : isCorrect
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {isCurrent
                      ? index + 1
                      : isCorrect
                        ? "✓"
                        : "✕"}
                  </div>

                  <span className="text-sm font-semibold text-slate-500">
                    Question {index + 1}
                  </span>
                </div>

                {!isCurrent && isValidated && (
                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-bold
                      ${
                        isCorrect
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {isCorrect ? "Correct" : "À revoir"}
                  </span>
                )}
              </div>

              <FillGapsRenderer
                sentence={sentence}
                value={sentenceAnswer}
                validated={isValidated}
                isCorrect={isCorrect}
                correctAnswer={input?.answer ?? ""}
                hint={input?.hint}
                onChange={(value) => {
                  if (isCurrent) {
                    onChange(index, value);
                  }
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}