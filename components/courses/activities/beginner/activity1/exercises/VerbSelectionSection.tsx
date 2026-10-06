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
      const element = document.getElementById("exercise-2-content");

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timer = window.setTimeout(scrollToExercise, 100);
        }

        return;
      }

      const elementTop = element.getBoundingClientRect().top + window.scrollY;

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
          <div id="exercise-2-instruction" className="scroll-mt-10">
            <ExerciseSection>
              <InstructionBlock
                level="beginner"
                stampLabel="EXERCICE 2"
                typeLabel="CONJUGAISON"
                title="MES AMIS ONT UNE MAISON A LA CAMPAGNE."
                subtitle="Complète chaque phrase avec le verbe qui t’es proposé, conjugué à la bonne forme.
  Exemple : « La mère de Lucie est espagnole »"
                activityType="type"
                showPointAttention={true}
                pointAttention={{
                  imageSrc:
                    "/images/courses/beginner/activities/brunogalopin/point.png",

                  imageAlt: "Point d'attention",

                  title: (
                    <>Attention à bien conjuguer le verbe selon le sujet !</>
                  ),

                  example: (
                    <>
                      Pense à mettre l’accent grave « ê » dans la forme « Vous
                      êtes ».
                      <br />
                      Si tu n’as pas cet accent sur ton clavier, tu peux le
                      copier / coller à partir de la liste qui t’es fournie.
                    </>
                  ),
                }}
                onStart={() => setStarted(true)}
                startLabel="Commencer l'exercice"
                started={started}
              />

              {started && (
                <div id="exercise-2-content" className="scroll-mt-10">
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
