
"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import ClickOrSpeak from "@/components/courses/layout/ClickOrSpeak";
import type { ExerciseInstructionProps } from "@/components/courses/layout/ExerciseInstruction";

type QCMSectionProps = Omit<
  ExerciseInstructionProps,
  | "imageSrc"
  | "imageAlt"
  | "category"
  | "title"
  | "description"
  | "example"
  | "steps"
  | "beforeStartContent"
  | "onStart"
  | "started"
> & {
  instructionImageSrc?: string;
  children?: ReactNode;
};

type ExerciseTransitionProps = {
  number: number;
};

function ExerciseTransition({ number }: ExerciseTransitionProps) {
  return (
    <div
      className="relative z-10 flex h-[90px] items-center justify-center"
      aria-label={`Étape ${number}`}
    >
      {/* Ligne verticale continue */}
      <div
        aria-hidden="true"
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l border-dashed border-[#F4B323]"
      />

      {/* Numéro de l'exercice */}
      <span className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-white bg-[#F2A900] text-sm font-bold text-white shadow-[0_1px_4px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
        {number}
      </span>
    </div>
  );
}

export default function QCMSection({
  instructionImageSrc,
  activityTitle,
  children,
}: QCMSectionProps) {
  const [exerciseStarted, setExerciseStarted] = useState(false);

  const handleStart = () => {
    setExerciseStarted(true);
  };

  useEffect(() => {
    if (!exerciseStarted) return;

    let attempts = 0;
    let timeoutId: number | undefined;
    let animationFrameId: number | undefined;

    const scrollToExercise = () => {
      const element = document.getElementById(
        "qcm-exercise-transition"
      );

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timeoutId = window.setTimeout(scrollToExercise, 100);
        }

        return;
      }

      const startPosition = window.scrollY;

      const targetPosition = Math.max(
        0,
        element.getBoundingClientRect().top + window.scrollY - 100
      );

      const distance = targetPosition - startPosition;
      const duration = 1100;
      let startTime: number | null = null;

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(
          0,
          startPosition + distance * easedProgress
        );

        if (progress < 1) {
          animationFrameId =
            window.requestAnimationFrame(animateScroll);
        }
      };

      animationFrameId =
        window.requestAnimationFrame(animateScroll);
    };

    timeoutId = window.setTimeout(scrollToExercise, 300);

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      if (animationFrameId !== undefined) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [exerciseStarted]);

  return (
    <ClickOrSpeak
      exerciseNumber={3}
      category="VERBALISATION"
      title="Il faut qu’ils fassent quoi ?"
      description="Pour chaque cas, donne le conseil le plus approprié au personnage qui se trouve dans une situation difficile à gérer..."
      example="Observe chaque situation et choisis le conseil qui convient le mieux."
      instructionImageSrc={instructionImageSrc}
      onStart={handleStart}
      started={exerciseStarted}
      activityTitle={activityTitle}
      level="intermediate-2"
    >
      {exerciseStarted && (
        <>
          {/* TRANSITION NUMÉROTÉE */}
          <div
            id="qcm-exercise-transition"
            className="-mt-8 w-full"
          >
            <ExerciseTransition number={3} />
          </div>

          {/* CONTENU DU QCM */}
          <div
            id="qcm-exercise-content"
            className="w-full min-w-0 scroll-mt-6"
          >
            {children}
          </div>
        </>
      )}
    </ClickOrSpeak>
  );
}
