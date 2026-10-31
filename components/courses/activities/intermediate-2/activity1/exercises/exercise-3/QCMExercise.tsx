
"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import QuizEngine from "@/components/courses/engines/QuizEngine";
import { useProgress } from "@/components/courses/engines/ProgressEngine/useProgress";
import ActivityResults from "@/components/courses/common/ActivityResults/ActivityResults";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

import { QCMData } from "./data/QCMData-temp";

type QCMExerciseProps = {
  onCompleted?: (result: ExerciseSessionResult) => void;
};

const ACTIVITY_ID = "intermediate-2-mode-subjonctif-activity-1";
const EXERCISE_ID = "exercise-3";

export default function QCMExercise({
  onCompleted,
}: QCMExerciseProps) {
  const router = useRouter();

  const { progress, refresh } = useProgress();

  const questions = useMemo(() => QCMData ?? [], []);

  const renderResult = (
    result: ExerciseSessionResult,
    resetQuiz: () => void,
  ) => {
    const exercise = progress.getExercise(
      ACTIVITY_ID,
      EXERCISE_ID,
    );

    const bestScore = exercise?.bestScore ?? result.score;
    const attempts = exercise?.attempts ?? 1;

    return (
      <ActivityResults
        result={{
          session: result,
          bestScore,
          attempts,
        }}
        teacher="intermediate-2"
        isLastExercise
        finishLabel="Terminer l'activité"
        onRestart={() => {
          resetQuiz();
          refresh();
        }}
        onNext={() => {
          onCompleted?.(result);
          router.push("/courses/intermediate-2");
        }}
      />
    );
  };

  if (questions.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
        Aucune question n&apos;a été trouvée pour cet exercice.
        Vérifie le fichier QCMData-temp.ts.
      </div>
    );
  }

  return (
    <section
      id="exercise-3-quiz"
      className="w-full min-w-0"
    >
      <QuizEngine
        questions={questions}
        speechEngine="openai"
        teacherLevel="intermediate-2"
        teacherFeedbackImages={{
          correct:
            "/images/bulles-QCM/intermediate-2/correct.png",
          wrong:
            "/images/bulles-QCM/intermediate-2/wrong.png",
        }}
        progressConfig={{
          progress,
          activityId: ACTIVITY_ID,
          exerciseId: EXERCISE_ID,
          onScoreSubmitted: () => {
            refresh();
          },
        }}
        resultRenderer={renderResult}
      />
    </section>
  );
}
