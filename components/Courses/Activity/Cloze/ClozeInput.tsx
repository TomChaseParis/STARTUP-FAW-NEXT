"use client";

import React from "react";

type ClozeInputProps = {
  id: number;
  value: string | null;
  onClick: () => void;
  isCorrect: boolean | null;
};

const ClozeInput: React.FC<ClozeInputProps> = ({
  id,
  value,
  onClick,
  isCorrect,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex min-w-[90px] items-center justify-center rounded-lg px-3 py-1.5 text-sm font-semibold
        transition border
        ${
          value
            ? isCorrect === true
              ? "bg-green-100 border-green-500 text-green-700"
              : isCorrect === false
              ? "bg-red-100 border-red-500 text-red-700"
              : "bg-amber-100 border-amber-300 text-black"
            : "bg-white border-black/20 text-black hover:bg-black/5"
        }
      `}
    >
      {value ?? `…${id}…`}
    </button>
  );
};

export default ClozeInput;
