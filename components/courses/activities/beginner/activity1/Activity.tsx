
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import ActivityBlock from "@/components/courses/layout/ActivityBlock";
import ListenSpeakInstruction from "@/components/courses/layout/ListenSpeakInstruction";

import { bigFourActivity } from "@/data/courses/activities/bigFour";

import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";

import VerbListeningSection from "./exercises/exercice-1/VerbListeningSection";
import VerbSelectionSection from "./exercises/VerbSelectionSection";
import CharacterPresentationSection from "./exercises/exercice-3/CharacterPresentationSection";

const ACTIVITY_TITLE = "ZE BIG FOUR : Être – Avoir – Faire – Aller";

type ExerciseTransitionProps = {
  number: number;
};

function ExerciseTransition({ number }: ExerciseTransitionProps) {
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

export default function Activity() {
  const router = useRouter();

  const instructionRef = useRef<HTMLDivElement>(null);
  const exercise1Ref = useRef<HTMLDivElement>(null);
  const exercise2Ref = useRef<HTMLDivElement>(null);
  const exercise3Ref = useRef<HTMLDivElement>(null);

  const scrollTimeoutRef = useRef<number | null>(null);
  const scrollAnimationRef = useRef<number | null>(null);

  const [started, setStarted] = useState(false);
  const [showExercise1, setShowExercise1] = useState(true);
  const [showExercise1Content, setShowExercise1Content] = useState(false);
  const [showExercise1Results, setShowExercise1Results] = useState(false);
  const [showExercise2, setShowExercise2] = useState(false);
  const [showExercise3, setShowExercise3] = useState(false);
  const [exerciseWidth, setExerciseWidth] = useState<number | null>(null);

  const cancelPendingScroll = () => {
    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }

    if (scrollAnimationRef.current !== null) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
  };

  const scrollToElement = (
    element: HTMLElement | null,
    offset = 0,
  ) => {
    if (!element) return;

    cancelPendingScroll();

    scrollTimeoutRef.current = window.setTimeout(() => {
      if (!element.isConnected) return;

      const startY = window.scrollY;
      const targetY = Math.max(
        0,
        element.getBoundingClientRect().top + window.scrollY - offset,
      );

      const distance = targetY - startY;

      if (Math.abs(distance) < 2) return;

      const duration = 1000;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        if (!element.isConnected) {
          scrollAnimationRef.current = null;
          return;
        }

        const progress = Math.min(
          (currentTime - startTime) / duration,
          1,
        );

        const easedProgress = progress * progress * (3 - 2 * progress);

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
          scrollAnimationRef.current =
            requestAnimationFrame(animateScroll);
        } else {
          scrollAnimationRef.current = null;
        }
      };

      scrollAnimationRef.current =
        requestAnimationFrame(animateScroll);
    }, 150);
  };

  useEffect(() => {
    if (!started || showExercise1Content) return;

    const element = instructionRef.current;
    if (!element) return;

    const updateWidth = () => {
      const instruction = element.querySelector("section");

      if (instruction) {
        setExerciseWidth(instruction.getBoundingClientRect().width);
      }
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    const instruction = element.querySelector("section");
    if (instruction) observer.observe(instruction);

    return () => observer.disconnect();
  }, [started, showExercise1Content]);

  useEffect(() => {
    return () => {
      cancelPendingScroll();
    };
  }, []);

  const handleStartActivity = () => {
    cancelPendingScroll();

    setStarted(true);

    // Restaurer le parcours normal : commencer par l'exercice 1.
    setShowExercise1(true);
    setShowExercise1Content(false);
    setShowExercise1Results(false);
    setShowExercise2(false);
    setShowExercise3(false);
    setExerciseWidth(null);

    // Attendre que la consigne de l'exercice 1 soit montée avant de défiler.
    window.setTimeout(() => {
      requestAnimationFrame(() => {
        scrollToElement(instructionRef.current, 0);
      });
    }, 200);
  };

  const handleStartExercise1 = () => {
    const instruction =
      instructionRef.current?.querySelector("section");

    if (instruction) {
      setExerciseWidth(instruction.getBoundingClientRect().width);
    }

    setShowExercise1Content(true);

    window.setTimeout(() => {
      scrollToElement(exercise1Ref.current, 0);
    }, 200);
  };

  // Les résultats sont affichés : masquer uniquement la consigne.
  const handleExercise1Results = () => {
    setShowExercise1(false);
    setShowExercise1Results(true);
  };

  // Passage à l'exercice 2 : masquer complètement le contenu et les résultats
  // de l'exercice 1 pour qu'ils ne restent pas visibles sous le nouvel exercice.
  const handleExercise1Complete = () => {
    cancelPendingScroll();

    setShowExercise1Results(false);
    setShowExercise1Content(false);
    setShowExercise1(false);
    setShowExercise2(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToElement(exercise2Ref.current, 0);
      });
    });
  };

  // Fin de l'exercice 2 : masquer ses résultats et afficher l'exercice 3.
  const handleExercise2Complete = () => {
    cancelPendingScroll();

    setShowExercise2(false);
    setShowExercise3(true);

    // Même mécanisme de scroll que pour l'exercice 2,
    // mais en ciblant directement la consigne de l'exercice 3.
    window.setTimeout(() => {
      requestAnimationFrame(() => {
        const instruction = exercise3Ref.current?.querySelector<HTMLElement>(
          "#character-presentation-instruction",
        );

        if (instruction) {
          scrollToElement(instruction, 0);
        }
      });
    }, 400);
  };

  const handleFinishActivity = () => {
    router.push("/courses/beginner/modules/present-tense");
  };

  return (
    <ActivityNavigationProvider totalExercises={3}>
      <ActivityLayout activity={bigFourActivity}>
        {/* EN-TÊTE PERMANENT */}
        <div className="mx-auto w-full min-w-0 max-w-full">
          <ActivityBlock
            contentType="activity"
            level="beginner"
            title={ACTIVITY_TITLE}
            description="Regarde la vidéo puis fais les exercices."
            {...(!started && {
              videoSrc:
                "/videos/courses/beginner/activities/activity1/presentation.mp4",
              poster:
                "/images/courses/beginner/activities/activity1/postermarie.png",
            })}
            info={{
              objectifs: [
                "Conjuguer des verbes de base pour faire des phrases simples",
              ],
              competences: [
                "Compréhension écrite",
                "Transformation grammaticale",
                "Phonie / graphie",
                "Prononciation",
              ],
              prerequis: [
                "Les verbes « être », « avoir », « aller » et « faire » au présent",
                "Les pronoms sujets : « Je », « Tu », « Il », « Elle », « On », « Nous », « Vous », « Ils » et « Elles »",
              ],
              duree: "40 minutes",
            }}
          />
        </div>

        {/* BOUTON DE DÉMARRAGE */}
        <AnimatePresence initial={false} mode="wait">
          {!started && (
            <motion.div
              key="activity-introduction"
              initial={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: "-35%",
                transition: {
                  duration: 0.35,
                  ease: [0.4, 0, 1, 1],
                },
              }}
              className="w-full min-w-0"
            >
              <div className="container flex justify-center px-4 py-8">
                <button
                  type="button"
                  onClick={handleStartActivity}
                  className="rounded-xl bg-[#E09F00] px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#C98D00]"
                >
                  Commencer l&apos;activité
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PARCOURS DES EXERCICES */}
        <AnimatePresence initial={false}>
          {started && (
            <motion.div
              key="activity-exercises"
              initial={{ opacity: 0, x: "3%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 1, 1],
              }}
              className="mx-auto w-full min-w-0 max-w-full overflow-x-clip"
            >
              {/* CONSIGNE DE L'EXERCICE 1 */}
              <AnimatePresence initial={false}>
                {showExercise1 && (
                  <motion.div
                    key="exercise-1-instruction"
                    ref={instructionRef}
                    className="mx-auto w-full min-w-0 max-w-full scroll-mt-4"
                    exit={{
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <ListenSpeakInstruction
                      activityTitle={ACTIVITY_TITLE}
                      onStart={handleStartExercise1}
                      imageSrc="/images/listenspeak.png"
                      imageAlt="Illustration de l'exercice d'écoute et de prononciation"
                      title="Écoute et prononce"
                      description="Écoute la phrase prononcée par le professeur, puis répète-la à voix haute."
                      example="Écoute attentivement, puis prononce la phrase."
                      started={showExercise1Content}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CONTENU ET RÉSULTATS DE L'EXERCICE 1 */}
              <AnimatePresence initial={false}>
                {showExercise1Content && (
                  <motion.div
                    key="exercise-1-content"
                    className="mx-auto w-full min-w-0 max-w-full"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 1, 1],
                    }}
                  >
{!showExercise1Results && <ExerciseTransition number={1} />}
                    <motion.section
                      ref={exercise1Ref}
                      id="activity-1-exercise-1"
                      className="mx-auto min-w-0 space-y-6 scroll-mt-4 sm:space-y-8"
                      style={{
                        width: exerciseWidth
                          ? `${exerciseWidth}px`
                          : "100%",
                        maxWidth: "100%",
                      }}
                    >
                      <VerbListeningSection
                        autoStart
                        onResults={handleExercise1Results}
                        onNext={handleExercise1Complete}
                      />
                    </motion.section>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* EXERCICE 2 */}
              <AnimatePresence initial={false}>
                {showExercise2 && (
                  <motion.div
                    ref={exercise2Ref}
                    key="exercise-2"
                    id="activity-1-exercise-2"
                    className="mx-auto w-full min-w-0 max-w-full scroll-mt-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 1, 1],
                    }}
                  >
                    <VerbSelectionSection onNext={handleExercise2Complete} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* EXERCICE 3 */}
              <AnimatePresence initial={false}>
                {showExercise3 && (
                  <motion.div
                    ref={exercise3Ref}
                    key="exercise-3"
                    id="activity-1-exercise-3"
                    className="mx-auto w-full min-w-0 max-w-full scroll-mt-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 1, 1],
                    }}
                  >
                    <CharacterPresentationSection
                      onFinishActivity={handleFinishActivity}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </ActivityLayout>
    </ActivityNavigationProvider>
  );
}
