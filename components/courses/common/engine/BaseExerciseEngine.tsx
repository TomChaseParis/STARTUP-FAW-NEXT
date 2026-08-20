"use client";

import { ReactNode, useState } from "react";

import ExerciseResult from "../result/ExerciseResult";
import ExerciseReport from "../result/ExerciseReport";

import type { ExerciseSessionResult } from "../types/exerciseSessionTypes";

type Props = {
  session: {
    isFinished: boolean;
    history: any[];
    result: ExerciseSessionResult;
  };

  onRestart: () => void;

  question: ReactNode;
};

export default function BaseExerciseEngine({
  session,
  onRestart,
  question,
}: Props) {
  const [showReport, setShowReport] = useState(false);

  if (session.isFinished) {
    if (showReport) {
      return (
        <ExerciseReport
          history={session.history}
          onRestart={() => {
            setShowReport(false);
            onRestart();
          }}
          onBack={() => setShowReport(false)}
        />
      );
    }

    return (
      <ExerciseResult
        result={session.result}
        onRestart={() => {
          setShowReport(false);
          onRestart();
        }}
        onShowReport={() => setShowReport(true)}
      />
    );
  }

  return <>{question}</>;
}