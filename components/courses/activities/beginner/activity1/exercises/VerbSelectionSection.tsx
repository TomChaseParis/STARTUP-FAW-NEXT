"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import ActivityResults from "@/components/courses/common/ActivityResults";
import FillGapsReport from "@/components/courses/common/result/FillGapsReport";

import VerbSelectionExercise from "./VerbSelectionExercise";

import { verbSelectionData } from "../data/verbSelectionData";

import { ActivityResult } from "@/core/activity/models/ActivityResult";
import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type VerbSelectionSectionProps = {
  onNext?: () => void;
};

export default function VerbSelectionSection({
  onNext,
}: VerbSelectionSectionProps) {
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<ActivityResult | null>(null);
  const [exerciseKey, setExerciseKey] = useState(0);

  useEffect(() => {
    if (!started || result) return;

    let attempts = 0;
    let timer: number | undefined;

    const scrollToExercise = () => {
      const element =
        document.getElementById("exercise-2-content");

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timer = window.setTimeout(
            scrollToExercise,
            100,
          );
        }

        return;
      }

      const elementTop =
        element.getBoundingClientRect().top +
        window.scrollY;

      window.scrollTo({
        top: Math.max(0, elementTop - 100),
        behavior: "smooth",
      });
    };

    timer = window.setTimeout(scrollToExercise, 100);

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [started, result]);

  const handleComplete = (
    sessionResult: ExerciseSessionResult,
  ) => {
    const activityResult: ActivityResult = {
      session: sessionResult,
      bestScore: sessionResult.score,
      attempts: 1,
    };

    setResult(activityResult);
  };

  const handleRestart = () => {
    setResult(null);
    setStarted(false);
    setExerciseKey((previous) => previous + 1);

    requestAnimationFrame(() => {
      document
        .getElementById("activity-1-exercise-2")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  };

  return (
    <ExerciseContainer
      key={exerciseKey}
      exerciseId="exercise-2"
    >
      {({ onComplete }) => {
        if (result) {
          return (
            <ActivityResults
              result={result}
              onRestart={handleRestart}
              onNext={() => {
                onNext?.();
              }}
              isLastExercise={!onNext}
              detailedReport={
                <FillGapsReport
                  data={verbSelectionData}
                  history={result.session.history}
                />
              }
            />
          );
        }

        return (
          <div
            id="exercise-2-instruction"
            className="scroll-mt-10"
          >
            <ExerciseSection>
              <InstructionBlock
                level="beginner"
                stampLabel="EXERCICE 2"
                typeLabel="TEXTE À TROUS"
                title="CHOISIS LE BON VERBE"
                subtitle="Complète chaque phrase avec le verbe correctement conjugué."
                activityType="type"
                description={
                  <div
                    className="
                      flex flex-col items-center gap-4
                      rounded-xl border border-slate-300 bg-white
                      px-4 py-4
                      sm:flex-row sm:items-center sm:gap-5
                      sm:px-5 sm:py-4
                    "
                  >
                    <div className="flex shrink-0 items-center justify-center">
                      <div
                        className="
                          flex h-20 w-20 items-center justify-center
                          rounded-full bg-amber-50 text-4xl
                          sm:h-28 sm:w-28
                        "
                      >
                        ✍️
                      </div>
                    </div>

                    <div
                      className="
                        min-w-0 w-full space-y-4
                        text-center text-sm leading-relaxed text-slate-800
                        sm:space-y-5 sm:text-left sm:text-base
                      "
                    >
                      <div>
                        <p className="font-semibold">
                          Complète chaque phrase avec le bon
                          verbe.
                        </p>

                        <p className="mt-1">
                          Observe bien le sujet avant de choisir
                          la forme du verbe.
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold">
                          Les verbes proposés sont écrits sous le
                          texte.
                        </p>

                        <p className="mt-1">
                          Pense à les conjuguer correctement au
                          présent.
                        </p>
                      </div>
                    </div>
                  </div>
                }
                onStart={() => setStarted(true)}
                started={started}
              />

              {started && (
                <div
                  id="exercise-2-content"
                  className="scroll-mt-10"
                >
                  <VerbSelectionExercise
                    onComplete={(sessionResult) => {
                      onComplete(sessionResult);
                      handleComplete(sessionResult);
                    }}
                  />
                </div>
              )}
            </ExerciseSection>
          </div>
        );
      }}
    </ExerciseContainer>
  );
}