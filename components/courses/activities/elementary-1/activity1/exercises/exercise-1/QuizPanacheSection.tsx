"use client";

import { useEffect } from "react";

import ClickOrSpeak from "@/components/courses/layout/ClickOrSpeak";
import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

import QuizPanacheExercice from "./QuizPanacheExercise";

type QuizPanacheSectionProps = {
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
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[#57CC99]"
      />

      {/* Numéro centré sur la ligne */}
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#57CC99] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(87,204,153,0.25)] ring-1 ring-[#A8E6CA]">
        {number}
      </span>
    </div>
  );
}

export default function QuizPanacheSection({
  onStart,
  started,
  onCompleted,
}: QuizPanacheSectionProps) {
  useEffect(() => {
    if (!started) return;

    const timeout = window.setTimeout(() => {
      document
        .getElementById("quiz-gogo-quiz-1")
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
        id="exercise-1-instruction"
        className="w-full min-w-0 scroll-mt-10"
      >
     <ClickOrSpeak
       cefrLevel="A1.2"
  exerciseNumber={1}
  category="OUTILS DE LA LANGUE"
  title="Quiz panaché"
  description="Teste tes connaissances en choisissant la bonne réponse pour chaque question."
  example=""
  instructionImageSrc="/images/loisirsexo1.png"
  level="elementary-1"
  onStart={onStart}
  started={started}
  steps={[
    {
      title: "Lis",
      description:
        "Lis ou écoute attentivement chaque question et les réponses proposées.",
      icon: "sound",
    },
    {
      title: "Choisis",
      description:
        "Choisis ta réponse ou utilise le microphone pour répondre à l’oral.",
      icon: "mic",
    },
  ]}
/>
      </div>

      {/* TRANSITION NUMÉROTÉE ET QUIZ */}
      {started && (
        <>
          <ExerciseTransition number={1} />

          <section
            id="quiz-gogo-quiz-1"
            className="w-full min-w-0 max-w-full scroll-mt-6"
          >
            <QuizPanacheExercice
              onCompleted={onCompleted}
            />
          </section>
        </>
      )}
    </div>
  );
}