"use client";

import React, { useState } from "react";

type FreePart =
  | { type: "text"; value: string }
  | { type: "input"; placeholder?: string };

type Sentence = {
  id: number;
  parts: FreePart[];
};

type Props = {
  data: {
    title?: string;
    instruction?: string;
    sentences: Sentence[];
  };
};

const FreeTextEngine: React.FC<Props> = ({ data }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <section className="max-w-4xl mx-auto space-y-8">

      {/* HEADER */}
      {data.title && (
        <h2 className="text-2xl font-bold text-black">
          {data.title}
        </h2>
      )}

      {data.instruction && (
        <p className="text-black/70 text-sm">
          {data.instruction}
        </p>
      )}

      {/* CONTENT */}
      <div className="space-y-6">
        {data.sentences.map((sentence, sentenceIndex) => (
          <div
            key={sentence.id}
            className="rounded-xl bg-slate-50 p-5 border border-slate-200"
          >
            <div className="flex flex-wrap items-center text-[16px] leading-relaxed text-black">

              {sentence.parts.map((part, partIndex) => {
                const key = `${sentenceIndex}-${partIndex}`;

                if (part.type === "text") {
                  return (
                    <span key={partIndex}>
                      {part.value}
                    </span>
                  );
                }

                return (
                  <input
                    key={partIndex}
                    type="text"
                    value={answers[key] || ""}
                    onChange={(e) =>
                      handleChange(key, e.target.value)
                    }
                    placeholder={part.placeholder || "..."}
                    className="
                      mx-2 my-1
                      min-w-[160px]
                      border-b-2 border-amber-400
                      bg-transparent
                      px-1
                      text-[16px]
                      outline-none
                      focus:border-amber-600
                    "
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FreeTextEngine;