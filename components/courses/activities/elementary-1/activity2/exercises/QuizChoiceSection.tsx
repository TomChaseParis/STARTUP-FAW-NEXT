"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import QuizChoiceExercise from "./QuizChoiceExercise";

export default function QuizChoiceSection() {
  const [started, setStarted] = useState(false);

  const exerciseRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) {
      return;
    }

    let attempts = 0;
    let timer: number | undefined;

    const scrollToExercise = () => {
      const element =
        exerciseRef.current;

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

      const offset = 100;

      window.scrollTo({
        top: Math.max(
          0,
          elementTop - offset,
        ),
        behavior: "smooth",
      });
    };

    timer = window.setTimeout(
      scrollToExercise,
      100,
    );

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [started]);

  return (
    <ExerciseContainer exerciseId="exercise-2">
      {({ onComplete }) => (
        <ExerciseSection>
          <InstructionBlock
            level="elementary1"
            stampLabel="EXERCICE 2"
            title="Trouve la bonne réponse à chaque question"
            subtitle="Écoute les questions puis choisis la bonne réponse"
            activityType="listen"
            description={
              <div className="space-y-5 text-black">
                <p>
                  Écoute chaque question à l&apos;aide du bouton audio,
                  observe l&apos;image lorsqu&apos;il y en a une, puis
                  sélectionne la bonne réponse parmi les propositions.
                </p>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="mb-2 text-sm font-medium text-slate-600">
                    💡 Astuce :
                  </p>

                  <p className="text-base">
                    Écoute bien les informations et observe attentivement
                    les images avant de répondre.
                  </p>
                </div>
              </div>
            }
            onStart={() => {
              setStarted(true);
            }}
            started={started}
          />

          {started && (
            <div
              ref={exerciseRef}
              className="scroll-mt-10"
            >
              <QuizChoiceExercise
                onComplete={onComplete}
              />
            </div>
          )}
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}