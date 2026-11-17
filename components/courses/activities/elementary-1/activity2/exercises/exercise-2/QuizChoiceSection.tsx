
"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import ClickOrSpeak from "@/components/courses/layout/ClickOrSpeak";

import QuizChoiceExercise from "./QuizChoiceExercise";

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

export default function QuizChoiceSection() {
  const [started, setStarted] = useState(false);

  const exerciseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timeoutId: number | undefined;
    let animationFrameId: number | undefined;

    const scrollToExercise = () => {
      const element = exerciseRef.current;

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timeoutId = window.setTimeout(
            scrollToExercise,
            100,
          );
        }

        return;
      }

      const startPosition = window.scrollY;

      const targetPosition = Math.max(
        0,
        element.getBoundingClientRect().top +
          window.scrollY -
          24,
      );

      const distance = targetPosition - startPosition;
      const duration = 1100;

      let startTime: number | null = null;

      const animateScroll = (currentTime: number) => {
        if (startTime === null) {
          startTime = currentTime;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(
          0,
          startPosition + distance * easedProgress,
        );

        if (progress < 1) {
          animationFrameId =
            window.requestAnimationFrame(animateScroll);
        }
      };

      animationFrameId =
        window.requestAnimationFrame(animateScroll);
    };

    timeoutId = window.setTimeout(
      scrollToExercise,
      300,
    );

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
    <ExerciseContainer exerciseId="exercise-2">
      {({ onComplete }) => (
        <div className="w-full min-w-0">
          {/* CONSIGNE */}
          <ExerciseSection width="full">
            <ClickOrSpeak
            cefrLevel="A2.1"
              level="elementary-1"
              instructionImageSrc="/images/loisirstest2.png"
              exerciseNumber={2}
              category="VERBALISATION"
              title="QU’EST-CE QU’ILS FONT ?"
              description="Associe chaque image à ce qu’elle représente en choisissant parmi les trois phrases proposées."
              example=""
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
              pointAttention={{
                imageSrc:
                  "/images/courses/beginner/activities/brunogalopin/point.png",
                imageAlt:
                  "Point d'attention sur la prononciation et les verbes au pluriel",
                title: (
                  <div className="space-y-2">
                    <p className="font-semibold">
                      Attention (1) : si vous utilisez le micro pour répondre à l&apos;oral, vous devez dire toute la phrase.
                    </p>

                    <p>
                      Exemple : « Ils boivent du thé. »
                    </p>

                    <p className="font-semibold">
                      Attention (2) : le -ent ne se prononce pas à la fin des verbes à la 3ème personne du pluriel.
                    </p>
                  </div>
                ),
              }}
              onStart={() => setStarted(true)}
              started={started}
            />
          </ExerciseSection>

          {/* TRANSITION ET EXERCICE 2 */}
          {started && (
            <>
              <ExerciseTransition number={2} />

              <div
                ref={exerciseRef}
                className="w-full min-w-0 scroll-mt-10"
              >
                <QuizChoiceExercise
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
