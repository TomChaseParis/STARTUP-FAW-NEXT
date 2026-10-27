
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/ActivityBlock";

import ActivityFlow from "@/core/navigation/ActivityFlow";
import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";

import FillGapsBrunoSection from "./exercises/exercise-1/FillGapsBrunoSection";
import TrueFalseBrunoSection from "./exercises/exercise-2/TrueFalseBrunoSection";
import ThirdPersonBrunoSection from "./exercises/exercise-3/ThirdPersonBrunoSection";

import { activity6 } from "@/data/courses/activities/beginner/activity6";

import FillGapsReport from "@/components/courses/common/result/FillGapsReport";

import { brunoGalopinData } from "./data/brunoGalopinData";
import { thirdPersonBrunoData } from "./data/thirdPersonBrunoData";

export default function Activity() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);

    // Attend le rendu de l'activité avant de lancer le scroll.
    setTimeout(() => {
      const element = document.getElementById(
        "exercise-1-instruction",
      );

      if (!element) return;

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

        // Même courbe d'accélération/décélération
        // que dans l'activité À l'Agence matrimoniale.
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
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }, 400);
  };

  return (
    <ActivityLayout activity={activity6}>
      <LessonBlock
        contentType="activity"
        level="beginner"
        title="MEETING BRUNO GALOPIN"
        description="Regarde la vidéo puis lance les exercices."
        videoSrc="/videos/courses/beginner/activities/bruno-galopin/presentation.mp4"
        info={{
          objectifs: [
            "Repérer et restituer des informations personnelles",
            "Passer de la 1ère à la 3ème personne du singulier",
          ],
          competences: [
            "Compréhension orale",
            "Phonie / graphie",
            "Expression écrite",
          ],
          prerequis: [
            "Verbes de présentation : s’appeler, habiter, travailler, aimer, etc.",
            "Chiffres et numéros",
          ],
          duree: "20 minutes",
        }}
      />

      {!started && (
        <div className="container flex justify-center">
          <button
            type="button"
            onClick={handleStart}
            className="
              rounded-xl
              bg-[#E09F00]
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[#C98D00]
            "
          >
            Commencer l&apos;activité
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {started && (
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
            <ActivityNavigationProvider
              totalExercises={activity6.exercises.length}
            >
              <ActivityFlow
                finishHref="/courses/beginner/modules/se-presenter"
                detailedReportRenderer={(result, exerciseIndex) => {
                  /*
                   * EXERCICE 1 — TEXTE À TROUS
                   */
                  if (exerciseIndex === 0) {
                    return (
                      <FillGapsReport
                        data={brunoGalopinData}
                        history={result.session.history}
                      />
                    );
                  }

                  /*
                   * EXERCICE 2 — VRAI / FAUX
                   * Pas de correction personnalisée.
                   */
                  if (exerciseIndex === 1) {
                    return null;
                  }

                  /*
                   * EXERCICE 3 — RÉÉCRITURE
                   */
                  if (exerciseIndex === 2) {
                    return (
                      <FillGapsReport
                        data={thirdPersonBrunoData}
                        history={result.session.history}
                      />
                    );
                  }

                  return null;
                }}
              >
                <FillGapsBrunoSection />

                <TrueFalseBrunoSection />

                <ThirdPersonBrunoSection />
              </ActivityFlow>
            </ActivityNavigationProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </ActivityLayout>
  );
}
