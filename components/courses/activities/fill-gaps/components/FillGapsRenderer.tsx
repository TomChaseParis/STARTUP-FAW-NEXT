"use client";

import FillGapInput from "./FillGapInput";

import { Sentence } from "@/hooks/useFillGapsEngine";

type Props = {
  sentence: Sentence;
  value: string;
  validated: boolean;
  isCorrect: boolean;
  correctAnswer: string;
  hint?: string;
  onChange: (value: string) => void;
};


    export default function FillGapsRenderer({
      sentence,
      value,
      validated,
      isCorrect,
      correctAnswer,
      hint,
      onChange,
    }: Props) {

  
  return (
    <div className="space-y-6">
      {hint && (
        <div className="inline-flex rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
          Verbe : {hint}
        </div>
      )}

      <div className="whitespace-pre-line text-lg leading-9 text-slate-800">
        {sentence.parts.map((part, index) => {
          if (part.type === "text") {
            return <span key={index}>{part.value}</span>;
          }

          return (
            <FillGapInput
              key={index}
              value={value}
              validated={validated}
              isCorrect={isCorrect}
              correctAnswer={correctAnswer}
              onChange={onChange}
            />
          );
        })}
      </div>
    </div>
  );
}
