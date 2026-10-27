
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
      <div
        aria-hidden="true"
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[#F4B323]"
      />

      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#F2A900] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
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
              level="elementary-1"
              exerciseNumber={2}
              category="PHONIE / GRAPHIE"
              title="QU’EST-CE QU’ILS FONT ?"
              description="Associe chaque image à ce qu’elle représente en choisissant parmi les trois phrases proposées."
              dialogueImageSrc="/images/PHONIEGRAPHIEJEAN.PNG"
              dialogueImageAlt="Les loisirs des Français"
              audioSrc="/audios/courses/beginner/bruno-galopin/bruno-galopin.mp3"
              audioTitle="Les loisirs des Français"
              audioHint="Écoute le dialogue avant de commencer."
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
