
"use client";

import { useEffect, useRef, useState } from "react";

import VerbListeningExercise from "./VerbListeningExercise";
import VerbSpeakingExercise from "./VerbSpeakingExercise";

import BigFourFinalResults from "../../../zeBigFour/ZeBigFourFinalResults";

import etreSpeakingData from "../../data/verbSpeaking/etre";

/*
import avoirSpeakingData from "../../data/verbSpeaking/avoir";
import faireSpeakingData from "../../data/verbSpeaking/faire";
import allerSpeakingData from "../../data/verbSpeaking/aller";
*/

type VerbKey = "etre";

/*
type VerbKey = "etre" | "avoir" | "faire" | "aller";
*/

type VerbScore = {
  score: number;
  totalQuestions: number;
};

type VerbListeningSectionProps = {
  onNext?: () => void;
  onResults?: () => void;
  autoStart?: boolean;
};

type ExerciseTransitionProps = {
  number: number;
};

function ExerciseTransition({ number }: ExerciseTransitionProps) {
  return (
    <div
      className="relative z-10 flex h-[120px] items-center justify-center"
      aria-label={`Étape ${number}`}
    >
      {/* Ligne verticale pointillée */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-[#F4B323]"
      />

      {/* Numéro centré sur la ligne */}
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#F2A900] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
        {number}
      </span>
    </div>
  );
}

// Seul le verbe ÊTRE est actif.
const verbOrder: VerbKey[] = ["etre"];

/*
const verbOrder: VerbKey[] = ["etre", "avoir", "faire", "aller"];
*/

const verbConfig: Record<
  VerbKey,
  {
    title: string;
    forms: string[];
    timings: number[];
    audioSrc: string;
    speakingData: typeof etreSpeakingData;
  }
> = {
  etre: {
    title: "ÊTRE",
    forms: [
      "Je suis",
      "Tu es",
      "Il / Elle / On est",
      "Nous sommes",
      "Vous êtes",
      "Ils / Elles sont",
    ],
    timings: [0, 1.1, 2.4, 4.8, 6.5, 8.1],
    audioSrc: "/audios/courses/beginner/activity1/exercice1/etreverbe.mp3",
    speakingData: etreSpeakingData,
  },

  /*
  avoir: {
    title: "AVOIR",
    forms: [
      "J'ai",
      "Tu as",
      "Il / Elle / On a",
      "Nous avons",
      "Vous avez",
      "Ils / Elles ont",
    ],
    timings: [0, 1.1, 2.4, 4.8, 6.5, 8.1],
    audioSrc: "/audios/courses/beginner/activity1/exercice1/avoirverbe.mp3",
    speakingData: avoirSpeakingData,
  },

  faire: {
    title: "FAIRE",
    forms: [
      "Je fais",
      "Tu fais",
      "Il / Elle / On fait",
      "Nous faisons",
      "Vous faites",
      "Ils / Elles font",
    ],
    timings: [0, 1.1, 2.4, 4.8, 6.5, 8.1],
    audioSrc: "/audios/courses/beginner/activity1/exercice1/faireverbe.mp3",
    speakingData: faireSpeakingData,
  },

  aller: {
    title: "ALLER",
    forms: [
      "Je vais",
      "Tu vas",
      "Il / Elle / On va",
      "Nous allons",
      "Vous allez",
      "Ils / Elles vont",
    ],
    timings: [0, 1.1, 2.4, 4.8, 6.5, 8.1],
    audioSrc: "/audios/courses/beginner/activity1/exercice1/allerverbe.mp3",
    speakingData: allerSpeakingData,
  },
  */
};

export default function VerbListeningSection({
  onNext,
  onResults,
  autoStart = false,
}: VerbListeningSectionProps) {
  const [exerciseStarted, setExerciseStarted] = useState(autoStart);
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);

  const [hasListenedToCurrentVerb, setHasListenedToCurrentVerb] =
    useState(false);

  const [verbScores, setVerbScores] = useState<
    Partial<Record<VerbKey, VerbScore>>
  >({});

  const [showFinalResults, setShowFinalResults] = useState(false);

  // Référence vers le bloc de prononciation.
  const speakingExerciseRef = useRef<HTMLDivElement>(null);

  // Scroll lent vers le bloc de prononciation après l'écoute.
  useEffect(() => {
    if (!hasListenedToCurrentVerb) return;

    let animationFrameId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      const element = speakingExerciseRef.current;

      if (!element) return;

      const startPosition = window.scrollY;
      const targetPosition =
        element.getBoundingClientRect().top + window.scrollY - 24;

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

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animateScroll);
        }
      };

      animationFrameId = requestAnimationFrame(animateScroll);
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);

      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasListenedToCurrentVerb]);

  const currentVerb = verbOrder[currentVerbIndex];
  const currentVerbConfig = verbConfig[currentVerb];
  const isLastVerb = currentVerbIndex === verbOrder.length - 1;

  const handleFirstListenComplete = () => {
    setHasListenedToCurrentVerb(true);
  };

  const handleVerbComplete = (result: VerbScore) => {
    setVerbScores((previous) => ({
      ...previous,
      [currentVerb]: result,
    }));

    setShowFinalResults(true);
  };

  const handleNextVerb = () => {
    if (isLastVerb) return;

    setHasListenedToCurrentVerb(false);
    setCurrentVerbIndex((previous) => previous + 1);
  };

  const handleActivityComplete = (result: VerbScore) => {
    setVerbScores((previous) => ({
      ...previous,
      [currentVerb]: result,
    }));

    setShowFinalResults(true);

    // Informe Activity.tsx que les résultats sont affichés.
    onResults?.();
  };

  const handleRestartActivity = () => {
    setExerciseStarted(true);
    setCurrentVerbIndex(0);
    setHasListenedToCurrentVerb(false);
    setVerbScores({});
    setShowFinalResults(false);
  };

  
if (showFinalResults) {
  return (
    <div className="mx-auto w-full min-w-0 max-w-full ">
      <BigFourFinalResults
        scores={verbScores}
        onRestart={handleRestartActivity}
        onNext={() => {
          onNext?.();
        }}
      />
    </div>
  );
}


  return (
    <div
      id="verb-exercise-content"
      className="mx-auto w-[100%] min-w-0 max-w-full"
    >
      {exerciseStarted && (
        <>
          {/* ÉCOUTE DU VERBE */}
          <div className="w-full min-w-0 max-w-full">
            <VerbListeningExercise
              key={currentVerb}
              category={{
                title: currentVerbConfig.title,
                forms: currentVerbConfig.forms,
                timings: currentVerbConfig.timings,
                audioSrc: currentVerbConfig.audioSrc,
              }}
              onFirstListenComplete={handleFirstListenComplete}
            />
          </div>

          {/* TRANSITION VERS LA PRONONCIATION */}
          {hasListenedToCurrentVerb && (
            <>
              <ExerciseTransition number={2} />

              {/* PRONONCIATION : BLOC SÉPARÉ */}
              <div
                ref={speakingExerciseRef}
                id="verb-speaking-exercise"
                className="w-full min-w-0 max-w-full scroll-mt-6"
              >
                <div className="w-full min-w-0 max-w-full">
                  <VerbSpeakingExercise
                    key={currentVerb}
                    data={currentVerbConfig.speakingData}
                    verbTitle={currentVerbConfig.title}
                    onComplete={handleActivityComplete}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
