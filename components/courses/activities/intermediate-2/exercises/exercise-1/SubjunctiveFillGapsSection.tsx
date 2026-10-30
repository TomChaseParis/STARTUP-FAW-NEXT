
"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import ListenAndType from "@/components/courses/layout/ListenAndType";

import SubjunctiveFillGapsExercise from "./SubjunctiveFillGapsExercise";

type ExerciseTransitionProps = {
  number: number;
};

function ExerciseTransition({ number }: ExerciseTransitionProps) {
  return (
    <div
      className="relative z-10 flex h-[90px] items-center justify-center"
      aria-label={`Étape ${number}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l border-dashed border-[#F4B323]"
      />

      <span className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-white bg-[#F2A900] text-sm font-bold text-white shadow-[0_1px_4px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
        {number}
      </span>
    </div>
  );
}

export default function SubjunctiveFillGapsSection() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timeoutId: number | undefined;
    let animationFrameId: number | undefined;

    const scrollToExercise = () => {
      const element = document.getElementById(
        "subjunctive-exercise-transition"
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
  }, [started]);

  return (
    <ExerciseContainer exerciseId="exercise-1">
      {({ onComplete }) => (
        <div className="w-full min-w-0">
          {/* CONSIGNE */}
          <div
            id="exercise-1-instruction"
            className="w-full min-w-0 scroll-mt-10"
          >
            <ExerciseSection width="full">
              <ListenAndType
                level="intermediate-2"
                imageSrc="/images/courses/intermediate-2/activities/activity1/listenandtype.png"
                imageAlt="Alice et Martin se disputent devant un tableau."
                activityTitle="Il faut que je parte…"
                category="GRAMMAIRE"
                title="Alice et Martin"
                description="Alice et Martin se disputent une nouvelle fois à cause des enfants. Écoute et complète le dialogue avec les verbes au subjonctif que tu entends."
                example="Il faut que tu m’aides un peu plus avec les mômes."
                steps={[
                  {
                    title: "Écoute",
                    description:
                      "Écoute attentivement le dialogue entre Alice et Martin pour repérer les verbes au subjonctif présent.",
                    icon: "sound",
                  },
                  {
                    title: "Complète",
                    description:
                      "Écris les formes verbales que tu entends. Fais attention aux accents : é, è, ê, à, ô, ù, û et ï.",
                    icon: "keyboard",
                  },
                ]}
                onStart={() => setStarted(true)}
                started={started}
              />
            </ExerciseSection>
          </div>

          {/* TRANSITION ET EXERCICE */}
          {started && (
            <>
              <div id="subjunctive-exercise-transition">
                <ExerciseTransition number={1} />
              </div>

              <div
                id="subjunctive-exercise-content"
                className="w-full min-w-0 max-w-none scroll-mt-6"
              >
                <SubjunctiveFillGapsExercise
                  onComplete={onComplete}
                />
              </div>
            </>
          )}
        </div>
      )}
    </ExerciseContainer>
  );
}
