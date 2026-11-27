
"use client";

import {
  useState,
  useCallback,
  useEffect,
} from "react";

import { AnimatePresence, motion } from "framer-motion";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/ActivityBlock";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";

import ActivityFlow from "@/core/navigation/ActivityFlow";
import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";

import { elementary2Activity2 } from "@/data/courses/activities/elementary-2/activity2/activity2";

import ConjugaisonSection from "./exercise-1/ConjugaisonSection";
import MemorySection from "./exercise-2/MemorySection";
import ConjugaisonSection2 from "./exercise-3/ConjugaisonSection2";
import PhonieGraphieSection from "./exercise-4/PhonieGraphieSection";
import ListenAndPronounceSection from "./exercise-5/ListenAndPronounceSection";

export default function Activity() {
  const [activityStarted, setActivityStarted] = useState(false);

  /* ========================================================= */
  /* DÉMARRAGE DE L'ACTIVITÉ                                   */
  /* ========================================================= */

  const handleStart = useCallback(() => {
    setActivityStarted(true);
  }, []);

  /* ========================================================= */
  /* SCROLL VERS LE PREMIER EXERCICE                           */
  /* ========================================================= */

  useEffect(() => {
    if (!activityStarted) return;

    let attempts = 0;
    let timeoutId: number | undefined;
    let animationFrameId: number | undefined;

    const scrollToFirstExercise = () => {
      const element = document.getElementById("first-exercise");

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timeoutId = window.setTimeout(
            scrollToFirstExercise,
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
      const duration = 1400;

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
      scrollToFirstExercise,
      400,
    );

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      if (animationFrameId !== undefined) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activityStarted]);

  /* ========================================================= */
  /* RENDU                                                     */
  /* ========================================================= */

  return (
    <ActivityLayout activity={elementary2Activity2}>
      {/* PRÉSENTATION DE L'ACTIVITÉ */}

      <LessonBlock
        contentType="activity"
        cefrLevel="A2.2"
        level="elementary-2"
        title="La famille déménage"
        description="Découvrez la journée quotidienne de Clara. Travail sur les heures, les verbes pronominaux et les transformations grammaticales."
        videoSrc="/videos/courses/elementary-2/activity2/presentation.mp4"
        poster="/images/courses/elementary2/activity2/posterirene.png"
        info={{
          objectifs: ["Parler d’un déménagement"],
          competences: [
            "Compréhension orale",
            "Réécriture guidée / transformation grammaticale",
            "Phonie / graphie",
            "Phonétique",
            "Expression orale et prononciation",
          ],
          prerequis: [
            "Le vocabulaire du logement",
            "Verbes au présent, au passé composé et au futur simple",
          ],
          duree: "35 minutes",
        }}
      />

      {/* BOUTON DE DÉMARRAGE */}

      {!activityStarted && (
        <div className="container flex justify-center py-8">
          <button
            type="button"
            onClick={handleStart}
            className="
              rounded-xl
              border-2
              border-[rgb(38,69,34)]
              bg-[rgb(49,87,44)]
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[rgb(38,69,34)]
            "
          >
            Commencer l&apos;activité
          </button>
        </div>
      )}

      {/* AFFICHAGE DES CINQ EXERCICES */}

      <AnimatePresence mode="wait">
        {activityStarted && (
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <ActivityNavigationProvider totalExercises={5}>
              <ActivityFlow
                teacher="elementary-2"
                finishHref="/courses/elementary-2"
                detailedReportRenderer={() => null}
              >
                {/* EXERCICE 1 : CONJUGAISON */}

                <div id="first-exercise">
                  <ConjugaisonSection />
                </div>

                {/* EXERCICE 2 : MEMORY */}

                <ExerciseSection width="full">
                  <MemorySection />
                </ExerciseSection>

                {/* EXERCICE 3 : CONJUGAISON ET TRANSFORMATION */}

                <ExerciseSection width="full">
                  <ConjugaisonSection2 />
                </ExerciseSection>

                {/* EXERCICE 4 : PHONIE-GRAPHIE */}

                <ExerciseSection width="full">
                  <PhonieGraphieSection />
                </ExerciseSection>

                {/* EXERCICE 5 : LISTEN & PRONOUNCE */}

                <ExerciseSection width="full">
                  <ListenAndPronounceSection />
                </ExerciseSection>
              </ActivityFlow>
            </ActivityNavigationProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </ActivityLayout>
  );
}
