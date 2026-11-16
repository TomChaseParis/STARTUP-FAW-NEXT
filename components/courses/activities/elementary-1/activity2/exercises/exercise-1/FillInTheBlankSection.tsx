
"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import ListenAndType from "@/components/courses/layout/ListenAndType";
import FloatingAudioPlayer from "@/components/courses/layout/FloatingAudioPlayer";

import FillInTheBlankExercise from "./FillInTheBlankExercise";

type ExerciseTransitionProps = {
  number: number;
};

function ExerciseTransition({ number }: ExerciseTransitionProps) {
  return (
    <div
      className="relative z-10 flex h-[90px] items-center justify-center"
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

export default function FillInTheBlankSection() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timeoutId: number | undefined;
    let animationFrameId: number | undefined;

    const scrollToExercise = () => {
      const element = document.getElementById(
        "exercise-1-transition",
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

      // Aligne le début du trait avec le haut de la fenêtre.
      const targetPosition = Math.max(
        0,
        element.getBoundingClientRect().top +
          window.scrollY -
          100,
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
                level="elementary-1"
                imageSrc="/images/loisirstest1.png"
                imageAlt="Les loisirs des Français"
                activityTitle="Les loisirs des Français"
                category="PHONIE / GRAPHIE"
                title="Les loisirs des Français"
                description="Écoute le texte et conjugue tous les verbes à la troisième personne du pluriel."
                steps={[
                  {
                    title: "Écoute",
                    description:
                      "Écoute attentivement le texte pour repérer les verbes.",
                    icon: "sound",
                  },
                  {
                    title: "Écris",
                    description:
                      "Complète les phrases en conjuguant les verbes à la troisième personne du pluriel.",
                    icon: "keyboard",
                  },
                ]}
                pointAttention={{
                  imageSrc:
                    "/images/courses/beginner/activities/brunogalopin/point.png",
                  imageAlt:
                    "Point d'attention sur la terminaison des verbes au pluriel",
                  title: (
                    <div className="space-y-1.5 text-sm leading-relaxed">
                      <p className="font-bold text-slate-800">
                        La marque du pluriel (-ent) ne s&apos;entend pas à l&apos;oral !
                      </p>

                      <p className="text-slate-600">
                        Exemple : Les jeunes ______ (passer) beaucoup de temps sur internet.
                      </p>

                      <p className="flex items-start gap-2 font-medium text-slate-800">
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-[11px] font-bold text-white"
                          aria-hidden="true"
                        >
                          →
                        </span>

                        <span>
                          Les jeunes passent beaucoup de temps sur internet.
                        </span>
                      </p>
                    </div>
                  ),
                }}
                onStart={() => setStarted(true)}
                started={started}
              />
            </ExerciseSection>
          </div>

          {/* TRANSITION ET EXERCICE 1 */}
          {started && (
            <>
              <div id="exercise-1-transition">
                <ExerciseTransition number={1} />
              </div>

              <div
                id="exercise-1-content"
                className="w-full min-w-0 max-w-full scroll-mt-6"
              >
                <FillInTheBlankExercise
                  onComplete={onComplete}
                />
              </div>
            </>
          )}

          {/* LECTEUR AUDIO FLOTTANT */}
          {started && (
            <FloatingAudioPlayer
              audioSrc="/audios/courses/elementary/activities/loisirs-des-francais.mp3"
              imageSrc="/images/courses/elementary/lesloisirsdesfrancais/loisirs-fr.png"
              imageAlt="Les loisirs des Français"
              title="Les loisirs des Français"
              hint="Réécoute le dialogue pour compléter le texte."
            />
          )}
        </div>
      )}
    </ExerciseContainer>
  );
}
