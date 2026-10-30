
"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import TypeInstruction from "@/components/courses/layout/TypeInstruction";

import ActivityResults from "@/components/courses/common/ActivityResults";
import FillGapsReport from "@/components/courses/common/result/FillGapsReport";

import VerbSelectionExercise from "./VerbSelectionExercise";

import { verbSelectionData } from "../data/verbSelectionData";

import { ActivityResult } from "@/core/activity/models/ActivityResult";
import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type VerbSelectionSectionProps = {
  onNext?: () => void;
};

function ExerciseTransition({ number }: { number: number }) {
  return (
    <div
      className="relative z-10 flex h-[120px] items-center justify-center"
      aria-label={`Étape ${number}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-[#F4B323]"
      />

      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#F2A900] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
        {number}
      </span>
    </div>
  );
}

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
    let animationFrame: number | undefined;

    const scrollToExercise = () => {
      const element = document.getElementById("exercise-2-content");

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timer = window.setTimeout(scrollToExercise, 100);
        }

        return;
      }

      const startY = window.scrollY;
      const targetY = Math.max(
        0,
        element.getBoundingClientRect().top + window.scrollY - 100,
      );

      const distance = targetY - startY;
      const duration = 1000;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const progress = Math.min(
          (currentTime - startTime) / duration,
          1,
        );

        const easedProgress = progress * progress * (3 - 2 * progress);

        window.scrollTo(
          0,
          startY + distance * easedProgress,
        );

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animateScroll);
        }
      };

      animationFrame = requestAnimationFrame(animateScroll);
    };

    timer = window.setTimeout(scrollToExercise, 200);

    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }

      if (animationFrame !== undefined) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [started, result]);


  const handleComplete = (sessionResult: ExerciseSessionResult) => {
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
      document.getElementById("activity-1-exercise-2")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <ExerciseContainer key={exerciseKey} exerciseId="exercise-2">
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
          <div className="w-full min-w-0">
            {/* ÉNONCÉ */}
            <div id="exercise-2-instruction" className="scroll-mt-10">
              <TypeInstruction
              level="beginner"
                imageSrc="/images/type.png"
                imageAlt="Souris utilisant un clavier pour un exercice écrit"
                category="CONJUGAISON"
                title="MES AMIS ONT UNE MAISON À LA CAMPAGNE."
                description="Complète chaque phrase avec le verbe proposé, conjugué à la bonne forme. Attention à bien conjuguer le verbe selon le sujet."
                example="La mère de Lucie est espagnole."
                steps={[
                  {
                    title: "Observe",
                    description:
                      "Lis la phrase attentivement et repère le sujet pour identifier la bonne conjugaison.",
                    icon: "keyboard",
                  },
                  {
                    title: "Écris",
                    description:
                      "Saisis la bonne forme du verbe en respectant la conjugaison et les accents.",
                    icon: "keyboard",
                  },
                ]}
                onStart={() => setStarted(true)}
                started={started}
              />
            </div>

            {/* FLÈCHE VERS L'EXERCICE */}
            {started && (
              <ExerciseTransition number={2} />
            )}

            {/* EXERCICE DE CONJUGAISON, SÉPARÉ DE L'ÉNONCÉ */}
            {started && (
              <div
                id="exercise-2-content"
                className="w-full min-w-0 scroll-mt-10"
              >
                <VerbSelectionExercise
                  onComplete={(sessionResult) => {
                    onComplete(sessionResult);
                    handleComplete(sessionResult);
                  }}
                />
              </div>
            )}
          </div>
        );
      }}
    </ExerciseContainer>
  );
}
