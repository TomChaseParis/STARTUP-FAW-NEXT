"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ListenSpeakInstruction from "@/components/courses/layout/ListenSpeakInstruction";

import ReportedSpeechExercise from "./ReportedSpeechExercise";

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
      {/* Ligne verticale pointillée */}
      <div
        aria-hidden="true"
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[#7C3AED]"
      />

      {/* Numéro centré sur la ligne */}
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#7C3AED] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(124,58,237,0.25)] ring-1 ring-[#C4B5FD]">
        {number}
      </span>
    </div>
  );
}

export default function ReportedSpeechSection() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timeoutId: number | undefined;
    let animationFrameId: number | undefined;

    const scrollToExercise = () => {
      const element = document.getElementById(
        "reported-speech-exercise-content",
      );

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

        const progress = Math.min(
          elapsed / duration,
          1,
        );

        const easedProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 -
              Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(
          0,
          startPosition + distance * easedProgress,
        );

        if (progress < 1) {
          animationFrameId =
            window.requestAnimationFrame(
              animateScroll,
            );
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
    <ExerciseContainer exerciseId="exercise-3">
      {({ onComplete }) => (
        <section
          id="reported-speech-section"
          className="w-full min-w-0"
        >
          {/* CONSIGNE */}
          <div
            id="reported-speech-instruction"
            className="w-full min-w-0 scroll-mt-10"
          >
            <ListenSpeakInstruction
              imageSrc="/images/courses/intermediate-2/activities/activity2/exercise-3/listenandspeak.png"
              imageAlt=""
              level="intermediate-2"
              activityTitle="3"
              category="TRANSFORMATION MORPHOSYNTAXIQUE"
              title="L’amour est dans le pré"
              description="Pauline passe son temps à crier sur Félix, et pour cause... Joue le rôle de Félix et réponds à Henri au discours rapporté en suivant l'exemple qui t'est montré."
              rappel={
                <>
                  <p className="mb-1">
                    Rappel des transformations syntaxiques lors du passage au discours indirect :
                  </p>

                  <ul className="ml-6 list-disc">
                    <li>impératif → préposition « de » + infinitif</li>
                    <li>est-ce que... ? → si</li>
                    <li>qu&apos;est-ce que... ? → ce que</li>
                    <li>qu&apos;est-ce qui... ? → ce qui</li>
                  </ul>

                  <p className="mb-1 mt-3">
                    Attention aux modifications des marqueurs de la personne :
                  </p>

                  <ul className="ml-6 list-disc">
                    <li>
                      « Appelle ma sœur ! » → elle m&apos;a demandé d&apos;appeler sa sœur.
                    </li>
                    <li>
                      « Où tu vas ? » → elle m&apos;a demandé où j&apos;allais.
                    </li>
                  </ul>
                </>
              }
              steps={[
                {
                  title: "Écoute",
                  description:
                    "Écoute attentivement Pauline et repère les phrases qu'elle prononce.",
                  icon: "sound",
                },
                {
                  title: "Réponds",
                  description:
                    "Appuie sur le bouton microphone avant de prononcer ta reformulation au discours indirect.",
                  icon: "mic",
                },
              ]}
              onStart={() => setStarted(true)}
              started={started}
            />
          </div>

          {/* EXERCICE : MÊME CONTAINER QUE LISTENSPEAKINSTRUCTION */}
          {started && (
            <div className="container">
              <ExerciseTransition number={3} />

              <div
                id="reported-speech-exercise-content"
                className="mx-auto w-full min-w-0 scroll-mt-6"
              >
                <ReportedSpeechExercise
                  onComplete={onComplete}
                />
              </div>
            </div>
          )}
        </section>
      )}
    </ExerciseContainer>
  );
}