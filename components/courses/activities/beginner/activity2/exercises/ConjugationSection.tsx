
"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ListenAndType from "@/components/courses/layout/ListenAndType";
import FloatingAudioPlayer from "@/components/courses/layout/FloatingAudioPlayer";

import ConjugationExercise from "./ConjugationExercise";

function ExerciseTransition({ number }: { number: number }) {
  return (
    <div
      className="relative z-10 flex h-[120px] items-center justify-center"
      aria-label={`Étape ${number}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-[#F4B323]"
      />

      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#F2A900] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
        {number}
      </span>
    </div>
  );
}

export default function ConjugationSection() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timer: number | undefined;
    let animationFrame: number | undefined;

    const scrollToExercise = () => {
      const element = document.getElementById("exercise-3-content");

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timer = window.setTimeout(scrollToExercise, 100);
        }

        return;
      }

      const startY = window.scrollY;
      const targetY = Math.max(
        0,
        element.getBoundingClientRect().top + window.scrollY - 100,
      );

      const distance = targetY - startY;
      const duration = 1000;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const progress = Math.min(
          (currentTime - startTime) / duration,
          1,
        );

        const easedProgress =
          progress * progress * (3 - 2 * progress);

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
          animationFrame =
            window.requestAnimationFrame(animateScroll);
        }
      };

      animationFrame =
        window.requestAnimationFrame(animateScroll);
    };

    timer = window.setTimeout(scrollToExercise, 200);

    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }

      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [started]);

  return (
    <ExerciseContainer exerciseId="exercise-3">
      {({ onComplete }) => (
        <div className="w-full min-w-0">
          {/* ÉNONCÉ */}
          <div
            id="exercise-3-instruction"
            className="scroll-mt-10"
          >
            <ListenAndType
              level="beginner"
              imageSrc="/images/LISTENANDTYPE-PHONIEGRAPHIE.png"
              imageAlt="Souris écoutant un dialogue et écrivant ses réponses"
              category="PHONIE / GRAPHIE"
              title="Conjugaison"
              description='Réécoute une dernière fois le dialogue et complète les phrases avec les bonnes formes des verbes "être" et "avoir" au présent de l’indicatif.'
              example="Écris tes réponses à l’aide du clavier de ton ordinateur ou de ton téléphone."
              steps={[
                {
                  title: "Écoute",
                  description:
                    "Réécoute le dialogue pour retrouver les formes des verbes.",
                  icon: "sound",
                },
                {
                  title: "Écris",
                  description:
                    "Saisis les bonnes formes de être et avoir en respectant les accents.",
                  icon: "keyboard",
                },
              ]}
              onStart={() => setStarted(true)}
              started={started}
            />
          </div>

          {/* TRANSITION VERS L'EXERCICE */}
          {started && <ExerciseTransition number={3} />}

          {/* EXERCICE DE CONJUGAISON */}
          {started && (
            <div
              id="exercise-3-content"
              className="w-full min-w-0 scroll-mt-10"
            >
              <ConjugationExercise onComplete={onComplete} />
            </div>
          )}

          {/* LECTEUR AUDIO FLOTTANT */}
          {started && (
            <FloatingAudioPlayer
              audioSrc="/audios/courses/beginner/activity2/audio-matrimoniale.mp3"
              imageSrc="/images/courses/audioBlock/beginner/am.png"
              imageAlt="Illustration du dialogue à écouter"
              title="Dialogue"
              hint="Réécoute le dialogue pour retrouver les formes des verbes."
            />
          )}
        </div>
      )}
    </ExerciseContainer>
  );
}
