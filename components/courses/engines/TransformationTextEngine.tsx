"use client";

import React, { useMemo, useRef, useState } from "react";

type Props = {
  sourceText: string;
  expectedText: string;
};

function tokenize(text: string) {
  const raw = text.match(/\w+’?\w*|[^\s]/g) || [];
  return raw.map((t) => ({ raw: t, norm: t.toLowerCase() }));
}

function diffTokens(student: ReturnType<typeof tokenize>, expected: ReturnType<typeof tokenize>) {
  const n = student.length;
  const m = expected.length;

  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(m + 1).fill(0)
  );

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (student[i].norm === expected[j].norm)
        dp[i][j] = 1 + dp[i + 1][j + 1];
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const aligned: Array<{ type: "match" | "del" | "ins"; s?: number; e?: number }> = [];

  let i = 0, j = 0;

  while (i < n && j < m) {
    if (student[i].norm === expected[j].norm) {
      aligned.push({ type: "match", s: i, e: j });
      i++; j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      aligned.push({ type: "del", s: i });
      i++;
    } else {
      aligned.push({ type: "ins", e: j });
      j++;
    }
  }

  while (i < n) aligned.push({ type: "del", s: i++ });
  while (j < m) aligned.push({ type: "ins", e: j++ });

  return aligned;
}

function buildViews(studentText: string, expectedText: string) {
  const sToks = tokenize(studentText);
  const eToks = tokenize(expectedText);
  const ops = diffTokens(sToks, eToks);

  const studentJSX: JSX.Element[] = [];
  const expectedJSX: JSX.Element[] = [];

  let correctCount = 0;
  const totalExpected = eToks.length;

  ops.forEach((op, idx) => {
    if (op.type === "match" && op.s !== undefined && op.e !== undefined) {
      studentJSX.push(<span key={`s${idx}`}>{sToks[op.s].raw}</span>);
      expectedJSX.push(<span key={`e${idx}`}>{eToks[op.e].raw}</span>);
      correctCount++;
    }

    if (op.type === "del" && op.s !== undefined) {
      studentJSX.push(
        <span key={`s${idx}`} className="bg-red-200 text-red-900 rounded px-0.5">
          {sToks[op.s].raw}
        </span>
      );
    }

    if (op.type === "ins" && op.e !== undefined) {
      expectedJSX.push(
        <span key={`e${idx}`} className="bg-green-200 text-green-900 rounded px-0.5">
          {eToks[op.e].raw}
        </span>
      );
    }

    if (idx < ops.length - 1) {
      studentJSX.push(<span key={`s-sp-${idx}`}> </span>);
      expectedJSX.push(<span key={`e-sp-${idx}`}> </span>);
    }
  });

  const errors = totalExpected - correctCount;
  const coverage = totalExpected > 0
    ? Math.round((correctCount / totalExpected) * 100)
    : 0;

  return { studentJSX, expectedJSX, correctCount, totalExpected, errors, coverage };
}

const TransformationTextEngine: React.FC<Props> = ({ sourceText, expectedText }) => {
  const [studentText, setStudentText] = useState("");
  const [showCorr, setShowCorr] = useState(false);
  const corrRef = useRef<HTMLDivElement | null>(null);

  const { studentJSX, expectedJSX, coverage } = useMemo(
    () => buildViews(studentText, expectedText),
    [studentText, expectedText]
  );

  const onVerify = () => {
    setShowCorr(true);
    setTimeout(() => corrRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const onReset = () => {
    setStudentText("");
    setShowCorr(false);
  };

 return (
  <div className="space-y-8">

    <details>
      <summary className="cursor-pointer text-base text-black/80 font-medium">
        Voir le texte original
      </summary>

      <div className="mt-3 p-5 bg-gray-100 border border-gray-200 rounded-xl text-black leading-relaxed text-[15px] whitespace-pre-wrap">
        {sourceText}
      </div>
    </details>

    <textarea
      value={studentText}
      onChange={(e) => setStudentText(e.target.value)}
      className="
        w-full h-64
        border border-gray-300
        rounded-xl
        p-4
        bg-amber-50
        text-black
        text-[16px]
        leading-7
        focus:outline-none
        focus:ring-2 focus:ring-amber-400
      "
      placeholder="Commencez à écrire votre transformation..."
    />

    <div className="flex justify-end gap-3">
      <button
        onClick={onVerify}
        className="bg-amber-500 px-5 py-2.5 rounded-lg text-black font-semibold hover:bg-amber-400"
      >
        Voir correction
      </button>

      <button
        onClick={onReset}
        className="bg-gray-200 px-5 py-2.5 rounded-lg text-black font-semibold hover:bg-gray-300"
      >
        Reset
      </button>
    </div>

    {showCorr && (
      <div ref={corrRef} className="space-y-5">

        <div className="text-base font-medium text-black">
          Score : {coverage}%
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-[15px] leading-7">

<div className="text-black">
  {studentJSX}
</div>

<div className="text-black">
  {expectedJSX}
</div>

</div>
      </div>
    )}
  </div>
);
};

export default TransformationTextEngine;