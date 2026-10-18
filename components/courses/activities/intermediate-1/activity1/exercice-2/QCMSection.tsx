"use client";

import { useEffect, useRef, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import QCMExercise from "./QCMExercice";

export default function QCMSection() {
  const [started, setStarted] = useState(false);
  const exerciseContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) return;

    const timeout = window.setTimeout(() => {
      exerciseContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 400);

    return () => window.clearTimeout(timeout);
  }, [started]);

  return (
    <ExerciseContainer exerciseId="exercise-2">
      {({ onComplete }) => (
        <ExerciseSection>
          <InstructionBlock
            level="intermediate1"
            stampLabel="EXERCICE 2"
            typeLabel="COMPRÉHENSION ORALE"
            title="Les vacances au bord de la mer"
            subtitle="Vérifie ta compréhension de la chanson."
            activityType="listen-click"
            audioSrc="/audios/courses/intermediate1/lesvacancesauborddemer.mp3"
            audioBadge="ÉCOUTE LA CHANSON"
            audioImage="/images/courses/intermediate1/activity1/header.jpg"
            description={
              <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <div className="flex flex-wrap items-center gap-2">
                  <span>Utilise le bouton</span>

                  <span
                    className="
                      inline-flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-full border border-slate-200
                      bg-white text-amber-500
                      shadow-[0_3px_10px_rgba(15,23,42,0.06)]
                    "
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5.5a.75.75 0 0 1 1.14-.64l9.25 6a.75.75 0 0 1 0 1.28l-9.25 6A.75.75 0 0 1 8 17.5v-12Z" />
                    </svg>
                  </span>

                  <span>
                    pour écouter le professeur présenter la question et les
                    réponses proposées.
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span>Appuie sur le bouton</span>

                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="
                      pointer-events-none relative
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-full bg-white text-amber-600
                      shadow-[0_6px_18px_rgba(15,23,42,0.10)]
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18v3m0 0h3m-3 0H9m3-7a4 4 0 004-4V7a4 4 0 10-8 0v3a4 4 0 004 4z"
                      />
                    </svg>
                  </button>

                  <span>
                    si tu préfères répondre à la question à l&apos;oral.
                  </span>
                </div>

                <p>
                  Pour aider l&apos;outil de reconnaissance vocale à bien
                  identifier ta réponse, pense à dire la lettre (A, B ou C)
                  qui correspond à ta réponse, suivie de la réponse en entier.
                  Exemple :{" "}
                  <span className="font-semibold text-slate-900">
                    {"« A : ingénieur »."}
                  </span>
                </p>
              </div>
            }
            onStart={() => setStarted(true)}
            started={started}
          />

          {started && (
            <div
              ref={exerciseContentRef}
              className="mt-8 scroll-mt-10"
            >
              <QCMExercise onComplete={onComplete} />
            </div>
          )}
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}