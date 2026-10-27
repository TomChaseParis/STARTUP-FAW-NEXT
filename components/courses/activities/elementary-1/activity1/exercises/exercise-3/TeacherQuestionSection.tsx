"use client";

import { useEffect, useRef, useState } from "react";

import ListenSpeakInstruction from "@/components/courses/layout/ListenSpeakInstruction";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

import TeacherQuestionExercise from "./TeacherQuestionExercise";

import { scrollToElementSmooth } from "@/utils/scrollToElementSmooth";

type TeacherQuestionSectionProps = {
  onStart: () => void;
  started: boolean;
  onCompleted: (result: ExerciseSessionResult) => void;
};

type InstructionBounds = {
  width: number;
  offsetLeft: number;
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

export default function TeacherQuestionSection({
  onStart,
  started,
  onCompleted,
}: TeacherQuestionSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [instructionBounds, setInstructionBounds] =
    useState<InstructionBounds | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const instructionCard =
      container.querySelector<HTMLElement>(
        'section[aria-labelledby="exercise-instruction-title"]',
      );

    if (!instructionCard) return;

    const updateBounds = () => {
      const containerRect =
        container.getBoundingClientRect();

      const instructionRect =
        instructionCard.getBoundingClientRect();

      setInstructionBounds({
        width: instructionRect.width,
        offsetLeft:
          instructionRect.left - containerRect.left,
      });
    };

    updateBounds();

    const observer = new ResizeObserver(updateBounds);

    observer.observe(instructionCard);
    observer.observe(container);

    window.addEventListener("resize", updateBounds);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateBounds);
    };
  }, []);

  useEffect(() => {
    if (!started) return;

    scrollToElementSmooth("quiz-gogo-quiz-3", {
      delay: 300,
      offset: 24,
      duration: 1100,
      maxAttempts: 20,
      retryDelay: 100,
    });
  }, [started]);

  return (
    <div
      ref={containerRef}
      className="w-full min-w-0"
    >
      {/* ENCADRÉ DE CONSIGNE */}
      <div
        id="exercise-3-instruction"
        className="w-full min-w-0 scroll-mt-10"
      >
        <ListenSpeakInstruction
          imageSrc="/images/listenandspeakjean.png"
          level="elementary-1"
          imageAlt="Illustration pour construire une question et la prononcer correctement"
          category="OUTILS DE LA LANGUE"
          title="Le professeur je-sais-tout"
          description="Observe l'illustration, trouve le mot interrogatif qui manque, puis pose la question complète à Jean à l'oral."
          example="Où habites-tu ? Pourquoi apprends-tu le français ?"
          steps={[
            {
              title: "Observe",
              description:
                "Observe l'illustration et aide-toi de la liste des mots interrogatifs proposés.",
              icon: "sound",
            },
            {
              title: "Construis ta question",
              description:
                "Trouve le mot interrogatif qui manque pour former une question correcte.",
              icon: "mic",
            },
          ]}
          onStart={onStart}
          started={started}
        />
      </div>

      {/* TRANSITION NUMÉROTÉE ET EXERCICE 3 */}
      {started && (
        <>
          <ExerciseTransition number={3} />

          <div
            id="quiz-gogo-quiz-3"
            className="min-w-0 max-w-full scroll-mt-6"
            style={{
              width: instructionBounds
                ? `${instructionBounds.width}px`
                : "100%",
              maxWidth: "100%",
              marginLeft: instructionBounds
                ? `${instructionBounds.offsetLeft}px`
                : undefined,
              boxSizing: "border-box",
            }}
          >
            <TeacherQuestionExercise
              onCompleted={onCompleted}
            />
          </div>
        </>
      )}
    </div>
  );
}