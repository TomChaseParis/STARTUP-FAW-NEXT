"use client";

import { useEffect } from "react";

import ClickOrSpeak from "@/components/courses/layout/ClickOrSpeak";
import type {
  ExerciseSessionResult,
} from "@/components/courses/common/types/exerciseSessionTypes";

import QuizFranceExercise from "./QuizFranceExercise";

type QuizFranceSectionProps = {
  onStart: () => void;
  started: boolean;
  onCompleted: (result: ExerciseSessionResult) => void;
};

type ExerciseTransitionProps = {
  number: number;
};

function ExerciseTransition({
  number,
}: ExerciseTransitionProps) {
  return (
    <div
      className="relative z-10 flex h-[120px] items-center justify-center"
      aria-label={`Étape ${number}`}
    >
      {/* Ligne verticale pointillée continue */}
      <div
        aria-hidden="true"
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[#F4B323]"
      />

      {/* Numéro centré sur la ligne */}
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#F2A900] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
        {number}
      </span>
    </div>
  );
}

export default function QuizFranceSection({
  onStart,
  started,
  onCompleted,
}: QuizFranceSectionProps) {
  useEffect(() => {
    if (!started) return;

    const timeout = window.setTimeout(() => {
      document
        .getElementById("quiz-gogo-quiz-2")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [started]);

  return (
    <div className="w-full min-w-0">
      {/* ÉNONCÉ */}
      <div
        id="exercise-2-instruction"
        className="w-full min-w-0 scroll-mt-10"
      >
        <ClickOrSpeak
          exerciseNumber={2}
          level="elementary-1"
          category="OUTILS DE LA LANGUE"
          title="Quiz sur la France et les Français"
          description="Teste tes connaissances sur la France et les Français."
          example="Écoute Jean présenter la question et les réponses proposées. Choisis la bonne réponse ou utilise le microphone si tu préfères répondre à l'oral."
          instructionImageSrc="/images/quizpanache.png"
          onStart={onStart}
          started={started}
        />
      </div>

      {/* TRANSITION NUMÉROTÉE ET QUIZ */}
      {started && (
        <>
          <ExerciseTransition number={2} />

          <section
            id="quiz-gogo-quiz-2"
            className="w-full min-w-0 max-w-full scroll-mt-6"
          >
            <QuizFranceExercise
              onCompleted={onCompleted}
            />
          </section>
        </>
      )}
    </div>
  );
}